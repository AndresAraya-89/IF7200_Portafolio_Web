import Ejercicio from './Ejercicio'

// Sección 2: Ejercicios de tarea resueltos paso a paso.
export default function Ejercicios({ ejercicios, color = '#00713C' }) {
  if (!ejercicios || ejercicios.length === 0) return null
  return (
    <section id="ejercicios" className="scroll-mt-24">
      <h2 className="font-serif text-2xl font-bold text-ucr-tinta">
        Ejercicios resueltos paso a paso
      </h2>
      <p className="mb-5 text-sm text-ucr-tinta/60">
        Cada resolución muestra la formulación matemática, el método y la interpretación de los
        resultados. Toca un ejercicio para desplegarlo.
      </p>
      <div className="flex flex-col gap-4">
        {ejercicios.map((ej, i) => (
          <Ejercicio key={ej.id ?? i} ejercicio={ej} numero={i + 1} color={color} />
        ))}
      </div>
    </section>
  )
}
