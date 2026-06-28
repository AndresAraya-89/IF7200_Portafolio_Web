// Contenido del tema "Modelo de Transporte".
// Sigue estructuraPaginas_Temas.md (incluye la regla: mostrar TODA la aritmética).
// Fórmulas en KaTeX (escapar \\).

export const transporte = {
  resumen: {
    intro:
      'El modelo de transporte es una técnica cuantitativa, muy ligada a la programación lineal, que decide cuánto enviar desde cada origen hacia cada destino respetando la oferta disponible y la demanda requerida, para optimizar un objetivo: minimizar costos o maximizar la ganancia.',
    parrafos: [
      'Se representa con una matriz: las filas son los orígenes (puntos de oferta), las columnas son los destinos (puntos de demanda) y cada celda contiene el costo —o la ganancia— por unidad enviada. El modelo está balanceado cuando la oferta total es igual a la demanda total; si no lo está, se agrega una fila o columna ficticia para equilibrarlo.',
      'Cuando el objetivo es maximizar (por ejemplo, ganancia), primero se transforma la matriz a costos de oportunidad restando cada celda de la mayor ganancia. Así se puede aplicar la maquinaria de los métodos pensados para minimizar.',
      'La resolución tiene dos fases. La fase inicial usa el Método de Aproximación de Vogel (VAM), que construye una solución factible de alta calidad mediante penalizaciones (la diferencia entre las dos mejores opciones de cada fila y columna). La fase óptima usa el Método del Salto de Piedra (Stepping Stone), que traza circuitos cerrados con signos +, −, +, − sobre las celdas vacías para comprobar si la solución es óptima o si existe alguna ruta que mejore el objetivo.',
      'El modelo de asignación es un caso especial del de transporte donde la oferta y la demanda valen exactamente 1 en cada nodo (asignación estricta 1:1, por ejemplo un camión a una ruta). Se resuelve con el método húngaro: se transforma a costos de oportunidad, se reduce por filas y columnas, y se eligen los ceros independientes. Estas herramientas se aplican ampliamente en logística, cadenas de suministro y planificación operativa.',
    ],
    conceptos: [
      {
        titulo: 'Modelo balanceado',
        detalle: 'La oferta total es igual a la demanda total; si no, se añade una fila o columna ficticia.',
      },
      {
        titulo: 'Costo de oportunidad (maximización)',
        detalle: 'Se resta cada ganancia de la mayor de la matriz para convertir un problema de máximo en uno tratable como mínimo.',
      },
      {
        titulo: 'Método de Vogel (VAM)',
        detalle: 'Genera la solución inicial usando penalizaciones: diferencia entre los dos costos más bajos de cada fila/columna.',
      },
      {
        titulo: 'Salto de piedra y asignación',
        detalle: 'El salto de piedra verifica la optimalidad con circuitos cerrados; la asignación (método húngaro) resuelve el caso 1:1.',
      },
    ],
  },

  ejercicios: [
    // ============================================================
    // Ejercicio 1: Modelo de transporte (Vogel + Salto de piedra)
    // ============================================================
    {
      id: 'transporte-computadoras',
      titulo: 'Distribución de computadoras a las escuelas',
      etiqueta: 'Modelo de transporte · Vogel + Salto de piedra (maximización)',
      enunciado:
        'El gobierno distribuye computadoras desde tres bodegas (Cartago 120, Guápiles 80, Alajuela 200) hacia cuatro abastecedores (Guanacaste 100, Limón Centro 85, Puntarenas 105, San José 110). La tabla da la ganancia (en miles de colones) por computadora según el impacto educativo. Defina el modelo, obtenga la solución inicial con el método de Vogel, verifique la optimalidad con el salto de piedra y calcule la ganancia máxima.',
      datos: [
        { label: 'Orígenes', valor: '3' },
        { label: 'Destinos', valor: '4' },
        { label: 'Oferta total', valor: '400' },
        { label: 'Demanda total', valor: '400' },
        { label: 'Objetivo', valor: 'Maximizar ganancia' },
      ],
      tablas: [
        {
          titulo: 'Matriz de ganancias (miles de colones por computadora)',
          columnas: ['Origen / Destino', 'Guanacaste', 'Limón Centro', 'Puntarenas', 'San José', 'Oferta'],
          decimales: [undefined, 0, 0, 0, 0, 0],
          filas: [
            ['Cartago', 95, 80, 85, 60, 120],
            ['Guápiles', 90, 75, 80, 55, 80],
            ['Alajuela', 92, 78, 83, 58, 200],
            ['Demanda', 100, 85, 105, 110, 400],
          ],
        },
      ],
      pasos: [
        {
          titulo: 'Paso 1: Variables de decisión y función objetivo',
          explicacion:
            'Se define Xᵢⱼ como las computadoras enviadas desde la bodega i al abastecedor j. La función objetivo suma la ganancia de cada ruta y se busca maximizarla.',
          formula: 'Z = \\sum_{i}\\sum_{j} c_{ij}\\,X_{ij}',
          sustitucion: [
            '\\max Z = 95X_{11} + 80X_{12} + 85X_{13} + 60X_{14}',
            '\\qquad +\\; 90X_{21} + 75X_{22} + 80X_{23} + 55X_{24}',
            '\\qquad +\\; 92X_{31} + 78X_{32} + 83X_{33} + 58X_{34}',
          ],
        },
        {
          titulo: 'Paso 2: Restricciones de oferta y demanda',
          explicacion:
            'Cada bodega envía exactamente su oferta y cada abastecedor recibe exactamente su demanda. Las cantidades no pueden ser negativas.',
          sustitucion: [
            '\\text{Oferta: } X_{11}+X_{12}+X_{13}+X_{14}=120,\\;\\; X_{21}+\\dots=80,\\;\\; X_{31}+\\dots=200',
            '\\text{Demanda: } X_{11}+X_{21}+X_{31}=100,\\;\\; \\dots=85,\\;\\; \\dots=105,\\;\\; \\dots=110',
            'X_{ij} \\ge 0',
          ],
        },
        {
          titulo: 'Paso 3: Balanceo del modelo',
          explicacion: 'Antes de resolver, la oferta total debe igualar la demanda total.',
          sustitucion: [
            '\\text{Oferta} = 120 + 80 + 200 = 400',
            '\\text{Demanda} = 100 + 85 + 105 + 110 = 400',
            '400 = 400 \\;\\Rightarrow\\; \\text{modelo balanceado}',
          ],
        },
        {
          titulo: 'Paso 4: Transformación a costo de oportunidad',
          explicacion:
            'Como es maximización, se toma la mayor ganancia de la matriz (95) y se resta cada celda: costo de oportunidad = 95 − ganancia. Así el problema se trata como minimización.',
          formula: "c'_{ij} = c_{max} - c_{ij}",
          sustitucion: [
            '95 - 95 = 0, \\quad 95 - 80 = 15, \\quad 95 - 85 = 10, \\quad 95 - 60 = 35',
            '95 - 90 = 5, \\quad 95 - 75 = 20, \\quad 95 - 80 = 15, \\quad 95 - 55 = 40',
            '95 - 92 = 3, \\quad 95 - 78 = 17, \\quad 95 - 83 = 12, \\quad 95 - 58 = 37',
          ],
          tabla: {
            titulo: 'Matriz de costos de oportunidad',
            columnas: ['Origen / Destino', 'Guanacaste', 'Limón Centro', 'Puntarenas', 'San José', 'Oferta'],
            decimales: [undefined, 0, 0, 0, 0, 0],
            filas: [
              ['Cartago', 0, 15, 10, 35, 120],
              ['Guápiles', 5, 20, 15, 40, 80],
              ['Alajuela', 3, 17, 12, 37, 200],
              ['Demanda', 100, 85, 105, 110, 400],
            ],
          },
        },
        {
          titulo: 'Paso 5: Penalizaciones de Vogel (primera ronda)',
          explicacion:
            'La penalización de cada fila/columna es la diferencia entre sus dos costos de oportunidad más bajos. Se elige la mayor penalización y, dentro de esa línea, la celda de menor costo.',
          formula: 'P = (\\text{2.º menor}) - (\\text{menor})',
          sustitucion: [
            '\\text{Cartago: } 10 - 0 = 10,\\quad \\text{Guápiles: } 15 - 5 = 10,\\quad \\text{Alajuela: } 12 - 3 = 9',
            '\\text{Guanacaste: } 3 - 0 = 3,\\;\\; \\text{Limón C.: } 17 - 15 = 2,\\;\\; \\text{Punta.: } 12 - 10 = 2,\\;\\; \\text{San José: } 37 - 35 = 2',
          ],
          nota: 'Mayor penalización = 10 (Cartago). Su celda de menor costo es Guanacaste (0): se asigna mín(120, 100) = 100.',
        },
        {
          titulo: 'Paso 6: Asignación final por Vogel',
          explicacion:
            'Repitiendo el cálculo de penalizaciones y asignando al menor costo en cada ronda (descontando oferta y demanda satisfechas), se obtiene la distribución inicial completa.',
          tabla: {
            titulo: 'Distribución por el método de Vogel (computadoras)',
            columnas: ['Origen / Destino', 'Guanacaste', 'Limón Centro', 'Puntarenas', 'San José', 'Oferta'],
            decimales: [undefined],
            filas: [
              ['Cartago', 100, 20, '—', '—', 120],
              ['Guápiles', '—', '—', 80, '—', 80],
              ['Alajuela', '—', 65, 25, 110, 200],
              ['Demanda', 100, 85, 105, 110, 400],
            ],
          },
        },
        {
          titulo: 'Paso 7: Cálculo de la ganancia total',
          explicacion:
            'Se multiplican las cantidades asignadas por su ganancia original y se suman.',
          formula: 'Z = \\sum c_{ij}\\,X_{ij}',
          sustitucion: [
            'Z = 95(100) + 80(20) + 80(80) + 78(65) + 83(25) + 58(110)',
            'Z = 9500 + 1600 + 6400 + 5070 + 2075 + 6380',
            'Z = 31025',
          ],
          resultado: 'Z = 31\\,025 \\text{ (miles)} = ₡31\\,025\\,000',
        },
        {
          titulo: 'Paso 8: Verificación con el salto de piedra',
          explicacion:
            'Primero se comprueba que la solución no es degenerada: el número de celdas ocupadas debe ser m + n − 1. Luego, para cada celda vacía se traza un circuito cerrado alternando +, −, +, − y se evalúa Δ. En maximización: si algún Δ > 0 conviene cambiar; si todos los Δ ≤ 0 la solución es óptima (Δ = 0 indica óptimos alternativos).',
          formula: '\\text{Celdas ocupadas} = m + n - 1',
          sustitucion: [
            '3 + 4 - 1 = 6 \\;\\checkmark\\; (\\text{hay 6 celdas ocupadas})',
            '\\Delta_{X_{13}} = +85 - 80 + 78 - 83 = 0',
            '\\Delta_{X_{31}} = +92 - 78 + 80 - 95 = -1',
          ],
          nota: 'Ninguna celda vacía tiene Δ > 0 (los valores son 0 o negativos), por lo que la solución de Vogel ya es óptima, con algunos óptimos alternativos equivalentes.',
        },
      ],
      interpretacion:
        'La distribución óptima envía las 120 computadoras de Cartago a Guanacaste (100) y Limón Centro (20); las 80 de Guápiles a Puntarenas; y las 200 de Alajuela a Limón Centro (65), Puntarenas (25) y San José (110). La ganancia máxima es de 31 025 miles de colones (₡31 025 000). El salto de piedra confirma que no existe ninguna reasignación que aumente la ganancia, aunque sí hay soluciones alternativas con el mismo valor, lo que da flexibilidad operativa ante cambios de disponibilidad.',
    },

    // ============================================================
    // Ejercicio 2: Modelo de asignación (método húngaro, máx)
    // ============================================================
    {
      id: 'asignacion-camiones',
      titulo: 'Asignación de camiones a rutas',
      etiqueta: 'Modelo de asignación · Método húngaro (maximización)',
      enunciado:
        'Se dispone de 4 camiones para cubrir las 4 rutas (Guanacaste, Limón Centro, Puntarenas, San José). Cada celda es el rendimiento esperado si un camión cubre esa ruta. Determine la asignación óptima (cada camión una ruta y cada ruta un camión) que maximice el rendimiento total.',
      datos: [
        { label: 'Camiones', valor: '4' },
        { label: 'Rutas', valor: '4' },
        { label: 'Objetivo', valor: 'Maximizar rendimiento' },
      ],
      tablas: [
        {
          titulo: 'Matriz de rendimientos camión–ruta',
          columnas: ['Camión / Ruta', 'Guanacaste', 'Limón Centro', 'Puntarenas', 'San José'],
          decimales: [undefined, 0, 0, 0, 0],
          filas: [
            ['Camión 1', 90, 80, 70, 60],
            ['Camión 2', 85, 75, 80, 65],
            ['Camión 3', 80, 85, 75, 70],
            ['Camión 4', 70, 90, 60, 85],
          ],
        },
      ],
      pasos: [
        {
          titulo: 'Paso 1: Función objetivo y restricciones',
          explicacion:
            'Sea yᵢⱼ = 1 si el camión i cubre la ruta j (0 si no). Cada camión cubre una sola ruta y cada ruta es cubierta por un solo camión.',
          formula: 'Z = \\sum_{i}\\sum_{j} r_{ij}\\,y_{ij}',
          sustitucion: [
            '\\sum_{j} y_{ij} = 1 \\;\\;(\\text{cada camion una ruta})',
            '\\sum_{i} y_{ij} = 1 \\;\\;(\\text{cada ruta un camion})',
          ],
        },
        {
          titulo: 'Paso 2: Transformación a costo de oportunidad',
          explicacion:
            'Como es maximización, se toma el mayor rendimiento de la matriz (90) y se resta cada celda: 90 − rendimiento.',
          formula: "r'_{ij} = r_{max} - r_{ij}",
          sustitucion: [
            '90 - 90 = 0, \\quad 90 - 80 = 10, \\quad 90 - 70 = 20, \\quad 90 - 60 = 30',
            '90 - 85 = 5, \\quad 90 - 75 = 15, \\quad 90 - 80 = 10, \\quad 90 - 65 = 25',
          ],
          tabla: {
            titulo: 'Costos de oportunidad (90 − rendimiento)',
            columnas: ['Camión / Ruta', 'Guanacaste', 'Limón Centro', 'Puntarenas', 'San José'],
            decimales: [undefined, 0, 0, 0, 0],
            filas: [
              ['Camión 1', 0, 10, 20, 30],
              ['Camión 2', 5, 15, 10, 25],
              ['Camión 3', 10, 5, 15, 20],
              ['Camión 4', 20, 0, 30, 5],
            ],
          },
        },
        {
          titulo: 'Paso 3: Reducción por filas',
          explicacion: 'A cada celda se le resta el menor valor de su fila.',
          sustitucion: [
            '\\text{Fila C2 (mín 5): } 5-5=0,\\; 15-5=10,\\; 10-5=5,\\; 25-5=20',
            '\\text{Fila C3 (mín 5): } 10-5=5,\\; 5-5=0,\\; 15-5=10,\\; 20-5=15',
          ],
          tabla: {
            titulo: 'Matriz reducida por filas',
            columnas: ['Camión / Ruta', 'Guanacaste', 'Limón Centro', 'Puntarenas', 'San José'],
            decimales: [undefined, 0, 0, 0, 0],
            filas: [
              ['Camión 1', 0, 10, 20, 30],
              ['Camión 2', 0, 10, 5, 20],
              ['Camión 3', 5, 0, 10, 15],
              ['Camión 4', 20, 0, 30, 5],
            ],
          },
        },
        {
          titulo: 'Paso 4: Reducción por columnas',
          explicacion: 'A cada celda se le resta el menor valor de su columna (mínimos: 0, 0, 5, 5).',
          sustitucion: [
            '\\text{Col Puntarenas (mín 5): } 20-5,\\;5-5,\\;10-5,\\;30-5',
            '\\text{Col San José (mín 5): } 30-5,\\;20-5,\\;15-5,\\;5-5',
          ],
          tabla: {
            titulo: 'Matriz reducida por columnas',
            columnas: ['Camión / Ruta', 'Guanacaste', 'Limón Centro', 'Puntarenas', 'San José'],
            decimales: [undefined, 0, 0, 0, 0],
            filas: [
              ['Camión 1', 0, 10, 15, 25],
              ['Camión 2', 0, 10, 0, 15],
              ['Camión 3', 5, 0, 5, 10],
              ['Camión 4', 20, 0, 25, 0],
            ],
          },
        },
        {
          titulo: 'Paso 5: Selección de ceros (asignación)',
          explicacion:
            'Se eligen ceros independientes: uno por fila y por columna. Camión 1 solo tiene cero en Guanacaste; Camión 2 toma Puntarenas; Camión 3 toma Limón Centro; Camión 4 toma San José.',
          tabla: {
            titulo: 'Asignación óptima',
            columnas: ['Camión', 'Ruta asignada', 'Rendimiento'],
            decimales: [undefined, undefined, 0],
            filas: [
              ['Camión 1', 'Guanacaste', 90],
              ['Camión 2', 'Puntarenas', 80],
              ['Camión 3', 'Limón Centro', 85],
              ['Camión 4', 'San José', 85],
            ],
          },
        },
        {
          titulo: 'Paso 6: Rendimiento máximo total',
          explicacion: 'Se suman los rendimientos de las rutas asignadas.',
          formula: 'Z = \\sum r_{ij}\\,y_{ij}',
          sustitucion: ['Z = 90 + 80 + 85 + 85 = 340'],
          resultado: 'Z = 340',
        },
      ],
      interpretacion:
        'La asignación óptima es: Camión 1 → Guanacaste (90), Camión 2 → Puntarenas (80), Camión 3 → Limón Centro (85) y Camión 4 → San José (85), con un rendimiento total máximo de 340. Esta combinación aprovecha mejor las fortalezas de cada camión en su ruta y permite a la gerencia planificar la operación diaria de forma rentable y confiable.',
    },
  ],

  formulas: [
    {
      categoria: 'Formulación del modelo',
      nombre: 'Función objetivo',
      simbolo: 'Z',
      formula: 'Z = \\sum_{i}\\sum_{j} c_{ij}\\,X_{ij}',
      descripcion: 'Suma la ganancia (o costo) de todas las rutas. Se maximiza o minimiza según el caso.',
    },
    {
      categoria: 'Formulación del modelo',
      nombre: 'Restricción de oferta',
      formula: '\\sum_{j} X_{ij} = O_i',
      descripcion: 'Cada origen envía exactamente su oferta disponible.',
    },
    {
      categoria: 'Formulación del modelo',
      nombre: 'Restricción de demanda',
      formula: '\\sum_{i} X_{ij} = D_j',
      descripcion: 'Cada destino recibe exactamente su demanda requerida.',
    },
    {
      categoria: 'Formulación del modelo',
      nombre: 'Condición de balanceo',
      formula: '\\sum_i O_i = \\sum_j D_j',
      descripcion: 'La oferta total debe igualar la demanda total; si no, se agrega fila/columna ficticia.',
    },
    {
      categoria: 'Método de Vogel',
      nombre: 'Costo de oportunidad (máx.)',
      formula: "c'_{ij} = c_{max} - c_{ij}",
      descripcion: 'Convierte un problema de maximización en uno tratable como minimización.',
    },
    {
      categoria: 'Método de Vogel',
      nombre: 'Penalización',
      simbolo: 'P',
      formula: 'P = c_{(2)} - c_{(1)}',
      descripcion: 'Diferencia entre los dos costos más bajos de una fila o columna. Guía la asignación.',
    },
    {
      categoria: 'Salto de piedra',
      nombre: 'No degeneración',
      formula: '\\text{celdas ocupadas} = m + n - 1',
      descripcion: 'Condición para que la solución sea básica y se pueda evaluar con el salto de piedra.',
    },
    {
      categoria: 'Salto de piedra',
      nombre: 'Evaluación del circuito',
      simbolo: '\\Delta',
      formula: '\\Delta = \\sum (\\pm c_{ij})',
      descripcion: 'Suma alternada (+, −, +, −) del circuito. En máx.: Δ > 0 mejora; Δ ≤ 0 ya es óptimo.',
    },
    {
      categoria: 'Modelo de asignación',
      nombre: 'Función objetivo de asignación',
      formula: 'Z = \\sum_{i}\\sum_{j} r_{ij}\\,y_{ij}',
      descripcion: 'Rendimiento total de las asignaciones, con yᵢⱼ = 1 si el recurso i se asigna a la tarea j.',
    },
    {
      categoria: 'Modelo de asignación',
      nombre: 'Restricciones 1:1',
      formula: '\\sum_{j} y_{ij} = 1, \\quad \\sum_{i} y_{ij} = 1',
      descripcion: 'Cada recurso se asigna a una sola tarea y cada tarea recibe un solo recurso.',
    },
  ],

  // Pendiente: videos en YouTube y documentos de la solución en Excel QM.
  recursos: { videos: [], documentos: [] },
}
