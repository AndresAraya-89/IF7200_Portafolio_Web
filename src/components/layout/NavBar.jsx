import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { topics } from '../../data/topics'
import UcrCrest from '../ui/UcrCrest'

// NavBar = el "Footer" descrito en los requisitos (barra superior fija):
//  - Logo de la UCR que redirige al inicio
//  - Enunciado "Portafolio"
//  - Los 6 temas: en línea en escritorio, y en menú hamburguesa en móvil.
export default function NavBar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `block rounded-full px-3 py-1.5 font-medium transition ${
      isActive
        ? 'bg-ucr-azul text-white'
        : 'text-ucr-tinta/80 hover:bg-celeste-50 hover:text-ucr-azul'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-marfil-200 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center gap-x-4 px-4 py-3 sm:px-6">
        {/* Logo UCR -> inicio */}
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="Ir al inicio"
          onClick={() => setOpen(false)}
        >
          <UcrCrest className="h-11 w-11 shrink-0" />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-base font-bold text-ucr-tinta">Portafolio</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-celeste-400">
              Web · UCR
            </span>
          </span>
        </Link>

        {/* Navegación en línea (escritorio) */}
        <ul className="ml-auto hidden flex-wrap items-center justify-end gap-1 text-sm lg:flex">
          {topics.map((t) => (
            <li key={t.id}>
              <NavLink to={t.ruta} className={linkClass}>
                {t.nombre}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Botón hamburguesa (móvil / tablet) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          className="ml-auto grid h-10 w-10 shrink-0 place-items-center rounded-lg text-ucr-tinta transition hover:bg-celeste-50 lg:hidden"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {/* Menú desplegable (móvil / tablet) */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-marfil-200 bg-white px-4 pb-3 pt-2 text-sm lg:hidden">
          {topics.map((t) => (
            <li key={t.id}>
              <NavLink to={t.ruta} onClick={() => setOpen(false)} className={linkClass}>
                {t.nombre}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
