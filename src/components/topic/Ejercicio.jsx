import { useState } from 'react'
import Paso from './Paso'
import ControlChart from './ControlChart'
import NetworkGraph from './NetworkGraph'
import FeasibleRegion from './FeasibleRegion'
import Tabla from './Tabla'

// Un ejercicio completo: enunciado, datos, pasos y la interpretación final.
// Es plegable para no saturar la página.
export default function Ejercicio({ ejercicio, numero, color = '#00713C' }) {
  const [abierto, setAbierto] = useState(numero === 1)

  return (
    <article className="overflow-hidden rounded-2xl border border-marfil-200 bg-white shadow-sm">
      {/* Encabezado plegable */}
      <button
        onClick={() => setAbierto((v) => !v)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-marfil-50"
      >
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-sm font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {numero}
        </span>
        <span className="flex-1">
          <span className="block font-serif text-lg font-semibold text-ucr-tinta">
            {ejercicio.titulo}
          </span>
          {ejercicio.etiqueta && (
            <span className="text-xs font-medium uppercase tracking-wide text-celeste-400">
              {ejercicio.etiqueta}
            </span>
          )}
        </span>
        <svg
          className={`h-5 w-5 shrink-0 text-ucr-tinta/40 transition ${abierto ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {abierto && (
        <div className="border-t border-marfil-200 px-5 py-5 sm:px-8">
          {/* Enunciado */}
          {ejercicio.enunciado && (
            <div className="rounded-xl bg-marfil-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-celeste-400">
                Enunciado
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ucr-tinta/80">
                {ejercicio.enunciado}
              </p>
            </div>
          )}

          {/* Datos iniciales */}
          {ejercicio.datos && ejercicio.datos.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {ejercicio.datos.map((d) => (
                <span
                  key={d.label}
                  className="inline-flex items-baseline gap-1.5 rounded-lg border border-marfil-200 bg-white px-3 py-1.5 text-sm"
                >
                  <span className="font-medium text-ucr-tinta/60">{d.label}:</span>
                  <span className="font-semibold text-ucr-tinta">{d.valor}</span>
                </span>
              ))}
            </div>
          )}

          {/* Tablas de datos iniciales del enunciado */}
          {ejercicio.tablas?.length > 0 && (
            <div className="mt-4 flex flex-col gap-4">
              {ejercicio.tablas.map((t, i) => (
                <Tabla key={i} {...t} color={color} />
              ))}
            </div>
          )}

          {/* Pasos */}
          <ol className="mt-6 border-l-2 border-marfil-200">
            {ejercicio.pasos.map((paso, i) => (
              <Paso key={i} paso={paso} index={i} color={color} />
            ))}
          </ol>

          {/* Gráficos del proceso */}
          {ejercicio.graficos?.length > 0 && (
            <div className="mt-8">
              <h3 className="font-serif text-lg font-semibold text-ucr-tinta">
                Gráficos del proceso
              </h3>
              <p className="mb-4 mt-1 text-sm text-ucr-tinta/60">
                Visualización de los datos del proceso frente a sus límites de control.
              </p>
              <div className="grid gap-6 lg:grid-cols-2">
                {ejercicio.graficos.map((g, i) =>
                  g.tipo === 'red' ? (
                    <div key={i} className="lg:col-span-2">
                      <NetworkGraph {...g} color={color} />
                    </div>
                  ) : g.tipo === 'region' ? (
                    <div key={i} className="lg:col-span-2">
                      <FeasibleRegion {...g} color={color} />
                    </div>
                  ) : (
                    <ControlChart key={i} grafico={g} color={color} />
                  )
                )}
              </div>
            </div>
          )}

          {/* Interpretación final */}
          {ejercicio.interpretacion && (
            <div className="mt-4 rounded-xl border-l-4 p-4" style={{ borderColor: color, backgroundColor: `${color}0D` }}>
              <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color }}>
                Interpretación de los resultados
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ucr-tinta/80">
                {ejercicio.interpretacion}
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  )
}
