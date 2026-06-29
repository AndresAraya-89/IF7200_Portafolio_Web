# Guía de verificación en QM for Windows — Programación

> **Para qué es este archivo:** Se lo voy a entregar a Claude en la web junto con capturas de pantalla de **QM for Windows (Excel QM / POM‑QM)** y de **Excel Solver**. El objetivo es que Claude me vaya **guiando paso a paso** para resolver cada caso y, con cada captura, **confirme que la ejecución está bien** (que las entradas y los resultados coinciden con la solución correcta).

Este tema tiene **4 ejercicios** y se resuelven con **tres herramientas distintas** (ver sección 3). Cada ejercicio se verifica por separado (secciones 4 a 7).

---

## 1. Rol de Claude (web) al usar este documento

1. Actuá como **verificador y guía**. Ya conocés los datos y los **resultados correctos** (cada sección los trae); úsalos como "respuesta esperada".
2. Trabajá **un ejercicio a la vez** y, dentro de cada uno, **un paso a la vez**; después de cada paso pedime una **captura** antes de avanzar.
3. Al recibir una captura, **comparala** con los valores esperados:
   - Si coincide, confirmá "✅ correcto" y explicame qué estoy viendo.
   - Si no coincide, señalá **exactamente** qué celda/valor está mal y cómo corregirlo.
4. Tené presente **qué herramienta** usa cada ejercicio (sección 3) y los **errores comunes** (sección 8).
5. Al final de cada ejercicio, ayudame a redactar una nota corta de cierre.

---

## 2. Contexto general

Casos de **Transportes Logísticos del Caribe S.A.** (Limón), que mueve contenedores **secos** (variable x) y **refrigerados** (variable y), más un ejercicio de práctica de un **taller textil** (camisas x₁, pantalones x₂). Se aplican cuatro variantes de programación: entera (×2), por metas y no lineal.

---

## 3. Qué herramienta usa cada ejercicio

| # | Ejercicio | Herramienta | Resultado esperado |
|---|-----------|-------------|--------------------|
| 1 | Prog. Entera — transporte | QM → **Linear Programming** (variables enteras) | x = 35, y = 10, **Z = $2 350** |
| 2 | Prog. Entera — taller textil | QM → **Linear Programming** (variables enteras) | x₁ = 4, x₂ = 3, **Z = $390** |
| 3 | Prog. por Metas — transporte | QM → **Goal Programming** | x = 30, y = 20; P1 y P2 cumplidas; P3 excede 100 |
| 4 | Prog. No Lineal — desgaste | **Excel Solver** (motor **GRG Nonlinear**) | x = 20, y = 20, **Z = $1 800** |

⚠️ **Importante:** QM for Windows **no resuelve programación no lineal**. El Ejercicio 4 se hace con **Solver de Excel** (igual que en la presentación del grupo). Si tu versión de QM no trae la opción de variables enteras, no hay problema: en los Ejercicios 1 y 2 el óptimo continuo **ya cae en valores enteros**, así que el módulo LP normal da el mismo resultado.

---

## 4. Ejercicio 1 — Programación Entera (caso transporte)

**Herramienta:** QM → **Linear Programming** (marcar variables como **Integer** si está disponible). **Objetivo:** Maximizar. **Variables:** 2 (x, y). **Restricciones:** 2.

**Modelo:**
```
Maximizar  Z = 50x + 60y
sujeto a:
  (horas)        4x +  2y ≤ 160
  (combustible) 10x + 15y ≤ 500
  x, y ≥ 0  y enteros
```

**Entrada en QM (tabla):**

| | x (X1) | y (X2) | Dirección | RHS |
|---|-----|-----|-----------|-----|
| **Maximize** | 50 | 60 | | |
| Restricción 1 (horas) | 4 | 2 | ≤ | 160 |
| Restricción 2 (combustible) | 10 | 15 | ≤ | 500 |

**Pasos:** Module → Linear Programming → New → 2 variables, 2 restricciones, objetivo **Maximize** → ingresar la tabla → (marcar X1, X2 como **Integer** si la versión lo permite) → **Solve**.

**Resultado esperado:**
- **x = 35**, **y = 10**
- **Z = $2 350**  *(50·35 + 60·10 = 1750 + 600)*
- Holguras: horas = 0 (160 usadas) y combustible = 0 (500 usados) → **ambos recursos activos**.

📷 *Capturas: la tabla de entrada y la ventana de resultados (Solution) con x, y y Z.*

---

## 5. Ejercicio 2 — Programación Entera (taller textil)

**Herramienta:** QM → **Linear Programming** (variables enteras). **Objetivo:** Maximizar. **Variables:** 2 (x₁ camisas, x₂ pantalones). **Restricciones:** 3.

**Modelo:**
```
Maximizar  Z = 60x₁ + 50x₂
sujeto a:
  (tela)     1x₁ + 2x₂ ≤ 10
  (tiempo)   2x₁ + 1x₂ ≤ 11
  (botones)  1x₁ + 1x₂ ≤  9
  x₁, x₂ ≥ 0  y enteros
```

**Entrada en QM (tabla):**

| | x₁ (X1) | x₂ (X2) | Dirección | RHS |
|---|-----|-----|-----------|-----|
| **Maximize** | 60 | 50 | | |
| Restricción 1 (tela) | 1 | 2 | ≤ | 10 |
| Restricción 2 (tiempo) | 2 | 1 | ≤ | 11 |
| Restricción 3 (botones) | 1 | 1 | ≤ | 9 |

**Pasos:** Linear Programming → New → 2 variables, 3 restricciones, **Maximize** → ingresar la tabla → (Integer) → **Solve**.

**Resultado esperado:**
- **x₁ = 4** (camisas), **x₂ = 3** (pantalones)
- **Z = $390**  *(60·4 + 50·3 = 240 + 150)*
- Tela y tiempo se usan al máximo (holgura 0); botones tienen holgura 2 (se usan 7 de 9).

📷 *Capturas: la tabla de entrada y la ventana de resultados con x₁, x₂ y Z.*

---

## 6. Ejercicio 3 — Programación por Metas (caso transporte)

**Herramienta:** QM → **Goal Programming**. **Variables:** 2 (x secos, y refrigerados). **Metas/restricciones:** 3, con prioridades P1 > P2 > P3.

**Parámetros por viaje:** seco x → ganancia 40, 4 horas, 10 galones; refrigerado y → ganancia 60, 2 horas, 15 galones.

**Metas (en orden de prioridad):**
```
P1 (Ganancia):     40x + 60y = 2400   → minimizar d1⁻ (faltante)
P2 (Horas):         4x +  2y = 160    → minimizar d2⁻ y d2⁺ (exactas)
P3 (Combustible):  10x + 15y = 500    → minimizar d3⁺ (exceso)
```

**Entrada en QM (módulo Goal Programming).** Para cada meta se indican los coeficientes de X1 y X2, el RHS, y **qué desviación penalizar con qué prioridad**:

| Meta | Wt(d⁺) | Prty(d⁺) | Wt(d⁻) | Prty(d⁻) | X1 | X2 | RHS |
|------|--------|----------|--------|----------|----|----|-----|
| 1 (Ganancia) | 0 | 0 | 1 | 1 | 40 | 60 | 2400 |
| 2 (Horas) | 1 | 2 | 1 | 2 | 4 | 2 | 160 |
| 3 (Combustible) | 1 | 3 | 0 | 0 | 10 | 15 | 500 |

> Lectura: en la Meta 1 solo penalizamos el **faltante** (d⁻, prioridad 1); en la Meta 2 penalizamos **ambas** desviaciones (prioridad 2, porque las horas deben ser exactas); en la Meta 3 solo penalizamos el **exceso** (d⁺, prioridad 3).

**Pasos:** Module → Goal Programming → New → 2 variables, 3 metas → ingresar la tabla (coeficientes, RHS, pesos y prioridades) → **Solve**.

**Resultado esperado:**
- **x = 30** (X1), **y = 20** (X2)
- **Prioridad 1 (Ganancia): cumplida** → no‑logro (nonachievement) = 0 → d1⁻ = 0  *(40·30 + 60·20 = 2400)*
- **Prioridad 2 (Horas): cumplida** → no‑logro = 0 → d2⁻ = d2⁺ = 0  *(4·30 + 2·20 = 160)*
- **Prioridad 3 (Combustible): NO se cumple** → no‑logro = 100 → **d3⁺ = 100**  *(10·30 + 15·20 = 600 > 500)*

En la salida *Constraint Analysis* deberías ver: Goal 1 d⁺=0/d⁻=0; Goal 2 d⁺=0/d⁻=0; Goal 3 **d⁺=100**/d⁻=0.

📷 *Capturas: la tabla de entrada (con pesos y prioridades) y las ventanas de resultados "Decision variable analysis", "Priority analysis" y "Constraint analysis".*

---

## 7. Ejercicio 4 — Programación No Lineal (costo de desgaste)

**Herramienta:** **Excel + Solver** con motor **GRG Nonlinear** (QM no resuelve no lineal). **Variables:** x (secos), y (refrigerados).

**Modelo:**
```
Maximizar  Z = 40x + 60y − 0.2x² − 0.3y²
sujeto a:
  (horas)        4x +  2y ≤ 160
  (combustible) 10x + 15y ≤ 500
  x, y ≥ 0
```

**Montaje en Excel:**
- Celda **B2** = x (viajes secos), **B3** = y (viajes refrigerados). Inicializar ambas en **0**.
- **B5 (función objetivo):** `=40*B2 + 60*B3 - 0.2*B2^2 - 0.3*B3^2`
- **B7 (horas):** `=4*B2 + 2*B3`
- **B8 (combustible):** `=10*B2 + 15*B3`

**Configurar Solver** (Datos → Solver):
- **Establecer objetivo:** `$B$5`, opción **Máx**.
- **Cambiando celdas de variables:** `$B$2:$B$3`.
- **Sujeto a las restricciones:**
  - `$B$2:$B$3 >= 0`
  - `$B$7 <= 160`
  - `$B$8 <= 500`
- **Método de resolución:** **GRG Nonlinear**.
- Clic en **Resolver**.

**Resultado esperado:**
- **x = 20** (secos), **y = 20** (refrigerados)
- **Z = $1 800**  *(40·20 + 60·20 − 0.2·400 − 0.3·400 = 800 + 1200 − 80 − 120)*
- Verificación: horas = 4·20 + 2·20 = **120 ≤ 160** (holgura 40); combustible = 10·20 + 15·20 = **500 ≤ 500** (recurso limitante).

📷 *Capturas: la hoja con las fórmulas (B5, B7, B8), el cuadro de parámetros de Solver con "GRG Nonlinear", y el resultado "Solver encontró una solución".*

---

## 8. Errores comunes (revisar si algo no calza)

1. **Objetivo Min en vez de Max:** los Ejercicios 1, 2 y 4 **maximizan**; el 3 (metas) **minimiza desviaciones**. Confirmá la dirección.
2. **Coeficientes/RHS mal tipeados:** revisá fila por fila contra las tablas. Un dato cambia todo el óptimo.
3. **Olvidar marcar enteros (Ej. 1 y 2):** aquí el óptimo ya es entero, así que el resultado no cambia, pero conviene dejarlo como Integer para que sea coherente con "Programación Entera".
4. **Goal Programming — pesos/prioridades cruzados:** Meta 1 penaliza solo d⁻ (P1); Meta 2 penaliza d⁻ **y** d⁺ (P2); Meta 3 penaliza solo d⁺ (P3). Si los invertís, da otra solución.
5. **PNL en QM:** no busques un módulo de "no lineal" en QM; **no existe**. El Ejercicio 4 va en **Excel Solver**.
6. **Solver con método equivocado:** para el Ejercicio 4 hay que elegir **GRG Nonlinear** (no Simplex LP, porque la función tiene términos x² e y²).
7. **Celdas iniciales:** en Solver, dejar x e y en 0 antes de resolver evita que el GRG arranque de un punto raro.

---

## 9. Cómo cerrar la verificación

Cuando cada herramienta confirme su resultado, Claude me ayuda a redactar notas como:

> "QM for Windows confirma la Programación Entera del caso transporte: x = 35, y = 10, Z = $2 350, con horas y combustible totalmente usados."

> "QM (Goal Programming) reproduce el caso por metas: x = 30, y = 20; P1 y P2 se cumplen (desviación 0) y P3 excede el límite en 100 galones (d3⁺ = 100)."

> "Excel Solver (GRG Nonlinear) confirma la Programación No Lineal: x = 20, y = 20, Z = $1 800, con el combustible como recurso limitante."

Esas notas las uso como respaldo de los casos en el portafolio.
