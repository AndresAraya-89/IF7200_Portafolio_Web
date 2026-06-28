// Grafo de red dibujado en SVG (sin librerías externas).
// Dibuja nodos en posiciones fijas y aristas con su peso; resalta las aristas
// de la solución (activo: true). Útil para ruta más corta y árbol de expansión.
export default function NetworkGraph({ titulo, nodos = [], aristas = [], color = '#7A3FB0' }) {
  if (nodos.length === 0) return null
  const pos = Object.fromEntries(nodos.map((n) => [n.id, n]))
  const W = 520
  const H = 360

  return (
    <figure className="rounded-2xl border border-marfil-200 bg-white p-4 shadow-sm">
      {titulo && (
        <figcaption className="mb-1 text-center font-serif text-sm font-semibold text-ucr-tinta">
          {titulo}
        </figcaption>
      )}
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={titulo}>
        {/* aristas */}
        {aristas.map((e, i) => {
          const a = pos[e.a]
          const b = pos[e.b]
          if (!a || !b) return null
          const mx = (a.x + b.x) / 2
          const my = (a.y + b.y) / 2
          const on = e.activo
          return (
            <g key={i}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={on ? color : '#cbd5e1'}
                strokeWidth={on ? 4 : 2}
              />
              <rect
                x={mx - 10}
                y={my - 10}
                width="20"
                height="17"
                rx="4"
                fill="#fff"
                stroke={on ? color : '#e2e8f0'}
              />
              <text
                x={mx}
                y={my + 2}
                fontSize="11"
                textAnchor="middle"
                fontWeight={on ? '700' : '500'}
                fill={on ? color : '#64748b'}
              >
                {e.peso}
              </text>
            </g>
          )
        })}

        {/* nodos */}
        {nodos.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r="16"
              fill={n.tipo === 'origen' ? '#16a34a' : n.tipo === 'destino' ? '#dc2626' : color}
              stroke="#fff"
              strokeWidth="2"
            />
            <text x={n.x} y={n.y + 5} fontSize="14" fontWeight="700" textAnchor="middle" fill="#fff">
              {n.id}
            </text>
            {n.sub && (
              <text x={n.x} y={n.y + 31} fontSize="9" textAnchor="middle" fill="#64748b">
                {n.sub}
              </text>
            )}
          </g>
        ))}
      </svg>

      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-ucr-tinta/70">
        <span className="inline-flex items-center gap-1">
          <span className="h-2 w-4 rounded" style={{ backgroundColor: color }} /> Arista seleccionada
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-0.5 w-4 bg-[#cbd5e1]" /> Arista no usada
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[#16a34a]" /> Origen
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[#dc2626]" /> Destino
        </span>
      </div>
    </figure>
  )
}
