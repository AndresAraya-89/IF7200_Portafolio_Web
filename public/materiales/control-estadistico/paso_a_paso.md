# Paso a Paso — Control Estadístico de la Calidad

**Curso:** IF7200 — Control Estadístico  
**Institución:** Universidad de Costa Rica, Sede del Caribe  
**Referencia:** Caso práctico — Bananera Zona de Matina, Limón

---

## Visión General del Método

El Control Estadístico de la Calidad sigue una secuencia lógica que va desde definir el problema hasta interpretar los resultados y tomar decisiones. Existen **dos rutas paralelas** según el tipo de dato:

```
DATOS DEL PROCESO
       │
       ├── ¿Variable medible? (peso, tiempo, temperatura)
       │         └──► RUTA A: Gráfica X̄-R + Índices de Capacidad
       │
       └── ¿Atributo contado? (defectuoso / no defectuoso)
                 └──► RUTA B: Gráfica p
```

Ambas rutas comparten los mismos primeros pasos (definir el problema y diseñar el muestreo) y terminan en el mismo paso final (interpretar y decidir).

---

## PASO 1 — Definir el Problema y los Parámetros

Antes de tomar cualquier dato, se debe tener claridad sobre qué se va a controlar y bajo qué condiciones.

### 1.1 Identificar la variable a controlar
- ¿Qué característica del producto o proceso se va a medir?
- ¿Es una variable continua (medible) o un atributo (contable)?

### 1.2 Establecer los límites de especificación
Estos los define el cliente, el estándar o la norma del producto. **No son límites estadísticos**, son los requisitos del negocio:

| Parámetro | Descripción |
|-----------|-------------|
| **LIE** | Límite Inferior de Especificación — el mínimo aceptable |
| **LSE** | Límite Superior de Especificación — el máximo aceptable |
| **Valor objetivo** | El valor ideal al que debe apuntar el proceso |

> **Ejemplo del caso:** La norma internacional exige 18.14 kg por caja, pero como la fruta pierde peso en tránsito, se empaca con sobrepeso. El LIE queda en 18.50 kg, el LSE en 19.05 kg y el objetivo en 18.75 kg.

### 1.3 Diseñar el muestreo
Definir cómo se van a recolectar los datos:

| Decisión | Pregunta clave |
|----------|----------------|
| Tamaño del subgrupo `n` | ¿Cuántas unidades se miden por muestra? |
| Número de subgrupos `k` | ¿Cuántas muestras se van a tomar en total? |
| Frecuencia | ¿Con qué periodicidad se toma cada muestra? |

> **Ejemplo del caso:** n = 5 cajas por muestra, k = 25 subgrupos, frecuencia = cada hora durante 3 días.

### 1.4 Seleccionar las constantes estadísticas
Con el tamaño de subgrupo `n` definido, consultar la tabla de Montgomery para obtener:

| Constante | Uso |
|-----------|-----|
| **A₂** | Para calcular los límites de la gráfica X̄ |
| **D₃** | Para el límite inferior de la gráfica R |
| **D₄** | Para el límite superior de la gráfica R |
| **d₂** | Para estimar la desviación estándar del proceso |

> **Ejemplo del caso:** Con n = 5 → A₂ = 0.577, D₃ = 0, D₄ = 2.114, d₂ = 2.326

---

## PASO 2 — Recolectar los Datos

Registrar las mediciones o conteos en una tabla organizada por subgrupos.

### Para la Gráfica X̄-R (variables):

| Subgrupo | x₁ | x₂ | x₃ | x₄ | x₅ | X̄ (Media) | R (Rango) |
|----------|----|----|----|----|----|-----------| ----------|
| 1 | 18.73 | 18.73 | 18.74 | 18.83 | 18.73 | — | — |
| 2 | 18.57 | 18.79 | 18.72 | 18.72 | 18.76 | — | — |
| ... | | | | | | | |
| k | | | | | | | |

> Las columnas X̄ (Media) y R (Rango) se calculan en el siguiente paso.

### Para la Gráfica p (atributos):

| Turno | Cajas inspeccionadas (n) | Cajas rechazadas (d) | Proporción (p) | LCS | LC | LCI |
|-------|--------------------------|----------------------|----------------|-----|----|-----|
| 1 | 105 | 9 | — | — | — | — |
| 2 | 92 | 5 | — | — | — | — |
| ... | | | | | | |

> Las columnas de resultados se calculan en los pasos siguientes.

---

## RUTA A — Gráfica X̄-R (Variables Medibles)

---

## PASO 3A — Calcular la Media y el Rango de Cada Subgrupo

Para cada fila de la tabla de datos, calcular dos valores:

### Media del subgrupo (X̄):
Sumar todos los valores del subgrupo y dividir entre n.

```
X̄ = (x₁ + x₂ + x₃ + x₄ + x₅) / n
```

> Ejemplo subgrupo 1: (18.73 + 18.73 + 18.74 + 18.83 + 18.73) / 5 = **18.752**

### Rango del subgrupo (R):
Restar el valor mínimo al valor máximo del subgrupo.

```
R = x_max − x_min
```

> Ejemplo subgrupo 1: 18.83 − 18.73 = **0.10**

Repetir para los k subgrupos hasta completar la tabla.

---

## PASO 4A — Calcular la Gran Media y el Rango Promedio

Una vez que todos los subgrupos tienen su X̄ y su R, calcular los promedios globales.

### Gran Media (X̄̄):
Promedio de todas las medias de subgrupo.

```
X̄̄ = (X̄₁ + X̄₂ + ... + X̄ₖ) / k
```

> Ejemplo del caso: Suma de las 25 medias / 25 = **18.8193**

### Rango Promedio (R̄):
Promedio de todos los rangos de subgrupo.

```
R̄ = (R₁ + R₂ + ... + Rₖ) / k
```

> Ejemplo del caso: Suma de los 25 rangos / 25 = **0.2156**

---

## PASO 5A — Calcular los Límites de Control

Con X̄̄, R̄ y las constantes de la tabla, calcular los seis límites de control.

### Gráfica X̄:

| Límite | Fórmula | Ejemplo del caso |
|--------|---------|------------------|
| LCS | X̄̄ + A₂ · R̄ | 18.8193 + 0.577 × 0.2156 = **18.9437** |
| LC | X̄̄ | **18.8193** |
| LCI | X̄̄ − A₂ · R̄ | 18.8193 − 0.577 × 0.2156 = **18.6949** |

### Gráfica R:

| Límite | Fórmula | Ejemplo del caso |
|--------|---------|------------------|
| LCS | D₄ · R̄ | 2.114 × 0.2156 = **0.4558** |
| LC | R̄ | **0.2156** |
| LCI | D₃ · R̄ | 0 × 0.2156 = **0** |

---

## PASO 6A — Construir las Gráficas de Control

Con los límites calculados, trazar las gráficas:

### Gráfica X̄:
1. Eje X → número de subgrupo (1, 2, 3, ..., k)
2. Eje Y → valor de la media del subgrupo
3. Trazar tres líneas horizontales:
   - LCS (línea roja superior punteada)
   - LC (línea verde central sólida)
   - LCI (línea roja inferior punteada)
4. Graficar cada X̄ como un punto y unirlos con una línea

### Gráfica R:
1. Eje X → número de subgrupo
2. Eje Y → valor del rango del subgrupo
3. Trazar las mismas tres líneas: LCS_R, LC_R, LCI_R
4. Graficar cada R como un punto y unirlos

> **Ambas gráficas se analizan en conjunto**, ya que una puede estar bajo control y la otra no.

---

## PASO 7A — Calcular los Índices de Capacidad

Si la gráfica X̄-R muestra que el proceso está bajo control estadístico, el siguiente paso es evaluar si ese proceso cumple con las especificaciones del cliente.

### Paso 7A.1 — Estimar la Desviación Estándar:

```
σ = R̄ / d₂
```

> Ejemplo: 0.2156 / 2.326 = **0.0927**

### Paso 7A.2 — Calcular el Cp (Capacidad sin centrado):

```
Cp = (LSE − LIE) / (6 × σ)
```

> Ejemplo: (19.05 − 18.50) / (6 × 0.0927) = 0.55 / 0.5562 = **0.9889**

### Paso 7A.3 — Calcular el Cpk (Capacidad con centrado):

```
Cpk = min( (LSE − X̄̄) / (3σ) ,  (X̄̄ − LIE) / (3σ) )
```

> Ejemplo:
> - Lado superior: (19.05 − 18.8193) / (3 × 0.0927) = 0.2307 / 0.2781 = **0.8297**
> - Lado inferior: (18.8193 − 18.50) / (3 × 0.0927) = 0.3193 / 0.2781 = **1.1481**
> - Cpk = min(0.8297, 1.1481) = **0.8297**

### Interpretación de los índices:

| Situación | Diagnóstico |
|-----------|-------------|
| Cp < 1.00 | El proceso NO es capaz; produce fuera de especificaciones |
| Cp = 1.00 | Apenas capaz, sin margen de error |
| 1.00 ≤ Cp < 1.33 | Capaz pero no suficientemente robusto |
| Cp ≥ 1.33 | Capaz y adecuado para producción |
| Cpk < Cp | El proceso está descentrado respecto a las especificaciones |
| Cpk = Cp | El proceso está perfectamente centrado |

> **Diagnóstico del caso:** Cp = 0.9889 (proceso NO capaz) y Cpk = 0.8297 (además está descentrado, más cerca del LSE). Se necesita mejorar el proceso.

---

## RUTA B — Gráfica p (Atributos)

---

## PASO 3B — Calcular la Proporción de Defectuosos por Turno (p)

Para cada turno, dividir la cantidad de unidades defectuosas entre el total inspeccionado.

```
p = d / n
```

> Ejemplo turno 1: 9 / 105 = **0.0857** (8.57% de cajas rechazadas)
> Ejemplo turno 8: 18 / 92 = **0.1957** (19.57% de cajas rechazadas)

Calcular para los k turnos y registrar en la tabla.

---

## PASO 4B — Calcular la Proporción Promedio Global (p̄)

No es el promedio de los valores de p, sino la proporción total: total de defectuosos dividido entre el total inspeccionado en todos los turnos.

```
p̄ = (d₁ + d₂ + ... + dₖ) / (n₁ + n₂ + ... + nₖ)
p̄ = Σdᵢ / Σnᵢ
```

> Ejemplo del caso:
> - Suma total de rechazadas: 9+5+6+4+9+4+10+18+6+9+5+5+8+4+8+8+14+15+16+16 = **179**
> - Suma total inspeccionadas: 105+92+94+88+96+113+119+92+119+103+93+109+116+85+110+105+97+80+93+114 = **2023**
> - p̄ = 179 / 2023 = **0.0885** (8.85% de rechazo global)

---

## PASO 5B — Calcular los Límites de Control por Turno

**Importante:** En la gráfica p, los límites de control se calculan individualmente para cada turno porque el tamaño del lote inspeccionado (n) varía de turno a turno. La LC (p̄) sí es constante para todos.

### Línea Central (LC):
```
LC = p̄  →  constante para todos los turnos
```
> Ejemplo: LC = **0.0885** en todos los 20 turnos

### Límite de Control Superior (LCS):
```
LCS = p̄ + 3 × √( p̄ × (1 − p̄) / n )
```
> Ejemplo turno 1 (n=105): 0.0885 + 3 × √(0.0885 × 0.9115 / 105) = **0.1716**
> Ejemplo turno 8 (n=92):  0.0885 + 3 × √(0.0885 × 0.9115 / 92)  = **0.1773**

> Los lotes más pequeños generan un LCS más alto (límite más amplio porque hay más incertidumbre con menos datos).

### Límite de Control Inferior (LCI):
```
LCI = p̄ − 3 × √( p̄ × (1 − p̄) / n )
```
> Si el resultado es negativo → LCI = 0 (la proporción no puede ser negativa)

> Ejemplo turno 1 (n=105): 0.0885 − 3 × √(0.0885 × 0.9115 / 105) = **0.0053**
> Ejemplo turno 2 (n=92): resultado negativo → **LCI = 0**

Calcular LCS y LCI para cada uno de los k turnos.

---

## PASO 6B — Construir la Gráfica p

1. Eje X → número de turno (1, 2, ..., k)
2. Eje Y → proporción defectuosa (p)
3. Trazar la LC como una línea horizontal constante (verde sólida)
4. Trazar el LCS como una línea que puede variar entre turnos (roja punteada superior)
5. Trazar el LCI como una línea que puede variar entre turnos (roja punteada inferior)
6. Graficar cada p como un punto y unirlos con una línea

---

## PASO 8 — Interpretar las Gráficas y Detectar Patrones Anómalos

Este paso aplica para **ambas rutas** (X̄-R y p). Un proceso bajo control estadístico no tiene ninguna de estas señales de alerta:

### Señales de que el proceso está FUERA de control:

| Señal | Descripción | Ejemplo en el caso |
|-------|-------------|-------------------|
| **Punto fuera de límites** | Un punto supera el LCS o cae bajo el LCI | Subgrupo 16 (X̄ = 19.152) supera el LCS; Subgrupo 7 (X̄ = 18.630) cae bajo el LCI |
| **Corrida** | 7 o más puntos consecutivos todos por encima o todos por debajo de la LC | Subgrupos 18 al 24, todos por encima de la LC |
| **Tendencia** | 5 o más puntos consecutivos todos en aumento o todos en disminución | Subgrupos 17 al 25, tendencia sostenida al alza |
| **Múltiples puntos fuera** | Varios puntos seguidos cerca o fuera del límite superior | Subgrupos 23, 24, 25 cerca del LCS |

### Causas probables y acciones recomendadas:

| Patrón detectado | Causa probable | Acción recomendada |
|-----------------|----------------|--------------------|
| Punto aislado bajo el LCI | Lote de fruta con bajo peso, selección deficiente | Revisar calidad de la fruta recibida del campo |
| Punto aislado sobre el LCS | Descalibración de la báscula | Recalibrar báscula inmediatamente |
| Corrida por encima de la LC | Desplazamiento de la media (cambio en el proceso) | Investigar cambio de proveedor, operario o procedimiento |
| Tendencia ascendente sostenida | Desgaste progresivo del equipo dosificador | Mantenimiento preventivo del equipo de empaque |
| Múltiples puntos sobre el LCS | Acumulación de sobrepeso por falta de ajuste | Detener producción y reajustar peso objetivo |

---

## PASO 9 — Tomar la Decisión

Con la información de las gráficas y los índices de capacidad, el proceso lleva a una de tres decisiones posibles:

```
¿El proceso está bajo control estadístico?
│
├── NO → Hay causas especiales
│         └── Identificar la causa → Corregir → Volver al Paso 2
│
└── SÍ → Evaluar la capacidad (Cp y Cpk)
          │
          ├── Cp ≥ 1.33 y Cpk ≈ Cp → MANTENER: el proceso funciona bien
          │
          ├── Cp ≥ 1.33 pero Cpk < Cp → CENTRAR: ajustar la media del proceso
          │
          └── Cp < 1.33 → MEJORAR: reducir la variabilidad del proceso
```

---

## Resumen Visual del Método Completo

```
PASO 1 — Definir el problema
   ↓ Variable + Especificaciones + Muestreo + Constantes

PASO 2 — Recolectar los datos
   ↓ Tabla de subgrupos / Tabla de turnos

         ┌─────────────────────────────────────────────────┐
         │ RUTA A (Variables)    │    RUTA B (Atributos)   │
         │                       │                         │
PASO 3A  │  Calcular X̄ y R       │  Calcular p por turno   │  PASO 3B
PASO 4A  │  Calcular X̄̄ y R̄      │  Calcular p̄ global      │  PASO 4B
PASO 5A  │  Límites X̄ y R        │  Límites p (por turno)  │  PASO 5B
PASO 6A  │  Graficar X̄-R         │  Graficar p             │  PASO 6B
PASO 7A  │  Calcular Cp y Cpk    │  (no aplica para p)     │
         └─────────────────────────────────────────────────┘

PASO 8 — Interpretar gráficas y detectar patrones anómalos
   ↓

PASO 9 — Decidir: Mantener / Centrar / Mejorar / Corregir
```

---

*Documento preparado para uso en portafolio web y como referencia de implementación para Claude Code — IF7200 Control Estadístico.*
