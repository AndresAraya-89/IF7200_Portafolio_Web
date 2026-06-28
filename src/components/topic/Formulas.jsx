import { M } from '../ui/Math'

// Sección "Fórmulas": tabla de referencia con el nombre de la fórmula,
// la fórmula digitada (KaTeX) y la descripción de para qué se usa.
// Si las fórmulas traen `categoria`, se agrupan con subencabezados.
export default function Formulas({ formulas, color = '#00713C' }) {
  if (!formulas || formulas.length === 0) return null

  // Agrupar por categoría conservando el orden de aparición.
  const grupos = []
  for (const f of formulas) {
    const cat = f.categoria ?? ''
    let g = grupos.find((x) => x.cat === cat)
    if (!g) {
      g = { cat, items: [] }
      grupos.push(g)
    }
    g.items.push(f)
  }

  return (
    <section id="formulas" className="scroll-mt-24">
      <h2 className="font-serif text-2xl font-bold text-ucr-tinta">Fórmulas</h2>
      <p className="mb-5 text-sm text-ucr-tinta/60">
        Tabla de referencia con el nombre de cada fórmula, su expresión y para qué se utiliza.
      </p>

      <div className="overflow-x-auto rounded-2xl border border-marfil-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-marfil-200 text-[11px] uppercase tracking-wide text-celeste-400">
              <th className="px-4 py-3 font-semibold">Nombre</th>
              <th className="px-4 py-3 font-semibold">Fórmula</th>
              <th className="px-4 py-3 font-semibold">¿Para qué se usa?</th>
            </tr>
          </thead>
          <tbody>
            {grupos.map((g) => (
              <Grupo key={g.cat || 'sin-categoria'} grupo={g} color={color} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Grupo({ grupo, color }) {
  return (
    <>
      {grupo.cat && (
        <tr>
          <th
            colSpan={3}
            className="bg-marfil-50 px-4 py-2 text-left text-xs font-bold uppercase tracking-wide"
            style={{ color }}
          >
            {grupo.cat}
          </th>
        </tr>
      )}
      {grupo.items.map((f) => (
        <tr key={f.nombre} className="border-b border-marfil-100 align-middle last:border-0">
          <td className="px-4 py-3 align-middle">
            <span className="font-semibold text-ucr-tinta">{f.nombre}</span>
            {f.simbolo && (
              <span className="ml-1 text-ucr-tinta/50">
                (<M>{f.simbolo}</M>)
              </span>
            )}
          </td>
          <td className="px-4 py-3 align-middle">
            <M>{`\\displaystyle ${f.formula}`}</M>
          </td>
          <td className="px-4 py-3 align-middle text-sm leading-relaxed text-ucr-tinta/75">
            {f.descripcion}
          </td>
        </tr>
      ))}
    </>
  )
}
