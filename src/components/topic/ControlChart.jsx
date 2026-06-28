// Gráfico de control dibujado en SVG (sin librerías externas).
// Muestra los puntos del proceso frente a sus límites LCS / LC / LCI.
// Los puntos fuera de los límites se resaltan en rojo (causa especial).
export default function ControlChart({ grafico, color = '#0067A0' }) {
  const {
    titulo,
    etiquetaX = 'Muestra',
    etiquetaY = '',
    series = [],
    limites = {},
    decimales = 3,
    lcCorto = 'LC', // etiqueta corta de la línea central sobre el gráfico
    lcLargo = 'Línea central (LC)', // etiqueta de la leyenda
  } = grafico

  const n = series.length
  if (n === 0) return null

  const W = 760
  const H = 340
  const m = { top: 22, right: 70, bottom: 42, left: 60 }
  const iw = W - m.left - m.right
  const ih = H - m.top - m.bottom

  const { LCS, LC, LCI } = limites
  const refs = [LCS, LC, LCI].filter((v) => v != null)
  let yMin = Math.min(...series, ...refs)
  let yMax = Math.max(...series, ...refs)
  const pad = (yMax - yMin) * 0.14 || 1
  yMin -= pad
  yMax += pad

  const sx = (i) => m.left + (n === 1 ? iw / 2 : (i / (n - 1)) * iw)
  const sy = (v) => m.top + (1 - (v - yMin) / (yMax - yMin)) * ih
  const fmt = (v) => Number(v).toFixed(decimales)

  const fueraDeControl = (y) =>
    (LCS != null && y > LCS + 1e-9) || (LCI != null && y < LCI - 1e-9)

  const linea = series.map((y, i) => `${sx(i)},${sy(y)}`).join(' ')
  const ticksY = Array.from({ length: 5 }, (_, k) => yMin + (k / 4) * (yMax - yMin))
  const stepX = Math.max(1, Math.ceil(n / 15))

  const RefLine = ({ v, label, dashed, lineColor }) =>
    v == null ? null : (
      <g>
        <line
          x1={m.left}
          x2={m.left + iw}
          y1={sy(v)}
          y2={sy(v)}
          stroke={lineColor}
          strokeWidth="1.5"
          strokeDasharray={dashed ? '6 4' : '0'}
        />
        <text x={m.left + iw + 6} y={sy(v) + 3} fontSize="11" fontWeight="600" fill={lineColor}>
          {label}
        </text>
        <text x={m.left + iw + 6} y={sy(v) + 15} fontSize="9" fill="#64748b">
          {fmt(v)}
        </text>
      </g>
    )

  return (
    <figure className="overflow-hidden rounded-2xl border border-marfil-200 bg-white p-4 shadow-sm">
      {titulo && (
        <figcaption className="mb-1 text-center font-serif text-sm font-semibold text-ucr-tinta">
          {titulo}
        </figcaption>
      )}
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={titulo}>
        {/* ejes */}
        <line x1={m.left} y1={m.top} x2={m.left} y2={m.top + ih} stroke="#cbd5e1" strokeWidth="1" />
        <line
          x1={m.left}
          y1={m.top + ih}
          x2={m.left + iw}
          y2={m.top + ih}
          stroke="#cbd5e1"
          strokeWidth="1"
        />

        {/* rejilla + ticks Y */}
        {ticksY.map((t, k) => (
          <g key={k}>
            <line
              x1={m.left}
              x2={m.left + iw}
              y1={sy(t)}
              y2={sy(t)}
              stroke="#eef2f7"
              strokeWidth="1"
            />
            <text x={m.left - 8} y={sy(t) + 3} fontSize="10" textAnchor="end" fill="#64748b">
              {fmt(t)}
            </text>
          </g>
        ))}

        {/* ticks X */}
        {series.map((_, i) =>
          i % stepX === 0 || i === n - 1 ? (
            <text
              key={i}
              x={sx(i)}
              y={m.top + ih + 16}
              fontSize="10"
              textAnchor="middle"
              fill="#64748b"
            >
              {i + 1}
            </text>
          ) : null
        )}

        {/* límites de control */}
        <RefLine v={LCS} label="LCS" dashed lineColor="#dc2626" />
        <RefLine v={LC} label={lcCorto} lineColor="#16a34a" />
        <RefLine v={LCI} label="LCI" dashed lineColor="#dc2626" />

        {/* serie de datos */}
        <polyline points={linea} fill="none" stroke={color} strokeWidth="2" />
        {series.map((y, i) => {
          const fuera = fueraDeControl(y)
          return (
            <circle
              key={i}
              cx={sx(i)}
              cy={sy(y)}
              r={fuera ? 4.5 : 3.2}
              fill={fuera ? '#dc2626' : color}
              stroke="#fff"
              strokeWidth="1"
            >
              <title>{`${etiquetaX} ${i + 1}: ${fmt(y)}${fuera ? ' (fuera de control)' : ''}`}</title>
            </circle>
          )
        })}

        {/* títulos de ejes */}
        <text
          x={m.left + iw / 2}
          y={H - 6}
          fontSize="11"
          textAnchor="middle"
          fill="#475569"
          fontWeight="600"
        >
          {etiquetaX}
        </text>
        {etiquetaY && (
          <text
            x={16}
            y={m.top + ih / 2}
            fontSize="11"
            textAnchor="middle"
            fill="#475569"
            fontWeight="600"
            transform={`rotate(-90 16 ${m.top + ih / 2})`}
          >
            {etiquetaY}
          </text>
        )}
      </svg>

      {/* leyenda */}
      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-ucr-tinta/70">
        <span className="inline-flex items-center gap-1">
          <span className="h-2 w-4 rounded" style={{ backgroundColor: color }} /> Datos
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-0.5 w-4 bg-[#16a34a]" /> {lcLargo}
        </span>
        {(LCS != null || LCI != null) && (
          <>
            <span className="inline-flex items-center gap-1">
              <span className="h-0.5 w-4 border-t-2 border-dashed border-[#dc2626]" /> Límites (LCS/LCI)
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#dc2626]" /> Fuera de control
            </span>
          </>
        )}
      </div>
    </figure>
  )
}
