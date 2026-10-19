# Piano Progress

Feel free to copy anything you want from this project, no need to credit.

## Adding a new recording

1. Drop the file into `public/piano/`, named like this:

   ```
   <piece> <hours>hrs [optional note].<ext>
   ```

   ```
   Raindrop Prelude 471hrs.wav
   Fantaisie Impromptu 381hrs (section A fully memorized).wav
   Rondo Alla Turca 294hrs (full performance).wav
   ```

2. `npm run dev` (or `npm run build`).

That's it. There is no listing to add, no id to bump, no path to type and no month
list to extend. `npm run snippets` runs automatically before `dev` and `build`, and
works everything out from the file name:

| from | it derives |
| --- | --- |
| the piece name | piece, composer, era and tags — via `src/data/pieces.mjs` |
| `471hrs` | the practice-hours badge (also `471hr`, `471h`, `471 hours`, `231.5hrs`) |
| whatever is left over | the note shown under the title |
| the extension | `.mp4` renders as video, everything else as audio |
| git history, else the file date | which month it is filed under |

Name matching ignores case, punctuation, underscores, spacing and accents, so
`Gnossienne No1 439hrs.m4a`, `Gnossiene No. 1 314hrs.wav` and
`gnossienne_no_1_234hrs.m4a` all land on the same piece.

Delete a file from `public/piano/` and it disappears from the site too.

## Adding a new piece or new tags

Add one object to `PIECES` in [`src/data/pieces.mjs`](src/data/pieces.mjs):

```js
{
  id: 'ballade-1',
  title: 'Ballade No. 1 in G minor',
  subtitle: 'Op. 23',          // optional
  composer: 'Chopin',          // becomes a filter chip
  era: 'Romantic',             // becomes a clickable tag
  tags: ['Soundtrack'],        // optional extra tags
  aliases: ['ballade no 1'],   // optional; the title is always an alias
}
```

`title`, `composer` and `era` are enough. Add `aliases` only when your file names
don't contain the title — the composer chips, the piece dropdown and the tags on
each card are all built from whatever ends up in this file.

If a file name matches nothing, it is **not** dropped: the build prints a warning
naming the file, and the recording appears on the site under "Unmatched" until you
add a piece or an alias for it.

## Editing a single entry

`src/data/snippets.json` is generated, but the `id`, `date` and `note` of an entry
survive every rebuild — so if you want a different note or a different month for
one recording, edit it there and it will stick.

## Commands (PowerShell)

```powershell
npm install         # install deps
npm run dev         # rebuild the manifest, then start the dev server
npm run build       # rebuild the manifest, then build for production
npm run preview     # preview the production build
npm run deploy      # build and publish to the gh-pages branch
npm run snippets    # rebuild src/data/snippets.json on its own
```

Two extra flags on the generator:

```powershell
node scripts/build-snippets.mjs --refresh   # re-match every file after editing pieces.mjs
node scripts/build-snippets.mjs --check     # fail if the manifest is out of date (CI)
```

This project uses Vite. If you prefer `yarn` or `pnpm`, use the equivalent commands.
