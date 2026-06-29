import { M, MB } from '../ui/Math'
import Tabla from './Tabla'

// Un "paso" de la resolución, siguiendo la metodología de la presentación:
// 1) explicación en palabras  2) fórmula general  3) ejecución/sustitución  4) resultado.
export default function Paso({ paso, index, color = '#00713C' }) {
  return (
    <li className="relative pl-12">
      {/* número del paso */}
      <span
        className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {index + 1}
      </span>

      <div className="pb-6">
        {paso.titulo && (
          <h4 className="font-serif text-lg font-semibold text-ucr-tinta">{paso.titulo}</h4>
        )}

        {paso.explicacion && (
          <p className="mt-1 text-sm leading-relaxed text-ucr-tinta/80">{paso.explicacion}</p>
        )}

        {/* Fórmula general */}
        {paso.formula && (
          <div className="mt-3 rounded-xl border border-marfil-200 bg-marfil-50 px-4 py-2">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-celeste-400">
              Fórmula
            </p>
            {Array.isArray(paso.formula) ? (
              paso.formula.map((f, i) => <MB key={i}>{f}</MB>)
            ) : (
              <MB>{paso.formula}</MB>
            )}
          </div>
        )}

        {/* Ejecución / sustitución con los datos del ejercicio */}
        {paso.sustitucion && (
          <div className="mt-3 rounded-xl border border-celeste-100 bg-celeste-50/50 px-4 py-2">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-celeste-400">
              Ejecución
            </p>
            {(Array.isArray(paso.sustitucion) ? paso.sustitucion : [paso.sustitucion]).map(
              (s, i) => (
                <MB key={i}>{s}</MB>
              )
            )}
          </div>
        )}

        {/* Resultado destacado */}
        {paso.resultado && (
          <div
            className="mt-3 inline-flex max-w-full items-center gap-2 overflow-x-auto rounded-xl px-4 py-2 text-white"
            style={{ backgroundColor: color }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-wide opacity-80">
              Resultado
            </span>
            <span className="text-white [&_.katex]:text-white">
              <M>{paso.resultado}</M>
            </span>
          </div>
        )}

        {/* Tabla dentro del paso (resultados intermedios) */}
        {paso.tabla && (
          <div className="mt-3">
            <Tabla {...paso.tabla} color={color} />
          </div>
        )}

        {paso.nota && (
          <p className="mt-2 text-xs italic text-ucr-tinta/60">{paso.nota}</p>
        )}
      </div>
    </li>
  )
}
