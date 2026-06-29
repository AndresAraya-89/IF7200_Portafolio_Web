# Guía de verificación en QM for Windows — Modelo de Transporte

> **Para qué es este archivo:** Se lo voy a entregar a Claude en la web junto con capturas de pantalla de **QM for Windows (Excel QM / POM‑QM)**. El objetivo es que Claude me vaya **guiando paso a paso** para resolver cada caso y, con cada captura, **confirme que la ejecución está bien** (que las entradas y los resultados coinciden con la solución correcta).

Este tema tiene **2 ejercicios**: un **modelo de transporte** (Vogel + Salto de piedra) y un **modelo de asignación** (método húngaro). En QM se usan dos módulos distintos (sección 3). Cada uno se verifica por separado (secciones 4 y 5).

---

## 1. Rol de Claude (web) al usar este documento

1. Actuá como **verificador y guía**. Ya conocés los datos y los **resultados correctos** (cada sección los trae); úsalos como "respuesta esperada".
2. Trabajá **un ejercicio a la vez** y, dentro de cada uno, **un paso a la vez**; después de cada paso pedime una **captura** antes de avanzar.
3. Al recibir una captura, **comparala** con los valores esperados:
   - Si coincide, confirmá "✅ correcto" y explicame qué estoy viendo.
   - Si no coincide, señalá **exactamente** qué celda/valor está mal y cómo corregirlo.
4. Tené presente que **ambos casos son de MAXIMIZACIÓN** y el detalle de **óptimos alternativos** (sección 6).
5. Al final de cada ejercicio, ayudame a redactar una nota corta de cierre.

---

## 2. Nota importante (leer antes de empezar)

- **Ambos ejercicios MAXIMIZAN** (ganancia / rendimiento), no minimizan. En QM hay que cambiar el objetivo a **Maximize**; si se deja en Minimize (el valor por defecto), el resultado estará mal.
- QM resuelve **hasta el óptimo directamente**: no muestra los pasos de Vogel ni del Salto de piedra (esos son del desarrollo manual). Lo que se verifica es el **valor óptimo (Z)** y que se respeten **oferta/demanda** (o la asignación 1:1).
- Pueden existir **óptimos alternativos** (varias asignaciones con el mismo Z). Si QM muestra un reparto distinto al manual pero **el mismo Z**, está **correcto** (ver sección 6).

---

## 3. Qué módulo usa cada ejercicio

| # | Ejercicio | Módulo QM | Objetivo | Resultado esperado |
|---|-----------|-----------|----------|--------------------|
| 1 | Distribución de computadoras | **Transportation** | **Maximize** | **Z = 31 025** (miles) = ₡31 025 000 |
| 2 | Asignación de camiones a rutas | **Assignment** | **Maximize** | **Z = 340** |

---

## 4. Ejercicio 1 — Modelo de transporte (distribución de computadoras)

**Módulo QM:** **Transportation**. **Orígenes:** 3. **Destinos:** 4. **Objetivo:** **Maximize** (las celdas son **ganancias**, en miles de colones). Modelo **balanceado** (oferta total = demanda total = 400).

**Matriz de ganancias (miles de colones por computadora):**

| Origen \ Destino | Guanacaste | Limón Centro | Puntarenas | San José | **Oferta** |
|------------------|-----------|--------------|-----------|----------|------------|
| **Cartago** | 95 | 80 | 85 | 60 | 120 |
| **Guápiles** | 90 | 75 | 80 | 55 | 80 |
| **Alajuela** | 92 | 78 | 83 | 58 | 200 |
| **Demanda** | 100 | 85 | 105 | 110 | **400 / 400** |

**Pasos en QM:**
1. Module → **Transportation** → File → New.
2. **Number of sources = 3**, **Number of destinations = 4**, **Objective = Maximize**.
3. (Opcional) rotular filas (Cartago/Guápiles/Alajuela) y columnas (Guanacaste/Limón Centro/Puntarenas/San José).
4. Ingresar la **matriz de ganancias**, la columna **Oferta** (120/80/200) y la fila **Demanda** (100/85/105/110).
5. **Solve**.

**Resultado esperado:**
- **Ganancia máxima Z = 31 025** (miles de colones) = **₡31 025 000**.
- Un reparto óptimo (puede haber alternos con el mismo Z):
  - Cartago → Guanacaste **100**, Cartago → Limón Centro **20**
  - Guápiles → Puntarenas **80**
  - Alajuela → Limón Centro **65**, Alajuela → Puntarenas **25**, Alajuela → San José **110**
- Comprobación de Z: 95(100) + 80(20) + 80(80) + 78(65) + 83(25) + 58(110) = 9500 + 1600 + 6400 + 5070 + 2075 + 6380 = **31 025**.

📷 *Capturas: la matriz de entrada (con oferta/demanda y objetivo en Maximize) y la ventana de resultados (Shipments) con el total 31 025.*

---

## 5. Ejercicio 2 — Modelo de asignación (camiones a rutas)

**Módulo QM:** **Assignment**. **Tamaño:** 4 × 4 (4 camiones, 4 rutas). **Objetivo:** **Maximize** (las celdas son **rendimientos**). Asignación estricta **1:1** (cada camión una ruta y cada ruta un camión).

**Matriz de rendimientos camión–ruta:**

| Camión \ Ruta | Guanacaste | Limón Centro | Puntarenas | San José |
|---------------|-----------|--------------|-----------|----------|
| **Camión 1** | 90 | 80 | 70 | 60 |
| **Camión 2** | 85 | 75 | 80 | 65 |
| **Camión 3** | 80 | 85 | 75 | 70 |
| **Camión 4** | 70 | 90 | 60 | 85 |

**Pasos en QM:**
1. Module → **Assignment** → File → New.
2. **Number of jobs/machines = 4**, **Objective = Maximize**.
3. (Opcional) rotular filas (Camión 1–4) y columnas (las 4 rutas).
4. Ingresar la **matriz de rendimientos**.
5. **Solve**.

**Resultado esperado:**
- **Rendimiento total máximo Z = 340**.
- Asignación óptima:
  - Camión 1 → **Guanacaste** (90)
  - Camión 2 → **Puntarenas** (80)
  - Camión 3 → **Limón Centro** (85)
  - Camión 4 → **San José** (85)
- Comprobación: 90 + 80 + 85 + 85 = **340**.

> **Ojo con el 335:** una diapositiva del grupo mostró Z = 335 por una selección inconsistente de celdas. El **óptimo correcto del método húngaro es 340**, que es el que debe dar QM. Si QM mostrara 335 o menos, revisá que el objetivo esté en **Maximize** y que la matriz esté bien tipeada.

📷 *Capturas: la matriz de entrada (objetivo en Maximize) y la ventana de resultados con las asignaciones y el total 340.*

---

## 6. Sobre los óptimos alternativos (no es error)

En el modelo de transporte (Ejercicio 1) el desarrollo manual con el **Salto de piedra** encontró celdas con Δ = 0, lo que indica **soluciones óptimas alternativas**: distintos repartos que dan **exactamente la misma ganancia 31 025**. Por eso, si QM muestra un reparto **distinto** al de la sección 4 pero con **Z = 31 025**, es igualmente **correcto**. Lo que importa verificar es:
- El **valor óptimo Z**.
- Que se cumpla toda la **oferta** (120 / 80 / 200) y toda la **demanda** (100 / 85 / 105 / 110).

En la asignación (Ejercicio 2) también podría haber un reparto alterno con el mismo total 340; verificá el **total** y que sea **1:1**.

---

## 7. Errores comunes (revisar si algo no calza)

1. **Objetivo en Minimize:** es el error más común. Ambos casos son **Maximize** (ganancia/rendimiento). Con Minimize, QM busca el menor valor y todo sale mal.
2. **Confundir oferta y demanda:** en el transporte, la oferta va en la columna derecha (120/80/200) y la demanda en la fila inferior (100/85/105/110). No invertirlas.
3. **Modelo desbalanceado:** acá oferta = demanda = 400, así que **no** hace falta fila/columna ficticia. Si QM agrega una "dummy", es señal de que algún dato quedó mal.
4. **Matriz mal tipeada:** un número equivocado cambia el óptimo. Revisá celda por celda contra las tablas.
5. **Esperar el reparto idéntico al manual:** por los óptimos alternativos, el reparto puede variar; lo que debe coincidir es **Z** (31 025 / 340).
6. **Unidades del transporte:** la matriz está en **miles de colones**, por lo que Z = 31 025 equivale a **₡31 025 000**.

---

## 8. Cómo cerrar la verificación

Cuando QM confirme ambos resultados, Claude me ayuda a redactar notas como:

> "QM for Windows confirma el modelo de transporte: ganancia máxima Z = 31 025 (miles) = ₡31 025 000, cumpliendo toda la oferta y la demanda; el reparto coincide (o es un óptimo alterno con el mismo Z)."

> "QM (Assignment, Maximize) confirma la asignación de camiones: rendimiento total máximo = 340, con Camión 1→Guanacaste, Camión 2→Puntarenas, Camión 3→Limón Centro y Camión 4→San José."

Esas notas las uso como respaldo de los casos en el portafolio.
