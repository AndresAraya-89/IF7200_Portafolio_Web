# Explicación de Fórmulas — Modelo de Simulación Monte Carlo

> **Propósito del documento:** Referencia técnica para el desarrollo de un portafolio web e instrucciones para Claude Code. Incluye nombre, descripción, objetivo y explicación de variables de cada fórmula utilizada en la Simulación Monte Carlo.

---

## Índice

1. [Probabilidad Empírica](#1-probabilidad-empírica)
2. [Función de Distribución Acumulada](#2-función-de-distribución-acumulada)
3. [Valor Esperado Teórico](#3-valor-esperado-teórico)
4. [Promedio Simulado de Monte Carlo](#4-promedio-simulado-de-monte-carlo)
5. [Frecuencia Ponderada](#5-frecuencia-ponderada)
6. [Promedio Simulado Final](#6-promedio-simulado-final)
7. [Regla de Asignación — Límite Inferior del Rango](#7-regla-de-asignación--límite-inferior-del-rango)
8. [Regla de Asignación — Límite Superior del Rango](#8-regla-de-asignación--límite-superior-del-rango)
9. [Condición de Normalización](#9-condición-de-normalización)

---

## 1. Probabilidad Empírica

### Fórmula en LaTeX
```latex
P(x) = \frac{f}{N}
```

### Descripción
Es el cálculo que convierte datos históricos de frecuencia (cuántas veces ocurrió algo) en una probabilidad expresada entre 0 y 1. Se obtiene dividiendo cuántas veces ocurrió un resultado específico entre el total de observaciones registradas.

### Objetivo
Transformar registros históricos en probabilidades que el modelo pueda utilizar. Es el primer paso del algoritmo Monte Carlo: antes de poder simular, se necesita saber qué tan probable es cada resultado posible, y esta fórmula lo calcula directamente a partir de datos reales.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `P(x)` | Probabilidad del valor x | La probabilidad resultante de que ocurra el evento x; siempre estará entre 0 y 1 |
| `x` | Valor o resultado específico | El evento o tiempo particular del que se quiere calcular la probabilidad (ej: 15 minutos, 30 minutos) |
| `f` | Frecuencia absoluta | Cuántas veces se observó el resultado x en el historial de datos |
| `N` | Total de observaciones | El número total de registros históricos disponibles; es la base del cálculo |

### Ejemplo de aplicación
Caso de inspección aduanera en Limón (100 contenedores observados):
- `P(15 min) = 20 / 100 = 0.20` → 20% de probabilidad
- `P(30 min) = 40 / 100 = 0.40` → 40% de probabilidad
- `P(45 min) = 30 / 100 = 0.30` → 30% de probabilidad
- `P(60 min) = 10 / 100 = 0.10` → 10% de probabilidad

---

## 2. Función de Distribución Acumulada

### Fórmula en LaTeX
```latex
F(x) = \sum P(x)
```

### Descripción
Es la suma progresiva de las probabilidades individuales, ordenadas de menor a mayor. Cada valor acumulado se obtiene sumando la probabilidad del valor actual a todas las probabilidades anteriores. El último valor siempre debe llegar exactamente a 1.00, confirmando que se han cubierto todos los casos posibles.

### Objetivo
Construir la tabla que permitirá asignar rangos de números aleatorios a cada resultado posible. La distribución acumulada es el puente entre las probabilidades teóricas y la simulación práctica: define qué intervalo de números aleatorios corresponde a cada resultado, permitiendo que la frecuencia de aparición de cada resultado en la simulación refleje su probabilidad real.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `F(x)` | Probabilidad acumulada hasta el valor x | La suma de todas las probabilidades desde el primer valor hasta x inclusive |
| `Σ` | Sumatoria progresiva | Indica que se suman todas las probabilidades P(x) desde el inicio hasta el valor actual |
| `P(x)` | Probabilidad individual de cada valor | Cada una de las probabilidades calculadas con la Fórmula 1 que se van acumulando |

### Tabla de construcción paso a paso

| Valor (x) | P(x) | F(x) acumulada | Cómo se calcula |
|-----------|------|----------------|-----------------|
| Primer valor  | 0.20 | 0.20 | 0.20 (primer valor, igual a P(x)) |
| Segundo valor | 0.40 | 0.60 | 0.20 + 0.40 |
| Tercer valor  | 0.30 | 0.90 | 0.60 + 0.30 |
| Cuarto valor  | 0.10 | 1.00 | 0.90 + 0.10 ← siempre debe llegar a 1 |

---

## 3. Valor Esperado Teórico

### Fórmula en LaTeX
```latex
E(X) = \sum X_i \cdot P(X_i)
```

### Descripción
Es el promedio ponderado de todos los resultados posibles, donde cada resultado se pondera (multiplica) por su probabilidad de ocurrencia. Representa el valor promedio que se esperaría obtener si el proceso se repitiera una cantidad muy grande de veces. No es un resultado que ocurra en cada evento, sino el promedio de largo plazo.

### Objetivo
Establecer el valor de referencia teórico con el que se comparará el resultado de la simulación. Sirve como punto de control: si la simulación Monte Carlo se ejecuta correctamente con suficientes corridas, su promedio simulado debe aproximarse a este valor. La diferencia entre ambos refleja la variabilidad natural del sistema en muestras pequeñas.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `E(X)` | Valor Esperado (Esperanza Matemática) | El promedio teórico de largo plazo del sistema; resultado de la fórmula |
| `Σ` | Sumatoria | Indica que se debe repetir la multiplicación para cada par (Xᵢ, P(Xᵢ)) y sumar todos los resultados |
| `Xᵢ` | Valor del resultado i | Cada uno de los posibles resultados del sistema (ej: 15, 30, 45, 60 minutos) |
| `P(Xᵢ)` | Probabilidad del resultado i | La probabilidad calculada para ese resultado específico (Fórmula 1) |
| `i` | Índice del resultado | Contador que identifica cada resultado posible (1, 2, 3... hasta k) |

### Forma expandida
```latex
E(X) = X_1 \cdot P(X_1) + X_2 \cdot P(X_2) + \cdots + X_k \cdot P(X_k)
```

### Ejemplos de aplicación

**Caso 1 — Colas (tiempo de atención de camiones):**
`E(X) = 3(0.15) + 5(0.40) + 8(0.30) + 12(0.15) = 6.65 minutos`

**Caso 2 — Inventario (demanda de contenedores):**
`E(X) = 20(0.10) + 40(0.25) + 60(0.45) + 80(0.20) = 55 contenedores`

**Caso 3 — Mantenimiento (MTBF de grúas STS):**
`E(X) = 5(0.20) + 10(0.40) + 15(0.30) + 20(0.10) = 11.5 días`

---

## 4. Promedio Simulado de Monte Carlo

### Fórmula en LaTeX
```latex
\bar{X} = \frac{\sum X_{\text{simulados}}}{N}
```

### Descripción
Es el promedio aritmético calculado a partir de los resultados obtenidos durante la corrida de simulación. Se calcula dividiendo la suma de todos los valores que arrojó la simulación (uno por cada número aleatorio usado) entre la cantidad total de eventos simulados. Es el resultado práctico de la simulación y el que se compara con el Valor Esperado Teórico.

### Objetivo
Obtener el estimado empírico del comportamiento del sistema a través de la simulación. Este promedio representa lo que se observaría en la práctica si el sistema operara durante N períodos. Al compararlo con el Valor Esperado Teórico, se puede evaluar qué tan bien capta la simulación el comportamiento real y qué tan grande es la variabilidad del sistema con muestras pequeñas.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `X̄` (X con barra) | Promedio simulado | El resultado promedio obtenido de la simulación; es el valor de salida principal de Monte Carlo |
| `Σ` | Sumatoria | Indica que se suman todos los resultados individuales obtenidos durante la simulación |
| `X_simulados` | Valores generados por la simulación | Cada uno de los resultados obtenidos al asignar un número aleatorio a su rango correspondiente |
| `N` | Número total de simulaciones | Cantidad de eventos o corridas realizadas (ej: 10 camiones, 10 días, 10 ciclos) |

### Variantes por contexto (tal como aparecen en los documentos)

**Caso de Colas:**
```latex
\bar{X} = \frac{\sum X_{\text{simulados}}}{N}
```

**Caso de Inventario:**
```latex
\bar{X} = \frac{\sum X_{\text{demanda}}}{N}
```

**Caso de Mantenimiento:**
```latex
\bar{X} = \frac{\sum X_{\text{fallas}}}{N}
```

---

## 5. Frecuencia Ponderada

### Fórmula en LaTeX
```latex
T = \sum_{i=1}^{k} f_i \cdot x_i
```

### Descripción
Es el total acumulado que resulta de multiplicar cada valor posible por la cantidad de veces que ese valor apareció durante la simulación, y luego sumar todos esos productos. Es un paso intermedio necesario para calcular el Promedio Simulado Final cuando los resultados se presentan agrupados por frecuencia de ocurrencia.

### Objetivo
Calcular eficientemente la suma total de todos los resultados de la simulación sin tener que sumarlos uno por uno. En lugar de sumar cada resultado individual, se agrupa por valor y se multiplica por cuántas veces ocurrió ese valor, lo que simplifica el cálculo y facilita la verificación.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `T` | Total ponderado (suma total) | La suma de todos los valores generados en la simulación; resultado de esta fórmula |
| `Σ` | Sumatoria | Indica que se repite la operación para cada valor posible y se suman los resultados |
| `i=1` | Límite inferior | El índice empieza desde el primer valor posible |
| `k` | Límite superior | El índice llega hasta el último valor posible del sistema |
| `fᵢ` | Frecuencia simulada del valor i | Cuántas veces apareció el valor xᵢ durante la corrida de simulación |
| `xᵢ` | Valor del resultado i | Cada uno de los posibles resultados del sistema |

### Ejemplo de aplicación
Caso de inspección (10 corridas): 15 min×3 veces, 30 min×3 veces, 45 min×3 veces, 60 min×1 vez:
- `T = (3 × 15) + (3 × 30) + (3 × 45) + (1 × 60) = 45 + 90 + 135 + 60 = 330`

---

## 6. Promedio Simulado Final

### Fórmula en LaTeX
```latex
\bar{X} = \frac{T}{N}
```

### Descripción
Es la fórmula final que obtiene el promedio de la simulación dividiendo el total ponderado entre el número de eventos simulados. Es la versión simplificada del Promedio Simulado de Monte Carlo (Fórmula 4), aplicada cuando ya se calculó previamente la Frecuencia Ponderada T (Fórmula 5).

### Objetivo
Obtener el resultado final de la simulación en una unidad interpretable (minutos, unidades, días, etc.) que pueda compararse directamente con el Valor Esperado Teórico. Es el número con el que se redactan las conclusiones gerenciales del análisis.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `X̄` (X con barra) | Promedio Simulado Final | El resultado final de la simulación; la respuesta central del análisis Monte Carlo |
| `T` | Total ponderado | La suma total calculada con la Fórmula 5 (Frecuencia Ponderada) |
| `N` | Número total de simulaciones | La cantidad de eventos simulados en la corrida (denominador que convierte la suma en promedio) |

### Ejemplo de aplicación
Caso de inspección aduanera:
- `T = 330` minutos totales
- `N = 10` contenedores simulados
- `X̄ = 330 / 10 = 33 minutos` → Promedio simulado final

Comparación: Teórico `E(X) = 34.5 min` vs Simulado `X̄ = 33 min` → diferencia del 4.3% por variabilidad muestral.

---

## 7. Regla de Asignación — Límite Inferior del Rango

### Fórmula en LaTeX
```latex
R_{\min}^{(i)} = R_{\max}^{(i-1)} + 1
```

### Descripción
Define en qué número comienza el rango de números aleatorios que corresponde a un valor determinado. El límite inferior de cualquier rango es siempre el número inmediatamente siguiente al límite superior del rango anterior. Para el primer valor del sistema, el límite inferior es siempre 1.

### Objetivo
Construir rangos de números aleatorios contiguos, sin huecos ni solapamientos, que asignen a cada resultado posible un intervalo de números proporcional a su probabilidad. Esta regla garantiza que si se genera un número aleatorio del 1 al 100, caiga exactamente en uno (y solo uno) de los rangos definidos.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `R_min^(i)` | Límite inferior del rango i | El número aleatorio más bajo que pertenece al rango del valor i |
| `R_max^(i-1)` | Límite superior del rango anterior | El número aleatorio más alto del rango que corresponde al valor inmediatamente anterior |
| `+1` | Incremento unitario | Garantiza que los rangos sean contiguos sin solapamiento ni brecha entre ellos |
| `i` | Índice del valor actual | Identifica a qué valor del sistema pertenece el rango que se está calculando |
| `i-1` | Índice del valor anterior | Referencia al rango del valor que precede al actual en la tabla |

### Caso especial
Para el **primer valor** (i=1), no hay rango anterior, por lo que:
```
R_min^(1) = 1   (siempre empieza en 1)
```

---

## 8. Regla de Asignación — Límite Superior del Rango

### Fórmula en LaTeX
```latex
R_{\max}^{(i)} = F(x_i) \times 100
```

### Descripción
Define en qué número termina el rango de números aleatorios que corresponde a un valor determinado. Se calcula multiplicando la probabilidad acumulada de ese valor por 100, lo que convierte la probabilidad (que está entre 0 y 1) en un número del 1 al 100 compatible con los números aleatorios de dos dígitos usados en la simulación.

### Objetivo
Establecer el límite superior de cada rango de forma que el tamaño del intervalo sea proporcional a la probabilidad del resultado. Un valor con probabilidad 0.40 tendrá un rango de 40 números, uno con probabilidad 0.20 tendrá un rango de 20 números, garantizando así que al generar números aleatorios al azar, la frecuencia con que caen en cada rango refleje la probabilidad real.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `R_max^(i)` | Límite superior del rango i | El número aleatorio más alto que pertenece al rango del valor i |
| `F(xᵢ)` | Probabilidad acumulada del valor i | El valor acumulado calculado con la Fórmula 2 para el valor xᵢ |
| `× 100` | Factor de escala | Convierte la probabilidad decimal (ej: 0.60) en un número entero del 1 al 100 (ej: 60) |
| `xᵢ` | Valor del resultado i | El resultado específico cuyo rango superior se está calculando |

### Tabla completa de rangos — Ejemplo

| Valor (x) | P(x) | F(x) | R_min | R_max | Tamaño del rango |
|-----------|------|------|-------|-------|-----------------|
| 15 min | 0.20 | 0.20 | 1  | 20  | 20 números |
| 30 min | 0.40 | 0.60 | 21 | 60  | 40 números |
| 45 min | 0.30 | 0.90 | 61 | 90  | 30 números |
| 60 min | 0.10 | 1.00 | 91 | 100 | 10 números |

---

## 9. Condición de Normalización

### Fórmula en LaTeX
```latex
\sum_{i=1}^{k} P(x_i) = 1
```

### Descripción
Es la regla de verificación que establece que la suma de todas las probabilidades individuales del sistema debe ser exactamente igual a 1. Es la prueba de que los datos son completos y consistentes: si la suma no da 1, hay un error en los datos o faltan categorías por incluir.

### Objetivo
Validar que la tabla de probabilidades es correcta antes de proceder con la simulación. Si esta condición no se cumple, la distribución acumulada no llegará a 1.00, los rangos de números aleatorios no cubrirán del 1 al 100, y la simulación producirá resultados incorrectos. Es el control de calidad del modelo.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `Σ` | Sumatoria | Indica que se suman todas las probabilidades individuales del sistema |
| `i=1` | Límite inferior | El índice empieza desde el primer valor posible |
| `k` | Límite superior | El índice llega hasta el último valor posible; k es el número total de resultados distintos |
| `P(xᵢ)` | Probabilidad del valor i | Cada una de las probabilidades calculadas con la Fórmula 1 |
| `1` | Resultado requerido | La suma debe ser exactamente 1 (equivale al 100% de los casos posibles) |

### Ejemplos de verificación
- Caso colas: `0.20 + 0.40 + 0.30 + 0.10 = 1.00` ✓
- Caso inventario: `0.10 + 0.25 + 0.45 + 0.20 = 1.00` ✓
- Caso mantenimiento: `0.20 + 0.40 + 0.30 + 0.10 = 1.00` ✓

---

## Resumen General de Fórmulas

| # | Nombre | Fórmula (LaTeX) | Paso del Algoritmo |
|---|--------|-----------------|-------------------|
| 1 | Probabilidad Empírica | `P(x) = \frac{f}{N}` | Paso 2: Calcular probabilidades |
| 2 | Función de Distribución Acumulada | `F(x) = \sum P(x)` | Paso 3: Construir acumuladas |
| 3 | Valor Esperado Teórico | `E(X) = \sum X_i \cdot P(X_i)` | Paso 2: Referencia teórica |
| 4 | Promedio Simulado Monte Carlo | `\bar{X} = \frac{\sum X_{\text{simulados}}}{N}` | Paso 6: Analizar resultados |
| 5 | Frecuencia Ponderada | `T = \sum_{i=1}^{k} f_i \cdot x_i` | Paso 6: Consolidación |
| 6 | Promedio Simulado Final | `\bar{X} = \frac{T}{N}` | Paso 6: Resultado final |
| 7 | Límite Inferior del Rango | `R_{\min}^{(i)} = R_{\max}^{(i-1)} + 1` | Paso 3: Asignación de rangos |
| 8 | Límite Superior del Rango | `R_{\max}^{(i)} = F(x_i) \times 100` | Paso 3: Asignación de rangos |
| 9 | Condición de Normalización | `\sum_{i=1}^{k} P(x_i) = 1` | Paso 2: Verificación |

---

## Algoritmo General Monte Carlo — Flujo Completo

```
PASO 1 → Recolectar datos históricos
         Construir tabla de frecuencias observadas
         (Datos de entrada: valores y frecuencias)
              ↓
PASO 2 → Calcular probabilidades individuales
         (Fórmula 1: P(x) = f / N)
         Verificar con Fórmula 9 que la suma = 1
         Calcular el Valor Esperado Teórico
         (Fórmula 3: E(X) = Σ Xᵢ · P(Xᵢ))
              ↓
PASO 3 → Construir la distribución acumulada
         (Fórmula 2: F(x) = Σ P(x))
         Asignar rangos de números aleatorios
         (Fórmula 7: Límite inferior del rango)
         (Fórmula 8: Límite superior del rango)
              ↓
PASO 4 → Generar números aleatorios
         (Del 1 al 100, uno por evento a simular)
              ↓
PASO 5 → Simular
         Comparar cada número aleatorio con los rangos
         Asignar el valor correspondiente a cada RN
              ↓
PASO 6 → Analizar resultados
         Calcular Frecuencia Ponderada
         (Fórmula 5: T = Σ fᵢ · xᵢ)
         Calcular Promedio Simulado Final
         (Fórmula 6: X̄ = T / N)
         Comparar X̄ vs E(X) → Conclusión gerencial
```

---

## Los Tres Casos de Aplicación Documentados

### Caso 1 — Simulación de Colas (Tiempos de Atención)
- **Contexto:** Tiempo de atención de camiones/contenedores en puerto
- **Variable simulada:** Minutos de atención por unidad
- **Valores posibles:** 3, 5, 8, 12 min (camiones) / 15, 30, 45, 60 min (contenedores)
- **Fórmula clave de resultado:** `\bar{X} = \frac{\sum X_{\text{simulados}}}{N}`
- **Interpretación:** El promedio simulado estima el tiempo de atención esperado por turno

### Caso 2 — Simulación de Inventario (Control de Recursos)
- **Contexto:** Demanda diaria de contenedores refrigerados o marchamos aduaneros
- **Variable simulada:** Unidades demandadas por día
- **Valores posibles:** 20, 40, 60, 80 unidades / 50, 100, 150, 200 marchamos
- **Fórmula clave de resultado:** `\bar{X} = \frac{\sum X_{\text{demanda}}}{N}`
- **Interpretación:** El promedio simulado determina el stock de seguridad recomendado

### Caso 3 — Simulación de Mantenimiento (Política de Mantenimiento)
- **Contexto:** Tiempo entre fallas críticas de grúas STS o escáner de rayos X
- **Variable simulada:** Días útiles de funcionamiento antes de falla
- **Valores posibles:** 5, 10, 15, 20 días / 10, 20, 30, 40 días
- **Fórmula clave de resultado:** `\bar{X} = \frac{\sum X_{\text{fallas}}}{N}`
- **Interpretación:** El promedio simulado define cuándo programar el mantenimiento preventivo

---

## Relación entre Valor Esperado Teórico y Promedio Simulado

| Concepto | Fórmula | Tipo | Cuándo se usa |
|----------|---------|------|---------------|
| Valor Esperado Teórico `E(X)` | `Σ Xᵢ · P(Xᵢ)` | Cálculo matemático exacto | Como referencia ideal de largo plazo |
| Promedio Simulado `X̄` | `Σ X_sim / N` | Estimado empírico | Como resultado práctico de la simulación |
| Diferencia | `E(X) - X̄` | Medida de variabilidad | Para redactar la conclusión gerencial |

> **Nota clave para Claude Code:** Cuanto mayor sea N (número de simulaciones), más se acercará `X̄` a `E(X)`. Con N=10, es normal que exista una diferencia del 2% al 8%. Esta variabilidad no es un error, sino la naturaleza estocástica del sistema que justifica el uso de la simulación.

---

*Documento creado como referencia para portafolio web y desarrollo con Claude Code.*
*Tema: Modelado de Simulación Monte Carlo — Métodos Cuantitativos para la Toma de Decisiones*
