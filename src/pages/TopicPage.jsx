import { useParams, Link } from 'react-router-dom'
import { topics } from '../data/topics'
import { materiales } from '../data/materiales'
import { getContenido } from '../data/content'
import TopicLogo from '../components/ui/TopicLogo'
import ResumenEjecutivo from '../components/topic/ResumenEjecutivo'
import Ejercicios from '../components/topic/Ejercicios'
import Formulas from '../components/topic/Formulas'
import RecursosMultimedia from '../components/topic/RecursosMultimedia'

// Página de cada tema, dividida en los 3 componentes de la rúbrica:
//   1) Resumen Ejecutivo  2) Ejercicios paso a paso  3) Recursos Multimedia.
// Más, como apoyo, el material original (PDFs e imágenes de fórmulas).
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

  const contenido = getContenido(id)
  const material = materiales[id] ?? { pdfs: [], formulas: [] }
  const color = topic.color

  // En "Material original" solo se muestran el enunciado de ejercicios (sin
  // resolver) y la presentación del grupo: se excluyen los PDFs de solución.
  const esSolucion = (nombre) => /resuel|soluci/i.test(nombre)
  const materialOriginal = material.pdfs.filter((d) => !esSolucion(d.nombre))

  const secciones = [
    contenido?.resumen && { href: '#resumen', label: 'Resumen' },
    contenido?.ejercicios?.length && { href: '#ejercicios', label: 'Ejercicios' },
    contenido?.formulas?.length && { href: '#formulas', label: 'Fórmulas' },
    { href: '#recursos', label: 'Recursos' },
    { href: '#material', label: 'Material original' },
  ].filter(Boolean)

  return (
    <main className="bg-paper">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Link to="/" className="text-sm text-ucr-azul hover:underline">
          ← Volver al inicio
        </Link>

        {/* Encabezado del tema */}
        <header className="mt-6 flex items-center gap-5">
          <TopicLogo icon={topic.icon} color={color} className="h-20 w-20" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-celeste-400">
              Tema del Portafolio
            </p>
            <h1 className="font-serif text-4xl font-bold text-ucr-tinta">{topic.nombre}</h1>
            <p className="mt-1 text-ucr-tinta/70">{topic.descripcion}</p>
          </div>
        </header>

        {/* Sub-navegación de secciones */}
        <nav className="sticky top-[60px] z-20 mt-8 -mx-2 flex flex-wrap gap-1 rounded-2xl border border-marfil-200 bg-white/85 px-2 py-2 backdrop-blur">
          {secciones.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-ucr-tinta/70 transition hover:bg-celeste-50 hover:text-ucr-azul"
            >
              {s.label}
            </a>
          ))}
        </nav>

        {/* Aviso cuando el tema aún no tiene contenido desarrollado */}
        {!contenido && (
          <div className="mt-8 rounded-2xl border border-dashed border-marfil-300 bg-white/70 p-6">
            <p className="font-semibold text-ucr-tinta">Contenido en desarrollo</p>
            <p className="mt-1 text-sm text-ucr-tinta/60">
              El Resumen Ejecutivo y los ejercicios paso a paso de este tema se publicarán
              próximamente. Mientras tanto, puedes consultar el material original más abajo.
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-14">
          {contenido?.resumen && <ResumenEjecutivo resumen={contenido.resumen} color={color} />}
          {contenido?.ejercicios?.length > 0 && (
            <Ejercicios ejercicios={contenido.ejercicios} color={color} />
          )}
          {contenido?.formulas?.length > 0 && (
            <Formulas formulas={contenido.formulas} color={color} />
          )}
          <RecursosMultimedia recursos={contenido?.recursos} color={color} />

          {/* Material original: enunciado de ejercicios (sin solución) y
              presentación del grupo. No es de autoría del estudiante. */}
          <section id="material" className="scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-ucr-tinta">Material original</h2>
            <p className="mb-4 text-sm text-ucr-tinta/60">
              Enunciado de los ejercicios a realizar y presentación del tema.
            </p>

            {/* Aviso de pertenencia del material */}
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-celeste-200 bg-celeste-50/60 p-4">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-ucr-azul"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <p className="text-sm leading-relaxed text-ucr-tinta/80">
                <span className="font-semibold text-ucr-tinta">Este material no es de mi autoría.</span>{' '}
                Pertenece al curso IF7200 y a los compañeros encargados de desarrollar el tema
                «{topic.nombre}». Se incluye únicamente como referencia; los resúmenes y las
                resoluciones paso a paso de este portafolio sí son de elaboración propia.
              </p>
            </div>

            {materialOriginal.length > 0 ? (
              <ul className="grid gap-3 sm:grid-cols-2">
                {materialOriginal.map((doc) => (
                  <li key={doc.archivo}>
                    <a
                      href={doc.archivo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-2xl border border-marfil-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
                    >
                      <span
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-xs font-bold text-white"
                        style={{ backgroundColor: color }}
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
            ) : (
              <p className="text-sm text-ucr-tinta/60">
                El material original de este tema se agregará próximamente.
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
