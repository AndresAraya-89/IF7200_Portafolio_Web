# Explicación de Fórmulas — Modelo de Transporte
**Curso:** IF7200 - Métodos Cuantitativos para la Toma de Decisiones  
**Tema:** Modelos de Transporte y Asignación  
**Propósito del documento:** Referencia técnica para portafolio web y desarrollo con Claude Code

---

## Índice de Fórmulas

1. [Función Objetivo de Maximización](#1-función-objetivo-de-maximización)
2. [Condición de Balance del Modelo](#2-condición-de-balance-del-modelo)
3. [Restricciones de Oferta](#3-restricciones-de-oferta)
4. [Restricciones de Demanda](#4-restricciones-de-demanda)
5. [Restricción de No Negatividad](#5-restricción-de-no-negatividad)
6. [Transformación a Costo de Oportunidad (Vogel)](#6-transformación-a-costo-de-oportunidad-vogel)
7. [Penalización de Vogel por Fila o Columna](#7-penalización-de-vogel-por-fila-o-columna)
8. [Regla de Asignación de Vogel](#8-regla-de-asignación-de-vogel)
9. [Cálculo de la Ganancia Total](#9-cálculo-de-la-ganancia-total)
10. [Condición de No Degeneración (Salto de Piedra)](#10-condición-de-no-degeneración-salto-de-piedra)
11. [Índice de Mejora — Salto de Piedra en Piedra](#11-índice-de-mejora--salto-de-piedra-en-piedra)
12. [Criterio de Optimalidad en Maximización](#12-criterio-de-optimalidad-en-maximización)
13. [Función Objetivo — Modelo de Asignación](#13-función-objetivo--modelo-de-asignación)
14. [Restricciones del Modelo de Asignación](#14-restricciones-del-modelo-de-asignación)
15. [Reducción de Filas y Columnas — Método Húngaro](#15-reducción-de-filas-y-columnas--método-húngaro)
16. [Valor Óptimo del Modelo de Asignación](#16-valor-óptimo-del-modelo-de-asignación)

---

## 1. Función Objetivo de Maximización

**Nombre formal:** Función objetivo de maximización del modelo de transporte  
**También conocida como:** Objective function (Transportation Maximization Problem)

**Fórmula en LaTeX:**
```latex
\text{Maximizar } Z = \sum_{i=1}^{m} \sum_{j=1}^{n} c_{ij} \cdot X_{ij}
```

**Descripción:**  
Es la expresión matemática central del modelo. Representa la suma total de ganancias obtenidas al multiplicar la cantidad de unidades enviadas desde cada origen hacia cada destino, por la ganancia unitaria asociada a esa ruta específica. Esta sumatoria doble recorre todas las combinaciones posibles de origen-destino.

**Objetivo:**  
Encontrar la distribución de unidades entre bodegas y destinos que produzca la mayor ganancia total posible, sin exceder la oferta disponible ni incumplir la demanda requerida.

**Variables:**

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `Z` | Variable de resultado | Ganancia total del sistema (valor a maximizar) |
| `m` | Parámetro | Número total de orígenes (bodegas) |
| `n` | Parámetro | Número total de destinos (abastecedores) |
| `i` | Índice | Identifica cada origen; toma valores de 1 hasta m |
| `j` | Índice | Identifica cada destino; toma valores de 1 hasta n |
| `c_ij` | Parámetro (dato) | Ganancia unitaria por enviar una unidad desde el origen i al destino j (en miles de colones por computadora) |
| `X_ij` | Variable de decisión | Cantidad de unidades a enviar desde el origen i hacia el destino j (lo que el modelo calcula) |

**Ejemplo del caso:**
```latex
\text{Maximizar } Z = 95X_{11} + 80X_{12} + 85X_{13} + 60X_{14}
                    + 90X_{21} + 75X_{22} + 80X_{23} + 55X_{24}
                    + 92X_{31} + 78X_{32} + 83X_{33} + 58X_{34}
```

---

## 2. Condición de Balance del Modelo

**Nombre formal:** Condición de balance oferta-demanda  
**También conocida como:** Balanced transportation condition / Modelo balanceado

**Fórmula en LaTeX:**
```latex
\sum_{i=1}^{m} S_i = \sum_{j=1}^{n} D_j
```

**Descripción:**  
Verifica que la cantidad total disponible en todos los orígenes sea exactamente igual a la cantidad total requerida en todos los destinos. Cuando esta condición se cumple, el modelo se llama "balanceado" y puede resolverse directamente. Si no se cumple, es necesario agregar filas o columnas ficticias con valores de cero para equilibrar el sistema antes de aplicar cualquier método de solución.

**Objetivo:**  
Garantizar que el problema de transporte sea matemáticamente resoluble sin excedentes ni faltantes. Es el primer paso de validación antes de aplicar Vogel u otro método.

**Variables:**

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `S_i` | Parámetro (dato) | Capacidad de oferta disponible en el origen i (cantidad máxima que puede enviar la bodega i) |
| `D_j` | Parámetro (dato) | Demanda requerida en el destino j (cantidad que necesita recibir el abastecedor j) |
| `m` | Parámetro | Número de orígenes |
| `n` | Parámetro | Número de destinos |

**Ejemplo del caso:**
```latex
(120 + 80 + 200) = (100 + 85 + 105 + 110)
\quad \Rightarrow \quad 400 = 400 \quad \checkmark
```

---

## 3. Restricciones de Oferta

**Nombre formal:** Restricciones de capacidad de origen  
**También conocidas como:** Supply constraints / Restricciones de oferta

**Fórmula general en LaTeX:**
```latex
\sum_{j=1}^{n} X_{ij} = S_i \quad \forall \, i \in \{1, 2, \ldots, m\}
```

**Descripción:**  
Conjunto de ecuaciones que garantizan que la suma total de unidades enviadas desde un origen específico hacia todos los destinos sea exactamente igual a la capacidad disponible en ese origen. Se genera una restricción por cada bodega u origen del modelo.

**Objetivo:**  
Impedir que un origen envíe más unidades de las que tiene disponibles, y a la vez exigir que utilice toda su capacidad disponible (en modelos balanceados).

**Variables:**

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `X_ij` | Variable de decisión | Cantidad enviada desde el origen i hacia el destino j |
| `S_i` | Parámetro (dato) | Oferta total disponible en el origen i |
| `i` | Índice fijo en esta restricción | El origen específico que se está restringiendo |
| `j` | Índice que varía | Recorre todos los destinos posibles |
| `∀ i` | Cuantificador | Indica que la restricción aplica para cada origen por separado |

**Ejemplo del caso (una restricción por bodega):**
```latex
X_{11} + X_{12} + X_{13} + X_{14} = 120 \quad \text{(Cartago)}
```
```latex
X_{21} + X_{22} + X_{23} + X_{24} = 80 \quad \text{(Limón)}
```
```latex
X_{31} + X_{32} + X_{33} + X_{34} = 200 \quad \text{(Alajuela)}
```

---

## 4. Restricciones de Demanda

**Nombre formal:** Restricciones de requerimiento de destino  
**También conocidas como:** Demand constraints / Restricciones de demanda

**Fórmula general en LaTeX:**
```latex
\sum_{i=1}^{m} X_{ij} = D_j \quad \forall \, j \in \{1, 2, \ldots, n\}
```

**Descripción:**  
Conjunto de ecuaciones que garantizan que la suma total de unidades recibidas en un destino específico, provenientes de todos los orígenes, sea exactamente igual a la demanda requerida en ese destino. Se genera una restricción por cada destino o abastecedor del modelo.

**Objetivo:**  
Asegurar que cada destino reciba exactamente la cantidad de unidades que necesita, ni más ni menos (en modelos balanceados).

**Variables:**

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `X_ij` | Variable de decisión | Cantidad enviada desde el origen i hacia el destino j |
| `D_j` | Parámetro (dato) | Demanda total requerida en el destino j |
| `j` | Índice fijo en esta restricción | El destino específico que se está restringiendo |
| `i` | Índice que varía | Recorre todos los orígenes posibles |
| `∀ j` | Cuantificador | Indica que la restricción aplica para cada destino por separado |

**Ejemplo del caso (una restricción por abastecedor):**
```latex
X_{11} + X_{21} + X_{31} = 100 \quad \text{(Guanacaste)}
```
```latex
X_{12} + X_{22} + X_{32} = 85 \quad \text{(Limón Centro)}
```
```latex
X_{13} + X_{23} + X_{33} = 105 \quad \text{(Puntarenas)}
```
```latex
X_{14} + X_{24} + X_{34} = 110 \quad \text{(San José)}
```

---

## 5. Restricción de No Negatividad

**Nombre formal:** Restricción de no negatividad  
**También conocida como:** Non-negativity constraint

**Fórmula en LaTeX:**
```latex
X_{ij} \geq 0 \quad \forall \, i, j
```

**Descripción:**  
Condición lógica que impide que las variables de decisión tomen valores negativos. En el contexto físico del problema, no tiene sentido enviar una cantidad negativa de unidades desde una bodega hacia un destino.

**Objetivo:**  
Mantener la coherencia física y matemática del modelo, garantizando que todas las cantidades de unidades transportadas sean cero o positivas.

**Variables:**

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `X_ij` | Variable de decisión | Cantidad enviada desde el origen i al destino j; debe ser mayor o igual a cero |
| `∀ i, j` | Cuantificador | La restricción aplica para cada par de origen-destino posible |

---

## 6. Transformación a Costo de Oportunidad (Vogel)

**Nombre formal:** Fórmula de inversión para maximización / Costo de oportunidad  
**También conocida como:** Opportunity cost transformation / Fórmula de inversión

**Fórmula en LaTeX:**
```latex
c'_{ij} = c_{\max} - c_{ij}
```

**Descripción:**  
Cuando el modelo de transporte es de maximización (se quiere maximizar ganancias), el Método de Vogel trabaja con costos de minimización. Para adaptarlo, se transforma cada valor de ganancia en un "costo de oportunidad", restando la ganancia de cada celda al valor máximo de ganancia de toda la matriz. Así, la celda más rentable obtiene un costo de oportunidad de 0, y la menos rentable obtiene el mayor costo.

**Objetivo:**  
Convertir un problema de maximización en uno equivalente de minimización, permitiendo aplicar el Método de Vogel sin cambiar su lógica original. La celda con costo de oportunidad 0 es siempre la más conveniente para asignar.

**Variables:**

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `c'_ij` | Valor calculado | Costo de oportunidad de la celda (i, j) después de la transformación |
| `c_max` | Parámetro | Valor máximo de ganancia encontrado en toda la matriz de ganancias |
| `c_ij` | Parámetro (dato) | Ganancia original de la celda (i, j) antes de la transformación |

**Ejemplo del caso:**
```latex
c_{\max} = 95 \quad \Rightarrow \quad c'_{ij} = 95 - c_{ij}
```
```
Cartago → Guanacaste:   95 - 95 = 0
Cartago → Limón Centro: 95 - 80 = 15
Cartago → Puntarenas:   95 - 85 = 10
Cartago → San José:     95 - 60 = 35
```

---

## 7. Penalización de Vogel por Fila o Columna

**Nombre formal:** Penalización del Método de Aproximación de Vogel  
**También conocida como:** Vogel's penalty / VAM penalty

**Fórmula en LaTeX:**
```latex
P_k = c^{(2)}_k - c^{(1)}_k
```

**Descripción:**  
Para cada fila y columna activa de la matriz de costos de oportunidad, se calcula la diferencia entre el segundo valor más bajo y el valor más bajo disponibles. Esta diferencia representa el "costo de no elegir la mejor opción", es decir, lo que se pierde si no se asigna a la celda más económica de esa fila o columna.

**Objetivo:**  
Identificar cuál fila o columna tiene la penalización más alta, porque esa es la que más se perjudica si no se asigna óptimamente. El método prioriza esa fila/columna y asigna en su celda de menor costo de oportunidad, reduciendo el riesgo de tomar malas decisiones tempranas.

**Variables:**

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `P_k` | Valor calculado | Penalización de la fila o columna k en la iteración actual |
| `c^(1)_k` | Valor identificado | El menor costo de oportunidad disponible en la fila/columna k |
| `c^(2)_k` | Valor identificado | El segundo menor costo de oportunidad disponible en la fila/columna k |
| `k` | Índice | Representa la fila i o la columna j que se está evaluando |

**Nota:** Se calcula una penalización para cada fila activa y cada columna activa. La fila o columna con la penalización mayor determina dónde se hace la próxima asignación.

---

## 8. Regla de Asignación de Vogel

**Nombre formal:** Regla de asignación por mínimo costo con penalización máxima  
**También conocida como:** VAM allocation rule

**Fórmula en LaTeX:**
```latex
X_{ij^*} = \min(S_i,\ D_j) \quad \text{donde } (i, j^*) \text{ es la celda de menor } c'_{ij} \text{ en la fila/columna con mayor } P_k
```

**Descripción:**  
Una vez identificada la fila o columna con la mayor penalización, se asigna la mayor cantidad posible de unidades a la celda de menor costo de oportunidad dentro de esa fila/columna. La cantidad asignada es el mínimo entre la oferta restante del origen y la demanda restante del destino.

**Objetivo:**  
Hacer la asignación que satisfaga la mayor cantidad posible (ya sea de oferta o de demanda) en la ruta más conveniente, agotando una restricción y reduciendo el tamaño del problema para la siguiente iteración.

**Variables:**

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `X_ij*` | Variable de decisión | Cantidad asignada en la celda elegida durante esta iteración |
| `S_i` | Parámetro actualizable | Oferta restante disponible en el origen i después de asignaciones previas |
| `D_j` | Parámetro actualizable | Demanda restante requerida en el destino j después de asignaciones previas |
| `min(S_i, D_j)` | Operación | Se asigna el valor menor para agotar al menos una restricción |
| `j*` | Índice resultante | El destino elegido dentro de la fila/columna con mayor penalización |

---

## 9. Cálculo de la Ganancia Total

**Nombre formal:** Evaluación de la función objetivo con la solución asignada  
**También conocida como:** Total profit calculation / Valor de Z

**Fórmula en LaTeX:**
```latex
Z = \sum_{i=1}^{m} \sum_{j=1}^{n} c_{ij} \cdot X_{ij}
```

**Descripción:**  
Una vez que el método de Vogel (u otro método) determina las cantidades a enviar en cada ruta, se calcula la ganancia total multiplicando cada cantidad asignada por su ganancia unitaria correspondiente y sumando todos los resultados. Solo participan en la suma las celdas que tienen asignación mayor a cero.

**Objetivo:**  
Obtener el valor numérico de la función objetivo, es decir, la ganancia total generada por el plan de distribución encontrado. Este valor permite comparar soluciones alternativas.

**Variables:**

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `Z` | Resultado | Ganancia total en miles de colones generada por el plan de distribución |
| `c_ij` | Parámetro (dato) | Ganancia unitaria original (no transformada) de la ruta i → j |
| `X_ij` | Variable de decisión | Cantidad de unidades asignadas a la ruta i → j por el método de Vogel |

**Ejemplo del caso:**
```latex
Z = (100 \times 95) + (20 \times 80) + (80 \times 80)
  + (65 \times 78) + (25 \times 83) + (110 \times 58)
```
```latex
Z = 9500 + 1600 + 6400 + 5070 + 2075 + 6380 = 31{,}025 \text{ miles de colones}
```

---

## 10. Condición de No Degeneración (Salto de Piedra)

**Nombre formal:** Regla de no degeneración para soluciones básicas factibles  
**También conocida como:** Non-degeneracy condition / Regla m + n - 1

**Fórmula en LaTeX:**
```latex
\text{Número de celdas básicas} = m + n - 1
```

**Descripción:**  
Antes de aplicar el Método del Salto de Piedra, se verifica que la solución inicial tenga exactamente `m + n - 1` celdas con asignación positiva (celdas básicas). Este número es el mínimo necesario para que existan circuitos cerrados válidos para todas las celdas vacías. Si hay menos celdas básicas, la solución está "degenerada" y se deben agregar asignaciones ficticias de valor cero en celdas estratégicas.

**Objetivo:**  
Validar que la solución inicial obtenida (por Vogel u otro método) sea no degenerada y permita aplicar correctamente el Método del Salto de Piedra para verificar la optimalidad.

**Variables:**

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `m` | Parámetro | Número de filas (orígenes) de la matriz de transporte |
| `n` | Parámetro | Número de columnas (destinos) de la matriz de transporte |
| `m + n - 1` | Valor de referencia | Número exacto de celdas básicas que debe tener una solución no degenerada |

**Ejemplo del caso:**
```latex
m = 3 \text{ (bodegas)}, \quad n = 4 \text{ (abastecedores)}
\quad \Rightarrow \quad 3 + 4 - 1 = 6 \text{ celdas básicas requeridas} \checkmark
```

---

## 11. Índice de Mejora — Salto de Piedra en Piedra

**Nombre formal:** Índice de mejora del circuito cerrado / Delta del salto de piedra  
**También conocido como:** Stepping Stone improvement index / Δ (Delta)

**Fórmula en LaTeX:**
```latex
\Delta_{ij} = \sum_{k \in \text{circuito}} \sigma_k \cdot c_k
```

**Descripción:**  
Para cada celda vacía (no básica) de la solución actual, se traza un circuito cerrado que comienza en esa celda, se mueve horizontalmente y verticalmente pasando únicamente por celdas básicas (con asignación), y regresa a la celda de partida. A la celda de inicio se le asigna signo positivo (+), y los demás vértices del circuito alternan entre negativo (−) y positivo (+). El índice Delta es la suma algebraica de las ganancias en los vértices del circuito.

**Objetivo:**  
Determinar si mover unidades hacia una celda actualmente vacía mejoraría, mantendría o empeoraría la ganancia total. En maximización, un Delta positivo indica que existe una mejora posible y que la solución actual no es óptima.

**Variables:**

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `Δ_ij` | Valor calculado | Índice de mejora para la celda vacía (i, j) evaluada |
| `σ_k` | Signo alternante | Vale +1 si el vértice k del circuito tiene signo positivo, −1 si es negativo |
| `c_k` | Parámetro (dato) | Ganancia unitaria original de la celda ubicada en el vértice k del circuito |
| `k` | Índice del circuito | Recorre todos los vértices del circuito cerrado formado |

**Ejemplo numérico del caso:**
```latex
\text{Evaluando celda vacía (Limón → Guanacaste):}
\quad \Delta = +90 - 95 + 80 - 78 + 83 - 80 = 0
```

---

## 12. Criterio de Optimalidad en Maximización

**Nombre formal:** Criterio de optimalidad para problemas de maximización  
**También conocido como:** Optimality condition (maximization)

**Fórmula en LaTeX:**
```latex
\Delta_{ij} \leq 0 \quad \forall \, (i,j) \notin \text{Base} \quad \Rightarrow \quad \text{Solución óptima}
```

**Descripción:**  
Una vez calculado el Delta para cada celda vacía mediante el Salto de Piedra, se evalúa el resultado según las siguientes tres condiciones que determinan qué acción tomar.

**Fórmulas de los tres casos:**

```latex
\Delta_{ij} > 0 \quad \Rightarrow \quad \text{Existe mejora posible (la solución actual NO es óptima)}
```
```latex
\Delta_{ij} = 0 \quad \Rightarrow \quad \text{Solución alternativa con la misma ganancia}
```
```latex
\Delta_{ij} < 0 \quad \Rightarrow \quad \text{No conviene el cambio (reduciría la ganancia)}
```

**Objetivo:**  
Confirmar si la solución actual es la mejor posible o si existe alguna ruta no utilizada que podría mejorar la ganancia total. Si todos los Deltas son ≤ 0, la solución es óptima y no hay mejoras posibles.

**Variables:**

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `Δ_ij` | Valor calculado | Índice de mejora de la celda vacía (i, j) |
| `(i,j) ∉ Base` | Condición | Indica que la celda (i, j) no está en la solución básica actual (está vacía) |
| `> 0` | Resultado | Indica que ingresar esa celda a la solución aumentaría Z |
| `= 0` | Resultado | Indica una solución alternativa óptima equivalente |
| `< 0` | Resultado | Indica que ingresar esa celda empeoraría Z |

---

## 13. Función Objetivo — Modelo de Asignación

**Nombre formal:** Función objetivo de maximización del modelo de asignación  
**También conocida como:** Assignment problem objective function

**Fórmula en LaTeX:**
```latex
\text{Maximizar } Z = \sum_{i=1}^{n} \sum_{j=1}^{n} r_{ij} \cdot y_{ij}
```

**Descripción:**  
En el modelo de asignación, se busca asignar cada recurso (camión) a exactamente una tarea (ruta), de forma que el rendimiento total sea máximo. La función objetivo suma el rendimiento de cada par camión-ruta seleccionado, donde la variable de decisión `y_ij` vale 1 si se hace esa asignación y 0 si no.

**Objetivo:**  
Determinar cuál camión debe cubrir cada ruta para maximizar el rendimiento operativo total del sistema de distribución.

**Variables:**

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `Z` | Variable de resultado | Rendimiento total maximizado del sistema de asignación |
| `n` | Parámetro | Número de camiones (igual al número de rutas, ya que la matriz es cuadrada) |
| `i` | Índice | Identifica cada camión; toma valores de 1 hasta n |
| `j` | Índice | Identifica cada ruta; toma valores de 1 hasta n |
| `r_ij` | Parámetro (dato) | Rendimiento del camión i si cubre la ruta j |
| `y_ij` | Variable de decisión binaria | Vale 1 si el camión i es asignado a la ruta j, y 0 en caso contrario |

**Ejemplo del caso:**
```latex
\text{Maximizar } Z = 90y_{11} + 70y_{12} + 80y_{13} + 60y_{14}
                    + 85y_{21} + 75y_{22} + 70y_{23} + 65y_{24}
                    + 80y_{31} + 85y_{32} + 75y_{33} + 65y_{34}
                    + 70y_{41} + 90y_{42} + 60y_{43} + 85y_{44}
```

---

## 14. Restricciones del Modelo de Asignación

**Nombre formal:** Restricciones de asignación única (por recurso y por tarea)  
**También conocidas como:** Assignment constraints

**Fórmulas en LaTeX:**

*Restricción por camión (cada camión cubre exactamente una ruta):*
```latex
\sum_{j=1}^{n} y_{ij} = 1 \quad \forall \, i
```

*Restricción por ruta (cada ruta es cubierta por exactamente un camión):*
```latex
\sum_{i=1}^{n} y_{ij} = 1 \quad \forall \, j
```

*Restricción de integralidad binaria:*
```latex
y_{ij} \in \{0, 1\} \quad \forall \, i, j
```

**Descripción:**  
El modelo de asignación tiene dos grupos de restricciones. El primero garantiza que cada camión sea asignado a exactamente una ruta (no puede cubrir dos rutas al mismo tiempo). El segundo garantiza que cada ruta sea cubierta por exactamente un camión (no puede haber dos camiones en la misma ruta). La restricción binaria limita los valores posibles a 0 o 1.

**Objetivo:**  
Asegurar que la solución genere una asignación 1 a 1 perfecta entre camiones y rutas, sin repeticiones ni omisiones.

**Variables:**

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `y_ij` | Variable de decisión binaria | 1 si el camión i cubre la ruta j; 0 en caso contrario |
| `i` | Índice fijo (primera restricción) | El camión específico que se está restringiendo |
| `j` | Índice que varía (primera restricción) | Recorre todas las rutas posibles para ese camión |
| `j` | Índice fijo (segunda restricción) | La ruta específica que se está restringiendo |
| `i` | Índice que varía (segunda restricción) | Recorre todos los camiones posibles para esa ruta |
| `∀ i` / `∀ j` | Cuantificadores | La restricción aplica individualmente para cada camión y para cada ruta |

---

## 15. Reducción de Filas y Columnas — Método Húngaro

**Nombre formal:** Método de reducción para maximización en asignación  
**También conocido como:** Hungarian Method reduction / Reducción de la matriz de costos de oportunidad

**Fórmulas en LaTeX:**

*Paso 1 — Transformación por valor máximo:*
```latex
r'_{ij} = r_{\max} - r_{ij}
```

*Paso 2 — Reducción por filas (restar el mínimo de cada fila):*
```latex
r''_{ij} = r'_{ij} - \min_{j}\{r'_{ij}\} \quad \forall \, i
```

*Paso 3 — Reducción por columnas (restar el mínimo de cada columna):*
```latex
r'''_{ij} = r''_{ij} - \min_{i}\{r''_{ij}\} \quad \forall \, j
```

**Descripción:**  
El Método Húngaro transforma la matriz de rendimientos en una matriz equivalente de costos de oportunidad, con al menos un cero en cada fila y columna. Primero se convierte el problema de maximización en minimización restando al máximo. Luego se reduce por filas (restando el mínimo de cada fila) y por columnas (restando el mínimo de cada columna). Los ceros resultantes son las posibles asignaciones óptimas.

**Objetivo:**  
Encontrar un conjunto de ceros en la matriz reducida, uno por fila y uno por columna, que represente la asignación óptima de camiones a rutas maximizando el rendimiento total.

**Variables:**

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `r_ij` | Parámetro (dato) | Rendimiento original del camión i en la ruta j |
| `r_max` | Parámetro | Valor máximo de rendimiento en toda la matriz original |
| `r'_ij` | Valor calculado (Paso 1) | Costo de oportunidad después de la transformación por máximo |
| `r''_ij` | Valor calculado (Paso 2) | Matriz después de la reducción por filas |
| `r'''_ij` | Valor calculado (Paso 3) | Matriz final después de la reducción por columnas; contiene los ceros de asignación |
| `min_j{r'_ij}` | Operación | El valor mínimo de la fila i en la matriz del Paso 1 |
| `min_i{r''_ij}` | Operación | El valor mínimo de la columna j en la matriz del Paso 2 |

**Ejemplo del caso:**
```
Matriz original → r_max = 90
Paso 1: r'_ij = 90 - r_ij
Paso 2: Restar mínimo por fila (Camión 1: mín=0, Camión 2: mín=5, ...)
Paso 3: Restar mínimo por columna si aún no hay cero en cada columna
```

---

## 16. Valor Óptimo del Modelo de Asignación

**Nombre formal:** Valor de la función objetivo óptima del modelo de asignación  
**También conocido como:** Optimal assignment value / Z óptimo de asignación

**Fórmula en LaTeX:**
```latex
Z^* = \sum_{(i,j) \in \text{Asignación óptima}} r_{ij}
```

**Descripción:**  
Una vez identificadas las celdas con cero en la matriz reducida que forman la asignación 1 a 1 óptima, se calcula el rendimiento total regresando a los valores originales. Se suman los rendimientos originales `r_ij` de las celdas que fueron seleccionadas como asignación óptima.

**Objetivo:**  
Obtener el valor máximo de rendimiento total alcanzable con la asignación óptima de camiones a rutas, expresado en las unidades originales del problema.

**Variables:**

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `Z*` | Resultado óptimo | Rendimiento máximo total logrado con la asignación óptima |
| `r_ij` | Parámetro (dato) | Rendimiento original del camión i en la ruta j (valores sin transformar) |
| `(i,j) ∈ Asignación óptima` | Condición | Solo se suman las parejas camión-ruta que fueron seleccionadas en la solución final |

**Ejemplo del caso:**
```latex
\text{Asignación óptima encontrada:}
\begin{cases}
\text{Camión 1} \rightarrow \text{Guanacaste: } r_{11} = 90 \\
\text{Camión 2} \rightarrow \text{Limón Centro: } r_{22} = 85 \\
\text{Camión 3} \rightarrow \text{Puntarenas: } r_{33} = 75 \\
\text{Camión 4} \rightarrow \text{San José: } r_{44} = 85
\end{cases}
```
```latex
Z^* = 80 + 85 + 85 + 85 = 335 \text{ unidades de rendimiento}
```

---

## Resumen General de Fórmulas

| # | Nombre de la Fórmula | Método | Símbolo clave |
|---|---------------------|--------|---------------|
| 1 | Función objetivo de maximización | Modelo de Transporte | `Z = ΣΣ c_ij · X_ij` |
| 2 | Condición de balance oferta-demanda | Validación previa | `Σ S_i = Σ D_j` |
| 3 | Restricciones de oferta | Modelo de Transporte | `Σ_j X_ij = S_i` |
| 4 | Restricciones de demanda | Modelo de Transporte | `Σ_i X_ij = D_j` |
| 5 | Restricción de no negatividad | Modelo de Transporte | `X_ij ≥ 0` |
| 6 | Transformación a costo de oportunidad | Método de Vogel | `c'_ij = c_max - c_ij` |
| 7 | Penalización de Vogel | Método de Vogel | `P_k = c^(2)_k - c^(1)_k` |
| 8 | Regla de asignación de Vogel | Método de Vogel | `X_ij* = min(S_i, D_j)` |
| 9 | Cálculo de la ganancia total | Evaluación de solución | `Z = ΣΣ c_ij · X_ij` |
| 10 | Condición de no degeneración | Salto de Piedra | `m + n - 1` |
| 11 | Índice de mejora Delta | Salto de Piedra | `Δ_ij = Σ σ_k · c_k` |
| 12 | Criterio de optimalidad | Salto de Piedra | `Δ_ij ≤ 0 → óptimo` |
| 13 | Función objetivo de asignación | Modelo de Asignación | `Z = ΣΣ r_ij · y_ij` |
| 14 | Restricciones de asignación única | Modelo de Asignación | `Σ y_ij = 1` |
| 15 | Reducción de filas y columnas | Método Húngaro | `r''_ij = r'_ij - min` |
| 16 | Valor óptimo de asignación | Modelo de Asignación | `Z* = Σ r_ij` |

---

*Documento elaborado para el curso IF7200 — Métodos Cuantitativos para la Toma de Decisiones*  
*Universidad de Costa Rica — Sede del Caribe — Informática Empresarial*
