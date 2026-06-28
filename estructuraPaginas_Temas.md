# Estructura de las páginas de tema — Guía de desarrollo

Este documento describe **cómo se construyó la página de Control Estadístico** para
replicar la misma estructura en los 5 temas restantes (Análisis de Markov, Modelo de
Simulación, Modelo de Transporte, Modelo de Redes y Programación). Se desarrollan **1 a 1**.

> Tema de referencia (plantilla): `src/data/content/control-estadistico.js`.

---

## 1. Idea general

Toda página de tema vive en una sola ruta dinámica (`/:id`) y la renderiza
`src/pages/TopicPage.jsx`. La página **no se programa por tema**: se programa **una vez**
y cada tema solo aporta su **contenido** (un archivo de datos). Por eso, agregar un tema
nuevo = escribir un archivo de datos y registrarlo.

La página muestra estas secciones, en este orden:

1. **Resumen Ejecutivo** — síntesis con palabras propias.
2. **Ejercicios resueltos paso a paso** — cada ejercicio: enunciado → datos (tabla) →
   pasos (fórmula / ejecución / resultado) → gráficos → interpretación.
3. **Fórmulas** — tabla de referencia (nombre · fórmula · para qué se usa).
4. **Recursos Multimedia** — videos de YouTube y documentos de Excel QM (Drive). Si están
   vacíos, muestra "en preparación".
5. **Material original** — solo el enunciado (sin solución) y la presentación del grupo,
   con el aviso de que el material **no es de autoría propia**.

La sub-navegación (chips pegajosos) y el color del tema se generan automáticamente.

### Principios obligatorios (aplican a TODOS los temas)

1. **Mostrar TODA la aritmética en el paso a paso.** Toda operación se demuestra, no solo su
   resultado: las sumas se desarrollan término por término
   (`\\sum \\bar{X} = 3.25 + 3.11 + \\dots + 2.64 = 71.32`), las multiplicaciones se ejecutan
   explícitamente (`A_2\\bar{R} = 0.577 \\times 5.65 = 3.26`) y ese producto se usa luego en la
   suma/resta. Ver detalle en §3.6. Es el error más común a evitar.
2. **Síntesis propia** en el Resumen Ejecutivo: nada de copiar y pegar las diapositivas.
3. **El material original no es de autoría propia**: se muestra solo el enunciado (sin
   solución) y la presentación, con su aviso (§6).

---

## 2. Cómo agregar un tema nuevo (checklist)

Para cada tema (ejemplo con `markov`):

1. **Material** ya copiado en `public/materiales/markov/` (PDFs e imágenes). Si agregaste o
   quitaste archivos, regenera el manifiesto:
   ```bash
   npm run manifest
   ```
2. **Crear el archivo de contenido**: `src/data/content/markov.js`
   (copiar la forma de `control-estadistico.js`).
3. **Registrarlo** en `src/data/content/index.js`:
   ```js
   import { markov } from './markov'
   export const contenidoPorTema = {
     'control-estadistico': controlEstadistico,
     markov,            // ← antes estaba en null
     // ...
   }
   ```
4. (Opcional) Ajustar color/descripción del tema en `src/data/topics.js`.
5. **Verificar la aritmética**: que cada paso muestre las sumas/multiplicaciones completas
   (principio obligatorio #1, detalle en §3.6), no solo el resultado.
6. `npm run build` para verificar que compila y que no hay errores de LaTeX.

No hay que tocar `TopicPage.jsx` ni los componentes: solo datos.

> El `id` del tema, el nombre de la carpeta en `public/materiales/<id>/` y la clave en
> `contenidoPorTema` **deben coincidir** (ej. `markov`, `control-estadistico`, `simulacion`,
> `transporte`, `redes`, `programacion`).

---

## 3. Esquema del archivo de contenido

```js
// src/data/content/markov.js
export const markov = {
  resumen:   { /* ver 3.1 */ },
  ejercicios:[ /* ver 3.2 */ ],
  formulas:  [ /* ver 3.3 */ ],
  recursos:  { videos: [], documentos: [] }, // ver 3.4
}
```

### 3.1 `resumen` (Resumen Ejecutivo)

```js
resumen: {
  intro: 'Párrafo de entrada en una frase fuerte.',
  parrafos: [
    'Párrafo 1 con palabras propias…',
    'Párrafo 2…',
  ],
  conceptos: [               // tarjetas de conceptos clave (opcional)
    { titulo: 'Concepto', detalle: 'Explicación breve.' },
  ],
}
```
Regla de oro de la rúbrica: **síntesis propia**, nada de copiar y pegar las diapositivas.

### 3.2 `ejercicios` (paso a paso)

```js
ejercicios: [
  {
    id: 'identificador-corto',
    titulo: 'Nombre del ejercicio',
    etiqueta: 'Tipo / método',          // subtítulo (opcional)
    enunciado: 'Texto del enunciado…',

    datos: [                            // “chips” de datos clave (opcional)
      { label: 'n', valor: '5' },
      { label: 'A₂', valor: '0.577' },
    ],

    tablas: [ /* ver 3.5: tabla de datos inicial */ ],

    pasos: [ /* ver 3.6 */ ],

    graficos: [ /* ver 3.7 (solo si el tema los necesita) */ ],

    interpretacion: 'Interpretación final de los resultados.',
  },
]
```

### 3.3 `formulas` (tabla de fórmulas)

```js
formulas: [
  {
    categoria: 'Grupo de fórmulas',     // agrupa con subencabezado (opcional)
    nombre: 'Nombre de la fórmula',
    simbolo: '\\bar{x}',                // opcional, se muestra junto al nombre
    formula: '\\bar{x} = \\frac{\\sum x_i}{n}',
    descripcion: '¿Para qué se usa?',
  },
]
```

### 3.4 `recursos` (multimedia, pendiente)

```js
recursos: {
  videos: [
    { titulo: 'Tutorial Excel QM', url: 'https://www.youtube.com/embed/VIDEO_ID' },
  ],
  documentos: [
    { titulo: 'Solución en Excel QM', url: 'https://drive.google.com/…' },
  ],
}
```
> Importante: para YouTube usar la URL **/embed/** (no la de "watch"). Mientras estén vacíos,
> la sección muestra automáticamente "Recursos en preparación".

---

## 4. Bloques reutilizables

### 3.5 Tabla de datos (`tablas[]` y también `paso.tabla`)

Renderizado por `src/components/topic/Tabla.jsx`.

```js
{
  titulo: 'Datos iniciales: …',
  columnas: ['Hora', 'X̄', 'R'],
  decimales: [0, 2, 2],   // por columna (o un solo número para todas); celdas numéricas
  dividir: 2,             // 1 = una tabla; 2 = se parte en dos bloques lado a lado
  filas: [
    [1, 3.25, 0.71],
    [2, 3.11, 1.18],
    // …
  ],
  nota: 'Texto al pie (opcional).',
}
```
- Para tablas largas usar `dividir: 2` (se apila en móvil).
- `decimales` conserva los decimales originales (35.0, 253.4, etc.).
- Las cadenas se muestran tal cual; solo se formatean las celdas numéricas.

### 3.6 Paso (`pasos[]`)

Renderizado por `src/components/topic/Paso.jsx`. Sigue la metodología de la presentación:
**explicación → fórmula → ejecución → resultado**. Todos los campos son opcionales; se
muestra lo que exista.

```js
{
  titulo: 'Paso 1: …',
  explicacion: 'Qué se hace y por qué.',
  formula: '\\bar{R} = \\frac{\\sum R}{24}',     // string o array de strings
  sustitucion: '\\bar{R} = \\frac{24.37}{24} = 1.0154', // ejecución con números (string/array)
  resultado: '\\bar{R} = 1.015',                  // valor final destacado (string)
  tabla: { /* opcional: tabla de resultados, mismo esquema de 3.5 */ },
  nota: 'Aclaración (opcional).',
}
```

> **Regla de oro del paso a paso — mostrar TODA la aritmética.** No basta con escribir el
> resultado de una operación: hay que demostrarla. Las sumas se desarrollan término por
> término (`\\sum \\bar{X} = 3.25 + 3.11 + \\dots + 2.64 = 71.32`), las multiplicaciones se
> ejecutan explícitamente (`A_2\\bar{R} = 0.577 \\times 5.65 = 3.26`) y luego se usa ese
> producto en la suma/resta. Para sumas largas, partir en varias entradas del array
> `sustitucion` (cada una es una línea de bloque), iniciando la continuación con
> `'\\qquad +\\; ...'`, tal como se ve en `control-estadistico.js`.

### 3.7 Gráfico de control (`graficos[]`)

Renderizado por `src/components/topic/ControlChart.jsx` (SVG propio, sin librerías).
**Úsalo solo si el tema lo amerita** (Control Estadístico sí; otros temas pueden no llevar).

```js
{
  titulo: 'Gráfica X̄ — Promedio por hora',
  etiquetaX: 'Hora',
  etiquetaY: 'Promedio (X̄)',
  decimales: 2,
  series: [3.25, 3.11, /* … */],         // valores en orden
  limites: { LCS: 3.712, LC: 2.972, LCI: 2.231 },
}
```
- Dibuja LCS/LCI (rojo punteado), LC (verde) y los puntos; los que caen **fuera de los
  límites** se marcan en rojo.
- Para otros temas, este componente es un punto de partida; si un tema necesita otro tipo de
  gráfico (red/grafo, histograma, etc.) se crea un componente nuevo en `components/topic/`
  siguiendo el mismo patrón (SVG, props de datos).

---

## 5. Fórmulas con KaTeX (reglas importantes)

Las fórmulas se escriben en **LaTeX** y las renderiza KaTeX.

- **Escapar las barras invertidas**: en un string de JS, `\frac` se escribe `\\frac`,
  `\bar` → `\\bar`, `\sqrt` → `\\sqrt`, `\sum` → `\\sum`, `\le` → `\\le`, etc.
- Símbolos frecuentes: `\\bar{x}`, `\\bar{\\bar{x}}` (gran media), `\\hat{\\sigma}`,
  `\\frac{a}{b}`, `\\sqrt{\\frac{a}{b}}`, `\\pm`, `\\times`, `\\le`, `\\ge`, `\\min`,
  `\\Rightarrow`, `\\text{...}` para palabras dentro de la fórmula.
- Componentes: `import { M, MB } from '../ui/Math'` — `M` = en línea, `MB` = en bloque.
  En las tablas de fórmulas se usa `\\displaystyle` para que se vean grandes.
- **Verificar**: `npm run build` no falla por LaTeX inválido, pero conviene revisar en
  pantalla con `npm run dev`. Un error de sintaxis se ve en rojo dentro de la fórmula.

---

## 6. Material original (qué se muestra y qué no)

`TopicPage.jsx` filtra los PDF de `public/materiales/<id>/`:

- **Se muestran**: enunciado de ejercicios a realizar (sin solución) y la presentación.
- **Se ocultan**: archivos cuyo nombre contiene solución/resolución
  (regex `/resuel|soluci/i`). Si algún archivo no encaja con esa regla, renombrarlo o
  ajustar el filtro.
- Siempre aparece el **aviso**: *"Este material no es de mi autoría. Pertenece al curso
  IF7200 y a los compañeros encargados de desarrollar el tema…"*.

---

## 7. Convenciones y colores

- Cada tema tiene un **color** en `src/data/topics.js` (`topic.color`) que tiñe logos,
  badges, líneas de tabla, encabezados de paso, etc. Mantenerlo consistente.
- `id` en kebab-case y **coincide** con la carpeta de materiales y la clave de contenido.
- Texto en español, tono formal y académico (es un portafolio evaluado).

---

## 8. Mapa de archivos relevante

```
Portafolio_Web/
├── estructuraPaginas_Temas.md      ← este documento
├── src/
│   ├── pages/TopicPage.jsx         ← arma la página (no se toca por tema)
│   ├── data/
│   │   ├── topics.js               ← lista de 6 temas (id, color, ruta, icono)
│   │   ├── materiales.js           ← manifiesto AUTO de PDFs/imágenes (npm run manifest)
│   │   └── content/
│   │       ├── index.js            ← registro id → contenido
│   │       └── control-estadistico.js   ← PLANTILLA de referencia
│   └── components/
│       ├── ui/Math.jsx             ← M / MB (KaTeX)
│       └── topic/
│           ├── ResumenEjecutivo.jsx
│           ├── Ejercicios.jsx · Ejercicio.jsx · Paso.jsx
│           ├── Tabla.jsx           ← tablas de datos
│           ├── ControlChart.jsx    ← gráficos de control (SVG)
│           ├── Formulas.jsx        ← tabla de fórmulas
│           └── RecursosMultimedia.jsx
└── public/materiales/<id>/         ← PDFs e imágenes por tema
```

---

## 9. Próximos temas (avance 1 a 1)

Orden de trabajo (a indicación del estudiante, uno por uno):

1. **Análisis de Markov** ← siguiente
2. Modelo de Simulación
3. Modelo de Transporte
4. Modelo de Redes
5. Programación

Para cada uno se leerá el material de su carpeta (`public/materiales/<id>/`), se redactará el
Resumen Ejecutivo con palabras propias, se digitarán los ejercicios paso a paso (con tablas
de datos, fórmulas y, si aplica, gráficos) y se completará la tabla de fórmulas. Los recursos
multimedia (videos/Excel QM) quedan pendientes hasta tener las URLs.
