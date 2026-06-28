// Contenido del tema "Control Estadístico".
// Estructura reutilizable por todos los temas (ver TopicPage):
//   resumen   -> Resumen Ejecutivo (síntesis con palabras propias)
//   ejercicios-> Ejercicios de tarea resueltos paso a paso (fórmulas en LaTeX/KaTeX)
//   recursos  -> Recursos multimedia (videos YouTube, documentos Excel QM en Drive)
// Las fórmulas usan sintaxis KaTeX; recordar escapar las barras invertidas (\\).

export const controlEstadistico = {
  resumen: {
    intro:
      'El control estadístico de la calidad es un conjunto de herramientas que utiliza datos y gráficas para vigilar, a lo largo del tiempo, si un proceso se mantiene estable o si empieza a presentar señales de falla antes de que estas se conviertan en pérdidas.',
    parrafos: [
      'La idea central del tema es la variabilidad: ningún proceso produce resultados idénticos en todo momento. Lo importante es distinguir entre causas comunes —la variación natural e inevitable del proceso— y causas especiales —algo anormal que lo está afectando, como una máquina descalibrada, un material defectuoso o un error del operario. El control estadístico busca detectar esas causas especiales a tiempo, desplazando el enfoque del control final del producto hacia el control durante el proceso, que es lo que permite prevenir en lugar de corregir tarde.',
      'La herramienta principal es la gráfica de control, que muestra los datos del proceso frente a tres referencias: la línea central (LC), el límite de control superior (LCS) y el límite de control inferior (LCI), construidos típicamente a tres desviaciones estándar de la media. Mientras los puntos se mantengan dentro de los límites y sin patrones anómalos, el proceso se considera bajo control estadístico.',
      'La elección de la gráfica depende del tipo de dato. Para variables medibles (peso, tiempo, temperatura) se usan las gráficas X̄ y R, donde X̄ vigila el promedio del proceso y R su variabilidad. Para atributos contados (defectuoso / no defectuoso) se usan las gráficas p, np, c o u; la gráfica p, por ejemplo, controla la proporción de unidades defectuosas.',
      'Más allá de la estabilidad, interesa saber si el proceso es capaz de cumplir las especificaciones del cliente. Para ello se calculan los índices de capacidad Cp y Cpk: el primero compara la amplitud de las especificaciones con la dispersión del proceso, y el segundo además penaliza el descentrado respecto al objetivo. Finalmente, controlar no es el final: el modelo sirve para tomar decisiones —corregir, mantener o mejorar el proceso.',
    ],
    conceptos: [
      {
        titulo: 'Causa común vs. especial',
        detalle:
          'La causa común es variación normal del proceso; la causa especial es un factor anormal y asignable que debe investigarse y eliminarse.',
      },
      {
        titulo: 'Límites de control (3σ)',
        detalle:
          'LCS, LC y LCI delimitan la variación esperada. Un punto fuera de los límites señala una posible causa especial.',
      },
      {
        titulo: 'Gráficas X̄–R vs. p',
        detalle:
          'X̄–R para variables medibles (controla media y rango); p para atributos (controla la proporción de defectuosos).',
      },
      {
        titulo: 'Capacidad: Cp y Cpk',
        detalle:
          'Cp mide la capacidad potencial frente a las especificaciones; Cpk la corrige según qué tan centrado está el proceso.',
      },
    ],
  },

  ejercicios: [
    // ------------------------------------------------------------------
    {
      id: 'corte-alambre',
      titulo: 'Corte de precisión de alambre',
      etiqueta: 'Gráficas X̄ y R',
      enunciado:
        'El muestreo de cuatro piezas de precisión para corte de alambre (empleado en el ensamble de computadoras) cada hora durante las últimas 24 horas. Construya las gráficas X̄ y R, calcule sus límites de control y determine si el proceso está bajo control.',
      datos: [
        { label: 'Muestras', valor: '24' },
        { label: 'n', valor: '4' },
        { label: 'A₂', valor: '0.729' },
        { label: 'D₃', valor: '0' },
        { label: 'D₄', valor: '2.282' },
      ],
      tablas: [
        {
          titulo: 'Datos iniciales: promedio (X̄) y rango (R) por hora',
          columnas: ['Hora', 'X̄', 'R'],
          decimales: [0, 2, 2],
          dividir: 2,
          filas: [
            [1, 3.25, 0.71], [2, 3.11, 1.18], [3, 3.22, 1.43], [4, 3.39, 1.26],
            [5, 3.07, 1.17], [6, 2.86, 0.32], [7, 3.05, 0.53], [8, 2.65, 1.13],
            [9, 3.02, 0.71], [10, 2.85, 1.33], [11, 2.83, 1.17], [12, 2.97, 0.4],
            [13, 3.11, 0.85], [14, 2.83, 1.31], [15, 3.12, 1.06], [16, 2.86, 0.5],
            [17, 2.86, 1.43], [18, 2.74, 1.29], [19, 3.13, 1.41], [20, 2.89, 1.09],
            [21, 2.65, 1.08], [22, 3.28, 0.46], [23, 2.94, 1.58], [24, 2.64, 0.97],
          ],
        },
      ],
      pasos: [
        {
          titulo: 'Paso 1: Gran media (X̿)',
          explicacion:
            'La gran media es el promedio general del proceso y será la línea central de la gráfica X̄. Se suman los 24 promedios y se divide entre 24.',
          formula: '\\bar{\\bar{X}} = \\frac{\\sum \\bar{X}}{24}',
          sustitucion: [
            '\\sum \\bar{X} = 3.25 + 3.11 + 3.22 + 3.39 + 3.07 + 2.86 + 3.05 + 2.65 + 3.02 + 2.85 + 2.83 + 2.97',
            '\\qquad +\\; 3.11 + 2.83 + 3.12 + 2.86 + 2.86 + 2.74 + 3.13 + 2.89 + 2.65 + 3.28 + 2.94 + 2.64 = 71.32',
            '\\bar{\\bar{X}} = \\frac{71.32}{24} = 2.9717 \\approx 2.972',
          ],
          resultado: '\\bar{\\bar{X}} = 2.972 \\;\\Rightarrow\\; LC_{\\bar{X}} = 2.972',
        },
        {
          titulo: 'Paso 2: Rango promedio (R̄)',
          explicacion:
            'El rango promedio representa la variabilidad media del proceso; es la línea central de la gráfica R y se usa para los límites de la gráfica X̄.',
          formula: '\\bar{R} = \\frac{\\sum R}{24}',
          sustitucion: [
            '\\sum R = 0.71 + 1.18 + 1.43 + 1.26 + 1.17 + 0.32 + 0.53 + 1.13 + 0.71 + 1.33 + 1.17 + 0.40',
            '\\qquad +\\; 0.85 + 1.31 + 1.06 + 0.50 + 1.43 + 1.29 + 1.41 + 1.09 + 1.08 + 0.46 + 1.58 + 0.97 = 24.37',
            '\\bar{R} = \\frac{24.37}{24} = 1.0154 \\approx 1.015',
          ],
          resultado: '\\bar{R} = 1.015',
        },
        {
          titulo: 'Paso 3: Límites de la gráfica X̄',
          explicacion:
            'Con A₂ = 0.729 se calculan los límites del promedio alrededor de la gran media.',
          formula: [
            'LCS_{\\bar{X}} = \\bar{\\bar{X}} + A_2\\bar{R}',
            'LC_{\\bar{X}} = \\bar{\\bar{X}}',
            'LCI_{\\bar{X}} = \\bar{\\bar{X}} - A_2\\bar{R}',
          ],
          sustitucion: [
            'LCS_{\\bar{X}} = 2.972 + 0.729(1.015) = 3.712',
            'LCI_{\\bar{X}} = 2.972 - 0.729(1.015) = 2.231',
          ],
          nota: 'Resultado: LCS = 3.712, LC = 2.972, LCI = 2.231.',
        },
        {
          titulo: 'Paso 4: Límites de la gráfica R',
          explicacion: 'Con D₃ = 0 y D₄ = 2.282 se calculan los límites de la variabilidad.',
          formula: [
            'LCS_{R} = D_4\\bar{R}',
            'LC_{R} = \\bar{R}',
            'LCI_{R} = D_3\\bar{R}',
          ],
          sustitucion: ['LCS_{R} = 2.282(1.015) = 2.317', 'LCI_{R} = 0(1.015) = 0'],
          nota: 'Resultado: LCS = 2.317, LC = 1.015, LCI = 0.',
        },
        {
          titulo: 'Paso 5: Verificación',
          explicacion:
            'Se comparan todos los X̄ y R contra sus límites. En X̄ el menor valor es 2.64 y el mayor 3.39 (dentro de 2.231–3.712). En R el menor es 0.32 y el mayor 1.58 (dentro de 0–2.317).',
          resultado: '\\text{Ningún punto fuera de límites}',
        },
      ],
      graficos: [
        {
          titulo: 'Gráfica X̄ — Promedio por hora',
          etiquetaX: 'Hora',
          etiquetaY: 'Promedio (X̄)',
          decimales: 2,
          series: [
            3.25, 3.11, 3.22, 3.39, 3.07, 2.86, 3.05, 2.65, 3.02, 2.85, 2.83, 2.97, 3.11, 2.83,
            3.12, 2.86, 2.86, 2.74, 3.13, 2.89, 2.65, 3.28, 2.94, 2.64,
          ],
          limites: { LCS: 3.712, LC: 2.972, LCI: 2.231 },
        },
        {
          titulo: 'Gráfica R — Rango por hora',
          etiquetaX: 'Hora',
          etiquetaY: 'Rango (R)',
          decimales: 2,
          series: [
            0.71, 1.18, 1.43, 1.26, 1.17, 0.32, 0.53, 1.13, 0.71, 1.33, 1.17, 0.4, 0.85, 1.31,
            1.06, 0.5, 1.43, 1.29, 1.41, 1.09, 1.08, 0.46, 1.58, 0.97,
          ],
          limites: { LCS: 2.317, LC: 1.015, LCI: 0 },
        },
      ],
      interpretacion:
        'Como todos los valores de X̄ y R se encuentran dentro de los límites de control, el proceso de corte de precisión de alambre está bajo control estadístico. Las variaciones observadas son normales del proceso y no se identifican causas especiales que afecten la producción.',
    },

    // ------------------------------------------------------------------
    {
      id: 'uniones-soldadura',
      titulo: 'Uniones de soldadura',
      etiqueta: 'Gráfica p (atributos)',
      enunciado:
        'Se registran los números de uniones de soldadura defectuosas en muestras sucesivas de 500 uniones soldadas, durante 21 días. Construya un diagrama de control de la fracción defectuosa.',
      datos: [
        { label: 'Días', valor: '21' },
        { label: 'n', valor: '500' },
        { label: '∑ defectos', valor: '1581' },
      ],
      tablas: [
        {
          titulo: 'Datos iniciales: número de defectos por día (n = 500)',
          columnas: ['Día', 'Defectos'],
          decimales: [0, 0],
          dividir: 2,
          filas: [
            [1, 106], [2, 116], [3, 164], [4, 89], [5, 99], [6, 40], [7, 112], [8, 36],
            [9, 69], [10, 74], [11, 42], [12, 37], [13, 25], [14, 88], [15, 101], [16, 64],
            [17, 51], [18, 74], [19, 71], [20, 43], [21, 80],
          ],
        },
      ],
      pasos: [
        {
          titulo: 'Paso 1: Identificar los datos',
          explicacion:
            'Cada día se inspeccionan 500 uniones durante 21 días. El total inspeccionado es el producto de ambos.',
          formula: 'N = \\text{días} \\times n',
          sustitucion: ['N = 21 \\times 500 = 10500'],
          resultado: 'N = 10500',
        },
        {
          titulo: 'Paso 2: Sumar todos los defectos',
          explicacion: 'Se suman los defectos de los 21 días.',
          sustitucion: [
            '\\sum d = 106 + 116 + 164 + 89 + 99 + 40 + 112 + 36 + 69 + 74',
            '\\qquad +\\; 42 + 37 + 25 + 88 + 101 + 64 + 51 + 74 + 71 + 43 + 80 = 1581',
          ],
          resultado: '\\sum d = 1581',
        },
        {
          titulo: 'Paso 3: Fracción defectuosa promedio (p̄)',
          explicacion:
            'Es el total de defectos entre el total inspeccionado; será la línea central de la gráfica p.',
          formula: '\\bar{p} = \\frac{\\sum d}{N}',
          sustitucion: ['\\bar{p} = \\frac{1581}{10500} = 0.1506'],
          resultado: '\\bar{p} = 0.1506 \\;(15.06\\%)',
        },
        {
          titulo: 'Paso 4: Límites de control',
          explicacion:
            'En la gráfica p los límites se calculan a 3σ usando la fracción promedio y el tamaño de muestra.',
          formula: [
            'LCS_p = \\bar{p} + 3\\sqrt{\\frac{\\bar{p}(1-\\bar{p})}{n}}',
            'LCI_p = \\bar{p} - 3\\sqrt{\\frac{\\bar{p}(1-\\bar{p})}{n}}',
          ],
          sustitucion: [
            '\\frac{\\bar{p}(1-\\bar{p})}{n} = \\frac{0.1506(0.8494)}{500} = \\frac{0.12793}{500} = 0.00025587',
            '3\\sqrt{0.00025587} = 3(0.015996) = 0.04799',
            'LCS_p = 0.1506 + 0.0480 = 0.1986',
            'LCI_p = 0.1506 - 0.0480 = 0.1026',
          ],
          nota: 'Resultado: LCI = 0.1026 (10.26%), LC = 0.1506 (15.06%), LCS = 0.1986 (19.86%).',
        },
        {
          titulo: 'Paso 5: Fracción defectuosa por día',
          explicacion: 'Para cada día se divide el número de defectos entre 500. Ejemplo, día 1:',
          formula: 'p_i = \\frac{d_i}{n}',
          sustitucion: ['p_1 = \\frac{106}{500} = 0.212 \\;(21.2\\%)'],
        },
        {
          titulo: 'Paso 6: Comparar contra los límites',
          explicacion:
            'Un día está bajo control si su proporción cae dentro del rango. Convertido a cantidad de defectos (×500): LCI ≈ 51, LC ≈ 75, LCS ≈ 99.',
          sustitucion: ['0.1026 \\le p \\le 0.1986'],
          nota: 'Un día está bajo control si tiene aproximadamente entre 51 y 99 defectos.',
        },
      ],
      graficos: [
        {
          titulo: 'Gráfica p — Fracción defectuosa por día',
          etiquetaX: 'Día',
          etiquetaY: 'Proporción (p)',
          decimales: 4,
          series: [
            0.212, 0.232, 0.328, 0.178, 0.198, 0.08, 0.224, 0.072, 0.138, 0.148, 0.084, 0.074,
            0.05, 0.176, 0.202, 0.128, 0.102, 0.148, 0.142, 0.086, 0.16,
          ],
          limites: { LCS: 0.1986, LC: 0.1506, LCI: 0.1026 },
        },
      ],
      interpretacion:
        'Se usa la gráfica p porque se trabaja con unidades defectuosas en muestras de tamaño constante (500). Al comparar los defectos diarios contra los límites, varios días quedan fuera del rango permitido, por lo que el proceso NO está bajo control estadístico. Existen causas especiales que deben investigarse: fallas del equipo, problemas del material, errores del operario o cambios en las condiciones de soldadura.',
    },

    // ------------------------------------------------------------------
    {
      id: 'barras-aluminio',
      titulo: 'Control de calidad: barras de aluminio',
      etiqueta: 'X̄–R + Capacidad (Cp, Cpk) + % defectos',
      enunciado:
        'Un dado de extrusión produce barras de aluminio; el diámetro es una característica crítica. Se muestran X̄ y R para 20 muestras de 5 barras. Las especificaciones son 0.5035 ± 0.0010 pulgadas (trabajadas en la escala de la tabla: LIE = 25, objetivo = 35, LES = 45). Establezca las gráficas revisando los límites si hay causas asignables, calcule Cp y Cpk e interprete, y determine el porcentaje de defectos.',
      datos: [
        { label: 'Muestras', valor: '20' },
        { label: 'n', valor: '5' },
        { label: 'A₂', valor: '0.577' },
        { label: 'D₄', valor: '2.114' },
        { label: 'd₂', valor: '2.326' },
        { label: '∑X̄', valor: '686.4' },
        { label: '∑R', valor: '113' },
      ],
      tablas: [
        {
          titulo: 'Datos iniciales: promedio (X̄) y rango (R) por muestra (n = 5)',
          columnas: ['Muestra', 'X̄', 'R'],
          decimales: [0, 1, 0],
          dividir: 2,
          filas: [
            [1, 34.2, 3], [2, 31.6, 4], [3, 31.8, 4], [4, 33.4, 5], [5, 35.0, 4],
            [6, 32.1, 2], [7, 32.6, 7], [8, 33.8, 9], [9, 34.8, 10], [10, 38.6, 4],
            [11, 35.4, 8], [12, 34.0, 6], [13, 36.0, 4], [14, 37.2, 7], [15, 35.2, 3],
            [16, 33.4, 10], [17, 35.0, 4], [18, 34.4, 7], [19, 33.9, 8], [20, 34.0, 4],
          ],
          nota: 'La muestra 10 (X̄ = 38.6) resulta una causa asignable; ver pasos 4–6.',
        },
      ],
      pasos: [
        {
          titulo: 'Paso 1: Gran media inicial',
          explicacion: 'Promedio de los 20 promedios.',
          formula: '\\bar{\\bar{X}} = \\frac{\\sum \\bar{X}}{20}',
          sustitucion: [
            '\\sum \\bar{X} = 34.2 + 31.6 + 31.8 + 33.4 + 35.0 + 32.1 + 32.6 + 33.8 + 34.8 + 38.6',
            '\\qquad +\\; 35.4 + 34.0 + 36.0 + 37.2 + 35.2 + 33.4 + 35.0 + 34.4 + 33.9 + 34.0 = 686.4',
            '\\bar{\\bar{X}} = \\frac{686.4}{20} = 34.32',
          ],
          resultado: '\\bar{\\bar{X}} = 34.32',
        },
        {
          titulo: 'Paso 2: Rango promedio inicial',
          formula: '\\bar{R} = \\frac{\\sum R}{20}',
          sustitucion: [
            '\\sum R = 3 + 4 + 4 + 5 + 4 + 2 + 7 + 9 + 10 + 4 + 8 + 6 + 4 + 7 + 3 + 10 + 4 + 7 + 8 + 4 = 113',
            '\\bar{R} = \\frac{113}{20} = 5.65',
          ],
          resultado: '\\bar{R} = 5.65',
        },
        {
          titulo: 'Paso 3: Límites iniciales',
          explicacion: 'Límites de prueba para X̄ (con A₂) y R (con D₄ y D₃ = 0).',
          formula: ['LCS_{\\bar{X}} = \\bar{\\bar{X}} \\pm A_2\\bar{R}', 'LCS_{R} = D_4\\bar{R}'],
          sustitucion: [
            'A_2\\bar{R} = 0.577 \\times 5.65 = 3.26',
            'LCS_{\\bar{X}} = 34.32 + 3.26 = 37.58, \\quad LCI_{\\bar{X}} = 34.32 - 3.26 = 31.06',
            'D_4\\bar{R} = 2.114 \\times 5.65 = 11.94 \\;\\Rightarrow\\; LCS_R = 11.94,\\; LC_R = 5.65,\\; LCI_R = 0',
          ],
        },
        {
          titulo: 'Paso 4: Detectar causa asignable',
          explicacion:
            'La muestra 10 tiene X̄ = 38.6, que supera el LCS = 37.58. Como el enunciado permite causas asignables, se elimina y se recalcula.',
          sustitucion: ['38.6 > 37.58 \\;\\Rightarrow\\; \\text{muestra 10 fuera de control}'],
        },
        {
          titulo: 'Paso 5: Recalcular sin la muestra 10',
          explicacion: 'La muestra 10 tenía X̄ = 38.6 y R = 4. Quedan 19 muestras.',
          sustitucion: [
            '\\bar{\\bar{X}} = \\frac{686.4 - 38.6}{19} = \\frac{647.8}{19} = 34.095',
            '\\bar{R} = \\frac{113 - 4}{19} = \\frac{109}{19} = 5.737',
          ],
        },
        {
          titulo: 'Paso 6: Límites revisados',
          sustitucion: [
            'A_2\\bar{R} = 0.577 \\times 5.737 = 3.310',
            'LCS_{\\bar{X}} = 34.095 + 3.310 = 37.405, \\quad LCI_{\\bar{X}} = 34.095 - 3.310 = 30.785',
            'D_4\\bar{R} = 2.114 \\times 5.737 = 12.128 \\;\\Rightarrow\\; LCS_R = 12.128,\\; LC_R = 5.737,\\; LCI_R = 0',
          ],
          nota: 'Con la muestra 10 eliminada, los puntos restantes quedan dentro de los límites: proceso bajo control.',
        },
        {
          titulo: 'Paso 7: Desviación estándar estimada',
          explicacion: 'Se estima a partir del rango promedio revisado y la constante d₂.',
          formula: '\\hat{\\sigma} = \\frac{\\bar{R}}{d_2}',
          sustitucion: ['\\hat{\\sigma} = \\frac{5.737}{2.326} = 2.466'],
          resultado: '\\hat{\\sigma} = 2.466',
        },
        {
          titulo: 'Paso 8: Índice de capacidad Cp',
          explicacion: 'Compara la amplitud de las especificaciones con la dispersión (6σ).',
          formula: 'C_p = \\frac{LES - LIE}{6\\hat{\\sigma}}',
          sustitucion: ['C_p = \\frac{45 - 25}{6(2.466)} = \\frac{20}{14.796} = 1.35'],
          resultado: 'C_p = 1.35',
        },
        {
          titulo: 'Paso 9: Índice de capacidad centrado Cpk',
          explicacion: 'Penaliza el descentrado respecto al objetivo tomando el mínimo de ambos lados.',
          formula: 'C_{pk} = \\min\\!\\left(\\frac{LES - \\bar{\\bar{X}}}{3\\hat{\\sigma}}, \\frac{\\bar{\\bar{X}} - LIE}{3\\hat{\\sigma}}\\right)',
          sustitucion: [
            '\\frac{LES - \\bar{\\bar{X}}}{3\\hat{\\sigma}} = \\frac{45 - 34.095}{3 \\times 2.466} = \\frac{10.905}{7.398} = 1.474',
            '\\frac{\\bar{\\bar{X}} - LIE}{3\\hat{\\sigma}} = \\frac{34.095 - 25}{3 \\times 2.466} = \\frac{9.095}{7.398} = 1.229',
            'C_{pk} = \\min(1.474,\\; 1.229) = 1.23',
          ],
          resultado: 'C_{pk} = 1.23',
        },
        {
          titulo: 'Paso 10: Porcentaje de defectos',
          explicacion:
            'Usando la distribución normal con μ = 34.095 y σ̂ = 2.466 se calculan los valores z hacia cada especificación.',
          formula: 'z = \\frac{\\text{límite} - \\mu}{\\hat{\\sigma}}',
          sustitucion: [
            'z_{LIE} = \\frac{25 - 34.095}{2.466} = -3.69',
            'z_{LES} = \\frac{45 - 34.095}{2.466} = 4.42',
            'P(\\text{defecto}) = 0.000118 = 0.0118\\%',
          ],
          resultado: '0.0118\\% \\text{ de defectos}',
        },
      ],
      graficos: [
        {
          titulo: 'Gráfica X̄ (límites iniciales) — la muestra 10 sale de control',
          etiquetaX: 'Muestra',
          etiquetaY: 'Promedio (X̄)',
          decimales: 2,
          series: [
            34.2, 31.6, 31.8, 33.4, 35.0, 32.1, 32.6, 33.8, 34.8, 38.6, 35.4, 34.0, 36.0, 37.2,
            35.2, 33.4, 35.0, 34.4, 33.9, 34.0,
          ],
          limites: { LCS: 37.58, LC: 34.32, LCI: 31.06 },
        },
        {
          titulo: 'Gráfica R (límites iniciales)',
          etiquetaX: 'Muestra',
          etiquetaY: 'Rango (R)',
          decimales: 2,
          series: [3, 4, 4, 5, 4, 2, 7, 9, 10, 4, 8, 6, 4, 7, 3, 10, 4, 7, 8, 4],
          limites: { LCS: 11.94, LC: 5.65, LCI: 0 },
        },
      ],
      interpretacion:
        'La muestra 10 estaba fuera del LCS de la gráfica X̄ (causa asignable); al eliminarla y recalcular, el proceso queda bajo control. El Cp = 1.35 indica buena capacidad potencial, pero el Cpk = 1.23 (menor que Cp) muestra que el proceso no está perfectamente centrado respecto al objetivo, por lo que conviene ajustar la media. El porcentaje estimado de defectos es muy bajo (0.0118%).',
    },

    // ------------------------------------------------------------------
    {
      id: 'vasos-helado',
      titulo: 'Llenado de vasos de helado',
      etiqueta: 'Gráfica X̄ (n = 25)',
      enunciado:
        'Realice una gráfica X̄ para el proceso de llenado de vasos de helado, del cual se desconocen el promedio y la desviación estándar del peso en gramos. Se toman muestras de 25 unidades durante 20 días, registrando el peso promedio y el rango.',
      datos: [
        { label: 'Días', valor: '20' },
        { label: 'n', valor: '25' },
        { label: 'A₂', valor: '0.153' },
        { label: '∑X̄', valor: '5081.7' },
        { label: '∑R', valor: '79.9' },
      ],
      tablas: [
        {
          titulo: 'Datos iniciales: peso promedio (X̄) y rango (R) por día (n = 25)',
          columnas: ['Día', 'X̄', 'R'],
          decimales: [0, 1, 1],
          dividir: 2,
          filas: [
            [1, 253.4, 5.4], [2, 256.4, 3.2], [3, 249.1, 4.8], [4, 259.0, 3.7], [5, 261.2, 4.2],
            [6, 251.5, 3.0], [7, 255.0, 3.2], [8, 254.5, 2.9], [9, 260.7, 2.5], [10, 265.2, 6.1],
            [11, 258.0, 5.2], [12, 254.2, 3.4], [13, 243.8, 4.0], [14, 248.0, 2.9], [15, 254.3, 3.8],
            [16, 260.4, 5.1], [17, 247.1, 4.5], [18, 253.7, 2.5], [19, 247.2, 4.3], [20, 249.0, 5.2],
          ],
          nota: 'Totales: ∑X̄ = 5081.7, ∑R = 79.9.',
        },
      ],
      pasos: [
        {
          titulo: 'Paso 1: Gran media (línea central)',
          explicacion: 'Promedio de los promedios diarios; será la LC de la gráfica X̄.',
          formula: '\\bar{\\bar{X}} = \\frac{\\sum \\bar{X}}{20}',
          sustitucion: [
            '\\sum \\bar{X} = 253.4 + 256.4 + 249.1 + 259.0 + 261.2 + 251.5 + 255.0 + 254.5 + 260.7 + 265.2',
            '\\qquad +\\; 258.0 + 254.2 + 243.8 + 248.0 + 254.3 + 260.4 + 247.1 + 253.7 + 247.2 + 249.0 = 5081.7',
            '\\bar{\\bar{X}} = \\frac{5081.7}{20} = 254.085',
          ],
          resultado: 'LC_{\\bar{X}} = 254.085',
        },
        {
          titulo: 'Paso 2: Rango promedio',
          explicacion: 'Se necesita para los límites aunque solo se pida la gráfica X̄.',
          formula: '\\bar{R} = \\frac{\\sum R}{20}',
          sustitucion: [
            '\\sum R = 5.4 + 3.2 + 4.8 + 3.7 + 4.2 + 3.0 + 3.2 + 2.9 + 2.5 + 6.1',
            '\\qquad +\\; 5.2 + 3.4 + 4.0 + 2.9 + 3.8 + 5.1 + 4.5 + 2.5 + 4.3 + 5.2 = 79.9',
            '\\bar{R} = \\frac{79.9}{20} = 3.996',
          ],
          resultado: '\\bar{R} = 3.996',
        },
        {
          titulo: 'Paso 3: Constante para n = 25',
          explicacion: 'De la tabla de constantes para gráficos X̄–R, con n = 25.',
          sustitucion: ['A_2 = 0.153'],
        },
        {
          titulo: 'Paso 4: Límites de control',
          formula: 'LCS_{\\bar{X}},\\,LCI_{\\bar{X}} = \\bar{\\bar{X}} \\pm A_2\\bar{R}',
          sustitucion: [
            'A_2\\bar{R} = 0.153(3.996) = 0.611',
            'LCS = 254.085 + 0.611 = 254.696',
            'LCI = 254.085 - 0.611 = 253.474',
          ],
          nota: 'El proceso estaría bajo control si 253.474 ≤ X̄ ≤ 254.696.',
        },
        {
          titulo: 'Paso 5: Comparar con la tabla',
          explicacion:
            'Ejemplos: día 5 con X̄ = 261.2 (> 254.696) y día 13 con X̄ = 243.8 (< 253.474) están fuera. Solo los días 8, 12, 15 y 18 quedan dentro de los límites.',
          sustitucion: ['261.2 > 254.696, \\quad 243.8 < 253.474'],
        },
      ],
      graficos: [
        {
          titulo: 'Gráfica X̄ — Peso promedio por día',
          etiquetaX: 'Día',
          etiquetaY: 'Peso promedio (g)',
          decimales: 3,
          series: [
            253.4, 256.4, 249.1, 259.0, 261.2, 251.5, 255.0, 254.5, 260.7, 265.2, 258.0, 254.2,
            243.8, 248.0, 254.3, 260.4, 247.1, 253.7, 247.2, 249.0,
          ],
          limites: { LCS: 254.696, LC: 254.085, LCI: 253.474 },
        },
      ],
      interpretacion:
        'Varios promedios diarios quedan fuera de los límites de control, por lo que el proceso de llenado de vasos de helado NO está bajo control estadístico. El peso promedio no se mantiene estable durante los 20 días; la variación no parece ser solo natural, sino que sugiere causas especiales. Se recomienda revisar el proceso antes de considerarlo estable.',
    },
  ],

  // Tabla de fórmulas: nombre, fórmula (KaTeX) y para qué se usa.
  formulas: [
    // --- Gráficas X̄ y R (variables medibles) ---
    {
      categoria: 'Gráficas X̄ y R (variables medibles)',
      nombre: 'Media',
      simbolo: '\\bar{x}',
      formula: '\\bar{x} = \\frac{\\sum x_i}{n}',
      descripcion: 'Promedio de las observaciones de un subgrupo. Es cada punto graficado en la gráfica X̄.',
    },
    {
      categoria: 'Gráficas X̄ y R (variables medibles)',
      nombre: 'Gran media',
      simbolo: '\\bar{\\bar{x}}',
      formula: '\\bar{\\bar{x}} = \\frac{\\sum \\bar{x}_i}{k}',
      descripcion: 'Promedio de todos los promedios. Es la línea central (LC) de la gráfica X̄.',
    },
    {
      categoria: 'Gráficas X̄ y R (variables medibles)',
      nombre: 'Rango',
      simbolo: 'R',
      formula: 'R = x_{max} - x_{min}',
      descripcion: 'Diferencia entre el mayor y el menor valor de un subgrupo. Mide la variabilidad dentro de la muestra.',
    },
    {
      categoria: 'Gráficas X̄ y R (variables medibles)',
      nombre: 'Rango promedio',
      simbolo: '\\bar{R}',
      formula: '\\bar{R} = \\frac{\\sum R_i}{k}',
      descripcion: 'Promedio de los rangos. Es la línea central de la gráfica R y se usa para los límites de la gráfica X̄.',
    },
    {
      categoria: 'Gráficas X̄ y R (variables medibles)',
      nombre: 'Límites de la gráfica X̄',
      formula: 'LCS,\\,LCI_{\\bar{x}} = \\bar{\\bar{x}} \\pm A_2\\bar{R}',
      descripcion: 'Límites de control del promedio (LC = X̿). Detectan corrimientos en el centro del proceso.',
    },
    {
      categoria: 'Gráficas X̄ y R (variables medibles)',
      nombre: 'Límites de la gráfica R',
      formula: 'LCS_R = D_4\\bar{R}, \\quad LCI_R = D_3\\bar{R}',
      descripcion: 'Límites de control de la variabilidad (LC = R̄). Detectan cambios en la dispersión del proceso.',
    },
    {
      categoria: 'Gráficas X̄ y R (variables medibles)',
      nombre: 'Desviación estándar estimada',
      simbolo: '\\hat{\\sigma}',
      formula: '\\hat{\\sigma} = \\frac{\\bar{R}}{d_2}',
      descripcion: 'Estima la desviación estándar del proceso a partir del rango promedio. Necesaria para los índices de capacidad.',
    },
    // --- Gráfica p (atributos) ---
    {
      categoria: 'Gráfica p (atributos)',
      nombre: 'Proporción',
      simbolo: 'p',
      formula: 'p = \\frac{d}{n}',
      descripcion: 'Fracción defectuosa de una muestra (defectos entre tamaño de muestra). Es cada punto de la gráfica p.',
    },
    {
      categoria: 'Gráfica p (atributos)',
      nombre: 'Proporción promedio',
      simbolo: '\\bar{p}',
      formula: '\\bar{p} = \\frac{\\sum d_i}{\\sum n_i}',
      descripcion: 'Fracción defectuosa promedio de todo el proceso. Es la línea central de la gráfica p.',
    },
    {
      categoria: 'Gráfica p (atributos)',
      nombre: 'Límites de la gráfica p',
      formula: 'LCS,\\,LCI = \\bar{p} \\pm 3\\sqrt{\\frac{\\bar{p}(1-\\bar{p})}{n}}',
      descripcion: 'Límites de control a 3σ de la proporción defectuosa. Si LCI da negativo, se toma 0.',
    },
    // --- Capacidad del proceso ---
    {
      categoria: 'Capacidad del proceso',
      nombre: 'Índice de capacidad',
      simbolo: 'C_p',
      formula: 'C_p = \\frac{LES - LIE}{6\\hat{\\sigma}}',
      descripcion: 'Compara la amplitud de las especificaciones con la dispersión del proceso. Mide la capacidad potencial.',
    },
    {
      categoria: 'Capacidad del proceso',
      nombre: 'Índice de capacidad centrado',
      simbolo: 'C_{pk}',
      formula: 'C_{pk} = \\min\\!\\left(\\frac{LES - \\bar{\\bar{x}}}{3\\hat{\\sigma}}, \\frac{\\bar{\\bar{x}} - LIE}{3\\hat{\\sigma}}\\right)',
      descripcion: 'Capacidad real considerando qué tan centrado está el proceso respecto al objetivo. Si Cpk < Cp, está descentrado.',
    },
  ],

  // Pendiente: el estudiante creará videos en YouTube (tutoriales de Excel QM)
  // y enlazará los documentos de Excel QM alojados en Google Drive.
  recursos: { videos: [], documentos: [] },
}
