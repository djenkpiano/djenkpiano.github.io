import React, { useState } from 'react'

const audiosByMonth = {
  "November 2025": [
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
      title: 'Fantasie Impromptu (RH only)- 180h',
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
        <p>Welcome to my portfolio and progress archive, take a look around. 🙂</p>
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
                              style={{ width: '100%', maxWidth: 500, backgroundColor: '#000' }}
                            >
                              <source src={a.src} type="video/mp4" />
                              Your browser does not support the video element.
                            </video>
                          ) : (
                            <audio controls style={{ width: '100%' }}>
                              <source src={a.src} type="audio/mp4" />
                              Your browser does not support the audio element.
                            </audio>
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
