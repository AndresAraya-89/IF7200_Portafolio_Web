import NavBar from './NavBar'
import SiteFooter from './SiteFooter'
import WhatsAppFab from '../ui/WhatsAppFab'

// Estructura común de todas las páginas:
//  NavBar (arriba)  ->  contenido  ->  SiteFooter (abajo)  + WhatsApp flotante.
export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <div className="flex flex-1 flex-col">{children}</div>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  )
}
