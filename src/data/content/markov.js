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
        'El comercio minorista en Limón se reparte entre Maxi Palí (M), Megasuper (G) y supermercados locales (L). Maxi Palí concentra el 45 % de los clientes, Megasuper el 35 % y los locales el 20 %. Cada año las familias pueden permanecer o cambiar de cadena según precios, promociones, ubicación o cercanía. Con un período igual a 1 año, calcule π(1) y π(2), complete la tabla de pronóstico, resuelva el estado estable e interprete cuál cadena gana en el largo plazo.',
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
          nota: 'La diagonal (0.88, 0.85, 0.75) representa la permanencia o lealtad de los clientes.',
        },
      ],
      pasos: [
        {
          titulo: 'Paso 1: Cálculo de π(1)',
          explicacion:
            'Se multiplica el vector actual por la matriz de transición. Cada componente combina los clientes que permanecen en una cadena con los que llegan desde las otras.',
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
          explicacion: 'Se repite el procedimiento usando π(1) como nuevo vector actual.',
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
            'Se resumen los períodos 0, 1 y 2. La suma de cada fila debe dar 1, porque representa el 100 % del mercado (pequeñas diferencias serían por redondeo).',
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
            'El estado estable es la distribución que ya no cambia de un período a otro. Se plantea π = π·P, lo que genera una ecuación por estado más la condición de que las participaciones sumen 1.',
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
            'Se pasan los términos a un mismo lado y se simplifican dos ecuaciones de Markov; la tercera se reemplaza por la suma = 1. Así queda un sistema 3×3 listo para resolver (por ejemplo, en calculadora).',
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
            'Al resolver el sistema se obtiene el vector de estado estable. Se usan solo dos ecuaciones de Markov porque son linealmente dependientes; la condición de suma = 1 garantiza el 100 % del mercado.',
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
        'En los dos primeros períodos Maxi Palí sube de 45.00 % a 46.10 % y luego a 46.91 %, mientras Megasuper baja levemente (35.00 % → 34.79 %) y los locales descienden de 20.00 % a 18.30 %. El estado estable indica que, si las probabilidades de permanencia y cambio se mantienen, el mercado tendería a 49.24 % para Maxi Palí, 34.09 % para Megasuper y 16.67 % para los locales. Por lo tanto, la cadena que gana en el largo plazo es Maxi Palí; Megasuper debería enfocarse en retener clientes y reducir la fuga mediante mejores precios, promociones, servicio y programas de fidelización.',
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

  // Pendiente: videos en YouTube y documentos de apoyo (el caso se resuelve a mano, sin Excel QM).
  recursos: { videos: [], documentos: [] },
}
