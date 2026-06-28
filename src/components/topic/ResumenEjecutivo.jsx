// Sección 1: Resumen Ejecutivo — síntesis analítica con palabras propias.
export default function ResumenEjecutivo({ resumen, color = '#00713C' }) {
  if (!resumen) return null
  return (
    <section id="resumen" className="scroll-mt-24">
      <h2 className="font-serif text-2xl font-bold text-ucr-tinta">Resumen Ejecutivo</h2>
      <p className="mb-5 text-sm text-ucr-tinta/60">
        Síntesis analítica de los puntos fundamentales del tema, elaborada con palabras propias.
      </p>

      <div className="rounded-2xl border border-marfil-200 bg-white p-6 shadow-sm sm:p-8">
        {resumen.intro && (
          <p className="font-serif text-lg leading-relaxed text-ucr-tinta">{resumen.intro}</p>
        )}

        {resumen.parrafos?.map((p, i) => (
          <p key={i} className="mt-4 text-sm leading-relaxed text-ucr-tinta/80">
            {p}
          </p>
        ))}

        {resumen.conceptos && resumen.conceptos.length > 0 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {resumen.conceptos.map((c) => (
              <div key={c.titulo} className="rounded-xl bg-marfil-50 p-4">
                <h3 className="font-semibold text-ucr-tinta" style={{ color }}>
                  {c.titulo}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ucr-tinta/70">{c.detalle}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
