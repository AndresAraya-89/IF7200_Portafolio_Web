import { cursoInfo } from '../../data/topics'
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
            <li>
              <a
                href="https://www.linkedin.com/in/andr%C3%A9s-araya-925769223/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-marfil-100 transition hover:text-[#0A66C2]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z" />
                </svg>
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/AndresAraya-89/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-marfil-100 transition hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
                </svg>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center sm:px-6">
          <p className="text-xs text-marfil-300">
            © {new Date().getFullYear()} Portafolio Web · {cursoInfo.estudiante} · {cursoInfo.ciclo}
          </p>
        </div>
      </div>
    </footer>
  )
}
