// Definición central de los 6 temas del portafolio.
// Cada tema controla su ruta, color de marca y el icono/logo (TopicLogo lo usa).
export const topics = [
  {
    id: 'markov',
    nombre: 'Análisis de Markov',
    descripcion: 'Cadenas de Markov, matrices de transición y estados estacionarios.',
    ruta: '/markov',
    icon: 'markov',
    color: '#0067A0', // azul UCR
  },
  {
    id: 'control-estadistico',
    nombre: 'Control Estadístico',
    descripcion: 'Cartas de control, límites y capacidad de procesos.',
    ruta: '/control-estadistico',
    icon: 'control',
    color: '#00713C', // verde UCR
  },
  {
    id: 'simulacion',
    nombre: 'Modelo de Simulación',
    descripcion: 'Simulación Monte Carlo y experimentación de sistemas.',
    ruta: '/simulacion',
    icon: 'simulacion',
    color: '#4AA3DF', // celeste
  },
  {
    id: 'transporte',
    nombre: 'Modelo de Transporte',
    descripcion: 'Asignación óptima entre orígenes y destinos.',
    ruta: '/transporte',
    icon: 'transporte',
    color: '#E08A1E', // ámbar
  },
  {
    id: 'redes',
    nombre: 'Modelo de Redes',
    descripcion: 'Ruta más corta, flujo máximo y árbol de expansión.',
    ruta: '/redes',
    icon: 'redes',
    color: '#7A3FB0', // morado
  },
  {
    id: 'programacion',
    nombre: 'Programación',
    descripcion: 'Programación lineal, entera, por metas y no lineal.',
    ruta: '/programacion',
    icon: 'programacion',
    color: '#C2362F', // rojo
  },
]

// Datos institucionales reutilizables en toda la app.
export const cursoInfo = {
  universidad: 'Universidad de Costa Rica',
  sede: 'Sede de Limón',
  curso: 'IF7200 – Métodos Cuantitativos para la Toma de Decisiones',
  profesora: 'Michelle Jiménez',
  titulo: 'Portafolio Web',
  estudiante: 'C20520 – Andrés Araya Agüero',
  fecha: '28/06/2026',
  ciclo: 'Ciclo Lectivo I-2026',
  whatsapp: '+50687683425',
  whatsappDisplay: '+506 8768 3425',
  correo: 'andres.arayaaguero@ucr.ac.cr',
  fraseMotivacional:
    'No se trata de un poder ilimitado, sino de confianza y resiliencia ante las dificultades, sabiendo que Dios nos da la fuerza para perseverar y superar los desafíos de la vida.',
  carpeDiem:
    'Proyecto concebido, dirigido y editado por Michelle Jiménez C, con el soporte de Inteligencia Artificial para la generación y estructuración del contenido base a partir de directrices específicas.',
}
