import { Link, NavLink } from 'react-router-dom'
import { topics } from '../../data/topics'
import UcrCrest from '../ui/UcrCrest'

// NavBar = el "Footer" descrito en los requisitos (barra superior fija):
//  - Logo de la UCR que redirige al inicio
//  - Enunciado "Portafolio"
//  - Los 6 temas que abren su respectiva página
export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-marfil-200 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
        {/* Logo UCR -> inicio */}
        <Link to="/" className="flex items-center gap-3" aria-label="Ir al inicio">
          <UcrCrest className="h-11 w-11" />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-base font-bold text-ucr-tinta">Portafolio</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-celeste-400">
              Web · UCR
            </span>
          </span>
        </Link>

        {/* Navegación de los 6 temas */}
        <ul className="ml-auto flex flex-wrap items-center gap-1 text-sm">
          {topics.map((t) => (
            <li key={t.id}>
              <NavLink
                to={t.ruta}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 font-medium transition ${
                    isActive
                      ? 'bg-ucr-azul text-white'
                      : 'text-ucr-tinta/80 hover:bg-celeste-50 hover:text-ucr-azul'
                  }`
                }
              >
                {t.nombre}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
