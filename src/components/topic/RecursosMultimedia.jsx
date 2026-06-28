// Sección 3: Recursos Multimedia e Interactivos.
// Soporta videos de YouTube y enlaces a documentos (Excel QM en Google Drive).
// Mientras no haya recursos, muestra un estado "pendiente".
export default function RecursosMultimedia({ recursos, color = '#00713C' }) {
  const videos = recursos?.videos ?? []
  const documentos = recursos?.documentos ?? []
  const hayRecursos = videos.length > 0 || documentos.length > 0

  return (
    <section id="recursos" className="scroll-mt-24">
      <h2 className="font-serif text-2xl font-bold text-ucr-tinta">Recursos Multimedia</h2>
      <p className="mb-5 text-sm text-ucr-tinta/60">
        Videos tutoriales y documentos de la solución en Excel QM.
      </p>

      {!hayRecursos && (
        <div className="rounded-2xl border border-dashed border-marfil-300 bg-white/70 p-8 text-center">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-marfil-100">
            <svg className="h-6 w-6 text-ucr-tinta/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 7l-7 5 7 5V7z" />
              <rect x="1" y="5" width="15" height="14" rx="2" />
            </svg>
          </div>
          <p className="font-semibold text-ucr-tinta">Recursos en preparación</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-ucr-tinta/60">
            Próximamente: videos tutoriales en YouTube de la resolución en Excel QM y enlaces de
            descarga de los documentos alojados en Google Drive.
          </p>
        </div>
      )}

      {videos.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          {videos.map((v) => (
            <div key={v.url} className="overflow-hidden rounded-2xl border border-marfil-200 bg-white shadow-sm">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={v.url}
                  title={v.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="px-4 py-3 text-sm font-medium text-ucr-tinta">{v.titulo}</p>
            </div>
          ))}
        </div>
      )}

      {documentos.length > 0 && (
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {documentos.map((d) => (
            <li key={d.url}>
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-marfil-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-xs font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  XLS
                </span>
                <span className="text-sm font-medium text-ucr-tinta group-hover:text-ucr-azul">
                  {d.titulo}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
