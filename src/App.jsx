import React, { useState } from 'react'

const audiosByMonth = {
  "February 2026": [
    {
      id: 92,
      title: 'The Tempest 362hrs',
      src: '/piano/The Tempest 362hrs.wav',
    },
    {
      id: 91,
      title: 'Clair de Lune 358hrs',
      src: '/piano/Clair de Lune 358hrs.wav',
    },
    {
      id: 90,
      title: 'Rondo Alla Turca 356hrs',
      src: '/piano/Rondo Alla Turca 356hrs.wav',
    },
  ],
  "January 2026": [
    {
      id: 89,
      title: 'Waltz in C Sharp Minor (Op.64 No.2) 352hrs',
      src: '/piano/Waltz in C Sharp Minor (Op.64 No.2) 352hrs.wav',
    },
    {
      id: 88,
      title: 'Fantaisie Impromptu 351hrs',
      src: '/piano/Fantaisie Impromptu 351hrs.wav',
    },
    {
      id: 87,
      title: 'Moonlight Sonata 3rd Movement 351hrs',
      src: '/piano/Moonlight Sonata 3rd Movement 351hrs.wav',
    },
    {
      id: 86,
      title: 'Waltz in C Sharp Minor (Op.64 No.2) 346hrs',
      src: '/piano/Waltz in C Sharp Minor (Op.64 No.2) 346hrs.wav',
    },
    {
      id: 85,
      title: 'Waltz in C Sharp Minor (Op.64 No.2) 345hrs',
      src: '/piano/Waltz in C Sharp Minor (Op.64 No.2) 345hrs.wav',
    },
    {
      id: 84,
      title: 'Fantaisie Impromptu 336hrs',
      src: '/piano/Fantaisie Impromptu 336hrs.m4a',
    },
    {
      id: 83,
      title: 'La Campanella 334hrs',
      src: '/piano/La Campanella 334hrs.wav',
    },
    {
      id: 82,
      title: 'Fantaisie Impromptu 333hrs',
      src: '/piano/Fantaisie Impromptu 333hrs.wav',
    },
    {
      id: 81,
      title: 'Clair de Lune 333hrs',
      src: '/piano/Clair de Lune 333hrs.wav',
    },
  ],
  "December 2025": [
    {
      id: 80,
      title: 'Fantaisie Impromptu 319hrs',
      src: '/piano/Fantaisie Impromptu 319hrs.m4a',
    },
    {
      id: 79,
      title: 'Fantaisie Impromptu 315hrs',
      src: '/piano/Fantaisie Impromptu 315hrs.wav',
    },
    {
      id: 78,
      title: 'Gnossiene No. 1 314hrs',
      src: '/piano/Gnossiene No1 314hrs.wav',
    },
    {
      id: 77,
      title: 'Idea 25 313hrs',
      src: '/piano/Idea 25 313hrs.wav',
    },
    {
      id: 76,
      title: 'Fantaisie Impromptu 313hrs',
      src: '/piano/Fantaisie Impromptu 313hrs.wav',
    },
    {
      id: 75,
      title: 'Moonlight Sonata 3rd Movement 307hrs',
      src: '/piano/Moonlight Sonata 3rd Movement 307hrs.wav',
    },
    {
      id: 74,
      title: 'La Campanella 307hrs',
      src: '/piano/La Campanella 307hrs.wav',
    },
    {
      id: 73,
      title: 'Fantaisie Impromptu 307hrs',
      src: '/piano/Fantaisie Impromptu 307hrs.wav',
    },
    {
      id: 72,
      title: 'La Campanella 299hrs',
      src: '/piano/La Campanella 299hrs.wav',
    },
    {
      id: 71,
      title: 'Nocturne No. 20 (wow) 298hrs',
      src: '/piano/Nocturne No. 20 (wow) 298hrs.wav',
    },
    {
      id: 70,
      title: 'Clair de Lune 298hrs',
      src: '/piano/Clair de Lune 298hrs.wav',
    },
    {
      id: 69,
      title: 'Nocturne No. 20 296hrs',
      src: '/piano/Nocturne No. 20 296hrs.wav',
    },
    {
      id: 68,
      title: 'Rondo Alla Turca (FULL PERFORMANCE) 294hrs',
      src: '/piano/Rondo Alla Turca performance 294hrs.wav',
    },
     {
      id: 67,
      title: 'Fur Elise (FULL PERFORMANCE) 293hrs',
      src: '/piano/Fur Elise performance 293hrs.wav',
    },
    {
      id: 66,
      title: 'Nocturne No. 20 291hrs',
      src: '/piano/Nocturne No. 20 291hrs.wav',
    },
    {
      id: 65,
      title: 'Nocturne No. 20 290hrs',
      src: '/piano/Nocturne No. 20 290hrs.wav',
    },
    {
      id: 64,
      title: 'Fantaisie Impromptu 290hrs',
      src: '/piano/Fantaisie Impromptu 290hrs.wav',
    },
    {
      id: 63,
      title: 'La Campanella 289hrs',
      src: '/piano/La Campanella 289hrs.wav',
    },
    {
      id: 62,
      title: 'Idea 25 289hrs',
      src: '/piano/Idea 25 289hrs.wav',
    },
    {
      id: 61,
      title: 'Passacaglia 289hrs',
      src: '/piano/Passacaglia 289hrs.m4a',
    },
    {
      id: 60,
      title: 'Fantaisie Impromptu 287hrs',
      src: '/piano/Fantaisie Impromptu 287hrs.m4a',
    },
    {
      id: 59,
      title: 'Idea 25 286hrs',
      src: '/piano/Idea 25 286hrs.m4a',
    },
    {
      id: 58,
      title: 'Moonlight Sonata 286hrs',
      src: '/piano/Moonlight Sonata 286hrs.m4a',
    },
    {
      id: 57,
      title: 'Rondo Alla Turca (SETUP UPGRADE!!!) 286hrs',
      src: '/piano/Rondo Alla Turca 286hrs.m4a',
    },
    {
      id: 56,
      title: 'La Campanella 284hrs',
      src: '/piano/La campanella 284hrs.m4a',
    },
    {
      id: 55,
      title: 'Fantaisie Impromptu 284hrs',
      src: '/piano/Fantaisie Impromptu 284hrs.m4a',
    },
    {
      id: 54,
      title: 'Moonlight 3rd 282hrs',
      src: '/piano/Moonlight 3rd 282hrs.m4a',
    },
    {
      id: 53,
      title: 'Fantaisie Impromptu 282hrs',
      src: '/piano/Fantaisie Impromptu 282hrs.m4a',
    },
    {
      id: 52,
      title: 'Fantaisie Impromptu 281hrs',
      src: '/piano/Fantaisie Impromptu 281hrs.m4a',
    },
    {
      id: 51,
      title: 'Fantaisie Impromptu 276hrs',
      src: '/piano/Fantaisie Impromptu 276hrs.m4a',
    },
    {
      id: 50,
      title: 'Moonlight 3rd 276hrs',
      src: '/piano/Moonlight 3rd 276hrs.m4a',
    },
    {
      id: 49,
      title: 'Fantaisie Impromptu 275hrs',
      src: '/piano/Fantaisie Impromptu 275hrs.m4a',
    },
    {
      id: 48,
      title: 'Fantaisie Impromptu 273hrs',
      src: '/piano/Fantaisie Impromptu 273hrs.m4a',
    },
    {
      id: 47,
      title: 'Moonlight 3rd 273hrs',
      src: '/piano/Moonlight 3rd 273hrs.m4a',
    },
    {
      id: 46,
      title: 'Fantaisie Impromptu 272hrs',
      src: '/piano/Fantaisie Impromptu 272hrs.m4a',
    },
    {
      id: 45,
      title: 'Fantaisie Impromptu 270hrs',
      src: '/piano/Fantaisie Impromptu 270hrs.m4a',
    },
  ],
  "November 2025": [
    {
      id: 44,
      title: 'Idea 25 268hrs',
      src: '/piano/Idea 25 268hrs.m4a',
    },
    {
      id: 43,
      title: 'La Campanella - 267h',
      src: '/piano/La Campanella 267hrs.m4a',
    },
    {
      id: 42,
      title: 'Moonlight Sonata 3rd movement - 267h',
      src: '/piano/Moonlight 3rd 267hrs.m4a',
    },
    {
      id: 41,
      title: 'La Campanella - 265h',
      src: '/piano/La Campanella 265hrs.m4a',
    },
    {
      id: 40,
      title: 'Gnossienne (my interpretation) - 263h',
      src: '/piano/Gnossienne (my interpretation) 263hrs.m4a',
    },
    {
      id: 39,
      title: 'Gnossienne - 263h',
      src: '/piano/Gnossienne 263hrs.m4a',
    },
    {
      id: 38,
      title: 'Moonlight Sonata 3rd Movement - 263h',
      src: '/piano/Moonlight sonata 3rd movement 263hrs.m4a',
    },
    {
      id: 37,
      title: 'Idea 25 - 262h',
      src: '/piano/Idea 25 262hrs.m4a',
    },
    {
      id: 36,
      title: 'Fur Elise complex - 262h',
      src: '/piano/Fur Elise complex 262hrs.m4a',
    },
    {
      id: 35,
      title: 'Moonlight Sonata 3rd Movement - 259h',
      src: '/piano/Moonlight sonata 3rd movement 259hrs.m4a',
    },
    {
      id: 34,
      title: 'Idea 25 (extended) - 257h',
      src: '/piano/idea_25_extended_257hrs.m4a',
    },
    {
      id: 33,
      title: 'Idea 25 - 257h',
      src: '/piano/idea_25_257hrs.m4a',
    },
    {
      id: 32,
      title: 'Idea 25 - 256h',
      src: '/piano/idea_25_256hrs.m4a',
    },
    {
      id: 31,
      title: 'Fur Elise complex bit - 248h',
      src: '/piano/fur_elise_complex_248hrs.m4a',
    },
    {
      id: 30,
      title: "D'une comptine d'un autre été - 248h",
      src: "/piano/une_comptine_248hrs.m4a",
    },
    {
      id: 29,
      title: 'Rondo Alla Turca (Turkish March) - 248h',
      src: '/piano/turkish_march_248hrs.m4a',
    },
    {
      id: 28,
      title: 'Fur Elise complex bit - 246h',
      src: '/piano/fur_elise_complex_246hrs.m4a',
    },
    {
      id: 27,
      title: 'Rondo Alla Turca (Turkish March) - 243h',
      src: '/piano/turkish_march_243hrs.m4a',
    },
    {
      id: 26,
      title: 'La Campanella intro - 241h',
      src: '/piano/la_campanella_241hrs_woah.m4a',
    },
  ],
  "October 2025": [
    {
      id: 25,
      title: 'Rondo Alla Turca (Turkish March) - 238h',
      src: '/piano/turkish_march_238hrs.m4a',
    },
    {
      id: 24,
      title: 'La Campanella intro - 238h',
      src: '/piano/la_campanella_238hrs.m4a',
    },
    {
      id: 23,
      title: 'Gnossienne - 237h',
      src: '/piano/gnossienne_237hrs.m4a',
    },
    {
      id: 22,
      title: 'Gnossienne - 235h',
      src: '/piano/gnossienne_235hrs.m4a',
    },
    {
      id: 21,
      title: 'Gnossienne - 234h',
      src: '/piano/gnossienne_234hrs.m4a',
    },
    {
      id: 20,
      title: 'La Campanella intro - 233h',
      src: '/piano/la_campanella_233hrs.m4a',
    },
    {
      id: 19,
      title: 'La Campanella intro - 231h',
      src: '/piano/la_campanella_231.5hrs.m4a',
    },
    {
      id: 18,
      title: 'La Campanella intro - 231h',
      src: '/piano/la_campanella_231hrs.m4a',
    },
    {
      id: 17,
      title: 'Rondo Alla Turca (Turkish March) - 230h',
      src: '/piano/turkish_march_230hrs.m4a',
    },
  ],
  "September 2025": [
    {
      id: 16,
      title: 'Rondo Alla Turca (Turkish March) - 207h',
      src: '/piano/turkish_march_207hrs.mp4',
      type: 'video',
    },
    {
      id: 15,
      title: 'Rondo Alla Turca (Turkish March) - 205h',
      src: '/piano/turkish_march_205hrs.mp4',
      type: 'video',
    },
    {
      id: 14,
      title: 'Rondo Alla Turca (Turkish March) - 200h',
      src: '/piano/turkish_march_200hrs.mp4',
      type: 'video',
    },
    {
      id: 13,
      title: 'The Line (Arcane) - 200h',
      src: '/piano/the_line_200hrs.mp4',
      type: 'video',
    },
    {
      id: 12,
      title: 'Passacaglia - 200h',
      src: '/piano/passacaglia_200hrs.mp4',
      type: 'video',
    },
    {
      id: 11,
      title: 'Fur Elise - 200h',
      src: '/piano/fur_elise_200hrs.mp4',
      type: 'video',
    },
    {
      id: 10,
      title: 'Canon in D - 200h',
      src: '/piano/canon_in_d_200hrs.mp4',
      type: 'video',
    },
  ],
  "July 2025": [
    {
      id: 9,
      title: 'Fantaisie Impromptu (RH only)- 180h',
      src: '/piano/fantasie_impromptu.m4a',
    },
    {
      id: 8,
      title: 'Fur Elise - 179h',
      src: '/piano/fur_elise_179hrs.m4a',
    },
    {
      id: 7,
      title: 'Canon in D - 178h',
      src: '/piano/canon_in_d_178hrs.m4a',
    },
    {
      id: 6,
      title: 'Passacaglia - 173h',
      src: '/piano/passacaglia_173hrs.m4a',
    },
    {
      id: 5,
      title: 'Canon in D - 172h',
      src: '/piano/canon_in_d_172hrs.m4a',
    },
  ],
  "June 2025": [
    {
      id: 4,
      title: 'Canon in D - 168h',
      src: '/piano/canon_in_d_168hrs.m4a',
    },
    {
      id: 3,
      title: 'Canon in D - 166h',
      src: '/piano/canon_in_d_166hrs.m4a',
    },
  ],
  "May 2025": [
    {
      id: 2,
      title: 'Moonlight Sonata - 155h',
      src: '/piano/moonlight_sonata_155hrs.m4a',
    },
    {
      id: 1,
      title: 'Moonlight Sonata - 154h',
      src: '/piano/moonlight_sonata_154hrs.m4a',
    },
  ],
}

export default function App() {
  const [openMonths, setOpenMonths] = useState({ November: true })
  const buildTime = import.meta.env.VITE_BUILD_TIME;

  return (
    <div className="app">
      <header>
        <h1>Piano Progress</h1>
      </header>

      <main>
        <p>Welcome to my portfolio and progress archive, take a look around! 🙂
          Dream pieces: The Tempest, Fantaisie Impromptu, La Campanella
        </p>
        <p style={{ opacity: 0.7 }}>
          Last updated: {new Date(buildTime).toLocaleString('en-GB')}
        </p>
        <section>
          <h2>Recordings</h2>
          {Object.keys(audiosByMonth).length === 0 ? (
            <p>No months with recordings yet. Add some audio files.</p>
          ) : (
            <div>
              {Object.entries(audiosByMonth).map(([month, snippets]) => (
                <div key={month} style={{ marginBottom: 24 }}>
                  <button
                    onClick={() =>
                      setOpenMonths((prev) => ({
                        ...prev,
                        [month]: !prev[month],
                      }))
                    }
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 18,
                      fontWeight: 600,
                      color: 'var(--text)',
                      padding: 0,
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        transition: 'transform 0.2s',
                        transform: openMonths[month] ? 'rotate(0deg)' : 'rotate(-90deg)',
                      }}
                    >
                      ▼
                    </span>
                    {month}
                  </button>

                  {openMonths[month] && (
                    <ul style={{ marginTop: 12, paddingLeft: 24 }}>
                      {snippets.map((a) => (
                        <li key={a.id} style={{ marginBottom: 16, listStyle: 'none' }}>
                          <div style={{ fontWeight: 500, marginBottom: 8 }}>{a.title}</div>
                          {a.type === 'video' ? (
                            <video
                              controls
                              preload="metadata"
                              src={encodeURI(a.src)}
                              style={{ width: '100%', maxWidth: 500, backgroundColor: '#000' }}
                            />
                          ) : (
                            <audio
                              controls
                              preload="metadata"
                              src={encodeURI(a.src)}
                              style={{ width: '100%' }}
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
