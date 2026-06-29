# Guía de verificación en QM for Windows — Modelo de Redes

> **Para qué es este archivo:** Se lo voy a entregar a Claude en la web junto con capturas de pantalla de **QM for Windows (Excel QM / POM‑QM)**, módulo **Networks**. El objetivo es que Claude me vaya **guiando paso a paso** para resolver cada caso y, con cada captura, **confirme que la ejecución está bien** (que las entradas y los resultados coinciden con la solución correcta).

Este tema tiene **2 ejercicios** sobre la **misma red**: Ruta más corta (Dijkstra) y Árbol de expansión mínima (Kruskal). Ambos se resuelven en el módulo **Networks** y se verifican por separado (secciones 4 y 5).

---

## 1. Rol de Claude (web) al usar este documento

1. Actuá como **verificador y guía**. Ya conocés los datos y los **resultados correctos** (cada sección los trae); úsalos como "respuesta esperada".
2. Trabajá **un ejercicio a la vez** y, dentro de cada uno, **un paso a la vez**; después de cada paso pedime una **captura** antes de avanzar.
3. Al recibir una captura, **comparala** con los valores esperados:
   - Si coincide, confirmá "✅ correcto" y explicame qué estoy viendo.
   - Si no coincide, señalá **exactamente** qué arco/valor está mal y cómo corregirlo.
4. Tené presente el detalle de **rotulado de nodos** (sección 3) y los **errores comunes** (sección 6).
5. Al final de cada ejercicio, ayudame a redactar una nota corta de cierre.

---

## 2. Contexto del caso

Una empresa de transporte debe mover mercancía dentro de una red de 6 puntos. Los números son **distancias en kilómetros** y las conexiones son **bidireccionales** (no dirigidas). Con esta red se resuelven dos problemas: la **ruta más corta** del Puerto de Limón (A) al Centro de Distribución en San José (F), y el **árbol de expansión mínima** que conecta los 6 puntos con la menor distancia total.

---

## 3. Datos de la red (entrada para QM)

**Nodos:** 6 → A, B, C, D, E, F.
**Arcos (ramas):** 10. **Origen del problema de ruta:** A. **Destino:** F.

Como QM a veces rotula los nodos con **números**, usá este mapeo (o nombrá los nodos con letras si tu versión lo permite):

| Letra | A | B | C | D | E | F |
|-------|---|---|---|---|---|---|
| Nodo # | 1 | 2 | 3 | 4 | 5 | 6 |

**Lista de arcos (start, end, distancia):**

| Arco | Inicio | Fin | Distancia (km) |
|------|--------|-----|----------------|
| 1 | A (1) | B (2) | 7 |
| 2 | A (1) | C (3) | 5 |
| 3 | A (1) | D (4) | 6 |
| 4 | B (2) | C (3) | 2 |
| 5 | B (2) | E (5) | 4 |
| 6 | C (3) | E (5) | 6 |
| 7 | C (3) | F (6) | 4 |
| 8 | D (4) | C (3) | 3 |
| 9 | D (4) | F (6) | 8 |
| 10 | E (5) | F (6) | 3 |

⚠️ Verificá que sean **10 arcos** y **6 nodos**, y que cada distancia esté bien tipeada.

---

## 4. Ejercicio 1 — Ruta más corta (Dijkstra)

**Técnica en QM:** Networks → **Shortest Route** (ruta más corta). **Origen:** A (1). **Destino:** F (6).

**Pasos en QM:**
1. Module → **Networks** → File → New → técnica **Shortest Route**.
2. Definir **número de arcos = 10** (y 6 nodos).
3. Ingresar la tabla de arcos de la sección 3 (inicio, fin, distancia). Las conexiones son **no dirigidas**.
4. Indicar **nodo de inicio = A (1)** y **nodo final = F (6)**.
5. **Solve**.

**Resultado esperado:**
- **Ruta óptima: A → C → F**
- **Distancia total = 9 km**  *(A–C = 5 + C–F = 4)*
- Es la única ruta de 9 km; las alternativas (A–D–F = 14, A–B–E–F = 14) son peores.

📷 *Capturas: la tabla de arcos ingresada y la ventana de resultados con la ruta A→C→F y el total 9.*

---

## 5. Ejercicio 2 — Árbol de expansión mínima (Kruskal)

**Técnica en QM:** Networks → **Minimal Spanning Tree** (árbol de expansión mínima). Usa la **misma red** (sección 3).

**Pasos en QM:**
1. File → New → técnica **Minimal Spanning Tree** (o cambiar la técnica si tu versión lo permite sobre los mismos datos).
2. Ingresar los **mismos 10 arcos** y 6 nodos.
3. (Si pide un nodo de partida, podés indicar A (1); el resultado total no cambia.)
4. **Solve**.

**Resultado esperado:**
- **Aristas del árbol:** B–C (2), C–D (3), E–F (3), C–F (4), A–C (5)
- **Distancia total mínima = 17 km**  *(2 + 3 + 3 + 4 + 5)*
- Son **5 aristas** (n − 1 = 6 − 1 = 5), sin ciclos, conectando los 6 nodos.

> **Nota sobre empate:** hay dos aristas de valor 4 (B–E y C–F) que conectan los mismos grupos. QM podría elegir **B–E** en lugar de **C–F**; en ese caso el árbol sería B–C, C–D, E–F, **B–E**, A–C, pero el **total sigue siendo 17 km** (solución alterna válida). Lo que se verifica es el **total = 17** y que sean 5 aristas sin ciclos.

📷 *Capturas: la tabla de arcos y la ventana de resultados con las aristas seleccionadas y el total 17.*

---

## 6. Errores comunes (revisar si algo no calza)

1. **Arco mal tipeado:** un número de distancia equivocado cambia la ruta o el árbol. Confirmá los 10 valores contra la sección 3.
2. **Nodos mal mapeados:** si usás números, respetá A=1 … F=6; si los invertís, el origen/destino quedará mal.
3. **Técnica equivocada:** Ruta más corta y Árbol de expansión mínima son **opciones distintas** del módulo Networks. Verificá cuál está seleccionada.
4. **Origen/destino en la ruta:** para la ruta más corta hay que fijar inicio = A y fin = F; si no, QM resuelve a otro destino.
5. **Dirección de los arcos:** la red es **no dirigida**; asegurate de que QM trate las conexiones como bidireccionales (no como flechas de un solo sentido).
6. **Empate en el árbol (4 km):** si QM muestra B–E en vez de C–F, **no es un error**: el total 17 es el mismo (ver nota de la sección 5).

---

## 7. Cómo cerrar la verificación

Cuando QM confirme ambos resultados, Claude me ayuda a redactar notas como:

> "QM for Windows reproduce la ruta más corta: A → C → F con 9 km, coincidiendo con el resultado de Dijkstra hecho a mano."

> "QM confirma el árbol de expansión mínima con un total de 17 km y 5 aristas (B–C, C–D, E–F, C–F, A–C), igual que Kruskal."

Esas notas las uso como respaldo de los casos en el portafolio.
