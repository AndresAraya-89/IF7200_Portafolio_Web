// Tabla de datos reutilizable (datos iniciales del enunciado, resultados, etc.).
// Props:
//   titulo      -> encabezado opcional
//   columnas    -> array de cabeceras
//   filas       -> array de arrays (celdas)
//   decimales   -> número (todas las columnas) o array por columna; aplica a celdas numéricas
//   dividir     -> 1 (default) o 2: parte las filas en bloques lado a lado en pantallas grandes
//   nota        -> texto al pie opcional
export default function Tabla({ titulo, columnas, filas, decimales, dividir = 1, nota, color = '#00713C' }) {
  if (!filas || filas.length === 0) return null

  const dec = (col) => (Array.isArray(decimales) ? decimales[col] : decimales)
  const fmt = (v, col) => {
    const d = dec(col)
    return typeof v === 'number' && d != null ? v.toFixed(d) : String(v)
  }

  // Partir en `dividir` bloques (para tablas largas tipo "datos simulados").
  const porBloque = Math.ceil(filas.length / dividir)
  const bloques = []
  for (let i = 0; i < filas.length; i += porBloque) bloques.push(filas.slice(i, i + porBloque))

  const Bloque = ({ rows }) => (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr style={{ backgroundColor: color }} className="text-white">
          {columnas.map((c, i) => (
            <th key={i} className="px-3 py-2 text-left font-semibold first:rounded-tl-lg last:rounded-tr-lg">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((fila, r) => (
          <tr key={r} className="odd:bg-white even:bg-marfil-50">
            {fila.map((celda, c) => (
              <td
                key={c}
                className={`border-b border-marfil-100 px-3 py-1.5 ${
                  c === 0 ? 'font-medium text-ucr-tinta' : 'tabular-nums text-ucr-tinta/80'
                }`}
              >
                {fmt(celda, c)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <figure className="rounded-2xl border border-marfil-200 bg-white p-4 shadow-sm">
      {titulo && (
        <figcaption className="mb-3 font-serif text-sm font-semibold text-ucr-tinta">
          {titulo}
        </figcaption>
      )}
      <div className={`grid gap-x-6 gap-y-3 ${dividir === 2 ? 'sm:grid-cols-2' : ''}`}>
        {bloques.map((rows, i) => (
          <div key={i} className="overflow-x-auto">
            <Bloque rows={rows} />
          </div>
        ))}
      </div>
      {nota && <p className="mt-3 text-xs italic text-ucr-tinta/60">{nota}</p>}
    </figure>
  )
}
