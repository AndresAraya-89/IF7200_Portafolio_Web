# Guía de verificación en QM for Windows — Modelo de Simulación (Monte Carlo)

> **Para qué es este archivo:** Se lo voy a entregar a Claude en la web junto con capturas de pantalla de **QM for Windows (Excel QM / POM‑QM)**, módulo **Simulation**. El objetivo es que Claude me vaya **guiando paso a paso** para resolver cada escenario y, con cada captura, **confirme que la ejecución está bien** (que las entradas y los resultados coinciden con la solución correcta).

Este tema tiene **3 escenarios** (Parte A, B y C). Cada uno se verifica por separado (secciones 4 a 6).

---

## 1. Rol de Claude (web) al usar este documento

1. Actuá como **verificador y guía**. Ya conocés los datos y los **resultados correctos** (cada sección los trae); úsalos como "respuesta esperada".
2. Trabajá **un escenario a la vez** y, dentro de cada uno, **un paso a la vez**; después de cada paso pedime una **captura** antes de avanzar.
3. Al recibir una captura, **comparala** con los valores esperados:
   - Si coincide, confirmá "✅ correcto" y explicame qué estoy viendo.
   - Si no coincide, señalá **exactamente** qué celda/valor está mal y cómo corregirlo.
4. Tené **muy presente** la nota sobre números aleatorios (sección 3): QM no reproduce la corrida manual evento por evento.
5. Al final de cada escenario, ayudame a redactar una nota corta de cierre.

---

## 2. Metodología del tema (lo que se debe ver en QM)

Cada escenario sigue 5 pasos: (1) probabilidad individual **P(x) = f/N** y probabilidad **acumulada**; (2) **rangos** de números aleatorios (1–100) según la acumulada; (3) **simulación** de 10 eventos; (4) **consolidación** (frecuencia ponderada y **promedio simulado** X̄ = ∑fᵢxᵢ/N); (5) conclusión gerencial contrastando el **promedio simulado** contra el **Valor Esperado Teórico E(X) = ∑ x·P(x)**.

---

## 3. ⚠️ Nota crítica sobre los números aleatorios (leer antes de empezar)

El ejercicio manual usa una **secuencia de números aleatorios dada** (por ejemplo 25, 88, 12, …). En cambio, el módulo **Simulation de QM genera sus propios números aleatorios** (con una semilla interna) y, por lo general, **no permite pegar la secuencia exacta**. Consecuencias:

- **SÍ se puede verificar exactamente con QM:**
  - La **distribución de probabilidad** P(x) de cada valor.
  - La **probabilidad acumulada** y los **rangos / intervalos** de números aleatorios asignados.
  - El **Valor Esperado Teórico E(X)** (QM lo reporta como *expected value*).
- **NO va a coincidir evento por evento:**
  - La **corrida de 10 eventos** y el **promedio simulado** dependen de los números aleatorios. Con los de QM darán **otros** valores; lo correcto es comprobar que el **promedio simulado converge hacia E(X)** al aumentar el número de corridas (probá 10, luego 1 000 o 10 000).

👉 Si querés reproducir **exactamente** la corrida manual (promedios 33 / 115 / 21), eso se hace mapeando a mano (o en Excel) los números aleatorios dados con los rangos —lo incluyo en cada sección como "corrida manual de referencia"—. Si tu **Excel QM** permite ingresar una columna de números aleatorios propia, usá esa secuencia y ahí sí debe dar idéntico.

---

## 4. Parte A — Problema de colas (tiempos de inspección)

**Historial de 100 contenedores → distribución:**

| Tiempo (min) | Frecuencia | P(x) | Acumulada | Rango (1–100) |
|--------------|-----------|------|-----------|----------------|
| 15 | 20 | 0.20 | 0.20 | 1 – 20 |
| 30 | 40 | 0.40 | 0.60 | 21 – 60 |
| 45 | 30 | 0.30 | 0.90 | 61 – 90 |
| 60 | 10 | 0.10 | 1.00 | 91 – 100 |

**Valor Esperado Teórico:**
E(X) = 15(0.20) + 30(0.40) + 45(0.30) + 60(0.10) = 3 + 12 + 13.5 + 6 = **34.5 min**.

**Pasos en QM:** Module → **Simulation** → New → distribución **discreta (definida por el usuario)** → **4 categorías** → ingresar valor y probabilidad (o frecuencia) de cada fila → número de corridas = 10 (luego 1000) → Solve.

**Qué debe confirmar Claude:**
- ✅ P(x), acumulada y los **rangos** coinciden con la tabla de arriba.
- ✅ **Expected value = 34.5**.
- ✅ El **promedio simulado** de QM se acerca a 34.5 (más cuanto mayor sea el número de corridas).

**Corrida manual de referencia** (secuencia dada: 25, 88, 12, 65, 92, 8, 45, 73, 19, 54):

| Evento | N° aleatorio | Tiempo |
|--------|--------------|--------|
| 1 | 25 | 30 |
| 2 | 88 | 45 |
| 3 | 12 | 15 |
| 4 | 65 | 45 |
| 5 | 92 | 60 |
| 6 | 8 | 15 |
| 7 | 45 | 30 |
| 8 | 73 | 45 |
| 9 | 19 | 15 |
| 10 | 54 | 30 |

Total = 3(15) + 3(30) + 3(45) + 1(60) = 45 + 90 + 135 + 60 = **330** → **Promedio simulado = 330/10 = 33 min**.
**Conclusión:** 33 min < 34.5 min; aunque salió un caso extremo de 60 min, los trámites rápidos bajaron el promedio.

📷 *Capturas: entrada de la distribución, intervalos asignados y resultados con el expected value y el promedio.*

---

## 5. Parte B — Control de recursos e insumos (marchamos)

**Historial de 100 días → distribución:**

| Marchamos | Frecuencia | P(x) | Acumulada | Rango (1–100) |
|-----------|-----------|------|-----------|----------------|
| 50 | 15 | 0.15 | 0.15 | 1 – 15 |
| 100 | 45 | 0.45 | 0.60 | 16 – 60 |
| 150 | 30 | 0.30 | 0.90 | 61 – 90 |
| 200 | 10 | 0.10 | 1.00 | 91 – 100 |

**Valor Esperado Teórico:**
E(X) = 50(0.15) + 100(0.45) + 150(0.30) + 200(0.10) = 7.5 + 45 + 45 + 20 = **117.5 unidades/día**.

**Pasos en QM:** igual que la Parte A, con estos 4 valores y sus probabilidades.

**Qué debe confirmar Claude:**
- ✅ P(x), acumulada y **rangos** = tabla de arriba.
- ✅ **Expected value = 117.5**.
- ✅ Promedio simulado de QM cercano a 117.5.

**Corrida manual de referencia** (secuencia: 50, 10, 85, 42, 95, 22, 67, 5, 33, 78):

| Evento | N° aleatorio | Demanda |
|--------|--------------|---------|
| 1 | 50 | 100 |
| 2 | 10 | 50 |
| 3 | 85 | 150 |
| 4 | 42 | 100 |
| 5 | 95 | 200 |
| 6 | 22 | 100 |
| 7 | 67 | 150 |
| 8 | 5 | 50 |
| 9 | 33 | 100 |
| 10 | 78 | 150 |

Total = 2(50) + 4(100) + 3(150) + 1(200) = 100 + 400 + 450 + 200 = **1150** → **Promedio simulado = 1150/10 = 115 unidades/día**.
**Conclusión:** 115 ≈ 117.5; pero 4 de 10 días la demanda saltó a 150–200 ⇒ conviene stock de seguridad.

📷 *Capturas: entrada, intervalos y resultados.*

---

## 6. Parte C — Política de mantenimiento (escáner de rayos X)

**Historial de 100 fallas → distribución (vida útil antes de fallar):**

| Días útiles | Frecuencia | P(x) | Acumulada | Rango (1–100) |
|-------------|-----------|------|-----------|----------------|
| 10 | 30 | 0.30 | 0.30 | 1 – 30 |
| 20 | 40 | 0.40 | 0.70 | 31 – 70 |
| 30 | 20 | 0.20 | 0.90 | 71 – 90 |
| 40 | 10 | 0.10 | 1.00 | 91 – 100 |

**Valor Esperado Teórico (MTBF):**
E(X) = 10(0.30) + 20(0.40) + 30(0.20) + 40(0.10) = 3 + 8 + 6 + 4 = **21 días útiles**.

**Pasos en QM:** igual que las anteriores, con estos 4 valores.

**Qué debe confirmar Claude:**
- ✅ P(x), acumulada y **rangos** = tabla de arriba.
- ✅ **Expected value = 21** (es el MTBF, tiempo medio entre fallas).
- ✅ Promedio simulado de QM cercano a 21.

**Corrida manual de referencia** (secuencia: 75, 18, 55, 32, 91, 4, 61, 89, 27, 49):

| Evento | N° aleatorio | Días útiles |
|--------|--------------|-------------|
| 1 | 75 | 30 |
| 2 | 18 | 10 |
| 3 | 55 | 20 |
| 4 | 32 | 20 |
| 5 | 91 | 40 |
| 6 | 4 | 10 |
| 7 | 61 | 20 |
| 8 | 89 | 30 |
| 9 | 27 | 10 |
| 10 | 49 | 20 |

Total = 3(10) + 4(20) + 2(30) + 1(40) = 30 + 80 + 60 + 40 = **210** → **Promedio simulado = 210/10 = 21 días**.
**Conclusión:** el promedio simulado (21) calzó con el teórico (21); aun así, el 70 % de las veces falla a los 20 días o antes ⇒ mantenimiento preventivo más estricto.

📷 *Capturas: entrada, intervalos y resultados.*

---

## 7. Errores comunes (revisar si algo no calza)

1. **Esperar que QM dé 33 / 115 / 21 exactos:** no pasará salvo que uses la **misma secuencia** de números aleatorios (ver sección 3). Con la RNG de QM, comparar contra **E(X)** y la convergencia.
2. **Probabilidades que no suman 1:** las 4 P(x) de cada escenario deben sumar 1.00; si no, revisá las frecuencias (deben sumar 100).
3. **Frecuencia vs. probabilidad:** según la versión, QM pide la **probabilidad** (0.20) o la **frecuencia** (20). No mezclar.
4. **Convención de los rangos:** QM puede mostrar intervalos como 0.00–0.20 o 00–19 en vez de 1–20; lo importante es que el **ancho** del intervalo = la probabilidad (0.20, 0.40, …).
5. **Pocas corridas:** con 10 corridas el promedio de QM puede alejarse de E(X); subí a 1 000–10 000 para ver la convergencia.
6. **Valor vs. categoría:** asegurate de asociar cada probabilidad con su **valor** correcto (15/30/45/60, etc.).

---

## 8. Cómo cerrar la verificación

Cuando QM confirme la distribución, los rangos y el E(X), Claude me ayuda a redactar notas como:

> "QM for Windows reproduce la metodología de la Parte A: P(x) = 0.20/0.40/0.30/0.10 con rangos 1–20 / 21–60 / 61–90 / 91–100 y Valor Esperado = 34.5 min. Con la secuencia de números aleatorios dada, la corrida de 10 eventos da un promedio simulado de 33 min, coherente con E(X)."

> "QM confirma el E(X) de la Parte C = 21 días (MTBF); al aumentar las corridas, el promedio simulado converge a 21, validando el modelo."

Esas notas las uso como respaldo de los casos en el portafolio.
