// Contenido del tema "Programación" (lineal, entera, por metas y no lineal).
// Sigue estructuraPaginas_Temas.md, incluida la regla obligatoria: mostrar TODA
// la aritmética (sumas término por término y multiplicaciones explícitas).
// Fórmulas en KaTeX (escapar \\). Las gráficas usan el componente FeasibleRegion
// (tipo: 'region'). Casos de la empresa Transportes Logísticos del Caribe S.A.
// (provincia de Limón) y un ejercicio de práctica de un taller textil.

// Colores de las rectas de restricción (reutilizados en las gráficas).
const cAzul = '#0067A0'
const cRojo = '#C2362F'
const cVerde = '#00713C'

export const programacion = {
  resumen: {
    intro:
      'La Programación es un conjunto de técnicas de optimización matemática que buscan el mejor valor posible (máximo o mínimo) de una función objetivo, sujeta a un conjunto de restricciones que representan los recursos o condiciones disponibles. Según la naturaleza de las variables y de las funciones, se distinguen cuatro variantes: lineal, entera, por metas y no lineal.',
    parrafos: [
      'En la Programación Lineal (PL) tanto la función objetivo como las restricciones son lineales y las variables son continuas; la solución óptima siempre se ubica en un vértice de la región factible, que se evalúa con el método gráfico o el algoritmo símplex.',
      'La Programación Entera (PE) exige que las variables de decisión tomen valores enteros, porque representan unidades indivisibles (prendas, viajes de camión, lotes). El simple redondeo de la solución continua no garantiza ni factibilidad ni optimalidad, por lo que se usan métodos sistemáticos como Branch and Bound o el algoritmo de Gomory.',
      'La Programación por Metas (PM) es un enfoque multicriterio basado en la teoría de Herbert Simon: en lugar de optimizar un único objetivo, satisface varias metas ordenadas por prioridad. Para ello incorpora variables de desviación (d⁻ faltante, d⁺ exceso) y minimiza de forma lexicográfica las desviaciones indeseables de cada meta.',
      'La Programación No Lineal (PNL) aparece cuando la función objetivo o alguna restricción contiene términos no lineales (potencias o productos entre variables). A diferencia de la PL, el óptimo puede estar en un punto interior de la región factible; se identifica con derivadas parciales, las condiciones KKT y solvers como el motor GRG Nonlinear de Excel.',
    ],
    conceptos: [
      {
        titulo: 'Función objetivo',
        detalle: 'Expresión Z que se desea maximizar (ganancia) o minimizar (costo/desviaciones).',
      },
      {
        titulo: 'Restricciones',
        detalle: 'Desigualdades o igualdades que limitan los recursos y delimitan la región factible.',
      },
      {
        titulo: 'Variables enteras',
        detalle: 'En PE las variables deben cumplir xⱼ ≥ 0 y xⱼ ∈ ℤ (unidades completas).',
      },
      {
        titulo: 'Variables de desviación',
        detalle: 'En PM, dₖ⁻ y dₖ⁺ miden cuánto falta o sobra respecto a cada meta priorizada.',
      },
    ],
  },

  ejercicios: [
    // ============================================================
    // Ejercicio 1: Programación Entera — Caso transporte (Limón)
    // ============================================================
    {
      id: 'pe-transporte',
      titulo: 'Programación Entera: planificación de viajes de Transportes Logísticos del Caribe',
      etiqueta: 'Programación Entera — método gráfico',
      enunciado:
        'Transportes Logísticos del Caribe S.A. traslada contenedores secos y refrigerados desde las empacadoras de Matina y el Valle de La Estrella hasta APM Terminals en Moín. Cada viaje seco deja $50 y cada refrigerado $60. Dispone de un máximo de 160 horas de conducción semanales (4 h por viaje seco, 2 h por refrigerado) y 500 galones de combustible (10 gal por seco, 15 gal por refrigerado). Como los viajes son indivisibles, las cantidades deben ser enteras. ¿Cuántos viajes de cada tipo maximizan la ganancia semanal?',
      datos: [
        { label: 'Ganancia seco', valor: '$50' },
        { label: 'Ganancia refrigerado', valor: '$60' },
        { label: 'Horas disp.', valor: '160' },
        { label: 'Combustible disp.', valor: '500 gal' },
      ],
      tablas: [
        {
          titulo: 'Parámetros por tipo de viaje',
          columnas: ['Tipo de viaje', 'Ganancia ($)', 'Horas', 'Combustible (gal)'],
          decimales: [undefined, 0, 0, 0],
          filas: [
            ['Seco (x)', 50, 4, 10],
            ['Refrigerado (y)', 60, 2, 15],
            ['Disponible', '—', 160, 500],
          ],
        },
      ],
      pasos: [
        {
          titulo: 'Paso 1: Definición de las variables de decisión',
          explicacion: 'Se identifica qué se debe decidir: la cantidad de viajes de cada tipo a programar por semana.',
          sustitucion: [
            'x = \\text{viajes de contenedores secos por semana}',
            'y = \\text{viajes de contenedores refrigerados por semana}',
          ],
        },
        {
          titulo: 'Paso 2: Función objetivo',
          explicacion: 'Se maximiza la ganancia semanal: $50 por cada viaje seco más $60 por cada refrigerado.',
          formula: '\\max\\; Z = 50x + 60y',
        },
        {
          titulo: 'Paso 3: Restricciones',
          explicacion: 'Cada recurso limita la operación: las horas y el combustible utilizados no pueden superar lo disponible, y los viajes son enteros.',
          sustitucion: [
            '4x + 2y \\le 160 \\quad \\text{(horas de conducción)}',
            '10x + 15y \\le 500 \\quad \\text{(combustible)}',
            'x,\\; y \\ge 0 \\;\\text{y enteros}',
          ],
        },
        {
          titulo: 'Paso 4: Conversión de las restricciones en rectas',
          explicacion: 'Cada desigualdad se iguala para hallar los cortes con los ejes (haciendo cero una variable a la vez).',
          sustitucion: [
            'R_1:\\; 4x + 2y = 160 \\;\\Rightarrow\\; x{=}0{:}\\, 2y{=}160{\\to}y{=}80;\\;\\; y{=}0{:}\\, 4x{=}160{\\to}x{=}40',
            'R_2:\\; 10x + 15y = 500 \\;\\Rightarrow\\; x{=}0{:}\\, 15y{=}500{\\to}y{=}33.33;\\;\\; y{=}0{:}\\, 10x{=}500{\\to}x{=}50',
          ],
          nota: 'R₁ pasa por (0, 80) y (40, 0); R₂ pasa por (0, 33.33) y (50, 0).',
        },
        {
          titulo: 'Paso 5: Vértice de cruce de las dos restricciones (R₁ ∩ R₂)',
          explicacion: 'Se resuelve el sistema. De R₁ se despeja y; luego se sustituye en R₂ mostrando toda la aritmética.',
          sustitucion: [
            '\\text{De } R_1:\\; 4x + 2y = 160 \\;\\Rightarrow\\; 2x + y = 80 \\;\\Rightarrow\\; y = 80 - 2x',
            '\\text{En } R_2:\\; 10x + 15(80 - 2x) = 500',
            '10x + 1200 - 30x = 500',
            '-20x = 500 - 1200 = -700',
            'x = \\dfrac{-700}{-20} = 35',
            'y = 80 - 2(35) = 80 - 70 = 10',
          ],
          resultado: '\\text{Cruce } R_1 \\cap R_2 = (35,\\, 10) \\;\\text{(ya es entero)}',
        },
        {
          titulo: 'Paso 6: Evaluación de Z en cada vértice factible',
          explicacion: 'Se calcula la ganancia en los vértices (0,0), (40,0), (0,33) y (35,10), con cada multiplicación y suma explícita.',
          sustitucion: [
            'Z(0,0) = 50(0) + 60(0) = 0 + 0 = 0',
            'Z(40,0) = 50(40) + 60(0) = 2000 + 0 = 2000',
            'Z(0,33) = 50(0) + 60(33) = 0 + 1980 = 1980',
            'Z(35,10) = 50(35) + 60(10) = 1750 + 600 = 2350',
          ],
          tabla: {
            titulo: 'Ganancia por vértice',
            columnas: ['Vértice (x, y)', 'Z = 50x + 60y', 'Resultado ($)'],
            decimales: [undefined, undefined, 0],
            filas: [
              ['(0, 0)', '0 + 0', 0],
              ['(40, 0)', '2000 + 0', 2000],
              ['(0, 33)', '0 + 1980', 1980],
              ['(35, 10)', '1750 + 600', 2350],
            ],
          },
          resultado: '\\text{Óptimo: } (35,\\,10) \\;\\text{con } Z = \\$2\\,350',
        },
        {
          titulo: 'Paso 7: Verificación de la solución (35, 10)',
          explicacion: 'Se comprueba que la solución entera respeta ambos recursos.',
          sustitucion: [
            '\\text{Horas: } 4(35) + 2(10) = 140 + 20 = 160 \\le 160 \\;\\checkmark\\;(\\text{activa})',
            '\\text{Combustible: } 10(35) + 15(10) = 350 + 150 = 500 \\le 500 \\;\\checkmark\\;(\\text{activa})',
          ],
          resultado: 'x = 35,\\; y = 10,\\; Z = \\$2\\,350',
        },
      ],
      graficos: [
        {
          tipo: 'region',
          titulo: 'Región factible y solución óptima (35, 10), Z = $2 350',
          etiquetaX: 'x = viajes secos',
          etiquetaY: 'y = viajes refrigerados',
          xMax: 55,
          yMax: 40,
          rectas: [
            { label: 'Horas: 4x + 2y ≤ 160', color: cAzul, p1: { x: 0, y: 80 }, p2: { x: 40, y: 0 } },
            { label: 'Combustible: 10x + 15y ≤ 500', color: cRojo, p1: { x: 0, y: 33.33 }, p2: { x: 50, y: 0 } },
          ],
          region: [
            { x: 0, y: 0 },
            { x: 40, y: 0 },
            { x: 35, y: 10 },
            { x: 0, y: 33.33 },
          ],
          vertices: [
            { x: 40, y: 0, label: '(40, 0)' },
            { x: 0, y: 33.33, label: '(0, 33)' },
          ],
          optimo: { x: 35, y: 10, label: '(35, 10)' },
        },
      ],
      interpretacion:
        'La empresa debe programar 35 viajes secos y 10 refrigerados por semana, obteniendo una ganancia de $2 350. El cruce de las dos restricciones ya cae sobre un punto entero, así que no se requiere redondeo. Tanto las horas de conducción (160) como el combustible (500 gal) se usan por completo: ambos son cuellos de botella que limitan la producción.',
    },

    // ============================================================
    // Ejercicio 2: Programación Entera Pura — Taller textil (práctica)
    // ============================================================
    {
      id: 'pe-textil',
      titulo: 'Programación Entera Pura: planificación de producción en un taller textil',
      etiqueta: 'Ejercicio de práctica — Programación Entera',
      enunciado:
        'Un taller textil confecciona camisas y pantalones. Cada camisa deja $60 de ganancia y cada pantalón $50. La disponibilidad semanal es de 10 metros de tela (1 por camisa, 2 por pantalón), 11 horas de costura (2 por camisa, 1 por pantalón) y 9 cajas de botones (1 por cada prenda). Como las prendas se confeccionan completas, las cantidades deben ser enteras. ¿Cuántas camisas y pantalones maximizan la ganancia?',
      datos: [
        { label: 'Ganancia camisa', valor: '$60' },
        { label: 'Ganancia pantalón', valor: '$50' },
        { label: 'Tela', valor: '10 m' },
        { label: 'Tiempo', valor: '11 h' },
        { label: 'Botones', valor: '9 cajas' },
      ],
      tablas: [
        {
          titulo: 'Recursos por prenda y disponibilidad',
          columnas: ['Recurso', 'Por camisa', 'Por pantalón', 'Disponible'],
          decimales: [undefined, 0, 0, 0],
          filas: [
            ['Tela (metros)', 1, 2, 10],
            ['Tiempo (horas)', 2, 1, 11],
            ['Botones (cajas)', 1, 1, 9],
          ],
        },
      ],
      pasos: [
        {
          titulo: 'Paso 1: Definición de las variables',
          explicacion: 'Se decide cuántas unidades de cada prenda producir.',
          sustitucion: [
            'x_1 = \\text{número de camisas a producir}',
            'x_2 = \\text{número de pantalones a producir}',
          ],
        },
        {
          titulo: 'Paso 2: Función objetivo',
          explicacion: 'Se maximiza la ganancia: $60 por camisa más $50 por pantalón.',
          formula: '\\max\\; Z = 60x_1 + 50x_2',
        },
        {
          titulo: 'Paso 3: Restricciones',
          explicacion: 'Lo utilizado de cada recurso no puede superar lo disponible; las prendas son enteras.',
          sustitucion: [
            'x_1 + 2x_2 \\le 10 \\quad \\text{(tela)}',
            '2x_1 + x_2 \\le 11 \\quad \\text{(tiempo)}',
            'x_1 + x_2 \\le 9 \\quad \\text{(botones)}',
            'x_1,\\; x_2 \\ge 0 \\;\\text{y enteros}',
          ],
        },
        {
          titulo: 'Paso 4: Conversión de las restricciones en rectas',
          explicacion: 'Se hallan los cortes con los ejes de cada restricción.',
          sustitucion: [
            '\\text{Tela: } x_1 + 2x_2 = 10 \\Rightarrow (0,5)\\;\\text{y}\\;(10,0)',
            '\\text{Tiempo: } 2x_1 + x_2 = 11 \\Rightarrow (0,11)\\;\\text{y}\\;(5.5,\\,0)',
            '\\text{Botones: } x_1 + x_2 = 9 \\Rightarrow (0,9)\\;\\text{y}\\;(9,0)',
          ],
        },
        {
          titulo: 'Paso 5: Vértice de cruce de tela y tiempo',
          explicacion: 'Estas dos restricciones delimitan la parte superior de la región. Se resuelve el sistema con toda la aritmética.',
          sustitucion: [
            '\\text{De tiempo: } 2x_1 + x_2 = 11 \\;\\Rightarrow\\; x_2 = 11 - 2x_1',
            '\\text{En tela: } x_1 + 2(11 - 2x_1) = 10',
            'x_1 + 22 - 4x_1 = 10',
            '-3x_1 = 10 - 22 = -12',
            'x_1 = \\dfrac{-12}{-3} = 4',
            'x_2 = 11 - 2(4) = 11 - 8 = 3',
          ],
          nota: 'Se verifica la restricción de botones: 4 + 3 = 7 ≤ 9 ✓. El cruce (4, 3) es factible.',
        },
        {
          titulo: 'Paso 6: Evaluación de Z en cada vértice factible',
          explicacion: 'Se calcula la ganancia en (0,0), (5.5,0), (0,5) y (4,3) mostrando cada operación.',
          sustitucion: [
            'Z(0,0) = 60(0) + 50(0) = 0 + 0 = 0',
            'Z(5.5,\\,0) = 60(5.5) + 50(0) = 330 + 0 = 330',
            'Z(0,5) = 60(0) + 50(5) = 0 + 250 = 250',
            'Z(4,3) = 60(4) + 50(3) = 240 + 150 = 390',
          ],
          tabla: {
            titulo: 'Ganancia por vértice',
            columnas: ['Vértice (x₁, x₂)', 'Z = 60x₁ + 50x₂', 'Resultado ($)'],
            decimales: [undefined, undefined, 0],
            filas: [
              ['(0, 0)', '0 + 0', 0],
              ['(5.5, 0)', '330 + 0', 330],
              ['(0, 5)', '0 + 250', 250],
              ['(4, 3)', '240 + 150', 390],
            ],
          },
          resultado: '\\text{Óptimo: } (4,\\,3) \\;\\text{con } Z = \\$390',
        },
        {
          titulo: 'Paso 7: Verificación de la solución (4, 3)',
          explicacion: 'El punto ya es entero; se comprueban los tres recursos.',
          sustitucion: [
            '\\text{Tela: } 4 + 2(3) = 4 + 6 = 10 \\le 10 \\;\\checkmark\\;(\\text{activa})',
            '\\text{Tiempo: } 2(4) + 3 = 8 + 3 = 11 \\le 11 \\;\\checkmark\\;(\\text{activa})',
            '\\text{Botones: } 4 + 3 = 7 \\le 9 \\;\\checkmark\\;(\\text{holgura } 2)',
          ],
          resultado: 'x_1 = 4,\\; x_2 = 3,\\; Z = \\$390',
        },
      ],
      graficos: [
        {
          tipo: 'region',
          titulo: 'Región factible y solución óptima (4, 3), Z = $390',
          etiquetaX: 'x₁ = camisas',
          etiquetaY: 'x₂ = pantalones',
          xMax: 11,
          yMax: 11,
          rectas: [
            { label: 'Tela: x₁ + 2x₂ ≤ 10', color: cAzul, p1: { x: 0, y: 5 }, p2: { x: 10, y: 0 } },
            { label: 'Tiempo: 2x₁ + x₂ ≤ 11', color: cRojo, p1: { x: 0, y: 11 }, p2: { x: 5.5, y: 0 } },
            { label: 'Botones: x₁ + x₂ ≤ 9', color: cVerde, p1: { x: 0, y: 9 }, p2: { x: 9, y: 0 } },
          ],
          region: [
            { x: 0, y: 0 },
            { x: 5.5, y: 0 },
            { x: 4, y: 3 },
            { x: 0, y: 5 },
          ],
          vertices: [
            { x: 5.5, y: 0, label: '(5.5, 0)' },
            { x: 0, y: 5, label: '(0, 5)' },
          ],
          optimo: { x: 4, y: 3, label: '(4, 3)' },
        },
      ],
      interpretacion:
        'El taller debe producir 4 camisas y 3 pantalones por semana, con una ganancia de $390. El cruce de tela y tiempo cae en un punto entero, por lo que no hace falta redondear. La tela y el tiempo de costura se usan por completo (son los cuellos de botella) mientras que sobran 2 cajas de botones.',
    },

    // ============================================================
    // Ejercicio 3: Programación por Metas — Caso transporte (Limón)
    // ============================================================
    {
      id: 'pm-transporte',
      titulo: 'Programación por Metas: tres objetivos priorizados en Transportes del Caribe',
      etiqueta: 'Programación por Metas — prioridades lexicográficas',
      enunciado:
        'La misma empresa enfrenta ahora tres metas en orden estricto de importancia. P1 (Rentabilidad): alcanzar al menos $2 400 de ganancia semanal ($40 por viaje seco, $60 por refrigerado). P2 (Acuerdo sindical): asignar exactamente 160 horas de conducción (4 h seco, 2 h refrigerado), ni más ni menos. P3 (Política ambiental): no exceder 500 galones de combustible (10 gal seco, 15 gal refrigerado). ¿Cuántos viajes de cada tipo cumplen mejor las metas según su prioridad?',
      datos: [
        { label: 'P1 Ganancia', valor: '≥ $2 400' },
        { label: 'P2 Horas', valor: '= 160' },
        { label: 'P3 Combustible', valor: '≤ 500 gal' },
      ],
      tablas: [
        {
          titulo: 'Parámetros por tipo de viaje',
          columnas: ['Tipo de viaje', 'Ganancia ($)', 'Horas', 'Combustible (gal)'],
          decimales: [undefined, 0, 0, 0],
          filas: [
            ['Seco (x)', 40, 4, 10],
            ['Refrigerado (y)', 60, 2, 15],
          ],
        },
        {
          titulo: 'Metas ordenadas por prioridad',
          columnas: ['Prioridad', 'Meta', 'Condición', 'Valor', 'Desviación a minimizar'],
          filas: [
            ['P1', 'Rentabilidad', 'Alcanzar', '$2 400', 'd₁⁻ (faltante)'],
            ['P2', 'Horas sindicales', 'Exactamente', '160 h', 'd₂⁻ y d₂⁺'],
            ['P3', 'Combustible', 'No exceder', '500 gal', 'd₃⁺ (exceso)'],
          ],
        },
      ],
      pasos: [
        {
          titulo: 'Paso 1: Variables de decisión',
          explicacion: 'Las mismas decisiones operativas que en el caso anterior.',
          sustitucion: [
            'x = \\text{viajes secos por semana}',
            'y = \\text{viajes refrigerados por semana}',
          ],
        },
        {
          titulo: 'Paso 2: Restricciones iniciales de cada meta',
          explicacion: 'Cada meta se plantea primero como desigualdad o igualdad.',
          sustitucion: [
            '\\text{Ganancia: } 40x + 60y \\ge 2400',
            '\\text{Sindical: } 4x + 2y = 160',
            '\\text{Ambiental: } 10x + 15y \\le 500',
          ],
        },
        {
          titulo: 'Paso 3: Variables de desviación y ecuaciones de meta',
          explicacion: 'Cada meta se convierte en igualdad sumando el faltante (d⁻) y restando el exceso (d⁺).',
          sustitucion: [
            '40x + 60y + d_1^- - d_1^+ = 2400',
            '4x + 2y + d_2^- - d_2^+ = 160',
            '10x + 15y + d_3^- - d_3^+ = 500',
          ],
          nota: 'd⁻ = cuánto falta para la meta; d⁺ = cuánto se excede. Ambas son ≥ 0.',
        },
        {
          titulo: 'Paso 4: Función objetivo (minimizar desviaciones indeseables)',
          explicacion: 'Para P1 no queremos que falte dinero (d₁⁻); para P2 queremos horas exactas (d₂⁻ y d₂⁺); para P3 no queremos exceso de combustible (d₃⁺).',
          formula: '\\min\\; Z = P_1(d_1^-) + P_2(d_2^- + d_2^+) + P_3(d_3^+)',
        },
        {
          titulo: 'Paso 5: Solución manual con las dos prioridades más altas',
          explicacion: 'Se asume que P1 y P2 se cumplen perfectamente (sus desviaciones valen 0), lo que deja un sistema de 2×2. Se simplifica cada ecuación y se resuelve mostrando toda la aritmética.',
          sustitucion: [
            '\\text{Ganancia: } 40x + 60y = 2400 \\;\\xrightarrow{\\,\\div 20\\,}\\; 2x + 3y = 120',
            '\\text{Sindical: } 4x + 2y = 160 \\;\\xrightarrow{\\,\\div 2\\,}\\; 2x + y = 80',
            '\\text{Despejo } y \\text{ de la 2ª: } y = 80 - 2x',
            '\\text{Sustituyo en la 1ª: } 2x + 3(80 - 2x) = 120',
            '2x + 240 - 6x = 120',
            '-4x = 120 - 240 = -120',
            'x = \\dfrac{-120}{-4} = 30',
            'y = 80 - 2(30) = 80 - 60 = 20',
          ],
          resultado: '(x,\\,y) = (30,\\,20)',
        },
        {
          titulo: 'Paso 6: Evaluación de la solución (30, 20) frente a las tres metas',
          explicacion: 'Se comprueba cada meta con la aritmética completa para obtener sus desviaciones.',
          sustitucion: [
            '\\text{Meta 1: } 40(30) + 60(20) = 1200 + 1200 = 2400 = 2400 \\;\\Rightarrow\\; d_1^- = 0 \\;\\checkmark',
            '\\text{Meta 2: } 4(30) + 2(20) = 120 + 40 = 160 = 160 \\;\\Rightarrow\\; d_2^- = d_2^+ = 0 \\;\\checkmark',
            '\\text{Meta 3: } 10(30) + 15(20) = 300 + 300 = 600',
            '600 - 500 = 100 \\;\\Rightarrow\\; d_3^+ = 100 \\;(\\text{excede})',
          ],
          tabla: {
            titulo: 'Cumplimiento de las metas en (30, 20)',
            columnas: ['Meta', 'Valor obtenido', 'Objetivo', 'Desviación'],
            decimales: [undefined, 0, 0, undefined],
            filas: [
              ['P1 Ganancia', 2400, 2400, 'd₁⁻ = 0 ✓'],
              ['P2 Horas', 160, 160, 'd₂⁻ = d₂⁺ = 0 ✓'],
              ['P3 Combustible', 600, 500, 'd₃⁺ = 100'],
            ],
          },
          resultado: 'x = 30,\\; y = 20 \\;\\Rightarrow\\; P_1\\text{ y }P_2\\text{ cumplidas; } P_3\\text{ excede 100 gal}',
        },
      ],
      graficos: [
        {
          tipo: 'region',
          titulo: 'Metas P1 (ganancia) y P2 (horas) se cruzan en la solución (30, 20)',
          etiquetaX: 'x = viajes secos',
          etiquetaY: 'y = viajes refrigerados',
          xMax: 65,
          yMax: 85,
          rectas: [
            { label: 'P1 Ganancia: 40x + 60y = 2400', color: cVerde, p1: { x: 0, y: 40 }, p2: { x: 60, y: 0 } },
            { label: 'P2 Horas: 4x + 2y = 160', color: cAzul, p1: { x: 0, y: 80 }, p2: { x: 40, y: 0 } },
            { label: 'P3 Combustible: 10x + 15y = 500', color: cRojo, dash: true, p1: { x: 0, y: 33.33 }, p2: { x: 50, y: 0 } },
          ],
          optimo: { x: 30, y: 20, label: '(30, 20)' },
        },
      ],
      interpretacion:
        'El modelo indica programar 30 viajes secos y 20 refrigerados. Las dos prioridades más importantes se cumplen de forma perfecta: la rentabilidad de $2 400 queda asegurada y las 160 horas sindicales se respetan exactamente. El costo aparece en la meta ambiental: el consumo sube a 600 galones, 100 por encima del límite. La empresa asume ese exceso de forma consciente porque la prioridad ambiental fue jerarquizada por debajo de la supervivencia financiera y del acuerdo laboral; el dato exacto (100 galones) le sirve para negociar mejoras de eficiencia.',
    },

    // ============================================================
    // Ejercicio 4: Programación No Lineal — Costo de desgaste
    // ============================================================
    {
      id: 'pnl-transporte',
      titulo: 'Programación No Lineal: ganancia neta con costo de desgaste cuadrático',
      etiqueta: 'Programación No Lineal — derivadas y KKT',
      enunciado:
        'Estudios internos muestran que el desgaste de la flota crece de forma acelerada con la cantidad de viajes, según el costo C = 0.2x² + 0.3y². La empresa quiere maximizar la ganancia neta (ingreso $40 por viaje seco y $60 por refrigerado, menos el costo de desgaste), sujeta a un máximo de 160 horas (4 h seco, 2 h refrigerado) y 500 galones de combustible (10 gal seco, 15 gal refrigerado). ¿Cuántos viajes de cada tipo maximizan la utilidad neta?',
      datos: [
        { label: 'Ingreso seco', valor: '$40' },
        { label: 'Ingreso refrigerado', valor: '$60' },
        { label: 'Costo desgaste', valor: '0.2x² + 0.3y²' },
        { label: 'Horas', valor: '≤ 160' },
        { label: 'Combustible', valor: '≤ 500 gal' },
      ],
      tablas: [
        {
          titulo: 'Parámetros por tipo de viaje',
          columnas: ['Tipo de viaje', 'Ingreso ($)', 'Horas', 'Combustible (gal)', 'Coef. desgaste'],
          decimales: [undefined, 0, 0, 0, 1],
          filas: [
            ['Seco (x)', 40, 4, 10, 0.2],
            ['Refrigerado (y)', 60, 2, 15, 0.3],
          ],
        },
      ],
      pasos: [
        {
          titulo: 'Paso 1: Variables de decisión',
          explicacion: 'Mismas decisiones operativas que en los casos anteriores.',
          sustitucion: [
            'x = \\text{viajes secos por semana}',
            'y = \\text{viajes refrigerados por semana}',
          ],
        },
        {
          titulo: 'Paso 2: Función objetivo no lineal',
          explicacion: 'La utilidad neta es el ingreso lineal menos el costo de desgaste cuadrático C = 0.2x² + 0.3y².',
          formula: '\\max\\; Z = 40x + 60y - 0.2x^2 - 0.3y^2',
        },
        {
          titulo: 'Paso 3: Restricciones',
          explicacion: 'Las horas y el combustible siguen limitando la operación.',
          sustitucion: [
            '4x + 2y \\le 160 \\quad \\text{(horas)}',
            '10x + 15y \\le 500 \\quad \\text{(combustible)}',
            'x,\\; y \\ge 0',
          ],
        },
        {
          titulo: 'Paso 4: Punto estacionario sin restricciones (derivadas parciales)',
          explicacion: 'Se derivan parcialmente respecto a cada variable y se igualan a cero. Recuerde que la derivada de −0.2x² es −0.4x y la de −0.3y² es −0.6y.',
          sustitucion: [
            '\\dfrac{\\partial Z}{\\partial x} = 40 - 0.4x = 0 \\;\\Rightarrow\\; x = \\dfrac{40}{0.4} = 100',
            '\\dfrac{\\partial Z}{\\partial y} = 60 - 0.6y = 0 \\;\\Rightarrow\\; y = \\dfrac{60}{0.6} = 100',
          ],
          nota: 'El punto (100, 100) viola ambas restricciones (no es factible), por lo que el óptimo está sobre el borde de la región factible.',
        },
        {
          titulo: 'Paso 5: Óptimo sobre la restricción activa de combustible (condición KKT)',
          explicacion: 'El combustible es el recurso limitante (10x + 15y = 500). Igualando los gradientes ponderados (condición de tangencia KKT) se obtiene una relación entre x e y, que se resuelve con la restricción activa.',
          sustitucion: [
            '\\dfrac{40 - 0.4x}{10} = \\dfrac{60 - 0.6y}{15}',
            '15(40 - 0.4x) = 10(60 - 0.6y)',
            '600 - 6x = 600 - 6y \\;\\Rightarrow\\; x = y',
            '\\text{En } 10x + 15y = 500 \\text{ con } x = y:\\; 10x + 15x = 25x = 500',
            'x = \\dfrac{500}{25} = 20 \\;\\Rightarrow\\; y = 20',
          ],
          resultado: '(x,\\,y) = (20,\\,20)',
        },
        {
          titulo: 'Paso 6: Evaluación y verificación de la solución (20, 20)',
          explicacion: 'Se calcula la utilidad neta con cada multiplicación explícita y se verifican las restricciones.',
          sustitucion: [
            'Z = 40(20) + 60(20) - 0.2(20^2) - 0.3(20^2)',
            '40(20) = 800,\\quad 60(20) = 1200,\\quad 20^2 = 400',
            '0.2(400) = 80,\\quad 0.3(400) = 120',
            'Z = 800 + 1200 - 80 - 120 = 2000 - 200 = 1800',
            '\\text{Horas: } 4(20) + 2(20) = 80 + 40 = 120 \\le 160 \\;\\checkmark\\;(\\text{holgura } 40)',
            '\\text{Combustible: } 10(20) + 15(20) = 200 + 300 = 500 \\le 500 \\;\\checkmark\\;(\\text{activa})',
          ],
          resultado: 'x = 20,\\; y = 20,\\; Z = \\$1\\,800',
        },
      ],
      graficos: [
        {
          tipo: 'region',
          titulo: 'Solución óptima no lineal (20, 20), Z = $1 800, sobre el borde de combustible',
          etiquetaX: 'x = viajes secos',
          etiquetaY: 'y = viajes refrigerados',
          xMax: 55,
          yMax: 40,
          rectas: [
            { label: 'Horas: 4x + 2y ≤ 160', color: cAzul, p1: { x: 0, y: 80 }, p2: { x: 40, y: 0 } },
            { label: 'Combustible: 10x + 15y ≤ 500', color: cRojo, p1: { x: 0, y: 33.33 }, p2: { x: 50, y: 0 } },
          ],
          region: [
            { x: 0, y: 0 },
            { x: 40, y: 0 },
            { x: 35, y: 10 },
            { x: 0, y: 33.33 },
          ],
          optimo: { x: 20, y: 20, label: '(20, 20)' },
        },
      ],
      interpretacion:
        'La utilidad neta máxima es de $1 800 con 20 viajes secos y 20 refrigerados. El combustible es el recurso limitante (se consumen los 500 galones), mientras que sobran 40 horas de conducción. La ganancia es menor que en la Programación Entera ($2 350) porque aquí se descuenta el costo real de mantenimiento: aumentar viajes más allá del óptimo generaría un desgaste cuadrático que supera el ingreso adicional.',
    },
  ],

  formulas: [
    // Programación Entera
    {
      categoria: 'Programación Entera (PE)',
      nombre: 'Función objetivo de maximización',
      simbolo: 'Z',
      formula: '\\max\\; Z = \\sum_{j} c_j\\, x_j',
      descripcion: 'Suma la ganancia unitaria cⱼ por la cantidad xⱼ de cada producto/actividad; se busca el mayor Z.',
    },
    {
      categoria: 'Programación Entera (PE)',
      nombre: 'Restricciones de recursos',
      formula: '\\sum_{j} a_{ij}\\, x_j \\le b_i',
      descripcion: 'El consumo total del recurso i no puede superar lo disponible bᵢ; si la holgura es 0 el recurso es cuello de botella.',
    },
    {
      categoria: 'Programación Entera (PE)',
      nombre: 'Condición de integralidad',
      formula: 'x_j \\ge 0 \\quad \\text{y} \\quad x_j \\in \\mathbb{Z}',
      descripcion: 'Las variables deben ser enteras no negativas; el redondeo de la solución continua no garantiza factibilidad.',
    },
    {
      categoria: 'Programación Entera (PE)',
      nombre: 'Evaluación en vértices',
      formula: 'Z(x_1, x_2) = c_1 x_1 + c_2 x_2',
      descripcion: 'Con dos variables, el óptimo está en un vértice; se evalúa Z en cada esquina factible y se elige el mayor.',
    },
    // Programación por Metas
    {
      categoria: 'Programación por Metas (PM)',
      nombre: 'Función objetivo (minimizar desviaciones)',
      simbolo: 'Z',
      formula: '\\min\\; Z = \\sum_{k} P_k\\left( w_k^- d_k^- + w_k^+ d_k^+ \\right)',
      descripcion: 'Minimiza las desviaciones indeseables ponderadas por su prioridad Pₖ (lexicográfica: P₁ ≫ P₂ ≫ P₃).',
    },
    {
      categoria: 'Programación por Metas (PM)',
      nombre: 'Restricción de meta (forma general)',
      formula: '\\sum_{j} a_{kj}\\, x_j + d_k^- - d_k^+ = G_k',
      descripcion: 'Convierte una restricción en igualdad: d⁻ absorbe el faltante y d⁺ el exceso respecto a la meta Gₖ.',
    },
    {
      categoria: 'Programación por Metas (PM)',
      nombre: 'Variables de desviación',
      formula: 'd_k^-,\\; d_k^+ \\ge 0, \\quad d_k^- \\cdot d_k^+ = 0',
      descripcion: 'El faltante y el exceso son no negativos y nunca positivos a la vez (una de las dos es siempre 0).',
    },
    {
      categoria: 'Programación por Metas (PM)',
      nombre: 'Prioridad lexicográfica',
      formula: 'P_1 \\gg P_2 \\gg P_3',
      descripcion: 'Se satisface primero la meta de mayor prioridad; las inferiores nunca se logran a costa de empeorar una superior.',
    },
    // Programación No Lineal
    {
      categoria: 'Programación No Lineal (PNL)',
      nombre: 'Forma general',
      formula: '\\min\\; f(\\mathbf{x}) \\;\\text{ s.a. }\\; g_i(\\mathbf{x}) \\le b_i,\\;\\; h_j(\\mathbf{x}) = 0',
      descripcion: 'La función objetivo y/o las restricciones contienen términos no lineales; el óptimo puede ser un punto interior.',
    },
    {
      categoria: 'Programación No Lineal (PNL)',
      nombre: 'Objetivo con costo de desgaste',
      simbolo: 'Z',
      formula: '\\max\\; Z = 40x + 60y - 0.2x^2 - 0.3y^2',
      descripcion: 'Ingreso lineal por viajes menos el costo cuadrático de mantenimiento de la flota.',
    },
    {
      categoria: 'Programación No Lineal (PNL)',
      nombre: 'Costo de desgaste',
      simbolo: 'C',
      formula: 'C = 0.2x^2 + 0.3y^2',
      descripcion: 'Costo de mantenimiento que crece de forma acelerada: al duplicar los viajes el costo se cuadruplica.',
    },
    {
      categoria: 'Programación No Lineal (PNL)',
      nombre: 'Punto estacionario',
      formula: '\\dfrac{\\partial Z}{\\partial x} = 0, \\quad \\dfrac{\\partial Z}{\\partial y} = 0',
      descripcion: 'Las derivadas parciales igualadas a cero dan el candidato a óptimo; si es infactible, el óptimo está en una restricción activa.',
    },
  ],

  // Recursos multimedia: video en YouTube + documento de la solución en Excel QM (Google Drive).
  recursos: {
    videos: [
      { titulo: 'Programación — resolución en Excel QM', url: 'https://www.youtube.com/embed/mDCb7ihdcOE' },
    ],
    documentos: [
      { titulo: 'Solución en Excel QM (.xlsx)', url: 'https://docs.google.com/spreadsheets/d/14D0WsuA9EWJh72Jc0zt7AdQEy2s1x87P/edit?usp=sharing&ouid=117814125588622869517&rtpof=true&sd=true' },
    ],
  },
}
