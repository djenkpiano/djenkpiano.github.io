#!/usr/bin/env node
/**
 * ============================================================================
 *  npm run snippets  —  rebuilds src/data/snippets.json from public/piano/
 * ============================================================================
 *
 *  Adding a recording is now: drop the file in `public/piano/`, done.
 *  This script scans the folder and works out the rest:
 *
 *    file name  ->  piece + composer + tags   (via src/data/pieces.mjs)
 *    file name  ->  practice hours            ("... 471hrs.wav")
 *    file name  ->  note                      (whatever is left over)
 *    extension  ->  audio or video            (.mp4 = video)
 *    git / mtime -> the date it was added     (only for brand new files)
 *
 *  Anything already in snippets.json keeps its `id`, `date` and `note`, so you
 *  can hand-tweak those and they will survive every rebuild. Delete a file from
 *  public/piano and it disappears from the manifest.
 *
 *  Flags:
 *    --refresh   re-derive piece / hours / type for EVERY entry (use after
 *                editing aliases in pieces.mjs). Ids, dates and notes are
 *                still preserved.
 *    --check     don't write, just fail (exit 1) if the manifest is stale.
 * ============================================================================
 */

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { matchPiece, stripPiece } from '../src/data/pieces.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const MEDIA_DIR = path.join(ROOT, 'public', 'piano')
const MANIFEST = path.join(ROOT, 'src', 'data', 'snippets.json')
const MEDIA_EXT = new Set(['.m4a', '.mp3', '.wav', '.ogg', '.oga', '.flac', '.mp4', '.webm', '.mov'])
const VIDEO_EXT = new Set(['.mp4', '.webm', '.mov'])

const args = new Set(process.argv.slice(2))
const REFRESH = args.has('--refresh')
const CHECK = args.has('--check')

/**
 * "Fantaisie Impromptu 471hrs.wav" -> { hours: 471, rest: "Fantaisie Impromptu" }
 * Accepts 471hrs / 471hr / 471h / 471 hours / 231.5hrs.
 */
export function parseHours(stem) {
  const re = /(\d+(?:[.,]\d+)?)\s*h(?:rs?|ours?)?(?![a-z])/gi
  let last = null
  for (const m of stem.matchAll(re)) last = m
  if (!last) return { hours: null, rest: stem }
  return {
    hours: Number(String(last[1]).replace(',', '.')),
    rest: stem.slice(0, last.index) + ' ' + stem.slice(last.index + last[0].length),
  }
}

/** Strip separators/brackets left dangling once we remove a chunk. */
export function tidy(text) {
  return text
    .replace(/_+/g, ' ')
    .replace(/\(\s*\)|\[\s*\]|"\s*"/g, '')
    .replace(/\s+/g, ' ')
    .replace(/^[\s\-–—,.:|"()[\]]+|[\s\-–—,.:|"()[\]]+$/g, '')
    .trim()
}

export function derive(file) {
  const ext = path.extname(file).toLowerCase()
  const stem = path.basename(file, ext).replace(/_/g, ' ')
  const { hours, rest } = parseHours(stem)
  const hit = matchPiece(rest)
  return {
    piece: hit ? hit.piece.id : null,
    hours,
    note: tidy(stripPiece(rest, hit)),
    type: VIDEO_EXT.has(ext) ? 'video' : 'audio',
    unmatched: hit ? null : tidy(rest),
  }
}

/** Date the file first entered git; falls back to mtime, then today. */
function dateAdded(file) {
  try {
    const out = execFileSync(
      'git',
      ['log', '--follow', '--diff-filter=A', '--format=%aI', '-1', '--', `public/piano/${file}`],
      { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim()
    if (out) return out.slice(0, 10)
  } catch {
    /* no git, shallow clone, or file not committed yet */
  }
  try {
    return new Date(fs.statSync(path.join(MEDIA_DIR, file)).mtime).toISOString().slice(0, 10)
  } catch {
    return new Date().toISOString().slice(0, 10)
  }
}

function main() {
  // --- read what we already have ----------------------------------------------
  let existing = []
  try {
    existing = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))
  } catch {
    /* first run */
  }
  const byFile = new Map(existing.map((s) => [s.file, s]))
  let nextId = existing.reduce((max, s) => Math.max(max, s.id || 0), 0) + 1

  // --- scan --------------------------------------------------------------------
  const files = fs
    .readdirSync(MEDIA_DIR)
    .filter((f) => MEDIA_EXT.has(path.extname(f).toLowerCase()))
    .sort()

  const added = []
  const unmatched = []

  const snippets = files.map((file) => {
    const prev = byFile.get(file)
    const d = derive(file)
    if (d.unmatched) unmatched.push({ file, text: d.unmatched })
    if (!prev) added.push(file)

    return {
      id: prev?.id ?? nextId++,
      file,
      piece: REFRESH || !prev ? (d.piece ?? prev?.piece ?? null) : (prev.piece ?? d.piece),
      hours: REFRESH || !prev ? (d.hours ?? prev?.hours ?? null) : (prev.hours ?? d.hours),
      date: prev?.date ?? dateAdded(file),
      note: prev?.note ?? d.note,
      type: REFRESH || !prev ? d.type : (prev.type ?? d.type),
    }
  })

  // newest first: by date, then by practice hours, then by id
  snippets.sort(
    (a, b) =>
      b.date.localeCompare(a.date) || (b.hours ?? -1) - (a.hours ?? -1) || b.id - a.id,
  )

  const removed = existing.filter((s) => !files.includes(s.file)).map((s) => s.file)
  const json = JSON.stringify(snippets, null, 2) + '\n'
  const current = fs.existsSync(MANIFEST) ? fs.readFileSync(MANIFEST, 'utf8') : ''

  // --- report ------------------------------------------------------------------
  const say = (...a) => console.log('[snippets]', ...a)
  say(`${snippets.length} recordings in public/piano`)
  for (const f of added) say(`  + added    ${f}`)
  for (const f of removed) say(`  - removed  ${f}`)
  for (const u of unmatched) {
    say(`  ! no piece matched "${u.text}" (${u.file})`)
  }
  if (unmatched.length) {
    say('    ^ add a piece (or an alias) in src/data/pieces.mjs — until then it')
    say('      shows up on the site under "Unmatched".')
  }

  if (CHECK) {
    if (json !== current) {
      say('manifest is out of date — run `npm run snippets`')
      process.exit(1)
    }
    say('manifest is up to date')
  } else if (json !== current) {
    fs.mkdirSync(path.dirname(MANIFEST), { recursive: true })
    fs.writeFileSync(MANIFEST, json)
    say(`wrote ${path.relative(ROOT, MANIFEST)}`)
  } else {
    say('no changes')
  }
}

// Only rebuild when run directly — the helpers above are importable.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main()
