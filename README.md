# Portafolio Web — IF7200

Portafolio digital del curso **IF7200 – Métodos Cuantitativos para la Toma de Decisiones**
(Universidad de Costa Rica, Sede de Limón). Estudiante: **C20520 – Andrés Araya Agüero**.

## Stack
- **React 18** + **Vite 5**
- **Tailwind CSS 3** (logos y UI construidos con Tailwind/SVG)
- **React Router 6**
- Despliegue en **Netlify**

## Scripts
```bash
npm install     # instala dependencias
npm run dev     # servidor de desarrollo (http://localhost:5173)
npm run build   # build de producción -> /dist
npm run preview # previsualiza el build
```

## Arquitectura de componentes
```
src/
├── components/
│   ├── layout/
│   │   ├── NavBar.jsx     → barra superior (logo UCR→inicio, enunciado, 6 temas)
│   │   ├── Body.jsx       → presentación formal + índice Marfil + datos del curso
│   │   ├── SiteFooter.jsx → sección inferior en 3 partes + nota "Carpe Diem"
│   │   └── Layout.jsx     → estructura común + WhatsApp flotante
│   └── ui/
│       ├── UcrCrest.jsx     → escudo oficial de la UCR (imagen)
│       ├── BrandLogo.jsx    → logo "Portafolio Web" (Tailwind/SVG)
│       ├── TopicLogo.jsx    → 6 logos significativos por tema (SVG)
│       ├── TopicButton.jsx  → botón del índice vertical
│       └── WhatsAppFab.jsx  → botón flotante de WhatsApp (esquina inf. derecha)
├── data/
│   ├── topics.js      → los 6 temas + datos institucionales
│   └── materiales.js  → manifiesto AUTO-GENERADO de PDFs e imágenes por tema
├── pages/
│   ├── Home.jsx       → Inicio (foco actual)
│   └── TopicPage.jsx  → plantilla de los 6 temas (a futuro)
└── App.jsx           → rutas
```

> Nota: en los requisitos los componentes se llamaron *Footer* (barra de navegación,
> arriba) y *Header* (sección de 3 partes, abajo). En el código se nombraron
> `NavBar` y `SiteFooter` para reflejar su posición real en la página.

## Materiales (todo dentro del proyecto)
Los PDFs y las imágenes de fórmulas de cada tema viven en
`public/materiales/<tema>/`, por lo que se **despliegan junto al sitio** (nada
queda en local). El sitio es **solo frontend / informativo**.

Si agregás o quitás archivos en `public/materiales/`, regenerá el manifiesto:
```bash
npm run manifest
```

## Paleta
Marfil · Blanco · Celeste + colores institucionales UCR (azul, verde, amarillo).
Definida en `tailwind.config.js`.

## Despliegue en Netlify
1. Sube el repositorio a GitHub.
2. En Netlify: **Add new site → Import from Git**.
3. Build command: `npm run build` · Publish directory: `dist`
   (ya configurado en `netlify.toml`).
4. El archivo `public/_redirects` y `netlify.toml` garantizan el ruteo SPA.

## Pendiente (a futuro)
Desarrollar cada uno de los 6 temas: Resumen Ejecutivo, ejercicios paso a paso
y recursos multimedia (según la rúbrica: Completitud, Correctitud, Creatividad).
