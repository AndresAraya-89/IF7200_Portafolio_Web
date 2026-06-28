// Gráfico de región factible para problemas de programación (lineal / entera /
// por metas / no lineal), dibujado en SVG sin librerías externas.
// Dibuja los ejes, las rectas de las restricciones, la región factible sombreada
// (opcional), los vértices y resalta la solución óptima.
function niceTicks(max) {
  const raw = max / 6
  const mag = Math.pow(10, Math.floor(Math.log10(raw)))
  const norm = raw / mag
  let step
  if (norm < 1.5) step = 1
  else if (norm < 3) step = 2
  else if (norm < 7) step = 5
  else step = 10
  step *= mag
  const arr = []
  for (let v = 0; v <= max + 1e-9; v += step) arr.push(Math.round(v * 100) / 100)
  return arr
}

export default function FeasibleRegion({
  titulo,
  etiquetaX = 'x',
  etiquetaY = 'y',
  xMax,
  yMax,
  rectas = [],
  region = null,
  vertices = [],
  optimo = null,
  color = '#C2362F',
}) {
  if (!xMax || !yMax) return null

  const W = 540
  const H = 400
  const L = 48
  const R = 18
  const T = 22
  const B = 42
  const pw = W - L - R
  const ph = H - T - B

  const mx = (x) => L + (x / xMax) * pw
  const my = (y) => T + ph - (y / yMax) * ph

  const xticks = niceTicks(xMax)
  const yticks = niceTicks(yMax)
  const clipId = `clip-${Math.random().toString(36).slice(2, 8)}`

  return (
    <figure className="rounded-2xl border border-marfil-200 bg-white p-4 shadow-sm">
      {titulo && (
        <figcaption className="mb-1 text-center font-serif text-sm font-semibold text-ucr-tinta">
          {titulo}
        </figcaption>
      )}
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={titulo}>
        <defs>
          <clipPath id={clipId}>
            <rect x={L} y={T} width={pw} height={ph} />
          </clipPath>
        </defs>

        {/* cuadrícula */}
        {xticks.map((t, i) => (
          <line key={`gx${i}`} x1={mx(t)} y1={T} x2={mx(t)} y2={T + ph} stroke="#f1f5f9" strokeWidth="1" />
        ))}
        {yticks.map((t, i) => (
          <line key={`gy${i}`} x1={L} y1={my(t)} x2={L + pw} y2={my(t)} stroke="#f1f5f9" strokeWidth="1" />
        ))}

        {/* región factible */}
        {region && region.length > 2 && (
          <polygon
            points={region.map((p) => `${mx(p.x)},${my(p.y)}`).join(' ')}
            fill={color}
            fillOpacity="0.12"
            stroke={color}
            strokeOpacity="0.35"
            strokeWidth="1.5"
            clipPath={`url(#${clipId})`}
          />
        )}

        {/* rectas de restricción */}
        <g clipPath={`url(#${clipId})`}>
          {rectas.map((r, i) => (
            <line
              key={i}
              x1={mx(r.p1.x)}
              y1={my(r.p1.y)}
              x2={mx(r.p2.x)}
              y2={my(r.p2.y)}
              stroke={r.color || '#64748b'}
              strokeWidth="2"
              strokeDasharray={r.dash ? '6 4' : undefined}
            />
          ))}
        </g>

        {/* ejes */}
        <line x1={L} y1={T} x2={L} y2={T + ph} stroke="#94a3b8" strokeWidth="1.5" />
        <line x1={L} y1={T + ph} x2={L + pw} y2={T + ph} stroke="#94a3b8" strokeWidth="1.5" />

        {/* marcas y números */}
        {xticks.map((t, i) => (
          <text key={`tx${i}`} x={mx(t)} y={T + ph + 15} fontSize="10" textAnchor="middle" fill="#64748b">
            {t}
          </text>
        ))}
        {yticks.map((t, i) => (
          <text key={`ty${i}`} x={L - 6} y={my(t) + 3} fontSize="10" textAnchor="end" fill="#64748b">
            {t}
          </text>
        ))}

        {/* etiquetas de ejes */}
        <text x={L + pw / 2} y={H - 4} fontSize="11" textAnchor="middle" fill="#475569" fontWeight="600">
          {etiquetaX}
        </text>
        <text
          x={12}
          y={T + ph / 2}
          fontSize="11"
          textAnchor="middle"
          fill="#475569"
          fontWeight="600"
          transform={`rotate(-90 12 ${T + ph / 2})`}
        >
          {etiquetaY}
        </text>

        {/* vértices */}
        {vertices.map((v, i) => (
          <g key={`v${i}`}>
            <circle cx={mx(v.x)} cy={my(v.y)} r="4" fill="#fff" stroke="#475569" strokeWidth="1.5" />
            {v.label && (
              <text x={mx(v.x) + 7} y={my(v.y) - 6} fontSize="10" fill="#475569">
                {v.label}
              </text>
            )}
          </g>
        ))}

        {/* solución óptima */}
        {optimo && (
          <g>
            <circle cx={mx(optimo.x)} cy={my(optimo.y)} r="7" fill={color} stroke="#fff" strokeWidth="2.5" />
            {optimo.label && (
              <text
                x={mx(optimo.x) + 11}
                y={my(optimo.y) - 8}
                fontSize="11"
                fontWeight="700"
                fill={color}
              >
                {optimo.label}
              </text>
            )}
          </g>
        )}
      </svg>

      {/* leyenda */}
      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-ucr-tinta/70">
        {rectas.map((r, i) => (
          <span key={i} className="inline-flex items-center gap-1">
            <span className="h-0.5 w-4" style={{ backgroundColor: r.color || '#64748b' }} /> {r.label}
          </span>
        ))}
        {optimo && (
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} /> Solución óptima
          </span>
        )}
      </div>
    </figure>
  )
}
