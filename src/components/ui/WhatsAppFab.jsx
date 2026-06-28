import { cursoInfo } from '../../data/topics'

// Botón flotante (FAB) de WhatsApp en la esquina inferior derecha.
export default function WhatsAppFab() {
  const numero = cursoInfo.whatsapp.replace(/[^0-9]/g, '')
  const mensaje = encodeURIComponent(
    'Hola Andrés, vi tu Portafolio Web del curso IF7200 y quiero conversar.'
  )
  const href = `https://wa.me/${numero}?text=${mensaje}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribir por WhatsApp al ${cursoInfo.whatsappDisplay}`}
      title={`WhatsApp: ${cursoInfo.whatsappDisplay}`}
      className="group fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card ring-4 ring-white/70 transition hover:scale-105 hover:bg-[#1ebe5d] focus:outline-none focus:ring-celeste-300"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30 group-hover:opacity-0" />
      <svg viewBox="0 0 32 32" className="relative h-8 w-8" fill="currentColor" aria-hidden="true">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.7.9 3.7 1.4 5.8 1.4h.1c6.6 0 11.9-5.4 11.9-12S22.6 3 16 3zm0 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-4.9 1 1-4.8-.3-.4A9.8 9.8 0 016 15c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 9.8-10 9.8zm5.5-7.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.8 0 1.7 1.2 3.3 1.4 3.5.2.2 2.4 3.7 5.8 5.1 2.2.9 3 1 4.1.9.7-.1 1.8-.7 2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z" />
      </svg>
    </a>
  )
}
