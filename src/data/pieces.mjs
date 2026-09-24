/**
 * ============================================================================
 *  PIECE CATALOG  —  the only file you edit to add a new piece / tags
 * ============================================================================
 *
 *  Every recording in `public/piano/` is matched to one entry below by looking
 *  for any of its `aliases` inside the file name. Matching ignores case,
 *  punctuation, underscores and spacing, so all of these hit the same entry:
 *
 *      "Gnossienne No1 439hrs.m4a"
 *      "Gnossiene No. 1 314hrs.wav"
 *      "gnossienne_no_1_234hrs.m4a"
 *
 *  TO ADD A NEW PIECE
 *  ------------------
 *  1. Add one object below (`title` + `composer` + `era` is enough — the title
 *     is automatically used as an alias).
 *  2. Add extra `aliases` only if your file names differ from the title.
 *  3. Drop the recording in `public/piano/` and run `npm run snippets`.
 *
 *  FILE NAMING CONVENTION
 *  ----------------------
 *      <piece> <hours>hrs [optional note].<ext>
 *
 *      "Raindrop Prelude 471hrs.wav"
 *      "Fantaisie Impromptu 381hrs (section A fully memorized).wav"
 *      "Rondo Alla Turca 294hrs (full performance).wav"
 *
 *  Anything left over after the piece name and the hours becomes the note shown
 *  under the title. `.mp4` files render as video, everything else as audio.
 *  No ids, no paths, no month lists to maintain.
 * ============================================================================
 */

export const PIECES = [
  // --- Chopin ---------------------------------------------------------------
  {
    id: 'fantaisie-impromptu',
    title: 'Fantaisie-Impromptu',
    subtitle: 'Op. 66',
    composer: 'Chopin',
    era: 'Romantic',
    aliases: ['fantasie impromptu', 'fantaisie impromptu'],
  },
  {
    id: 'raindrop-prelude',
    title: 'Raindrop Prelude',
    subtitle: 'Op. 28 No. 15',
    composer: 'Chopin',
    era: 'Romantic',
    aliases: ['raindrop'],
  },
  {
    id: 'prelude-e-minor',
    title: 'Prelude in E minor',
    subtitle: 'Op. 28 No. 4',
    composer: 'Chopin',
    era: 'Romantic',
  },
  {
    id: 'nocturne-20',
    title: 'Nocturne No. 20 in C♯ minor',
    subtitle: 'Op. posth.',
    composer: 'Chopin',
    era: 'Romantic',
    aliases: ['nocturne no 20', 'nocturne 20'],
  },
  {
    id: 'waltz-64-2',
    title: 'Waltz in C♯ minor',
    subtitle: 'Op. 64 No. 2',
    composer: 'Chopin',
    era: 'Romantic',
    aliases: ['waltz in c sharp minor'],
  },
  {
    id: 'ballade-1',
    title: 'Ballade No. 1 in G minor',
    subtitle: 'Op. 23',
    composer: 'Chopin',
    era: 'Romantic',
    aliases: ['ballade no 1', 'ballade 1', 'ballade'],
  },

  // --- Beethoven ------------------------------------------------------------
  {
    id: 'moonlight-1',
    title: 'Moonlight Sonata — I. Adagio sostenuto',
    subtitle: 'Op. 27 No. 2',
    composer: 'Beethoven',
    era: 'Classical',
    aliases: ['moonlight sonata i', 'moonlight sonata 1st', 'moonlight sonata', 'moonlight i'],
  },
  {
    id: 'moonlight-3',
    title: 'Moonlight Sonata — III. Presto agitato',
    subtitle: 'Op. 27 No. 2',
    composer: 'Beethoven',
    era: 'Classical',
    aliases: ['moonlight sonata 3rd movement', 'moonlight 3rd', 'moonlight sonata iii', 'moonlight iii'],
  },
  {
    id: 'tempest-3',
    title: 'The Tempest — III. Allegretto',
    subtitle: 'Op. 31 No. 2',
    composer: 'Beethoven',
    era: 'Classical',
    aliases: ['tempest 3rd mov', 'the tempest', 'tempest'],
  },
  {
    id: 'fur-elise',
    title: 'Für Elise',
    subtitle: 'WoO 59',
    composer: 'Beethoven',
    era: 'Classical',
    aliases: ['fur elise', 'fuer elise'],
  },

  // --- Mozart ---------------------------------------------------------------
  {
    id: 'rondo-alla-turca',
    title: 'Rondo Alla Turca',
    subtitle: 'Turkish March, K. 331',
    composer: 'Mozart',
    era: 'Classical',
    aliases: ['rondo alla turca', 'turkish march'],
  },
  {
    id: 'sonata-16',
    title: 'Sonata No. 16 “Sonata Facile”',
    subtitle: 'K. 545',
    composer: 'Mozart',
    era: 'Classical',
    aliases: ['sonata no 16', 'sonata facile'],
  },

  // --- Liszt ----------------------------------------------------------------
  {
    id: 'la-campanella',
    title: 'La Campanella',
    subtitle: 'S. 141 No. 3',
    composer: 'Liszt',
    era: 'Romantic',
  },

  // --- Rachmaninoff ---------------------------------------------------------
  {
    id: 'liebesleid',
    title: 'Liebesleid',
    composer: 'Rachmaninoff',
    era: 'Romantic',
    aliases: ['liebesleid', 'liebeslied'],
  },

  // --- Baroque / Impressionist ----------------------------------------------
  {
    id: 'canon-in-d',
    title: 'Canon in D',
    composer: 'Pachelbel',
    era: 'Baroque',
  },
  {
    id: 'passacaglia',
    title: 'Passacaglia',
    subtitle: 'Handel–Halvorsen',
    composer: 'Handel',
    era: 'Baroque',
  },
  {
    id: 'gnossienne-1',
    title: 'Gnossienne No. 1',
    composer: 'Satie',
    era: 'Impressionist',
    aliases: ['gnossienne no 1', 'gnossiene no 1', 'gnossienne', 'gnossiene'],
  },
  {
    id: 'clair-de-lune',
    title: 'Clair de Lune',
    subtitle: 'Suite bergamasque',
    composer: 'Debussy',
    era: 'Impressionist',
  },

  // --- Contemporary / soundtrack --------------------------------------------
  {
    id: 'idea-25',
    title: 'Idea 25',
    composer: 'Gibran Alcocer',
    era: 'Contemporary',
  },
  {
    id: 'une-comptine',
    title: "D'une comptine d'un autre été",
    subtitle: 'Amélie',
    composer: 'Yann Tiersen',
    era: 'Contemporary',
    aliases: ['une comptine', 'd une comptine d un autre ete', 'comptine'],
  },
  {
    id: 'the-line',
    title: 'The Line',
    subtitle: 'Arcane',
    composer: 'Woodkid',
    era: 'Contemporary',
    tags: ['Soundtrack'],
  },
  {
    id: 'mia-and-sebastian',
    title: "Mia & Sebastian's Theme",
    subtitle: 'La La Land',
    composer: 'Justin Hurwitz',
    era: 'Contemporary',
    tags: ['Soundtrack'],
    aliases: ['lalaland', 'la la land', 'mia and sebastian', 'mia sebastian'],
  },
  {
    id: 'clair-obscur-alicia',
    title: 'Alicia',
    subtitle: 'Clair Obscur: Expedition 33',
    composer: 'Lorien Testard',
    era: 'Contemporary',
    tags: ['Soundtrack'],
    aliases: ['clair obscur alicia', 'clair obscur'],
  },
]

/**
 * Strip accents so "été" and "ete" match each other. Precomposed characters
 * decompose to base + combining mark, so removing the marks keeps the string
 * the same length and indices stay valid against the original text.
 */
const deaccent = (s) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '')

/** Turn an alias into a punctuation/spacing-insensitive regex. */
function aliasToRegex(alias) {
  const parts = deaccent(alias)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  return new RegExp(parts.join('[^a-zA-Z0-9]*'), 'i')
}

const alphaLen = (s) => deaccent(s).replace(/[^a-z0-9]/gi, '').length

/** Flat alias index, longest alias first so the most specific name wins. */
const ALIAS_INDEX = PIECES.flatMap((piece) => {
  const aliases = new Set([piece.title, ...(piece.aliases || [])])
  return [...aliases].map((alias) => ({ piece, alias, regex: aliasToRegex(alias) }))
}).sort((a, b) => alphaLen(b.alias) - alphaLen(a.alias))

/**
 * Find the piece referenced by a file name (or any free text).
 * Returns `{ piece, index, length }` — slice them out of the ORIGINAL string to
 * get whatever text was left over — or `null` when nothing in the catalog fits.
 */
export function matchPiece(text) {
  const haystack = deaccent(text)
  for (const entry of ALIAS_INDEX) {
    const m = entry.regex.exec(haystack)
    if (m) return { piece: entry.piece, index: m.index, length: m[0].length }
  }
  return null
}

/** Everything except the piece name. */
export function stripPiece(text, hit) {
  return hit ? text.slice(0, hit.index) + ' ' + text.slice(hit.index + hit.length) : text
}

/** Look up a catalog entry by id. */
export const PIECES_BY_ID = Object.fromEntries(PIECES.map((p) => [p.id, p]))
