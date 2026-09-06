import React, { useEffect, useMemo, useState } from 'react'
import snippets from './data/snippets.json'
import { PIECES_BY_ID } from './data/pieces.mjs'

/* The whole page is driven by src/data/snippets.json, which `npm run snippets`
   regenerates from the files in public/piano. Nothing here needs touching when
   a new recording is added. */

const BUILD_TIME = typeof __BUILD_TIME__ === 'string' ? __BUILD_TIME__ : null

const MONTH_FMT = new Intl.DateTimeFormat('en-GB', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

const monthLabel = (iso) => MONTH_FMT.format(new Date(`${iso}T00:00:00Z`))
const fmtHours = (h) => (h == null ? null : `${Math.floor(h)} hrs`)

/** snippets.json + the piece catalog, joined once at module load. */
const ALL = snippets.map((s) => {
  // A file whose name isn't in the catalog still gets listed — with whatever the
  // generator could read off the name — rather than silently disappearing.
  const matched = PIECES_BY_ID[s.piece]
  const piece = matched ?? {
    id: 'unmatched',
    title: s.note || s.file.replace(/\.[^.]+$/, ''),
    composer: 'Unmatched',
    era: null,
  }
  return {
    ...s,
    note: matched ? s.note : '',
    piece,
    src: encodeURI(`/piano/${s.file}`),
    month: monthLabel(s.date),
    search: [piece.title, piece.subtitle, piece.composer, piece.era, ...(piece.tags ?? []), s.note, s.file]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  }
})

/** Facet -> how many recordings carry it, biggest first. */
function tally(values) {
  const counts = new Map()
  for (const v of values) if (v) counts.set(v, (counts.get(v) ?? 0) + 1)
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

const COMPOSERS = tally(ALL.map((s) => s.piece.composer))
const PIECE_OPTIONS = [
  ...ALL.reduce((map, s) => {
    const row = map.get(s.piece.id) ?? { ...s.piece, count: 0 }
    row.count += 1
    return map.set(s.piece.id, row)
  }, new Map()).values(),
].sort((a, b) => a.title.localeCompare(b.title))

const PEAK_HOURS = Math.floor(Math.max(...ALL.map((s) => s.hours ?? 0)))

const SORTS = [
  { value: 'new', label: 'Newest first' },
  { value: 'old', label: 'Oldest first' },
  { value: 'piece', label: 'Group by piece' },
]

const toggle = (list, value) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" strokeLinecap="round" />
    </svg>
  )
}

function Caret() {
  return (
    <svg className="caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function App() {
  const [query, setQuery] = useState('')
  const [composers, setComposers] = useState([])
  const [eras, setEras] = useState([])
  const [pieceId, setPieceId] = useState('')
  const [sort, setSort] = useState('new')
  const [open, setOpen] = useState({})

  const filtering = Boolean(query.trim() || composers.length || eras.length || pieceId)

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    return ALL.filter(
      (s) =>
        (!composers.length || composers.includes(s.piece.composer)) &&
        (!eras.length || eras.includes(s.piece.era)) &&
        (!pieceId || s.piece.id === pieceId) &&
        terms.every((t) => s.search.includes(t)),
    )
  }, [query, composers, eras, pieceId])

  const groups = useMemo(() => {
    // ALL is already newest-first, so 'new' needs no sorting at all.
    const list = [...results]
    if (sort === 'old') list.reverse()
    if (sort === 'piece') {
      list.sort(
        (a, b) =>
          a.piece.title.localeCompare(b.piece.title) ||
          (b.hours ?? -1) - (a.hours ?? -1) ||
          b.id - a.id,
      )
    }
    const map = new Map()
    for (const s of list) {
      const key = sort === 'piece' ? s.piece.title : s.month
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(s)
    }
    return [...map.entries()].map(([label, items]) => ({ label, items }))
  }, [results, sort])

  // Collapse state is per-view: changing a filter or the sort resets it, so the
  // defaults below (everything open while filtering, newest month open at rest)
  // always apply to what you are actually looking at.
  const viewKey = JSON.stringify([query, composers, eras, pieceId, sort])
  useEffect(() => setOpen({}), [viewKey])

  const isOpen = (label, index) => open[label] ?? (filtering || index === 0)
  const setAllOpen = (value) =>
    setOpen(Object.fromEntries(groups.map((g) => [g.label, value])))

  const clearAll = () => {
    setQuery('')
    setComposers([])
    setEras([])
    setPieceId('')
  }

  const activePiece = PIECE_OPTIONS.find((p) => p.id === pieceId)

  return (
    <div className="app">
      <header className="hero">
        <h1>Piano Progress</h1>
        <p className="lede">
          Welcome to my portfolio and progress archive — take a look around 🙂 Every recording is
          labelled with the total hours I had practised at the time, so you can hear things
          change.
        </p>
        <p className="dream">
          <span className="label">Dream pieces:</span> Ballade No. 1 in G minor · Liebesleid ·
          Raindrop Prelude · The Tempest · Fantaisie-Impromptu · La Campanella
        </p>

        <ul className="stats">
          <li>
            <span className="n">{PEAK_HOURS.toLocaleString('en-GB')}</span>
            <span className="k">hours practised</span>
          </li>
          <li>
            <span className="n">{ALL.length}</span>
            <span className="k">recordings</span>
          </li>
          <li>
            <span className="n">{PIECE_OPTIONS.length}</span>
            <span className="k">pieces</span>
          </li>
          <li>
            <span className="n">{COMPOSERS.length}</span>
            <span className="k">composers</span>
          </li>
        </ul>

        {BUILD_TIME && (
          <p className="updated">
            Last updated {new Date(BUILD_TIME).toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })}
          </p>
        )}
      </header>

      <div className="toolbar">
        <div className="controls">
          <div className="search-wrap">
            <SearchIcon />
            <input
              className="search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search piece, composer, tag…"
              aria-label="Search recordings"
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                ✕
              </button>
            )}
          </div>

          <select
            className="select"
            value={pieceId}
            onChange={(e) => setPieceId(e.target.value)}
            aria-label="Filter by piece"
          >
            <option value="">All pieces</option>
            {PIECE_OPTIONS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.count})
              </option>
            ))}
          </select>

          <select
            className="select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort recordings"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="chips" role="group" aria-label="Filter by composer">
          {COMPOSERS.map((c) => (
            <button
              key={c.name}
              className="chip"
              aria-pressed={composers.includes(c.name)}
              onClick={() => setComposers((prev) => toggle(prev, c.name))}
            >
              {c.name}
              <span className="count">{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      <main>
        <div className="resultbar">
          <span>
            {results.length} {results.length === 1 ? 'recording' : 'recordings'}
          </span>

          {composers.map((name) => (
            <button key={name} className="pill" onClick={() => setComposers((p) => toggle(p, name))}>
              {name} <span className="x">✕</span>
            </button>
          ))}
          {eras.map((era) => (
            <button key={era} className="pill" onClick={() => setEras((p) => toggle(p, era))}>
              {era} <span className="x">✕</span>
            </button>
          ))}
          {activePiece && (
            <button className="pill" onClick={() => setPieceId('')}>
              {activePiece.title} <span className="x">✕</span>
            </button>
          )}
          {filtering && (
            <button className="linkbtn" onClick={clearAll}>
              Clear all
            </button>
          )}

          <span className="spacer" />

          {groups.length > 1 && (
            <>
              <button className="linkbtn" onClick={() => setAllOpen(true)}>
                Expand all
              </button>
              <button className="linkbtn" onClick={() => setAllOpen(false)}>
                Collapse all
              </button>
            </>
          )}
        </div>

        {groups.length === 0 ? (
          <div className="empty">
            <p>Nothing matches that.</p>
            <button className="linkbtn" onClick={clearAll}>
              Clear all filters
            </button>
          </div>
        ) : (
          groups.map((group, index) => {
            const expanded = isOpen(group.label, index)
            return (
              <section className="group" key={group.label}>
                <button
                  className="group-head"
                  aria-expanded={expanded}
                  onClick={() => setOpen((prev) => ({ ...prev, [group.label]: !expanded }))}
                >
                  <Caret />
                  {group.label}
                  <span className="rule" />
                  <span className="n">{group.items.length}</span>
                </button>

                {expanded && (
                  <div className="grid">
                    {group.items.map((s) => (
                      <Card
                        key={s.id}
                        snippet={s}
                        onPiece={() => setPieceId(s.piece.id)}
                        onComposer={() => setComposers((p) => toggle(p, s.piece.composer))}
                        onEra={() => setEras((p) => toggle(p, s.piece.era))}
                      />
                    ))}
                  </div>
                )}
              </section>
            )
          })
        )}
      </main>

      <footer className="foot">
        Recorded at home on a Kawai K300 ATX4. Feel free to copy anything from this site.
      </footer>
    </div>
  )
}

function Card({ snippet, onPiece, onComposer, onEra }) {
  const { piece, note, hours, type, src } = snippet
  const Player = type === 'video' ? 'video' : 'audio'

  return (
    <article className="card">
      <button className="card-title" onClick={onPiece} title={`Show only ${piece.title}`}>
        {piece.title}
      </button>

      {(piece.subtitle || note) && (
        <div className="card-sub">
          {piece.subtitle}
          {piece.subtitle && note && ' · '}
          {note && <em>{note}</em>}
        </div>
      )}

      <div className="meta">
        <button className="tag" onClick={onComposer}>
          {piece.composer}
        </button>
        {piece.era && (
          <button className="tag quiet" onClick={onEra}>
            {piece.era}
          </button>
        )}
        {(piece.tags ?? []).map((tag) => (
          <span key={tag} className="tag quiet static">
            {tag}
          </span>
        ))}
        {hours != null && <span className="hours">{fmtHours(hours)}</span>}
      </div>

      {/* preload="none" keeps 128 players off the network until one is played */}
      <Player className="player" controls preload="none" src={src} />
    </article>
  )
}
