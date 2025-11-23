import React, { useState } from 'react'

const audiosByMonth = {
  "November 2025": [
    {
      id: 1,
      title: 'Idea 25 - 257h (extended)',
      src: '/piano/Idea 25 extended 257hrs.m4a',
    },
    {
      id: 2,
      title: 'Idea 25 - 257h',
      src: '/piano/Idea 25 257hrs.m4a',
    },
    {
      id: 3,
      title: 'Idea 25 - 256h',
      src: '/piano/Idea 25 256hrs.m4a',
    },
    {
      id: 4,
      title: 'Fur Elise complex bit - 248h',
      src: '/piano/Fur elise complex 248hrs.m4a',
    },
    {
      id: 5,
      title: "D'une comptine d'un autre été - 248h",
      src: "/piano/D'une comptine 248hrs.m4a",
    },
    {
      id: 6,
      title: 'Rondo Alla Turca (Turkish March) - 248h',
      src: '/piano/Turkish march 248hrs.m4a',
    },
    {
      id: 7,
      title: 'Fur Elise complex bit - 246h',
      src: '/piano/Fur elise complex 246hrs.m4a',
    },
    {
      id: 8,
      title: 'Rondo Alla Turca (Turkish March) - 243h',
      src: '/piano/Turkish march 243hrs.m4a',
    },
    {
      id: 9,
      title: 'La Campanella intro - 241h',
      src: '/piano/La Campanella 241hrs (woah).m4a',
    },
  ],
  "October 2025": [
    {
      id: 10,
      title: 'Rondo Alla Turca (Turkish March) - 238h',
      src: '/piano/Turkish march 238hrs.m4a',
    },
    {
      id: 11,
      title: 'La Campanella intro - 238h',
      src: '/piano/La Campanella 238hrs.m4a',
    },
    {
      id: 12,
      title: 'Gnossienne - 237h',
      src: '/piano/Gnossienne 237hrs.m4a',
    },
    {
      id: 13,
      title: 'Gnossienne - 235h',
      src: '/piano/Gnossienne 235hrs.m4a',
    },
    {
      id: 14,
      title: 'Gnossienne - 234h',
      src: '/piano/Gnossienne 234hrs.m4a',
    },
    {
      id: 15,
      title: 'La Campanella intro - 233h',
      src: '/piano/La Campanella 233hrs.m4a',
    },
    {
      id: 16,
      title: 'La Campanella intro - 231h',
      src: '/piano/La Campanella 231.5hrs.m4a',
    },
    {
      id: 17,
      title: 'La Campanella intro - 231h',
      src: '/piano/La Campanella 231hrs.m4a',
    },
    {
      id: 18,
      title: 'Rondo Alla Turca (Turkish March) - 230h',
      src: '/piano/Turkish march 230hrs.m4a',
    },
  ],
  "September 2025": [
    {
      id: 19,
      title: 'Rondo Alla Turca (Turkish March) - 207h',
      src: '/piano/Turkish march 207hrs.mp4',
      type: 'video',
    },
    {
      id: 20,
      title: 'Rondo Alla Turca (Turkish March) - 205h',
      src: '/piano/Turkish march 205hrs.mp4',
      type: 'video',
    },
    {
      id: 21,
      title: 'Rondo Alla Turca (Turkish March) - 200h',
      src: '/piano/Turkish march 200hrs.mp4',
      type: 'video',
    },
    {
      id: 22,
      title: 'The Line (Arcane) - 200h',
      src: '/piano/The Line 200hrs.mp4',
      type: 'video',
    },
    {
      id: 23,
      title: 'Passacaglia - 200h',
      src: '/piano/Passacaglia 200hrs.mp4',
      type: 'video',
    },
    {
      id: 24,
      title: 'Fur Elise - 200h',
      src: '/piano/Fur Elise 200hrs.mp4',
      type: 'video',
    },
    {
      id: 25,
      title: 'Canon in D - 200h',
      src: '/piano/Canon in D 200hrs.mp4',
      type: 'video',
    },
  ],
  "July 2025": [
    {
      id: 26,
      title: 'Fantasie Impromptu (RH only)- 180h',
      src: '/piano/Fantasie impromptu.m4a',
    },
    {
      id: 27,
      title: 'Fur Elise - 179h',
      src: '/piano/Fur Elise 179hrs.m4a',
    },
    {
      id: 28,
      title: 'Canon in D - 178h',
      src: '/piano/Canon in D 178hrs.m4a',
    },
    {
      id: 29,
      title: 'Passacaglia - 173h',
      src: '/piano/Passacaglia 173hrs.m4a',
    },
    {
      id: 30,
      title: 'Canon in D - 172h',
      src: '/piano/Canon in D Roland 172hrs.m4a',
    },
  ],
  "June 2025": [
    {
      id: 31,
      title: 'Canon in D - 168h',
      src: '/piano/Canon in D chorus 168hrs.m4a',
    },
    {
      id: 32,
      title: 'Canon in D - 166h',
      src: '/piano/Canon in D chorus 166hrs.m4a',
    },
  ],
  "May 2025": [
    {
      id: 33,
      title: 'Moonlight Sonata - 155h',
      src: '/piano/Moonlight sonata 155hrs controlled pedal.m4a',
    },
    {
      id: 34,
      title: 'Moonlight Sonata - 154h',
      src: '/piano/Moonlight sonata 154hrs.m4a',
    },
  ],
}

export default function App() {
  const [openMonths, setOpenMonths] = useState({ November: true })
  return (
    <div className="app">
      <header>
        <h1>Piano Progress</h1>
      </header>

      <main>
        <p>Welcome to my portfolio and progress archive, take a look around. 🙂</p>

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
