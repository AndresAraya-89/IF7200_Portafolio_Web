// Contenido del tema "Modelo de Redes".
// Sigue estructuraPaginas_Temas.md (incluye la regla: mostrar TODA la aritmética).
// Fórmulas en KaTeX (escapar \\). Los grafos usan el componente NetworkGraph (tipo: 'red').

// Nodos del problema (posiciones fijas para el grafo).
const nodos = [
  { id: 'A', x: 55, y: 185, tipo: 'origen', sub: 'Pto. Limón' },
  { id: 'B', x: 180, y: 70 },
  { id: 'E', x: 430, y: 70 },
  { id: 'C', x: 280, y: 185 },
  { id: 'F', x: 470, y: 195, tipo: 'destino', sub: 'San José' },
  { id: 'D', x: 190, y: 305 },
]

// Construye la lista de aristas marcando como activas las de un conjunto dado.
const arcos = [
  ['A', 'B', 7], ['A', 'C', 5], ['A', 'D', 6], ['B', 'C', 2], ['B', 'E', 4],
  ['C', 'E', 6], ['C', 'F', 4], ['D', 'C', 3], ['D', 'F', 8], ['E', 'F', 3],
]
const construirAristas = (activas) =>
  arcos.map(([a, b, peso]) => ({
    a,
    b,
    peso,
    activo: activas.includes(`${a}-${b}`) || activas.includes(`${b}-${a}`),
  }))

export const redes = {
  resumen: {
    intro:
      'El modelo de redes representa un sistema como un grafo G = (N, A) formado por nodos (puntos) y arcos (conexiones con un valor cᵢⱼ: distancia, costo, tiempo o capacidad), para resolver de forma eficiente problemas de conexión, recorrido y transporte.',
    parrafos: [
      'Reúne tres técnicas fundamentales y complementarias. El Árbol de Expansión Mínima conecta todos los nodos con el menor costo total posible, sin formar ciclos ni enlaces redundantes; se construye con el algoritmo de Kruskal, agregando las aristas más baratas que no cierren un ciclo hasta unir toda la red.',
      'La Ruta Más Corta encuentra el camino más eficiente entre un origen y un destino. El algoritmo de Dijkstra trabaja con etiquetas: parte del origen con distancia 0, calcula etiquetas temporales (distancia acumulada + arco), fija como permanente la de menor valor y repite hasta etiquetar el destino, rastreando luego la ruta hacia atrás.',
      'El Flujo Máximo determina la mayor cantidad de recursos que pueden moverse desde una fuente hasta un sumidero respetando la capacidad de cada arco; sirve para identificar los cuellos de botella que limitan el sistema.',
      'En términos de programación lineal, se usan variables binarias xᵢⱼ (1 si el arco se usa, 0 si no) y restricciones de balance de flujo en los nodos. Sus aplicaciones van desde el tendido de fibra óptica y los GPS hasta la optimización de rutas de carga en la provincia de Limón.',
    ],
    conceptos: [
      {
        titulo: 'Red G = (N, A)',
        detalle: 'Nodos (puntos) y arcos (conexiones con un valor cᵢⱼ: distancia, costo, tiempo o capacidad).',
      },
      {
        titulo: 'Árbol de expansión mínima',
        detalle: 'Conecta todos los nodos al menor costo, sin ciclos. Kruskal agrega las aristas más baratas posibles.',
      },
      {
        titulo: 'Ruta más corta (Dijkstra)',
        detalle: 'Camino más eficiente entre origen y destino usando etiquetas permanentes y temporales.',
      },
      {
        titulo: 'Flujo máximo',
        detalle: 'Máximo de recursos entre fuente y sumidero según las capacidades; revela cuellos de botella.',
      },
    ],
  },

  ejercicios: [
    // ============================================================
    // Ejercicio 1: Ruta más corta (Dijkstra)
    // ============================================================
    {
      id: 'ruta-mas-corta',
      titulo: 'Ruta más corta del Puerto de Limón (A) a San José (F)',
      etiqueta: 'Algoritmo de Dijkstra',
      enunciado:
        'Una empresa de transporte debe enviar mercancía desde el Puerto de Limón (A) hasta el Centro de Distribución en San José (F). Los números son las distancias en kilómetros entre cada punto (conexiones bidireccionales). Indique la ruta más corta y la distancia total.',
      datos: [
        { label: 'Origen', valor: 'A (Pto. Limón)' },
        { label: 'Destino', valor: 'F (San José)' },
        { label: 'Nodos', valor: '6' },
      ],
      tablas: [
        {
          titulo: 'Conexiones y distancias (km)',
          columnas: ['Conexión', 'Distancia (km)'],
          decimales: [undefined, 0],
          dividir: 2,
          filas: [
            ['A – B', 7], ['A – C', 5], ['A – D', 6], ['B – C', 2], ['B – E', 4],
            ['C – E', 6], ['C – F', 4], ['D – C', 3], ['D – F', 8], ['E – F', 3],
          ],
        },
      ],
      pasos: [
        {
          titulo: 'Paso 1: Formulación del modelo',
          explicacion:
            'Se define la variable binaria xᵢⱼ = 1 si el arco i→j se usa en la ruta, 0 si no. Se minimiza la distancia total sujeta al balance de flujo (sale 1 unidad del origen, llega 1 al destino).',
          formula: 'Z = \\sum_{(i,j)\\in A} c_{ij}\\,x_{ij}, \\quad x_{ij} \\in \\{0,1\\}',
        },
        {
          titulo: 'Paso 2: Inicio en el origen A',
          explicacion: 'Desde A (distancia 0) se evalúan las tres salidas posibles y se fija como permanente la menor.',
          sustitucion: ['A \\to B = 7, \\quad A \\to C = 5, \\quad A \\to D = 6'],
          nota: 'La menor es A → C (5). Se fija C como permanente con distancia acumulada 5.',
        },
        {
          titulo: 'Paso 3: Evaluación desde C (acumulado 5)',
          explicacion: 'Se suman 5 km a cada arco que sale de C para obtener las etiquetas temporales.',
          sustitucion: [
            '5 + 2 = 7 \\;(B), \\quad 5 + 3 = 8 \\;(D)',
            '5 + 6 = 11 \\;(E), \\quad 5 + 4 = 9 \\;(F)',
          ],
          nota: 'Aparece una ruta al destino F con 9 km (A → C → F).',
        },
        {
          titulo: 'Paso 4: Comprobación de rutas alternas',
          explicacion: 'Se verifica que ningún otro camino mejore los 9 km.',
          sustitucion: [
            'A \\to D \\to F: 6 + 8 = 14',
            'A \\to B \\to E \\to F: 7 + 4 + 3 = 14',
          ],
          nota: 'Ambas alternativas (14 km) son peores que A → C → F (9 km).',
        },
        {
          titulo: 'Paso 5: Etiquetas permanentes',
          explicacion: 'Distancia mínima desde A hasta cada nodo y el nodo previo que la origina.',
          tabla: {
            columnas: ['Nodo', 'Distancia mín. (km)', 'Nodo anterior'],
            decimales: [undefined, 0, undefined],
            filas: [
              ['A', 0, '—'],
              ['C', 5, 'A'],
              ['D', 6, 'C'],
              ['B', 7, 'A'],
              ['F', 9, 'C'],
              ['E', 11, 'C'],
            ],
          },
          resultado: '\\text{Ruta } A \\to C \\to F = 9 \\text{ km}',
        },
      ],
      graficos: [
        {
          tipo: 'red',
          titulo: 'Ruta más corta A → C → F (9 km)',
          nodos,
          aristas: construirAristas(['A-C', 'C-F']),
        },
      ],
      interpretacion:
        'La ruta más corta del Puerto de Limón (A) al Centro de Distribución en San José (F) es A → C → F, con una distancia total de 9 km, muy por debajo de las alternativas de 14 km. Para la empresa esto significa fijar una ruta de despacho con menor tiempo, combustible y costo, y conocer de antemano la segunda mejor opción ante cierres de la vía principal.',
    },

    // ============================================================
    // Ejercicio 2: Árbol de expansión mínima (Kruskal)
    // ============================================================
    {
      id: 'arbol-expansion-minima',
      titulo: 'Árbol de expansión mínima de la red',
      etiqueta: 'Algoritmo de Kruskal',
      enunciado:
        'Con la misma red, conecte todos los puntos (A, B, C, D, E, F) usando la menor cantidad de kilómetros de cable/carretera posible, sin formar ciclos. Indique las conexiones construidas y la distancia total.',
      datos: [
        { label: 'Nodos', valor: '6' },
        { label: 'Aristas del árbol', valor: 'n − 1 = 5' },
      ],
      tablas: [
        {
          titulo: 'Conexiones y distancias (km)',
          columnas: ['Conexión', 'Distancia (km)'],
          decimales: [undefined, 0],
          dividir: 2,
          filas: [
            ['A – B', 7], ['A – C', 5], ['A – D', 6], ['B – C', 2], ['B – E', 4],
            ['C – E', 6], ['C – F', 4], ['D – C', 3], ['D – F', 8], ['E – F', 3],
          ],
        },
      ],
      pasos: [
        {
          titulo: 'Paso 1: Objetivo y condición del árbol',
          explicacion:
            'Se eligen aristas de menor costo que conecten todos los nodos sin formar ciclos. Un árbol de expansión de n nodos tiene exactamente n − 1 aristas.',
          formula: '\\text{aristas del árbol} = n - 1 = 6 - 1 = 5',
        },
        {
          titulo: 'Paso 2: Arista más corta de toda la red',
          explicacion: 'Se ordenan las conexiones por distancia y se toma la menor.',
          sustitucion: ['B - C = 2'],
          nota: 'Se construye B–C. Acumulado: 2 km.',
        },
        {
          titulo: 'Paso 3: Siguientes aristas más cortas (empate en 3)',
          explicacion: 'Las dos siguientes valen 3 km (C–D y E–F) y ninguna forma ciclo, así que se construyen ambas.',
          sustitucion: ['2 + 3 + 3 = 8'],
          nota: 'Grupos conectados: {B, C, D} por un lado y {E, F} por otro. Acumulado: 8 km.',
        },
        {
          titulo: 'Paso 4: Unir los dos grupos',
          explicacion:
            'Las opciones de 4 km son B–E y C–F. Se elige C–F, que une {B, C, D} con {E, F}. B–E formaría el ciclo B–C–F–E, así que se descarta.',
          sustitucion: ['8 + 4 = 12'],
          nota: 'Acumulado: 12 km. Quedan conectados B, C, D, E y F.',
        },
        {
          titulo: 'Paso 5: Conectar el origen A',
          explicacion: 'Falta incluir A. Sus opciones son A–C (5), A–D (6) y A–B (7); se elige la menor.',
          sustitucion: ['12 + 5 = 17'],
          nota: 'Se construye A–C. Acumulado: 17 km.',
        },
        {
          titulo: 'Paso 6: Verificación y costo total',
          explicacion: 'Se confirma: 5 aristas, todos los nodos conectados y sin ciclos.',
          formula: 'Z = \\sum c_{ij}',
          sustitucion: ['Z = 2 + 3 + 3 + 4 + 5 = 17'],
          resultado: 'Z = 17 \\text{ km}',
          tabla: {
            titulo: 'Aristas del árbol de expansión mínima',
            columnas: ['Arista', 'Distancia (km)'],
            decimales: [undefined, 0],
            filas: [
              ['B – C', 2],
              ['C – D', 3],
              ['E – F', 3],
              ['C – F', 4],
              ['A – C', 5],
              ['Total', 17],
            ],
          },
        },
      ],
      graficos: [
        {
          tipo: 'red',
          titulo: 'Árbol de expansión mínima (17 km)',
          nodos,
          aristas: construirAristas(['B-C', 'C-D', 'E-F', 'C-F', 'A-C']),
        },
      ],
      interpretacion:
        'El árbol de expansión mínima conecta los seis puntos con las aristas B–C, C–D, E–F, C–F y A–C, para un total de 17 km. Es la forma más económica de enlazar toda la red (por ejemplo, tender cable o habilitar rutas de mantenimiento) sin construir tramos redundantes ni ciclos.',
    },
  ],

  formulas: [
    {
      categoria: 'Formulación del modelo',
      nombre: 'Definición de red',
      formula: 'G = (N, A)',
      descripcion: 'La red es un grafo de nodos (N) y arcos (A); cada arco tiene un valor cᵢⱼ.',
    },
    {
      categoria: 'Formulación del modelo',
      nombre: 'Variable de decisión',
      simbolo: 'x_{ij}',
      formula: 'x_{ij} \\in \\{0, 1\\}',
      descripcion: 'Vale 1 si el arco i→j se selecciona en la solución y 0 en caso contrario.',
    },
    {
      categoria: 'Formulación del modelo',
      nombre: 'Balance de flujo',
      formula: '\\sum_{j} x_{ij} - \\sum_{k} x_{ki} = b_i',
      descripcion: 'bᵢ = +1 en el origen, 0 en nodos intermedios y −1 en el destino (conservación de flujo).',
    },
    {
      categoria: 'Ruta más corta (Dijkstra)',
      nombre: 'Función objetivo',
      simbolo: 'Z',
      formula: 'Z = \\sum_{(i,j)\\in A} c_{ij}\\,x_{ij}',
      descripcion: 'Minimiza la suma de las distancias (o tiempos) de los arcos utilizados en la ruta.',
    },
    {
      categoria: 'Ruta más corta (Dijkstra)',
      nombre: 'Etiqueta temporal',
      formula: 'd(j) = d(i) + c_{ij}',
      descripcion: 'Distancia acumulada hasta j = distancia del nodo previo i más el arco i→j.',
    },
    {
      categoria: 'Ruta más corta (Dijkstra)',
      nombre: 'Nodo permanente',
      formula: 'd^{*} = \\min\\{\\,d(j)\\ \\text{temporales}\\,\\}',
      descripcion: 'Se fija como permanente el nodo con la menor distancia acumulada en cada iteración.',
    },
    {
      categoria: 'Árbol de expansión mínima',
      nombre: 'Número de aristas',
      formula: '\\text{aristas} = n - 1',
      descripcion: 'Un árbol que conecta n nodos tiene exactamente n − 1 aristas, sin ciclos.',
    },
    {
      categoria: 'Árbol de expansión mínima',
      nombre: 'Costo total del árbol',
      formula: 'Z = \\sum_{(i,j)\\in T} c_{ij}',
      descripcion: 'Suma de las distancias de las aristas seleccionadas en el árbol T.',
    },
  ],

  // Pendiente: videos en YouTube y documentos de la solución en Excel QM.
  recursos: { videos: [], documentos: [] },
}
