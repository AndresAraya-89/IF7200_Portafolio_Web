import { topics, cursoInfo } from '../../data/topics'
import { Link } from 'react-router-dom'
import UcrCrest from '../ui/UcrCrest'

// SiteFooter = el "Header" descrito en los requisitos (sección inferior),
// dividido en 3 partes + la nota "Carpe Diem" (material didáctico).
export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-ucr-tinta text-marfil-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        {/* Parte 1: Logo UCR + frase motivacional */}
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 p-1">
              <UcrCrest className="h-12 w-12" />
            </span>
            <span className="font-serif text-lg font-bold">Universidad de Costa Rica</span>
          </div>
          <p className="mt-4 text-sm italic leading-relaxed text-marfil-200">
            “{cursoInfo.fraseMotivacional}”
          </p>
        </div>

        {/* Parte 2: Identidad del portafolio */}
        <div className="md:px-6">
          <h3 className="font-serif text-lg font-bold text-celeste-200">Portafolio Web</h3>
          <ul className="mt-4 space-y-2 text-sm text-marfil-200">
            <li>Universidad de Costa Rica</li>
            <li>{cursoInfo.curso}</li>
            <li>
              Autor: <span className="font-semibold text-white">Andrés Araya Agüero</span>
            </li>
          </ul>
          <ul className="mt-5 flex flex-wrap gap-2">
            {topics.map((t) => (
              <li key={t.id}>
                <Link
                  to={t.ruta}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-marfil-100 transition hover:bg-white/20"
                >
                  {t.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Parte 3: Contacto */}
        <div>
          <h3 className="font-serif text-lg font-bold text-celeste-200">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`https://wa.me/${cursoInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-marfil-100 transition hover:text-[#25D366]"
              >
                <svg viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.7.9 3.7 1.4 5.8 1.4C24.6 28.8 30 23.4 30 16.8S22.6 3 16 3z" />
                </svg>
                WhatsApp: {cursoInfo.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${cursoInfo.correo}`}
                className="inline-flex items-center gap-2 text-marfil-100 transition hover:text-celeste-200"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                {cursoInfo.correo}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Carpe Diem / copyright (material didáctico) */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center sm:px-6">
          <p className="font-serif text-sm font-semibold tracking-wide text-celeste-200">Carpe Diem</p>
          <p className="mx-auto mt-2 max-w-3xl text-xs leading-relaxed text-marfil-200">
            “{cursoInfo.carpeDiem}”
          </p>
          <p className="mt-4 text-xs text-marfil-300">
            © {new Date().getFullYear()} Portafolio Web · {cursoInfo.estudiante} · {cursoInfo.ciclo}
          </p>
        </div>
      </div>
    </footer>
  )
}
