# Guía de verificación en QM for Windows — Análisis de Markov

> **Para qué es este archivo:** Se lo voy a entregar a Claude en la web junto con capturas de pantalla de **QM for Windows (Excel QM / POM‑QM)**. El objetivo es que Claude me vaya **guiando paso a paso** para resolver este caso en el módulo *Markov Analysis* y, con cada captura que le comparta, **confirme que la ejecución está bien** (que los datos de entrada y los resultados coinciden con la solución correcta).

---

## 1. Rol de Claude (web) al usar este documento

1. Actuá como **verificador y guía**. Conocés de antemano los datos del caso y los **resultados correctos** (sección 3); úsalos como "respuesta esperada".
2. Indicame **un paso a la vez** y, después de cada uno, pedime una **captura de pantalla** para confirmar antes de avanzar.
3. Cuando te comparta una captura, **comparala** contra los valores esperados:
   - Si coincide (dentro de un margen de redondeo de ±0.0005), confirmá "✅ correcto" y explicá brevemente qué estoy viendo.
   - Si no coincide, señalá **exactamente** qué celda/valor está mal y cómo corregirlo.
4. Prestá atención a los **errores comunes** (sección 6), que son la causa típica de un resultado equivocado.
5. Al final, ayudame a redactar una conclusión corta confirmando que QM reproduce la solución hecha a mano.

---

## 2. Contexto y datos del caso

**Caso:** Clientes de cadenas de supermercados en Limón.
El mercado se reparte entre tres cadenas (estados):

| Estado | Significado | Participación inicial |
|--------|-------------|-----------------------|
| **M** | Maxi Palí | 0.45 (45 %) |
| **G** | Megasuper | 0.35 (35 %) |
| **L** | Locales | 0.20 (20 %) |

Cada año las familias pueden permanecer o cambiar de cadena. El período es **1 año**.

**Matriz de transición P** (las filas son el estado actual "Desde", las columnas el estado siguiente "Hacia"). Cada fila suma 1; la diagonal es la lealtad.

| Desde \ Hacia | M | G | L |
|---------------|------|------|------|
| **M** | 0.88 | 0.07 | 0.05 |
| **G** | 0.10 | 0.85 | 0.05 |
| **L** | 0.15 | 0.10 | 0.75 |

**Vector inicial** π(0) = [ M = 0.45 , G = 0.35 , L = 0.20 ].

**Lo que se pide:** calcular π(1) y π(2) (pronóstico a 1 y 2 años) y el **estado estable** (equilibrio de largo plazo), e interpretar cuál cadena gana.

---

## 3. Resultados correctos (referencia para comparar las capturas)

Estos valores se obtuvieron a mano y son los que **QM debe reproducir**. (Es normal que QM muestre más o menos decimales; aceptar diferencias ≤ 0.0005 por redondeo.)

### π(1) — después de 1 transición (1 año)
| Estado | Valor | % |
|--------|-------|-----|
| M | **0.4610** | 46.10 % |
| G | **0.3490** | 34.90 % |
| L | **0.1900** | 19.00 % |

Comprobación: 0.461 + 0.349 + 0.190 = **1.000** ✓

### π(2) — después de 2 transiciones (2 años)
| Estado | Valor | % |
|--------|-------|-----|
| M | **0.46908** | 46.91 % |
| G | **0.34792** | 34.79 % |
| L | **0.18300** | 18.30 % |

Comprobación: 0.46908 + 0.34792 + 0.18300 = **1.000** ✓

### Estado estable (equilibrio de largo plazo)
| Estado | Valor | % |
|--------|-------|-----|
| M | **0.4924** | 49.24 % |
| G | **0.3409** | 34.09 % |
| L | **0.1667** | 16.67 % |

Comprobación: 0.4924 + 0.3409 + 0.1667 = **1.000** ✓
**Interpretación:** a largo plazo gana **Maxi Palí (≈49 %)**; Megasuper se estabiliza (~34 %) y los locales caen (~17 %).

> Detalle del cálculo manual del estado estable (por si hay que justificarlo): se resuelve π = π·P con la condición M + G + L = 1, lo que da 1.32·M = 0.65 → M = 0.4924; luego G = 0.3409 y L = 1 − M − G = 0.1667.

---

## 4. Paso a paso en QM for Windows (módulo *Markov Analysis*)

> Los nombres exactos de menús pueden variar un poco según la versión. Si una etiqueta no calza, describime lo que ves en la captura y lo ajustamos.

**Paso 1 — Abrir el módulo.**
En la barra de menús: `Module` → **Markov Analysis**.
📷 *Captura: la ventana del módulo Markov abierta.*

**Paso 2 — Crear el problema nuevo.**
`File` → `New`. En el diálogo:
- **Number of states** = `3`.
- (Opcional) Título: `Supermercados Limon`.
- Activar nombres de fila/columna si lo permite, para rotular los estados.
Aceptar.
📷 *Captura: el diálogo de creación con "Number of states = 3".*

**Paso 3 — Rotular los estados (si se puede).**
Renombrá las filas/columnas como **M**, **G**, **L** (o Maxi Palí / Megasuper / Locales).
📷 *Captura: la tabla con los estados rotulados.*

**Paso 4 — Ingresar la matriz de transición.**
Llená la cuadrícula EXACTAMENTE así (fila = "desde", columna = "hacia"):

```
                Hacia M   Hacia G   Hacia L
Desde M           0.88      0.07      0.05
Desde G           0.10      0.85      0.05
Desde L           0.15      0.10      0.75
```

⚠️ Verificá que **cada fila sume 1**.
📷 *Captura: la matriz de transición completa.*

**Paso 5 — Ingresar las probabilidades iniciales.**
En la fila/columna rotulada **"Initial"** (o *Probabilidad inicial*), poné:
`M = 0.45`, `G = 0.35`, `L = 0.20` (suman 1).
📷 *Captura: la fila de probabilidades iniciales.*

**Paso 6 — Fijar el número de transiciones y resolver para π(1).**
Poné **Number of transitions = 1** y presioná **Solve**.
- Resultado esperado (ver sección 3): **0.461 / 0.349 / 0.190**.
📷 *Captura: la ventana de resultados con 1 transición.*

**Paso 7 — Resolver para π(2).**
Cambiá **Number of transitions = 2** y volvé a **Solve**.
- Resultado esperado: **0.46908 / 0.34792 / 0.18300** (QM puede mostrarlo como 0.4691 / 0.3479 / 0.1830).
📷 *Captura: la ventana de resultados con 2 transiciones.*

**Paso 8 — Estado estable (equilibrio).**
Buscá la salida **"Steady State Probabilities"** (probabilidades de estado estable). En algunas versiones aparece directamente al resolver; en otras conviene poner un número alto de transiciones (por ejemplo **50** o **90**) y ver que los valores se estabilizan.
- Resultado esperado: **0.4924 / 0.3409 / 0.1667**.
📷 *Captura: la ventana/columna de estado estable (o la corrida con ~50 transiciones).*

---

## 5. Checklist de verificación (qué debe confirmar Claude en cada captura)

- [ ] **Entradas correctas:** matriz de transición idéntica a la sección 2 y cada fila suma 1.
- [ ] **Vector inicial** = 0.45 / 0.35 / 0.20.
- [ ] **π(1)** = 0.461 / 0.349 / 0.190.
- [ ] **π(2)** = 0.46908 / 0.34792 / 0.18300.
- [ ] **Estado estable** ≈ 0.4924 / 0.3409 / 0.1667.
- [ ] Cada vector de resultado **suma 1** (control de consistencia).
- [ ] La interpretación coincide: **Maxi Palí gana en el largo plazo (~49 %)**.

---

## 6. Errores comunes (revisar si algo no calza)

1. **Matriz transpuesta:** confundir "desde/hacia". En QM la fila es el estado **actual** y la columna el estado **siguiente**. Si los resultados no dan, probablemente la matriz quedó al revés.
2. **Filas que no suman 1:** un dígito mal tipeado hace que la fila no sume 1 y QM arroja resultados raros o un aviso.
3. **Vector inicial mal puesto:** que sume distinto de 1 o que esté en el orden equivocado de estados (debe ser M, G, L).
4. **Número de transiciones equivocado:** π(1) necesita transitions = 1; π(2) necesita transitions = 2. No confundir con el estado estable.
5. **Confundir π(2) con el estado estable:** son distintos. π(2) = 0.46908…; el estado estable = 0.4924…
6. **Decimales/redondeo:** QM puede mostrar 3–4 decimales; las diferencias ≤ 0.0005 son normales y aceptables.

---

## 7. Cómo cerrar la verificación

Cuando las tres salidas (π(1), π(2) y estado estable) coincidan con la sección 3, Claude me ayuda a redactar una nota corta del estilo:

> "La ejecución en QM for Windows reproduce la solución manual: π(1) = (0.461, 0.349, 0.190), π(2) = (0.46908, 0.34792, 0.18300) y el estado estable = (0.4924, 0.3409, 0.1667), confirmando que Maxi Palí domina el mercado en el largo plazo (~49 %)."

Esa nota la puedo usar como respaldo del caso en el portafolio.
