// Contenido del tema "Análisis de Markov".
// Sigue la estructura descrita en estructuraPaginas_Temas.md.
// Fórmulas en sintaxis KaTeX (recordar escapar las barras invertidas: \\).

export const markov = {
  resumen: {
    intro:
      'El análisis de Markov es un método cuantitativo que estudia sistemas que cambian de un estado a otro con el paso del tiempo, usando probabilidades para pronosticar su comportamiento futuro.',
    parrafos: [
      'Su base es la propiedad de Markov: el futuro del sistema depende únicamente del estado actual y no de toda la historia previa. Un estado es cada una de las situaciones posibles en que puede encontrarse el sistema (por ejemplo, la cadena de supermercados donde compra una familia, o si una máquina está funcionando, en mantenimiento o averiada).',
      'Se trabaja con dos tipos de probabilidades. Las probabilidades de estado describen cómo está repartido el sistema en un momento dado y se agrupan en el vector de estado π(n). Las probabilidades de transición indican qué tan probable es pasar de un estado a otro y se organizan en la matriz de transición P, cuyas filas suman 1 y cuya diagonal representa la permanencia o lealtad.',
      'El pronóstico período a período se obtiene multiplicando el vector actual por la matriz: π(n+1) = π(n)·P. Repitiendo el proceso se proyecta la evolución del sistema. A largo plazo interesa el estado estable π, la distribución que ya no cambia al aplicar la matriz (π = π·P); para hallarlo se plantea un sistema de ecuaciones y se reemplaza una de ellas por la condición de que las probabilidades sumen 1.',
      'El estado estable no existe en cualquier cadena: requiere que sea irreducible, aperiódica y regular. Entre sus ventajas están la sencillez conceptual, la baja exigencia de datos y la capacidad de obtener el equilibrio de largo plazo; entre sus limitaciones, que asume probabilidades constantes, no considera el historial y es sensible a cambios externos.',
    ],
    conceptos: [
      {
        titulo: 'Propiedad de Markov',
        detalle:
          'El estado futuro depende solo del estado actual, no de los anteriores ("falta de memoria").',
      },
      {
        titulo: 'Vector de estado π(n)',
        detalle:
          'Conjunto ordenado de probabilidades que indica cómo está repartido el sistema en el período n.',
      },
      {
        titulo: 'Matriz de transición P',
        detalle:
          'Probabilidades de pasar de un estado a otro. Cada fila suma 1 y la diagonal mide la lealtad.',
      },
      {
        titulo: 'Estado estable',
        detalle:
          'Distribución de largo plazo que ya no cambia al multiplicarse por P (π = π·P).',
      },
    ],
  },

  ejercicios: [
    {
      id: 'supermercados-limon',
      titulo: 'Clientes de cadenas de supermercados en Limón',
      etiqueta: 'Pronóstico de participación de mercado y estado estable',
      enunciado:
        'Imaginemos el comercio de supermercados en Limón repartido entre tres cadenas: Maxi Palí (M), Megasuper (G) y los supermercados locales (L). Hoy, de cada 100 familias, 45 compran en Maxi Palí, 35 en Megasuper y 20 en los locales. Cada año la gente puede quedarse en su cadena de siempre o cambiarse, según cómo estén los precios, las promociones o qué tan cerca les quede. Tomando el año como período, vamos a ver cómo queda el mercado en π(1) y π(2), llenar la tabla de pronóstico, encontrar el estado estable y, al final, descubrir qué cadena termina llevándose la delantera.',
      datos: [
        { label: 'Estados', valor: 'M, G, L' },
        { label: 'π(0)', valor: '[0.45, 0.35, 0.20]' },
        { label: 'Período', valor: '1 año' },
      ],
      tablas: [
        {
          titulo: 'Estados y participación inicial',
          columnas: ['Estado', 'Significado', 'Participación inicial'],
          filas: [
            ['M', 'Maxi Palí', '0.45 = 45%'],
            ['G', 'Megasuper', '0.35 = 35%'],
            ['L', 'Locales', '0.20 = 20%'],
          ],
        },
        {
          titulo: 'Matriz de transición P (Desde → Hacia)',
          columnas: ['Desde \\ Hacia', 'M', 'G', 'L'],
          decimales: [undefined, 2, 2, 2],
          filas: [
            ['M', 0.88, 0.07, 0.05],
            ['G', 0.1, 0.85, 0.05],
            ['L', 0.15, 0.1, 0.75],
          ],
          nota: 'La diagonal (0.88, 0.85, 0.75) es la lealtad: el porcentaje de clientes que se queda en su misma cadena de un año para otro.',
        },
      ],
      pasos: [
        {
          titulo: 'Paso 1: Cálculo de π(1)',
          explicacion:
            'Para pasar de un año al siguiente multiplicamos el vector actual por la matriz de transición. La idea es sencilla: cada cadena conserva a los clientes que le son fieles y, encima, suma a los que se le pasan desde las otras dos.',
          formula: '\\pi^{(n+1)} = \\pi^{(n)} \\cdot P',
          sustitucion: [
            'M = 0.45(0.88) + 0.35(0.10) + 0.20(0.15) = 0.4610',
            'G = 0.45(0.07) + 0.35(0.85) + 0.20(0.10) = 0.3490',
            'L = 0.45(0.05) + 0.35(0.05) + 0.20(0.75) = 0.1900',
          ],
          resultado: '\\pi^{(1)} = [\\,0.4610,\\ 0.3490,\\ 0.1900\\,]',
        },
        {
          titulo: 'Paso 2: Cálculo de π(2)',
          explicacion: 'Hacemos exactamente lo mismo del paso anterior, solo que ahora arrancamos desde π(1) en vez del vector inicial.',
          sustitucion: [
            'M = 0.4610(0.88) + 0.3490(0.10) + 0.1900(0.15) = 0.46908',
            'G = 0.4610(0.07) + 0.3490(0.85) + 0.1900(0.10) = 0.34792',
            'L = 0.4610(0.05) + 0.3490(0.05) + 0.1900(0.75) = 0.18300',
          ],
          resultado: '\\pi^{(2)} = [\\,0.46908,\\ 0.34792,\\ 0.18300\\,]',
        },
        {
          titulo: 'Paso 3: Tabla de pronóstico',
          explicacion:
            'Juntamos los tres períodos (0, 1 y 2) en una sola tabla. Como cada fila es el total del mercado, tiene que sumar 1 (es decir, el 100 %); si aparece una diferencia mínima, es puro redondeo.',
          tabla: {
            columnas: ['Período', 'Maxi Palí', 'Megasuper', 'Locales', 'Suma'],
            decimales: [0, 5, 5, 5, 0],
            filas: [
              [0, 0.45, 0.35, 0.2, 1],
              [1, 0.461, 0.349, 0.19, 1],
              [2, 0.46908, 0.34792, 0.183, 1],
            ],
          },
        },
        {
          titulo: 'Paso 4: Planteamiento del estado estable',
          explicacion:
            'El estado estable es ese punto en el que el reparto del mercado ya no se mueve aunque pase otro año más. Para hallarlo planteamos π = π·P, que nos deja una ecuación por cada cadena, más la condición de que las tres participaciones sumen 1.',
          formula: '\\pi = \\pi \\cdot P',
          sustitucion: [
            'M = 0.88M + 0.10G + 0.15L',
            'G = 0.07M + 0.85G + 0.10L',
            'L = 0.05M + 0.05G + 0.75L',
            'M + G + L = 1',
          ],
        },
        {
          titulo: 'Paso 5: Sistema reducido',
          explicacion:
            'Acomodamos todo de un solo lado del igual y simplificamos dos de las ecuaciones de Markov; la tercera la cambiamos por la condición de que todo sume 1. Con eso nos queda un sistema de 3×3 que ya se resuelve sin problema (por ejemplo, con calculadora).',
          sustitucion: [
            '0.12M - 0.10G - 0.15L = 0',
            '-0.07M + 0.15G - 0.10L = 0',
            'M + G + L = 1',
          ],
          tabla: {
            titulo: 'Sistema 3×3 (coeficientes)',
            columnas: ['Ecuación', 'Coef. M', 'Coef. G', 'Coef. L', 'Resultado'],
            decimales: [0, 2, 2, 2, 0],
            filas: [
              [1, 0.12, -0.1, -0.15, 0],
              [2, -0.07, 0.15, -0.1, 0],
              [3, 1, 1, 1, 1],
            ],
          },
        },
        {
          titulo: 'Paso 6: Solución del sistema',
          explicacion:
            'Al resolver ese sistema sale el vector de estado estable. Usamos solo dos de las ecuaciones de Markov porque la tercera no aporta nada nuevo (son dependientes entre sí), y la condición de que sumen 1 es la que cierra el 100 % del mercado.',
          sustitucion: ['M = 0.4924', 'G = 0.3409', 'L = 0.1667'],
          resultado: '\\pi = [\\,0.4924,\\ 0.3409,\\ 0.1667\\,]',
          tabla: {
            titulo: 'Estado estable',
            columnas: ['Cadena', 'Estado estable', 'Porcentaje'],
            decimales: [undefined, 4, undefined],
            filas: [
              ['Maxi Palí', 0.4924, '49.24%'],
              ['Megasuper', 0.3409, '34.09%'],
              ['Locales', 0.1667, '16.67%'],
            ],
          },
        },
      ],
      interpretacion:
        'En los primeros dos años Maxi Palí va en subida: pasa de 45.00 % a 46.10 % y luego a 46.91 %. Megasuper baja apenas (de 35.00 % a 34.79 %) y los más golpeados son los locales, que caen de 20.00 % a 18.30 %. Si la gente mantiene sus costumbres de quedarse o cambiarse, el mercado termina asentándose en 49.24 % para Maxi Palí, 34.09 % para Megasuper y 16.67 % para los locales. En pocas palabras: a la larga la que se queda con el mercado es Maxi Palí, y si Megasuper no quiere seguir cediendo terreno, le tocaría enfocarse en retener a su gente con mejores precios, promociones, servicio y programas de fidelidad.',
    },
  ],

  formulas: [
    {
      categoria: 'Probabilidades de estado y transición',
      nombre: 'Vector de estado',
      simbolo: '\\pi^{(n)}',
      formula: '\\pi^{(n)} = [\\pi_1^{(n)}, \\pi_2^{(n)}, \\dots, \\pi_k^{(n)}]',
      descripcion: 'Distribución de probabilidades que indica cómo está repartido el sistema en el período n.',
    },
    {
      categoria: 'Probabilidades de estado y transición',
      nombre: 'Condición de renglón',
      formula: '\\sum_{j} P_{ij} = 1',
      descripcion: 'Cada fila de la matriz de transición suma 1: desde un estado se va con seguridad a algún estado.',
    },
    {
      categoria: 'Pronóstico período a período',
      nombre: 'Ecuación de recurrencia',
      formula: '\\pi^{(n+1)} = \\pi^{(n)} \\cdot P',
      descripcion: 'Calcula la distribución del siguiente período multiplicando el vector actual por la matriz P.',
    },
    {
      categoria: 'Pronóstico período a período',
      nombre: 'Cálculo de un componente',
      formula: '\\pi_j^{(n+1)} = \\sum_{i} \\pi_i^{(n)}\\, P_{ij}',
      descripcion: 'Cada componente combina los clientes que permanecen con los que migran desde los otros estados.',
    },
    {
      categoria: 'Estado estable (largo plazo)',
      nombre: 'Condición de estado estable',
      formula: '\\pi = \\pi \\cdot P',
      descripcion: 'Distribución de largo plazo que ya no cambia al multiplicarse por la matriz de transición.',
    },
    {
      categoria: 'Estado estable (largo plazo)',
      nombre: 'Normalización',
      formula: '\\sum_{i} \\pi_i = 1',
      descripcion: 'Las participaciones suman el 100 %. Reemplaza a una ecuación dependiente al resolver el estado estable.',
    },
  ],

  // Recursos multimedia: video en YouTube + documento de la solución en Excel QM (Google Drive).
  recursos: {
    videos: [
      { titulo: 'Análisis de Markov — resolución en Excel QM', url: 'https://www.youtube.com/embed/SmLIPObETUY' },
    ],
    documentos: [
      { titulo: 'Solución en Excel QM (.xlsx)', url: 'https://docs.google.com/spreadsheets/d/1u1AJBmJ1BxS0q7EVxWntsMwHccvZAy0h/edit?usp=sharing&ouid=117814125588622869517&rtpof=true&sd=true' },
    ],
  },
}
