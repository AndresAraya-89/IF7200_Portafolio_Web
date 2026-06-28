import { useParams, Link } from 'react-router-dom'
import { topics } from '../data/topics'
import { materiales } from '../data/materiales'
import TopicLogo from '../components/ui/TopicLogo'

// Página de cada tema. Muestra el material que ya vive dentro del proyecto
// (public/materiales/<slug>/): PDFs e imágenes de fórmulas.
// A futuro se añadirá el Resumen Ejecutivo y los ejercicios paso a paso.
export default function TopicPage() {
  const { id } = useParams()
  const topic = topics.find((t) => t.id === id)

  if (!topic) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-ucr-tinta">Tema no encontrado</h1>
        <Link to="/" className="mt-6 inline-block text-ucr-azul underline">
          Volver al inicio
        </Link>
      </main>
    )
  }

  const material = materiales[id] ?? { pdfs: [], formulas: [] }

  return (
    <main className="bg-paper">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <Link to="/" className="text-sm text-ucr-azul hover:underline">
          ← Volver al inicio
        </Link>

        <header className="mt-6 flex items-center gap-5">
          <TopicLogo icon={topic.icon} color={topic.color} className="h-20 w-20" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-celeste-400">
              Tema del Portafolio
            </p>
            <h1 className="font-serif text-4xl font-bold text-ucr-tinta">{topic.nombre}</h1>
            <p className="mt-1 text-ucr-tinta/70">{topic.descripcion}</p>
          </div>
        </header>

        {/* Documentos (PDF) */}
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-ucr-tinta">Documentos</h2>
          <p className="mb-5 text-sm text-ucr-tinta/60">
            Presentaciones y ejercicios del tema (se abren en una pestaña nueva).
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {material.pdfs.map((doc) => (
              <li key={doc.archivo}>
                <a
                  href={doc.archivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-marfil-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-celeste-300 hover:shadow-card"
                >
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-xs font-bold text-white"
                    style={{ backgroundColor: topic.color }}
                  >
                    PDF
                  </span>
                  <span className="text-sm font-medium text-ucr-tinta group-hover:text-ucr-azul">
                    {doc.nombre}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Galería de fórmulas */}
        {material.formulas.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-bold text-ucr-tinta">Fórmulas</h2>
            <p className="mb-5 text-sm text-ucr-tinta/60">
              {material.formulas.length} fórmulas clave del modelo. Clic para ampliar.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {material.formulas.map((img) => (
                <a
                  key={img.archivo}
                  href={img.archivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col overflow-hidden rounded-2xl border border-marfil-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
                >
                  <span className="grid place-items-center bg-marfil-50 p-3">
                    <img
                      src={img.archivo}
                      alt={img.nombre}
                      loading="lazy"
                      className="max-h-32 w-auto object-contain"
                    />
                  </span>
                  <span className="border-t border-marfil-200 px-3 py-2 text-xs text-ucr-tinta/70">
                    {img.nombre}
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Secciones pendientes según la rúbrica */}
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-ucr-tinta">En construcción</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {[
              ['Resumen Ejecutivo', 'Síntesis analítica del tema con mis propias palabras.'],
              ['Ejercicios paso a paso', 'Formulación, método y resultados digitados.'],
            ].map(([titulo, desc]) => (
              <div
                key={titulo}
                className="rounded-2xl border border-dashed border-marfil-300 bg-white/70 p-5"
              >
                <h3 className="font-serif text-lg font-semibold text-ucr-tinta">{titulo}</h3>
                <p className="mt-2 text-sm text-ucr-tinta/60">{desc}</p>
                <span className="mt-3 inline-block rounded-full bg-marfil-200 px-3 py-1 text-xs font-medium text-ucr-tinta/70">
                  Próximamente
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
