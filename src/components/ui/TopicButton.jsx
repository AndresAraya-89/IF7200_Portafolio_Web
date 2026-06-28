import { Link } from 'react-router-dom'
import TopicLogo from './TopicLogo'

// Botón del índice vertical (fondo Marfil) que entra directo a la página del tema.
export default function TopicButton({ topic, index }) {
  return (
    <Link
      to={topic.ruta}
      className="group flex items-center gap-4 rounded-2xl border border-marfil-200 bg-marfil-100 px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-celeste-300 hover:bg-marfil-50 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-celeste-300"
    >
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: topic.color }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <TopicLogo icon={topic.icon} color={topic.color} className="h-12 w-12" />
      <span className="flex min-w-0 flex-col">
        <span className="font-serif text-lg font-semibold text-ucr-tinta">{topic.nombre}</span>
        <span className="truncate text-sm text-ucr-tinta/60">{topic.descripcion}</span>
      </span>
      <svg
        className="ml-auto h-5 w-5 shrink-0 text-ucr-tinta/30 transition group-hover:translate-x-1 group-hover:text-ucr-azul"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </Link>
  )
}
