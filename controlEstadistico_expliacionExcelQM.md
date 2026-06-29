# Guía de verificación en QM for Windows — Control Estadístico de la Calidad

> **Para qué es este archivo:** Se lo voy a entregar a Claude en la web junto con capturas de pantalla de **QM for Windows (Excel QM / POM‑QM)**, módulo **Quality Control**. El objetivo es que Claude me vaya **guiando paso a paso** para resolver cada ejercicio del tema y, con cada captura, **confirme que la ejecución está bien** (que las entradas y los resultados coinciden con la solución correcta).

Este tema tiene **4 ejercicios**. Cada uno se verifica por separado (secciones 3 a 6).

---

## 1. Rol de Claude (web) al usar este documento

1. Actuá como **verificador y guía**. Ya conocés los datos y los **resultados correctos** (cada sección los trae); úsalos como "respuesta esperada".
2. Trabajá **un ejercicio a la vez** y, dentro de cada uno, **un paso a la vez**; después de cada paso pedime una **captura** antes de avanzar.
3. Al recibir una captura, **comparala** con los valores esperados:
   - Si coincide (margen de redondeo de **±0.005** en límites; ±0.02 en Cp/Cpk), confirmá "✅ correcto" y explicame qué estoy viendo.
   - Si no coincide, señalá **exactamente** qué celda/valor está mal y cómo corregirlo.
4. Tené presente el detalle de **entrada de datos** (sección 2) y los **errores comunes** (sección 7).
5. Al final de cada ejercicio, ayudame a redactar una nota corta confirmando que QM reproduce la solución hecha a mano.

---

## 2. Nota importante sobre la entrada de datos (leer antes de empezar)

Los ejercicios de **X̄–R** (Ejercicios 1, 3 y 4) traen los **promedios (X̄) y rangos (R) ya calculados** por muestra, no las observaciones individuales. En QM hay dos caminos según la versión:

- **(a)** Si tu **Quality Control** permite elegir *“entrar medias y rangos”* (o si usás una plantilla de **Excel QM** que acepta X̄ y R), ingresá esas dos columnas directamente.
- **(b)** Si el módulo **exige las observaciones individuales** (n columnas por muestra), no las tenemos. En ese caso la verificación se centra en confirmar que **X̄̄ (gran media), R̄ (rango promedio) y los límites** coinciden; si tu QM no acepta medias/rangos, lo dejamos validado por el cálculo manual y te lo aclaro.

👉 **Compartí primero la pantalla de entrada de datos** y entre los dos decidimos qué vía aplica tu versión.

La gráfica **p** (Ejercicio 2) sí entra de forma natural en QM: se ingresan los **defectos por muestra**.

**Constantes según el tamaño de muestra (n):**

| n | A₂ | D₃ | D₄ | d₂ |
|----|------|------|------|------|
| 4 | 0.729 | 0 | 2.282 | 2.059 |
| 5 | 0.577 | 0 | 2.114 | 2.326 |
| 25 | 0.153 | 0.459 | 1.541 | 3.931 |

QM ya conoce estas constantes a partir de n; sirven para chequear que esté usando las correctas.

---

## 3. Ejercicio 1 — Corte de precisión de alambre (Gráficas X̄ y R, n = 4)

**Módulo QM:** Quality Control → **x̄‑chart & R‑chart**. **Muestras:** 24. **n = 4.**

**Datos (X̄, R por hora):**

| # | X̄ | R | | # | X̄ | R |
|----|------|------|---|----|------|------|
| 1 | 3.25 | 0.71 | | 13 | 3.11 | 0.85 |
| 2 | 3.11 | 1.18 | | 14 | 2.83 | 1.31 |
| 3 | 3.22 | 1.43 | | 15 | 3.12 | 1.06 |
| 4 | 3.39 | 1.26 | | 16 | 2.86 | 0.50 |
| 5 | 3.07 | 1.17 | | 17 | 2.86 | 1.43 |
| 6 | 2.86 | 0.32 | | 18 | 2.74 | 1.29 |
| 7 | 3.05 | 0.53 | | 19 | 3.13 | 1.41 |
| 8 | 2.65 | 1.13 | | 20 | 2.89 | 1.09 |
| 9 | 3.02 | 0.71 | | 21 | 2.65 | 1.08 |
| 10 | 2.85 | 1.33 | | 22 | 3.28 | 0.46 |
| 11 | 2.83 | 1.17 | | 23 | 2.94 | 1.58 |
| 12 | 2.97 | 0.40 | | 24 | 2.64 | 0.97 |

**Pasos:** abrir el módulo → New → x̄/R chart → 24 muestras, n = 4 → ingresar datos (ver sección 2) → Solve.

**Resultados esperados:**
- ∑X̄ = 71.32 → **X̄̄ = 2.972**
- ∑R = 24.37 → **R̄ = 1.015**
- Gráfica **X̄**: LCS = **3.712**, LC = **2.972**, LCI = **2.231**  *(X̄̄ ± A₂R̄, con A₂ = 0.729)*
- Gráfica **R**: LCS = **2.317**, LC = **1.015**, LCI = **0**  *(D₄R̄ y D₃R̄)*
- **Conclusión:** todos los X̄ (mín 2.64 / máx 3.39) y R (mín 0.32 / máx 1.58) caen dentro de límites → **proceso BAJO control**.

📷 *Capturas: entrada de datos y ventana de resultados con los límites de ambas gráficas.*

---

## 4. Ejercicio 2 — Uniones de soldadura (Gráfica p, n = 500)

**Módulo QM:** Quality Control → **p‑chart**. **Muestras:** 21. **Tamaño de muestra (n):** 500 (constante).

**Datos (defectos por día):**

| Día | Def. | | Día | Def. | | Día | Def. |
|-----|------|---|-----|------|---|-----|------|
| 1 | 106 | | 8 | 36 | | 15 | 101 |
| 2 | 116 | | 9 | 69 | | 16 | 64 |
| 3 | 164 | | 10 | 74 | | 17 | 51 |
| 4 | 89 | | 11 | 42 | | 18 | 74 |
| 5 | 99 | | 12 | 37 | | 19 | 71 |
| 6 | 40 | | 13 | 25 | | 20 | 43 |
| 7 | 112 | | 14 | 88 | | 21 | 80 |

Total de defectos **∑d = 1581** · Total inspeccionado **N = 21 × 500 = 10 500**.

**Pasos:** New → p‑chart → 21 muestras, n = 500 → ingresar los **defectos** (no la proporción) → Solve. *(Si QM pide la proporción, usar pᵢ = defectos/500.)*

**Resultados esperados:**
- **p̄ = 0.1506** (15.06 %) = línea central.
- LCS = **0.1986** (19.86 %), LCI = **0.1026** (10.26 %). *(p̄ ± 3·√(p̄(1−p̄)/500); el término 3σ ≈ 0.0480.)*
- En cantidad de defectos (×500): LCI ≈ **51**, LC ≈ **75**, LCS ≈ **99**.
- **Conclusión:** varios días quedan **fuera** (p. ej. día 3 = 164 y día 13 = 25) → **proceso NO está bajo control** (hay causas especiales).

📷 *Capturas: entrada de defectos y resultados con p̄, UCL y LCL.*

---

## 5. Ejercicio 3 — Barras de aluminio (X̄–R + Capacidad Cp/Cpk, n = 5)

**Módulo QM:** Quality Control → **x̄/R chart** (con revisión de límites) y luego **Process Capability**. **Muestras:** 20. **n = 5.** **Especificaciones:** LIE = 25, objetivo = 35, LES = 45.

**Datos (X̄, R por muestra):**

| # | X̄ | R | | # | X̄ | R |
|----|------|----|---|----|------|----|
| 1 | 34.2 | 3 | | 11 | 35.4 | 8 |
| 2 | 31.6 | 4 | | 12 | 34.0 | 6 |
| 3 | 31.8 | 4 | | 13 | 36.0 | 4 |
| 4 | 33.4 | 5 | | 14 | 37.2 | 7 |
| 5 | 35.0 | 4 | | 15 | 35.2 | 3 |
| 6 | 32.1 | 2 | | 16 | 33.4 | 10 |
| 7 | 32.6 | 7 | | 17 | 35.0 | 4 |
| 8 | 33.8 | 9 | | 18 | 34.4 | 7 |
| 9 | 34.8 | 10 | | 19 | 33.9 | 8 |
| 10 | **38.6** | 4 | | 20 | 34.0 | 4 |

**Resultados esperados:**

**(a) Límites iniciales (20 muestras):**
- ∑X̄ = 686.4 → **X̄̄ = 34.32** · ∑R = 113 → **R̄ = 5.65**
- X̄: LCS = **37.58**, LC = **34.32**, LCI = **31.06** *(A₂ = 0.577)*
- R: LCS = **11.94**, LC = 5.65, LCI = 0 *(D₄ = 2.114)*
- **La muestra 10 (X̄ = 38.6 > 37.58) está fuera de control** → es causa asignable; se elimina.

**(b) Límites revisados (sin la muestra 10 → 19 muestras):**
- X̄̄ = (686.4 − 38.6)/19 = 647.8/19 = **34.095**
- R̄ = (113 − 4)/19 = 109/19 = **5.737**
- X̄: LCS = **37.405**, LCI = **30.785** · R: LCS = **12.128**, LC = 5.737, LCI = 0
- Con la muestra 10 fuera, el resto queda dentro → **proceso bajo control**.

**(c) Capacidad (Process Capability):** entrar media = **34.095**, σ̂ = **2.466** (= R̄/d₂ = 5.737/2.326), LSL = 25, USL = 45, target = 35.
- **Cp = 1.35**  *( (45−25) / (6·2.466) = 20/14.796 )*
- **Cpk = 1.23**  *( mín( (45−34.095)/(3·2.466)=1.474 , (34.095−25)/(3·2.466)=1.229 ) )*
- Interpretación: Cp > 1 (buena capacidad potencial) pero Cpk < Cp ⇒ proceso **descentrado** respecto al objetivo.

**(d) Porcentaje de defectos (con la normal):**
- z_LIE = (25 − 34.095)/2.466 = **−3.69** · z_LES = (45 − 34.095)/2.466 = **4.42**
- P(defecto) ≈ **0.000118 = 0.0118 %**.

📷 *Capturas: límites iniciales (mostrando la muestra 10 fuera), límites revisados, y la pantalla de capacidad con Cp y Cpk.*

---

## 6. Ejercicio 4 — Llenado de vasos de helado (Gráfica X̄, n = 25)

**Módulo QM:** Quality Control → **x̄/R chart** (interesa la gráfica X̄). **Muestras:** 20. **n = 25.**

**Datos (X̄, R por día):**

| Día | X̄ | R | | Día | X̄ | R |
|-----|-------|-----|---|-----|-------|-----|
| 1 | 253.4 | 5.4 | | 11 | 258.0 | 5.2 |
| 2 | 256.4 | 3.2 | | 12 | 254.2 | 3.4 |
| 3 | 249.1 | 4.8 | | 13 | 243.8 | 4.0 |
| 4 | 259.0 | 3.7 | | 14 | 248.0 | 2.9 |
| 5 | 261.2 | 4.2 | | 15 | 254.3 | 3.8 |
| 6 | 251.5 | 3.0 | | 16 | 260.4 | 5.1 |
| 7 | 255.0 | 3.2 | | 17 | 247.1 | 4.5 |
| 8 | 254.5 | 2.9 | | 18 | 253.7 | 2.5 |
| 9 | 260.7 | 2.5 | | 19 | 247.2 | 4.3 |
| 10 | 265.2 | 6.1 | | 20 | 249.0 | 5.2 |

**Resultados esperados:**
- ∑X̄ = 5081.7 → **X̄̄ = 254.085** · ∑R = 79.9 → **R̄ = 3.996**
- A₂R̄ = 0.153 × 3.996 = **0.611**
- Gráfica **X̄**: LCS = **254.696**, LC = **254.085**, LCI = **253.474**
- **Conclusión:** muchos días quedan fuera (p. ej. día 5 = 261.2 > 254.696 y día 13 = 243.8 < 253.474) → **proceso NO está bajo control**.

📷 *Capturas: entrada de datos y resultados con los límites de la gráfica X̄.*

---

## 7. Errores comunes (revisar si algo no calza)

1. **n equivocado:** las constantes A₂/D₃/D₄ dependen de n. Si los límites no dan, confirmá que n = 4 (Ej. 1), 5 (Ej. 3) o 25 (Ej. 4).
2. **Confundir defectos con proporción (gráfica p):** en QM se entran **defectos** por muestra (o la proporción dᵢ/500), no ambos.
3. **No revisar límites (Ej. 3):** primero salen los límites iniciales; recién al **eliminar la muestra 10** se obtienen los límites revisados y la capacidad.
4. **σ para capacidad:** Cp/Cpk usan **σ̂ = R̄/d₂ = 5.737/2.326 = 2.466** (con R̄ revisado), no el R̄ inicial.
5. **LIE/LES/objetivo:** en este caso trabajados en la escala de la tabla (LIE = 25, objetivo = 35, LES = 45), no en pulgadas.
6. **LCI negativo:** si una fórmula da LCI < 0 (p. ej. en R o en p), se reporta **0**.
7. **Redondeo:** QM puede mostrar más decimales; diferencias ≤ 0.005 en límites (y ≤ 0.02 en Cp/Cpk) son normales.

---

## 8. Cómo cerrar la verificación

Cuando las salidas de QM coincidan con los valores esperados, Claude me ayuda a redactar notas cortas como:

> "QM for Windows reproduce el Ejercicio 1: X̄̄ = 2.972, R̄ = 1.015, con límites X̄ (3.712 / 2.972 / 2.231) y R (2.317 / 1.015 / 0). Todos los puntos caen dentro → proceso bajo control."

> "QM confirma el Ejercicio 3: tras eliminar la muestra 10, X̄̄ = 34.095 y R̄ = 5.737; Cp = 1.35 y Cpk = 1.23, evidenciando un proceso capaz pero descentrado."

Esas notas las uso como respaldo de los casos en el portafolio.
