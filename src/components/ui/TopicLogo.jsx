// Logos "significativos" de cada tema, dibujados con SVG y estilizados con Tailwind.
// Cada icono evoca el modelo matemático del tema. El color lo aporta `color`.
const icons = {
  // Markov: dos estados con flechas de transición circulares
  markov: (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <circle cx="15" cy="24" r="6" />
      <circle cx="33" cy="24" r="6" />
      <path d="M20 19c4-5 8-5 12 0" />
      <path d="M28 29c-4 5-8 5-12 0" />
      <path d="M30 18l3-1 0 3" />
      <path d="M18 30l-3 1 0-3" />
    </g>
  ),
  // Control estadístico: carta de control con límites y punto fuera
  control: (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 14h32M8 34h32" strokeDasharray="3 3" strokeOpacity="0.6" />
      <path d="M8 24h32" />
      <path d="M8 26l6-6 5 8 6-12 5 9 6-4" />
    </g>
  ),
  // Simulación: dado (Monte Carlo)
  simulacion: (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round">
      <rect x="12" y="12" width="24" height="24" rx="5" />
      <circle cx="19" cy="19" r="1.8" fill="currentColor" />
      <circle cx="29" cy="19" r="1.8" fill="currentColor" />
      <circle cx="24" cy="24" r="1.8" fill="currentColor" />
      <circle cx="19" cy="29" r="1.8" fill="currentColor" />
      <circle cx="29" cy="29" r="1.8" fill="currentColor" />
    </g>
  ),
  // Transporte: camión / flujo origen-destino
  transporte: (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 16h16v14H8z" />
      <path d="M24 21h7l5 5v4h-12z" />
      <circle cx="15" cy="32" r="3" />
      <circle cx="31" cy="32" r="3" />
    </g>
  ),
  // Redes: grafo de nodos y aristas
  redes: (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 14l12 8 12-12M12 14v20l12-12M36 10v20L24 22" strokeOpacity="0.7" />
      <circle cx="12" cy="14" r="3.2" fill="currentColor" />
      <circle cx="36" cy="10" r="3.2" fill="currentColor" />
      <circle cx="24" cy="22" r="3.2" fill="currentColor" />
      <circle cx="12" cy="34" r="3.2" fill="currentColor" />
      <circle cx="36" cy="30" r="3.2" fill="currentColor" />
    </g>
  ),
  // Programación: f(x) óptimo, función objetivo
  programacion: (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 36V12M10 36h28" />
      <path d="M12 30c8 0 6-14 14-14 5 0 7 6 10 6" />
      <circle cx="26" cy="16" r="2.6" fill="currentColor" />
    </g>
  ),
}

export default function TopicLogo({ icon, color = '#0067A0', className = 'h-12 w-12' }) {
  return (
    <span
      className={`${className} inline-grid place-items-center rounded-xl ring-1 ring-black/5`}
      style={{ color, backgroundColor: `${color}1A` }} // 1A ≈ 10% alpha
    >
      <svg viewBox="0 0 48 48" className="h-3/4 w-3/4" aria-hidden="true">
        {icons[icon] ?? icons.redes}
      </svg>
    </span>
  )
}
