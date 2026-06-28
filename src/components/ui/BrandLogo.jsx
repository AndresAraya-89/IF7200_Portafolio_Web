// Logo de marca del "Portafolio Web" construido íntegramente con Tailwind + SVG.
// Significado: el monograma "PW" sobre un nodo de red (puntos + aristas) que
// representa los métodos cuantitativos (redes, transporte, optimización).
export default function BrandLogo({ className = 'h-10 w-10', showWordmark = false }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span
        className={`${className} relative inline-grid place-items-center rounded-2xl bg-gradient-to-br from-ucr-azul to-celeste-400 text-white shadow-card ring-1 ring-white/40`}
      >
        <svg viewBox="0 0 48 48" className="h-3/5 w-3/5" fill="none" aria-hidden="true">
          {/* aristas de la red */}
          <path d="M10 34 L24 10 L38 34 M10 34 L38 34" stroke="white" strokeWidth="2" strokeOpacity="0.55" strokeLinejoin="round" />
          {/* nodos */}
          <circle cx="24" cy="10" r="3.5" fill="white" />
          <circle cx="10" cy="34" r="3.5" fill="white" />
          <circle cx="38" cy="34" r="3.5" fill="white" />
          {/* monograma */}
          <text x="24" y="29" textAnchor="middle" fontSize="13" fontWeight="700" fill="white" fontFamily="Georgia, serif">
            PW
          </text>
        </svg>
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-tight">
          <span className="font-serif text-lg font-bold tracking-tight text-ucr-tinta">
            Portafolio <span className="text-ucr-azul">Web</span>
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-celeste-400">
            IF7200 · UCR
          </span>
        </span>
      )}
    </span>
  )
}
