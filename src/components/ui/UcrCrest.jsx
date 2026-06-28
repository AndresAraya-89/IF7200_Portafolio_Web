// Escudo oficial de la UCR (imagen). Tamaño configurable por className.
export default function UcrCrest({ className = 'h-12 w-12' }) {
  return (
    <img
      src="/logo_UCR.png"
      alt="Escudo de la Universidad de Costa Rica"
      className={`${className} object-contain select-none`}
      draggable="false"
    />
  )
}
