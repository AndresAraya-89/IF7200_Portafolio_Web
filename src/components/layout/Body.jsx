import { topics, cursoInfo } from '../../data/topics'
import UcrCrest from '../ui/UcrCrest'
import TopicButton from '../ui/TopicButton'

// Body = presentación formal del curso + índice vertical (Marfil) de los 6 temas.
// (El botón flotante de WhatsApp se monta a nivel de página/Layout.)
export default function Body() {
  const datos = [
    ['Universidad', cursoInfo.universidad],
    ['Sede', cursoInfo.sede],
    ['Curso', cursoInfo.curso],
    ['Profesora', cursoInfo.profesora],
    ['Trabajo', cursoInfo.titulo],
    ['Estudiante', cursoInfo.estudiante],
    ['Fecha', cursoInfo.fecha],
    ['Ciclo lectivo', cursoInfo.ciclo],
  ]

  return (
    <main className="bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:py-16">
        {/* --- Presentación formal --- */}
        <section className="lg:col-span-3">
          <article className="overflow-hidden rounded-3xl border border-marfil-200 bg-white shadow-card">
            <div className="flex flex-col items-center gap-3 bg-gradient-to-b from-celeste-50 to-white px-8 py-10 text-center">
              <UcrCrest className="h-24 w-24" />
              <h1 className="font-serif text-3xl font-bold tracking-tight text-ucr-tinta sm:text-4xl">
                {cursoInfo.universidad}
              </h1>
              <p className="text-lg font-medium text-ucr-azul">{cursoInfo.sede}</p>
              <span className="mt-1 inline-block rounded-full bg-ucr-azul px-4 py-1 text-sm font-semibold text-white">
                {cursoInfo.titulo}
              </span>
            </div>

            <dl className="divide-y divide-marfil-200 px-8 py-6">
              {datos.map(([label, valor]) => (
                <div key={label} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-4">
                  <dt className="w-40 shrink-0 text-sm font-semibold uppercase tracking-wide text-celeste-400">
                    {label}
                  </dt>
                  <dd className="font-serif text-ucr-tinta">{valor}</dd>
                </div>
              ))}
            </dl>
          </article>
        </section>

        {/* --- Índice vertical de temas (botones Marfil) --- */}
        <section className="lg:col-span-2">
          <div className="lg:sticky lg:top-24">
            <h2 className="mb-1 font-serif text-2xl font-bold text-ucr-tinta">Índice del Portafolio</h2>
            <p className="mb-5 text-sm text-ucr-tinta/60">
              Ingresa directamente a cada uno de los seis temas del curso.
            </p>
            <nav className="flex flex-col gap-3">
              {topics.map((t, i) => (
                <TopicButton key={t.id} topic={t} index={i} />
              ))}
            </nav>
          </div>
        </section>
      </div>
    </main>
  )
}
