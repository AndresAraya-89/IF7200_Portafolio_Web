// Contenido del tema "Modelo de Simulación" (Simulación Monte Carlo).
// Sigue la estructura de estructuraPaginas_Temas.md. Fórmulas en KaTeX (escapar \\).

export const simulacion = {
  resumen: {
    intro:
      'La simulación de Monte Carlo es una técnica cuantitativa que imita el comportamiento de un sistema real mediante números aleatorios, para estimar resultados cuando existe incertidumbre y variabilidad.',
    parrafos: [
      'Parte de una distribución de probabilidad empírica construida a partir de datos históricos: a cada valor posible se le asigna una probabilidad individual P(x) (su frecuencia relativa) y una probabilidad acumulada. Con la acumulada se definen reglas de asignación, es decir, rangos numéricos del 1 al 100 proporcionales a cada probabilidad.',
      'Luego se utilizan números aleatorios para "muestrear" el sistema: cada número cae dentro de un rango y determina qué evento ocurre. Repitiendo el proceso N veces se obtiene una corrida de simulación que reproduce la variabilidad real del sistema.',
      'El Valor Esperado Teórico, E(X) = ∑ x·P(x), representa el promedio de largo plazo. La simulación, en cambio, entrega un promedio simulado a partir de la frecuencia ponderada de los resultados. Contrastar ambos valores muestra cómo la variabilidad afecta la operación: aunque las medias se parezcan, la simulación revela escenarios extremos y riesgos que el promedio por sí solo oculta.',
      'La metodología sigue cinco pasos: (1) probabilidades y valor esperado, (2) reglas de asignación de rangos, (3) simulación con los números aleatorios, (4) consolidación estadística (frecuencia ponderada y promedio simulado) y (5) conclusión gerencial. Sus aplicaciones típicas incluyen líneas de espera (colas), control de inventarios y demanda, y políticas de mantenimiento (tiempo entre fallas).',
    ],
    conceptos: [
      {
        titulo: 'Probabilidad empírica P(x)',
        detalle: 'Frecuencia relativa de cada valor: cuántas veces ocurrió respecto al total de observaciones.',
      },
      {
        titulo: 'Probabilidad acumulada y rangos',
        detalle: 'Suma progresiva de probabilidades; define los rangos de números aleatorios (1–100) para muestrear.',
      },
      {
        titulo: 'Valor Esperado Teórico E(X)',
        detalle: 'Promedio de largo plazo del sistema, E(X) = ∑ x·P(x). Sirve de referencia para la simulación.',
      },
      {
        titulo: 'Promedio simulado vs. teórico',
        detalle: 'Comparar ambos revela el efecto de la variabilidad y la presencia de escenarios extremos.',
      },
    ],
  },

  ejercicios: [
    // -------------------- Parte A --------------------
    {
      id: 'colas-inspeccion',
      titulo: 'Parte A — Problema de colas (tiempos de inspección)',
      etiqueta: 'Simulación Monte Carlo · líneas de espera',
      enunciado:
        'Los contenedores seleccionados para inspección física en la terminal de aduanas de Limón tardan tiempos muy variables, lo que genera filas en las casetas. Con el historial de los últimos 100 contenedores, simule el tiempo de atención de los próximos 10 usando la secuencia de números aleatorios: 25, 88, 12, 65, 92, 8, 45, 73, 19, 54.',
      datos: [
        { label: 'N (historial)', valor: '100' },
        { label: 'Eventos a simular', valor: '10' },
      ],
      tablas: [
        {
          titulo: 'Historial de los últimos 100 contenedores',
          columnas: ['Tiempo (min)', 'Contenedores'],
          decimales: [0, 0],
          filas: [
            [15, 20],
            [30, 40],
            [45, 30],
            [60, 10],
          ],
        },
      ],
      pasos: [
        {
          titulo: 'Paso 1: Probabilidades, acumulada y rangos',
          explicacion:
            'Se calcula la probabilidad individual de cada tiempo (frecuencia / 100), la probabilidad acumulada y, con ella, los rangos de números aleatorios del 1 al 100.',
          formula: 'P(x) = \\frac{f}{N}',
          sustitucion: [
            'P(15) = \\frac{20}{100} = 0.20, \\quad P(30) = \\frac{40}{100} = 0.40',
            'P(45) = \\frac{30}{100} = 0.30, \\quad P(60) = \\frac{10}{100} = 0.10',
          ],
          tabla: {
            columnas: ['Tiempo (min)', 'P(x)', 'Acumulada', 'Rango'],
            decimales: [0],
            filas: [
              [15, '0.20', '0.20', '1 – 20'],
              [30, '0.40', '0.60', '21 – 60'],
              [45, '0.30', '0.90', '61 – 90'],
              [60, '0.10', '1.00', '91 – 100'],
            ],
          },
        },
        {
          titulo: 'Paso 2: Valor Esperado Teórico',
          explicacion: 'Promedio de largo plazo del tiempo de inspección.',
          formula: 'E(X) = \\sum x\\,P(x)',
          sustitucion: [
            'E(X) = 15(0.20) + 30(0.40) + 45(0.30) + 60(0.10) = 3 + 12 + 13.5 + 6 = 34.5',
          ],
          resultado: 'E(X) = 34.5 \\text{ min}',
        },
        {
          titulo: 'Paso 3: Corrida de simulación (10 eventos)',
          explicacion: 'Cada número aleatorio cae en un rango y determina el tiempo simulado.',
          tabla: {
            columnas: ['Evento', 'N.º aleatorio', 'Tiempo (min)'],
            decimales: [0, 0, 0],
            dividir: 2,
            filas: [
              [1, 25, 30],
              [2, 88, 45],
              [3, 12, 15],
              [4, 65, 45],
              [5, 92, 60],
              [6, 8, 15],
              [7, 45, 30],
              [8, 73, 45],
              [9, 19, 15],
              [10, 54, 30],
            ],
          },
        },
        {
          titulo: 'Paso 4: Consolidación estadística',
          explicacion:
            'Ocurrencias simuladas: 15 min (3 veces), 30 min (3 veces), 45 min (3 veces), 60 min (1 vez). Se calcula la frecuencia ponderada y el promedio simulado.',
          formula: '\\bar{X} = \\frac{\\sum f_i\\,x_i}{N}',
          sustitucion: [
            '\\text{Total} = 3(15) + 3(30) + 3(45) + 1(60) = 45 + 90 + 135 + 60 = 330',
            '\\bar{X} = \\frac{330}{10} = 33',
          ],
          resultado: '\\bar{X} = 33 \\text{ min}',
        },
      ],
      graficos: [
        {
          titulo: 'Tiempos simulados vs. Valor Esperado E(X)',
          etiquetaX: 'Evento',
          etiquetaY: 'Tiempo (min)',
          decimales: 1,
          lcCorto: 'E(X)',
          lcLargo: 'Valor esperado E(X) = 34.5',
          series: [30, 45, 15, 45, 60, 15, 30, 45, 15, 30],
          limites: { LC: 34.5 },
        },
      ],
      interpretacion:
        'El promedio simulado (33 min) es inferior al teórico (34.5 min). Aunque ocurrió un escenario crítico extremo de 60 minutos que saturaría la caseta, la alta frecuencia de trámites rápidos compensó y bajó el promedio general del turno. La simulación evidencia que planificar solo con la media puede ocultar picos de saturación puntuales.',
    },

    // -------------------- Parte B --------------------
    {
      id: 'demanda-marchamos',
      titulo: 'Parte B — Control de recursos e insumos (marchamos)',
      etiqueta: 'Simulación Monte Carlo · inventarios / demanda',
      enunciado:
        'Para sellar los contenedores tras la revisión, los oficiales usan marchamos de alta seguridad cuya demanda diaria es incierta. Con el historial de 100 días, simule la demanda de los próximos 10 días usando la secuencia: 50, 10, 85, 42, 95, 22, 67, 5, 33, 78.',
      datos: [
        { label: 'N (historial)', valor: '100 días' },
        { label: 'Días a simular', valor: '10' },
      ],
      tablas: [
        {
          titulo: 'Historial de demanda diaria (100 días)',
          columnas: ['Marchamos', 'Días'],
          decimales: [0, 0],
          filas: [
            [50, 15],
            [100, 45],
            [150, 30],
            [200, 10],
          ],
        },
      ],
      pasos: [
        {
          titulo: 'Paso 1: Probabilidades, acumulada y rangos',
          explicacion: 'Probabilidad de cada nivel de demanda (días / 100), acumulada y rangos.',
          formula: 'P(x) = \\frac{f}{N}',
          sustitucion: [
            'P(50) = \\frac{15}{100} = 0.15, \\quad P(100) = \\frac{45}{100} = 0.45',
            'P(150) = \\frac{30}{100} = 0.30, \\quad P(200) = \\frac{10}{100} = 0.10',
          ],
          tabla: {
            columnas: ['Marchamos', 'P(x)', 'Acumulada', 'Rango'],
            decimales: [0],
            filas: [
              [50, '0.15', '0.15', '1 – 15'],
              [100, '0.45', '0.60', '16 – 60'],
              [150, '0.30', '0.90', '61 – 90'],
              [200, '0.10', '1.00', '91 – 100'],
            ],
          },
        },
        {
          titulo: 'Paso 2: Valor Esperado Teórico',
          explicacion: 'Demanda diaria promedio de largo plazo.',
          formula: 'E(X) = \\sum x\\,P(x)',
          sustitucion: [
            'E(X) = 50(0.15) + 100(0.45) + 150(0.30) + 200(0.10) = 7.5 + 45 + 45 + 20 = 117.5',
          ],
          resultado: 'E(X) = 117.5 \\text{ unidades/día}',
        },
        {
          titulo: 'Paso 3: Corrida de simulación (10 días)',
          explicacion: 'Cada número aleatorio determina la demanda simulada del día.',
          tabla: {
            columnas: ['Día', 'N.º aleatorio', 'Demanda (u)'],
            decimales: [0, 0, 0],
            dividir: 2,
            filas: [
              [1, 50, 100],
              [2, 10, 50],
              [3, 85, 150],
              [4, 42, 100],
              [5, 95, 200],
              [6, 22, 100],
              [7, 67, 150],
              [8, 5, 50],
              [9, 33, 100],
              [10, 78, 150],
            ],
          },
        },
        {
          titulo: 'Paso 4: Consolidación estadística',
          explicacion:
            'Ocurrencias: 50 u (2 veces), 100 u (4 veces), 150 u (3 veces), 200 u (1 vez).',
          formula: '\\bar{X} = \\frac{\\sum f_i\\,x_i}{N}',
          sustitucion: [
            '\\text{Total} = 2(50) + 4(100) + 3(150) + 1(200) = 100 + 400 + 450 + 200 = 1150',
            '\\bar{X} = \\frac{1150}{10} = 115',
          ],
          resultado: '\\bar{X} = 115 \\text{ unidades/día}',
        },
      ],
      graficos: [
        {
          titulo: 'Demanda simulada vs. Valor Esperado E(X)',
          etiquetaX: 'Día',
          etiquetaY: 'Demanda (u)',
          decimales: 1,
          lcCorto: 'E(X)',
          lcLargo: 'Valor esperado E(X) = 117.5',
          series: [100, 50, 150, 100, 200, 100, 150, 50, 100, 150],
          limites: { LC: 117.5 },
        },
      ],
      interpretacion:
        'El promedio simulado (115 u) se acerca al teórico (117.5 u). Sin embargo, planificar el stock de marchamos solo con la media habría provocado escasez durante 4 de los 10 días simulados (cuando la demanda brincó a 150 o 200 unidades). Esto justifica mantener un inventario de seguridad para absorber la variabilidad.',
    },

    // -------------------- Parte C --------------------
    {
      id: 'mantenimiento-escaner',
      titulo: 'Parte C — Política de mantenimiento (escáner de rayos X)',
      etiqueta: 'Simulación Monte Carlo · confiabilidad / fallas',
      enunciado:
        'El escáner de rayos X sufre averías que paralizan las inspecciones. Con el historial de 100 fallas (días de funcionamiento útil antes de colapsar), simule los próximos 10 ciclos mecánicos usando la secuencia: 75, 18, 55, 32, 91, 4, 61, 89, 27, 49.',
      datos: [
        { label: 'N (historial)', valor: '100 fallas' },
        { label: 'Ciclos a simular', valor: '10' },
      ],
      tablas: [
        {
          titulo: 'Historial de vida útil antes de falla (100 fallas)',
          columnas: ['Días útiles', 'Fallas'],
          decimales: [0, 0],
          filas: [
            [10, 30],
            [20, 40],
            [30, 20],
            [40, 10],
          ],
        },
      ],
      pasos: [
        {
          titulo: 'Paso 1: Probabilidades, acumulada y rangos',
          explicacion: 'Probabilidad de cada vida útil (fallas / 100), acumulada y rangos.',
          formula: 'P(x) = \\frac{f}{N}',
          sustitucion: [
            'P(10) = \\frac{30}{100} = 0.30, \\quad P(20) = \\frac{40}{100} = 0.40',
            'P(30) = \\frac{20}{100} = 0.20, \\quad P(40) = \\frac{10}{100} = 0.10',
          ],
          tabla: {
            columnas: ['Días útiles', 'P(x)', 'Acumulada', 'Rango'],
            decimales: [0],
            filas: [
              [10, '0.30', '0.30', '1 – 30'],
              [20, '0.40', '0.70', '31 – 70'],
              [30, '0.20', '0.90', '71 – 90'],
              [40, '0.10', '1.00', '91 – 100'],
            ],
          },
        },
        {
          titulo: 'Paso 2: Valor Esperado Teórico (MTBF)',
          explicacion: 'Tiempo medio entre fallas: vida útil esperada del equipo.',
          formula: 'E(X) = \\sum x\\,P(x)',
          sustitucion: [
            'E(X) = 10(0.30) + 20(0.40) + 30(0.20) + 40(0.10) = 3 + 8 + 6 + 4 = 21',
          ],
          resultado: 'E(X) = 21 \\text{ días útiles}',
        },
        {
          titulo: 'Paso 3: Corrida de simulación (10 ciclos)',
          explicacion: 'Cada número aleatorio determina la vida útil simulada del ciclo.',
          tabla: {
            columnas: ['Ciclo', 'N.º aleatorio', 'Días útiles'],
            decimales: [0, 0, 0],
            dividir: 2,
            filas: [
              [1, 75, 30],
              [2, 18, 10],
              [3, 55, 20],
              [4, 32, 20],
              [5, 91, 40],
              [6, 4, 10],
              [7, 61, 20],
              [8, 89, 30],
              [9, 27, 10],
              [10, 49, 20],
            ],
          },
        },
        {
          titulo: 'Paso 4: Consolidación estadística',
          explicacion:
            'Ocurrencias: 10 días (3 veces), 20 días (4 veces), 30 días (2 veces), 40 días (1 vez).',
          formula: '\\bar{X} = \\frac{\\sum f_i\\,x_i}{N}',
          sustitucion: [
            '\\text{Total} = 3(10) + 4(20) + 2(30) + 1(40) = 30 + 80 + 60 + 40 = 210',
            '\\bar{X} = \\frac{210}{10} = 21',
          ],
          resultado: '\\bar{X} = 21 \\text{ días útiles}',
        },
      ],
      graficos: [
        {
          titulo: 'Vida útil simulada vs. Valor Esperado E(X)',
          etiquetaX: 'Ciclo',
          etiquetaY: 'Días útiles',
          decimales: 0,
          lcCorto: 'E(X)',
          lcLargo: 'Valor esperado E(X) = 21',
          series: [30, 10, 20, 20, 40, 10, 20, 30, 10, 20],
          limites: { LC: 21 },
        },
      ],
      interpretacion:
        'El promedio empírico (21 días) calzó exactamente con el teórico (21 días). Aun así, la simulación demuestra que el 70 % de las veces la máquina falla a los 20 días o antes. Esperar al promedio de 21 días para revisar el equipo garantizaría averías constantes, lo que justifica una política de mantenimiento preventivo más estricta.',
    },
  ],

  formulas: [
    {
      categoria: 'Probabilidades y reglas de asignación',
      nombre: 'Probabilidad empírica',
      simbolo: 'P(x)',
      formula: 'P(x) = \\frac{f}{N}',
      descripcion: 'Frecuencia relativa de cada valor: veces que ocurrió entre el total de observaciones.',
    },
    {
      categoria: 'Probabilidades y reglas de asignación',
      nombre: 'Probabilidad acumulada',
      simbolo: 'F(x)',
      formula: 'F(x_k) = \\sum_{i \\le k} P(x_i)',
      descripcion: 'Suma progresiva de las probabilidades; con ella se construyen los rangos de números aleatorios.',
    },
    {
      categoria: 'Probabilidades y reglas de asignación',
      nombre: 'Condición de normalización',
      formula: '\\sum P(x) = 1',
      descripcion: 'Todas las probabilidades individuales suman 1 (100 % de los casos).',
    },
    {
      categoria: 'Probabilidades y reglas de asignación',
      nombre: 'Regla de asignación de rangos',
      formula: '\\text{LI}_k = 100\\,F(x_{k-1}) + 1',
      descripcion: 'Límite inferior del rango de cada valor; el límite superior es 100·F(xₖ).',
    },
    {
      categoria: 'Valor esperado',
      nombre: 'Valor Esperado Teórico',
      simbolo: 'E(X)',
      formula: 'E(X) = \\sum x\\,P(x)',
      descripcion: 'Promedio de largo plazo (esperanza matemática). Referencia teórica de la simulación.',
    },
    {
      categoria: 'Valor esperado',
      nombre: 'Tiempo medio entre fallas',
      simbolo: 'MTBF',
      formula: 'MTBF = \\sum x\\,P(x)',
      descripcion: 'Vida útil esperada del equipo entre fallas; es el E(X) aplicado a tiempos de falla.',
    },
    {
      categoria: 'Consolidación de la simulación',
      nombre: 'Frecuencia ponderada',
      formula: '\\text{Total} = \\sum f_i\\,x_i',
      descripcion: 'Suma de los resultados simulados (cada valor por las veces que ocurrió).',
    },
    {
      categoria: 'Consolidación de la simulación',
      nombre: 'Promedio simulado',
      simbolo: '\\bar{X}',
      formula: '\\bar{X} = \\frac{\\sum f_i\\,x_i}{N}',
      descripcion: 'Media de la corrida de simulación (N eventos). Se contrasta contra el E(X) teórico.',
    },
  ],

  // Pendiente: videos en YouTube y documentos de la solución en Excel QM.
  recursos: { videos: [], documentos: [] },
}
