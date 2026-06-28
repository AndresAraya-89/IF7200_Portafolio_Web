# Explicación de Fórmulas — Métodos Cuantitativos: Programación

> **Propósito del documento:** Referencia técnica de todas las fórmulas utilizadas en los temas de Programación Entera (PE), Programación por Metas (PM) y Programación No Lineal (PNL). Sirve como base para el desarrollo de un portafolio web y como guía de comportamiento de fórmulas para implementación en Claude Code.

---

## Índice

1. [Programación Entera (PE)](#1-programación-entera-pe)
   - 1.1 Función Objetivo de Maximización
   - 1.2 Restricciones Lineales
   - 1.3 Restricción de Integralidad
   - 1.4 Evaluación en Vértices (Método Gráfico)
2. [Programación por Metas (PM)](#2-programación-por-metas-pm)
   - 2.1 Función Objetivo de Minimización de Desviaciones
   - 2.2 Restricción de Meta — Forma General
   - 2.3 Ecuación de Meta de Ganancia
   - 2.4 Ecuación de Meta Laboral
   - 2.5 Ecuación de Meta Ambiental / Recursos
3. [Programación No Lineal (PNL)](#3-programación-no-lineal-pnl)
   - 3.1 Función Objetivo No Lineal — Forma General
   - 3.2 Función de Ingreso con Rendimiento Decreciente
   - 3.3 Función Objetivo con Costo de Desgaste Cuadrático
   - 3.4 Derivadas Parciales (Condición de Optimalidad)
   - 3.5 Función de Costo de Desgaste

---

## 1. Programación Entera (PE)

La Programación Entera es una técnica de optimización donde **las variables de decisión deben tomar valores enteros** (no fracciones). Se aplica cuando las unidades no son divisibles: prendas de ropa, viajes de camión, lotes de producción, etc.

---

### 1.1 Función Objetivo de Maximización

**Nombre:** Función Objetivo Lineal de Maximización Entera

**Fórmula en LaTeX:**
```latex
\max\; Z = \sum_{j} c_j x_j
```

**Ejemplo del caso (Taller Textil):**
```latex
\max\; Z = 60x_1 + 50x_2
```

**Descripción:**
Es la expresión matemática que representa el beneficio total que se desea maximizar. Suma el aporte individual de cada variable de decisión multiplicada por su coeficiente de ganancia.

**Objetivo:**
Encontrar la combinación de valores enteros para las variables de decisión que produzca el mayor valor posible de Z, respetando todas las restricciones del problema.

**Explicación de variables:**

| Variable | Tipo | Significado |
|----------|------|-------------|
| `Z` | Variable dependiente | Valor total a maximizar (ganancia semanal en dólares) |
| `x_j` | Variable de decisión | Cantidad a producir/realizar del producto o actividad `j` (debe ser entero ≥ 0) |
| `c_j` | Parámetro (coeficiente) | Ganancia unitaria del producto o actividad `j` |
| `j` | Índice | Identifica cada producto o actividad (j = 1, 2, ..., n) |

**Comportamiento esperado (para Claude Code):**
- Recibe como entradas: lista de coeficientes `c_j` y valores de `x_j`.
- Calcula la suma ponderada.
- El resultado Z debe ser un número real, aunque las `x_j` sean enteras.
- Se busca el Z más alto posible dentro de la región factible.

---

### 1.2 Restricciones Lineales

**Nombre:** Restricciones de Recursos (Desigualdades Lineales)

**Fórmula en LaTeX:**
```latex
\sum_{j} a_{ij} x_j \leq b_i, \quad i = 1, 2, \ldots, m
```

**Ejemplo del caso (Taller Textil):**
```latex
x_1 + 2x_2 \leq 10 \quad \text{(tela, metros)}
2x_1 + x_2 \leq 11 \quad \text{(tiempo, horas)}
x_1 + x_2  \leq 9  \quad \text{(botones, cajas)}
```

**Descripción:**
Son las condiciones que limitan los recursos disponibles. Cada restricción establece que el consumo total de un recurso no puede superar la cantidad disponible.

**Objetivo:**
Delimitar el espacio de soluciones posibles (región factible) para que la solución óptima sea realista y aplicable al problema de negocio.

**Explicación de variables:**

| Variable | Tipo | Significado |
|----------|------|-------------|
| `a_{ij}` | Parámetro | Cantidad del recurso `i` que consume una unidad del producto `j` |
| `x_j` | Variable de decisión | Cantidad producida del producto `j` |
| `b_i` | Parámetro (RHS) | Cantidad total disponible del recurso `i` |
| `i` | Índice | Identifica cada restricción o recurso (i = 1, 2, ..., m) |

**Comportamiento esperado (para Claude Code):**
- Para cada restricción `i`, evaluar `suma(a_ij * x_j)` y comparar contra `b_i`.
- Si el resultado es menor o igual a `b_i`, la restricción se satisface.
- Si alguna restricción no se cumple, el punto no es factible.
- La holgura de una restricción es: `b_i - suma(a_ij * x_j)`. Si es 0, el recurso está completamente agotado (cuello de botella).

---

### 1.3 Restricción de Integralidad

**Nombre:** Condición de Integralidad (Variables Enteras No Negativas)

**Fórmula en LaTeX:**
```latex
x_j \geq 0 \quad \text{y} \quad x_j \in \mathbb{Z}
```

**Descripción:**
Establece dos condiciones simultáneas sobre las variables de decisión: deben ser no negativas (no se puede producir una cantidad negativa) y deben ser números enteros (no se admiten fracciones).

**Objetivo:**
Garantizar que la solución sea práctica y aplicable al mundo real, donde los productos se fabrican en unidades completas e indivisibles.

**Explicación de variables:**

| Variable | Tipo | Significado |
|----------|------|-------------|
| `x_j` | Variable de decisión | Cantidad del producto `j`; no puede ser negativa ni decimal |
| `\mathbb{Z}` | Conjunto matemático | Conjunto de todos los números enteros {..., -2, -1, 0, 1, 2, ...} |

**Comportamiento esperado (para Claude Code):**
- Validar que toda solución candidata tenga valores `x_j` que sean números enteros.
- Si el método de vértices produce un punto no entero (ej. 5.5), se deben explorar los puntos enteros adyacentes (5 o 6) y verificar factibilidad.
- No redondear automáticamente: el punto redondeado puede no ser factible.

---

### 1.4 Evaluación en Vértices (Método Gráfico)

**Nombre:** Evaluación de la Función Objetivo en Vértices de la Región Factible

**Fórmula en LaTeX:**
```latex
Z(x_1, x_2) = c_1 x_1 + c_2 x_2
```

**Ejemplo del caso:**
```latex
Z(4, 3) = 60(4) + 50(3) = 240 + 150 = \$390
```

**Descripción:**
En problemas con dos variables, la solución óptima siempre se encuentra en uno de los vértices (esquinas) de la región factible. Se calcula Z en cada vértice y se elige el de mayor valor.

**Objetivo:**
Identificar cuál de los puntos extremos de la región factible produce el mayor beneficio, sin necesidad de explorar infinitos puntos.

**Explicación de variables:**

| Variable | Tipo | Significado |
|----------|------|-------------|
| `x_1` | Variable de decisión | Cantidad del primer producto (ej. camisas) |
| `x_2` | Variable de decisión | Cantidad del segundo producto (ej. pantalones) |
| `c_1` | Parámetro | Ganancia unitaria del producto 1 |
| `c_2` | Parámetro | Ganancia unitaria del producto 2 |
| `Z(x_1, x_2)` | Resultado | Valor de la ganancia total en ese vértice específico |

**Comportamiento esperado (para Claude Code):**
- Calcular las intersecciones de todas las restricciones para encontrar los vértices.
- Evaluar Z en cada vértice factible.
- Retornar el vértice con el Z máximo.
- Reportar si ese vértice ya tiene valores enteros o si requiere ajuste adicional.

---

## 2. Programación por Metas (PM)

La Programación por Metas es un enfoque **multicriterio** basado en la teoría de Herbert Simon. En lugar de optimizar un único objetivo, busca satisfacer múltiples metas con diferentes niveles de prioridad. Acepta que algunas metas pueden no cumplirse perfectamente (modelo de compromisos).

---

### 2.1 Función Objetivo de Minimización de Desviaciones

**Nombre:** Función Objetivo de Programación por Metas (Minimización Lexicográfica)

**Fórmula en LaTeX:**
```latex
\min\; Z = P_1(d_1^-) + P_2(d_2^- + d_2^+) + P_3(d_3^+)
```

**Forma general:**
```latex
\min\; Z = \sum_{k} P_k \left( w_k^- d_k^- + w_k^+ d_k^+ \right)
```

**Descripción:**
Es la función que minimiza las desviaciones indeseables respecto a cada meta, ponderadas por su nivel de prioridad. Las prioridades son lexicográficas: P1 es infinitamente más importante que P2, y P2 lo es respecto a P3.

**Objetivo:**
Encontrar la solución que satisfaga primero la meta más importante, luego la segunda, y así sucesivamente, cuantificando exactamente cuánto se desvía cada meta de su valor ideal.

**Explicación de variables:**

| Variable | Tipo | Significado |
|----------|------|-------------|
| `Z` | Variable a minimizar | Suma ponderada de desviaciones indeseables |
| `P_k` | Prioridad | Nivel de importancia de la meta `k` (P1 > P2 > P3) |
| `d_k^-` | Variable de desviación negativa | Cuánto se queda por debajo de la meta `k` (faltante) |
| `d_k^+` | Variable de desviación positiva | Cuánto se supera la meta `k` (exceso) |
| `w_k^-`, `w_k^+` | Pesos numéricos | Importancia relativa de cada desviación dentro de una misma prioridad |

**Comportamiento esperado (para Claude Code):**
- Las prioridades NO se suman numéricamente como si fueran iguales. Se resuelven secuencialmente: primero se minimiza P1, luego P2 sin empeorar P1, luego P3.
- Para cada meta: si la desviación indeseable es 0, esa meta se cumplió perfectamente.
- El resultado final muestra el "no-cumplimiento" (nonachievement) de cada prioridad.

---

### 2.2 Restricción de Meta — Forma General

**Nombre:** Ecuación de Meta con Variables de Desviación

**Fórmula en LaTeX:**
```latex
\sum_{j} a_{kj} x_j + d_k^- - d_k^+ = G_k
```

**Descripción:**
Transforma cualquier restricción original (desigualdad o igualdad) en una ecuación exacta al incorporar las variables de desviación. La variable `d_k^-` absorbe el faltante y `d_k^+` absorbe el exceso respecto al valor objetivo `G_k`.

**Objetivo:**
Permitir que el modelo mida con precisión qué tan lejos está cada solución de cumplir cada meta, convirtiendo restricciones duras en metas flexibles con penalización.

**Explicación de variables:**

| Variable | Tipo | Significado |
|----------|------|-------------|
| `a_{kj}` | Parámetro | Consumo del recurso de la meta `k` por unidad de la variable `j` |
| `x_j` | Variable de decisión | Cantidad producida o realizada de la actividad `j` |
| `d_k^-` | Variable de desviación | Faltante respecto a la meta `k`; siempre ≥ 0 |
| `d_k^+` | Variable de desviación | Exceso respecto a la meta `k`; siempre ≥ 0 |
| `G_k` | Parámetro (meta) | Valor objetivo o ideal que se desea alcanzar para la meta `k` |

**Comportamiento esperado (para Claude Code):**
- Dado un vector `x`, calcular `suma(a_kj * x_j)`.
- Si el resultado < `G_k`: entonces `d_k^- = G_k - suma(...)` y `d_k^+ = 0`.
- Si el resultado > `G_k`: entonces `d_k^+ = suma(...) - G_k` y `d_k^- = 0`.
- Si el resultado = `G_k`: ambas desviaciones son 0 (meta cumplida exactamente).
- Nota: `d_k^-` y `d_k^+` nunca pueden ser positivos simultáneamente.

---

### 2.3 Ecuación de Meta de Ganancia

**Nombre:** Meta Financiera — Restricción de Rentabilidad

**Fórmulas en LaTeX (según caso):**
```latex
\text{Panadería:} \quad 30x + 50y + d_1^- - d_1^+ = 2200
\text{Transporte:} \quad 40x + 60y + d_1^- - d_1^+ = 2400
```

**Descripción:**
Establece la ganancia semanal mínima que la empresa debe alcanzar para cubrir su punto de equilibrio (costos fijos, planillas, operación). Es la meta de mayor prioridad en ambos casos estudiados.

**Objetivo:**
Garantizar la viabilidad financiera de la empresa. La desviación que se minimiza es `d_1^-` (faltante de dinero), ya que no llegar al mínimo implica pérdidas operativas.

**Explicación de variables:**

| Variable | Tipo | Significado |
|----------|------|-------------|
| `x` | Variable de decisión | Unidades del primer producto/actividad (lotes de pan / viajes secos) |
| `y` | Variable de decisión | Unidades del segundo producto/actividad (lotes repostería / viajes refrigerados) |
| `30`, `50` / `40`, `60` | Parámetros | Ganancia en dólares por unidad de cada producto/actividad |
| `d_1^-` | Desviación negativa | Dólares que faltan para alcanzar la meta de ganancia (indeseable → se minimiza) |
| `d_1^+` | Desviación positiva | Dólares de ganancia por encima de la meta (aceptable, no se penaliza) |
| `2200` / `2400` | Meta (`G_1`) | Ganancia objetivo semanal en dólares |

---

### 2.4 Ecuación de Meta Laboral

**Nombre:** Meta de Horas de Trabajo — Restricción Sindical o de Personal

**Fórmulas en LaTeX (según caso):**
```latex
\text{Panadería:} \quad 2x + 4y + d_2^- - d_2^+ = 160
\text{Transporte:} \quad 4x + 2y + d_2^- - d_2^+ = 160
```

**Descripción:**
Establece que las horas de trabajo asignadas deben ser exactamente 160 a la semana. Es una meta de igualdad estricta: ni menos (porque implica recorte salarial) ni más (porque genera horas extra y fatiga).

**Objetivo:**
Respetar el acuerdo laboral con los trabajadores, asegurando jornadas completas y evitando tanto subutilización del personal como exceso de trabajo.

**Explicación de variables:**

| Variable | Tipo | Significado |
|----------|------|-------------|
| `x`, `y` | Variables de decisión | Cantidades de cada producto o actividad |
| `2`, `4` / `4`, `2` | Parámetros | Horas de trabajo requeridas por unidad de cada actividad |
| `d_2^-` | Desviación negativa | Horas que faltan para completar las 160 (implica recorte salarial → se minimiza) |
| `d_2^+` | Desviación positiva | Horas extra por encima de las 160 (implica costo adicional → se minimiza) |
| `160` | Meta (`G_2`) | Total de horas semanales establecidas en el acuerdo laboral |

**Nota importante:** Esta es la única meta donde **ambas desviaciones** (`d_2^-` y `d_2^+`) son indeseables y se incluyen en la función objetivo.

---

### 2.5 Ecuación de Meta Ambiental / Recursos

**Nombre:** Meta de Consumo de Recursos — Restricción Ambiental

**Fórmulas en LaTeX (según caso):**
```latex
\text{Panadería (energía):}  \quad 5x + 8y + d_3^- - d_3^+ = 300
\text{Transporte (combustible):} \quad 10x + 15y + d_3^- - d_3^+ = 500
```

**Descripción:**
Establece un límite máximo de consumo de un recurso (energía eléctrica en kWh o combustible en galones) motivado por una política ambiental o regulación municipal. Es la meta de menor prioridad en ambos casos.

**Objetivo:**
Reducir la huella de carbono de la empresa. La desviación indeseable es `d_3^+` (exceso de consumo), ya que superar el límite viola la política ambiental. Se acepta consumir menos del límite.

**Explicación de variables:**

| Variable | Tipo | Significado |
|----------|------|-------------|
| `x`, `y` | Variables de decisión | Cantidades de cada producto o actividad |
| `5`, `8` / `10`, `15` | Parámetros | Consumo de energía/combustible por unidad de cada actividad |
| `d_3^-` | Desviación negativa | Recurso ahorrado por debajo del límite (deseable → no se penaliza) |
| `d_3^+` | Desviación indeseable | Exceso de consumo sobre el límite establecido (se minimiza) |
| `300` / `500` | Meta (`G_3`) | Límite máximo semanal de consumo del recurso (kWh / galones) |

---

## 3. Programación No Lineal (PNL)

La Programación No Lineal se aplica cuando la función objetivo o alguna restricción contiene **términos no lineales** (potencias, productos entre variables, funciones exponenciales, etc.). A diferencia de la PL, el óptimo puede estar en un punto interior de la región factible, no necesariamente en un vértice.

---

### 3.1 Función Objetivo No Lineal — Forma General

**Nombre:** Problema de Optimización No Lineal con Restricciones

**Fórmula en LaTeX:**
```latex
\min\; f(\mathbf{x}) \quad \text{sujeto a:}
g_i(\mathbf{x}) \leq b_i, \quad i = 1, \ldots, m
h_j(\mathbf{x}) = 0, \quad j = 1, \ldots, p
\mathbf{x} \geq 0
```

**Descripción:**
Es la estructura matemática general de cualquier problema de PNL. La función objetivo `f(x)` y/o las funciones de restricción `g_i(x)` o `h_j(x)` contienen al menos un término no lineal.

**Objetivo:**
Proveer el marco formal para modelar problemas donde las relaciones entre variables no son proporcionales, como costos de mantenimiento que crecen al cuadrado o ingresos con rendimiento decreciente.

**Explicación de variables:**

| Variable | Tipo | Significado |
|----------|------|-------------|
| `f(x)` | Función objetivo | Expresión no lineal a minimizar o maximizar |
| `x` | Vector de variables | Conjunto de todas las variables de decisión `(x_1, x_2, ..., x_n)` |
| `g_i(x)` | Restricción de desigualdad | Función (posiblemente no lineal) que no puede superar `b_i` |
| `h_j(x)` | Restricción de igualdad | Función que debe ser exactamente cero |
| `b_i` | Parámetro | Límite superior del recurso `i` |
| `m` | Parámetro | Número total de restricciones de desigualdad |
| `p` | Parámetro | Número total de restricciones de igualdad |

**Comportamiento esperado (para Claude Code):**
- No se puede usar el método simplex; se requiere un solver no lineal (GRG Nonlinear en Excel Solver, o métodos de gradiente).
- La solución puede ser un óptimo local, no necesariamente global.
- Verificar con las condiciones KKT si el punto encontrado es realmente óptimo.

---

### 3.2 Función de Ingreso con Rendimiento Decreciente

**Nombre:** Función de Ingreso No Lineal por Producto (Demanda Elástica)

**Fórmula en LaTeX:**
```latex
I_A = 40x - x^2
I_B = 50y - 2y^2
```

**Descripción:**
Modela el ingreso de venta de un producto cuando el precio baja a medida que se vende más (elasticidad de demanda). El término cuadrático negativo representa que cada unidad adicional genera menos ingreso que la anterior.

**Objetivo:**
Capturar el comportamiento real del mercado donde vender muchas unidades requiere bajar el precio, haciendo que el ingreso marginal sea decreciente y eventualmente negativo si se produce en exceso.

**Explicación de variables:**

| Variable | Tipo | Significado |
|----------|------|-------------|
| `x` | Variable de decisión | Unidades producidas/vendidas del Producto A |
| `y` | Variable de decisión | Unidades producidas/vendidas del Producto B |
| `40` | Parámetro | Precio base o ingreso máximo unitario del Producto A |
| `x^2` | Término cuadrático | Penalización creciente por el efecto de saturación del mercado en A |
| `50` | Parámetro | Precio base o ingreso máximo unitario del Producto B |
| `2y^2` | Término cuadrático | Penalización más pronunciada en B (coeficiente 2) por mayor elasticidad |

**Comportamiento esperado (para Claude Code):**
- Para x = 0: ingreso A = 0.
- El ingreso de A crece hasta x = 20 (donde la derivada = 0), luego decrece.
- El ingreso de B crece hasta y = 12.5, luego decrece.
- Si se producen más unidades del punto máximo, el ingreso total cae.

---

### 3.3 Función Objetivo con Costo de Desgaste Cuadrático

**Nombre:** Función Objetivo No Lineal — Ganancia Neta con Penalización por Desgaste

**Fórmula en LaTeX:**
```latex
\max\; Z = 40x + 60y - 0.2x^2 - 0.3y^2
```

**Descripción:**
Combina el ingreso lineal por viajes (40x + 60y) con el costo no lineal de mantenimiento de la flota (0.2x² + 0.3y²). El desgaste de los vehículos no crece proporcionalmente sino de forma acelerada conforme aumentan los viajes.

**Objetivo:**
Encontrar la cantidad de viajes de cada tipo que maximice la ganancia neta real, considerando que hacer muchos viajes incrementa exponencialmente los costos de mantenimiento preventivo y correctivo.

**Explicación de variables:**

| Variable | Tipo | Significado |
|----------|------|-------------|
| `x` | Variable de decisión | Cantidad de viajes semanales de contenedores secos |
| `y` | Variable de decisión | Cantidad de viajes semanales de contenedores refrigerados |
| `40` | Parámetro | Ganancia bruta por viaje seco (dólares) |
| `60` | Parámetro | Ganancia bruta por viaje refrigerado (dólares) |
| `0.2x^2` | Término de costo cuadrático | Costo de desgaste creciente por los viajes secos |
| `0.3y^2` | Término de costo cuadrático | Costo de desgaste creciente por los viajes refrigerados (mayor tasa) |
| `Z` | Resultado | Ganancia neta semanal total después de descontar costos de mantenimiento |

**Comportamiento esperado (para Claude Code):**
- A medida que `x` e `y` crecen, los costos cuadráticos crecen mucho más rápido que los ingresos lineales.
- Existe un punto de inflexión donde cada viaje adicional reduce la ganancia neta.
- La solución óptima (x=20, y=20, Z=$1,800) es inferior en ganancia bruta a la PE ($2,350) porque descuenta los costos reales de operación.

---

### 3.4 Derivadas Parciales (Condición de Optimalidad sin Restricciones)

**Nombre:** Condición Necesaria de Primer Orden — Punto Estacionario

**Fórmula en LaTeX:**
```latex
\frac{\partial Z}{\partial x} = 35 - 2x = 0 \;\Rightarrow\; x^* = 17.5
\frac{\partial Z}{\partial y} = 42 - 4y = 0 \;\Rightarrow\; y^* = 10.5
```

**Descripción:**
Para encontrar el máximo de una función no lineal sin restricciones, se derivan parcialmente respecto a cada variable y se igualan a cero. El punto donde ambas derivadas son cero es el candidato a óptimo (punto estacionario).

**Objetivo:**
Identificar el punto donde la función objetivo tiene su máximo absoluto sin restricciones. Si ese punto también satisface todas las restricciones del problema, es directamente la solución óptima del problema con restricciones.

**Explicación de variables:**

| Variable | Tipo | Significado |
|----------|------|-------------|
| `∂Z/∂x` | Derivada parcial | Tasa de cambio de Z cuando `x` varía y `y` se mantiene fijo |
| `∂Z/∂y` | Derivada parcial | Tasa de cambio de Z cuando `y` varía y `x` se mantiene fijo |
| `35 - 2x` | Expresión derivada | Derivada de `(35x - x²)` respecto a `x` |
| `42 - 4y` | Expresión derivada | Derivada de `(42y - 2y²)` respecto a `y` |
| `x* = 17.5` | Solución | Valor de `x` que maximiza Z sin restricciones |
| `y* = 10.5` | Solución | Valor de `y` que maximiza Z sin restricciones |

**Comportamiento esperado (para Claude Code):**
- Calcular `∂Z/∂x` y `∂Z/∂y` para la función dada.
- Igualar cada una a 0 y resolver el sistema de ecuaciones.
- Verificar si el punto `(x*, y*)` cumple todas las restricciones del problema.
- Si cumple → es la solución óptima directa. Si no cumple → el óptimo está en el borde de la región factible y se requiere solver.

---

### 3.5 Función de Costo de Desgaste

**Nombre:** Función Cuadrática de Costo de Mantenimiento por Desgaste de Flota

**Fórmula en LaTeX:**
```latex
C = 0.2x^2 + 0.3y^2
```

**Descripción:**
Modela el costo adicional semanal de mantenimiento preventivo y correctivo de los vehículos. Al ser cuadrática, el costo crece de forma acelerada: duplicar los viajes cuadruplica el costo de desgaste.

**Objetivo:**
Reflejar la realidad operativa de flotas vehiculares donde el desgaste de piezas, neumáticos, motores y sistemas de refrigeración no es lineal sino exponencial con el uso intensivo.

**Explicación de variables:**

| Variable | Tipo | Significado |
|----------|------|-------------|
| `C` | Resultado | Costo total de desgaste semanal en dólares |
| `x` | Variable de decisión | Cantidad de viajes secos realizados en la semana |
| `y` | Variable de decisión | Cantidad de viajes refrigerados realizados en la semana |
| `0.2` | Coeficiente de desgaste | Tasa de desgaste por viaje seco (menor, son viajes sin refrigeración) |
| `x^2` | Término cuadrático | Efecto acelerado del desgaste en viajes secos |
| `0.3` | Coeficiente de desgaste | Tasa de desgaste por viaje refrigerado (mayor, el sistema de frío consume más) |
| `y^2` | Término cuadrático | Efecto acelerado del desgaste en viajes refrigerados |

**Comportamiento esperado (para Claude Code):**
- Para x=10, y=10: C = 0.2(100) + 0.3(100) = 20 + 30 = $50.
- Para x=20, y=20: C = 0.2(400) + 0.3(400) = 80 + 120 = $200 (cuatro veces más con el doble de viajes).
- La función no tiene mínimo en (0,0) en el contexto del problema completo porque el objetivo maximiza ganancia, no minimiza costo.

---

## Resumen Comparativo de los Tres Métodos

| Criterio | Programación Entera (PE) | Programación por Metas (PM) | Programación No Lineal (PNL) |
|----------|--------------------------|------------------------------|-------------------------------|
| **Tipo de función objetivo** | Lineal | Lineal (desviaciones) | No lineal (cuadrática, etc.) |
| **Variables** | Enteras (ℤ) | Reales + variables de desviación | Reales (continuas) |
| **Cuándo usarla** | Productos indivisibles | Múltiples objetivos en conflicto | Relaciones no proporcionales |
| **Solución en** | Vértice entero de región factible | Punto que minimiza desviaciones priorizadas | Punto interior o en el borde |
| **Herramienta** | QM for Windows / Branch & Bound | QM for Windows (Goal Programming) | Excel Solver (GRG Nonlinear) |
| **Resultado caso** | Z = $390 (taller) / Z = $2,350 (transporte) | Z con d3+ = 60 (panadería) / d3+ = 100 (transporte) | Z = $526.75 (fábrica) / Z = $1,800 (transporte) |

---

## Notas para Implementación en Claude Code

1. **Orden de ejecución en PM:** Las prioridades se resuelven secuencialmente. Nunca sumar P1 + P2 + P3 como si fueran iguales. Primero resolver para P1, fijar ese resultado, luego resolver para P2, y así.

2. **Verificación de factibilidad en PE:** Antes de reportar una solución, siempre verificar que todos los valores de x_j sean enteros y que todas las restricciones se cumplan con esos valores enteros.

3. **Punto estacionario en PNL:** Al calcular derivadas parciales, verificar si el punto resultante está dentro de la región factible. Si no lo está, avisar que el óptimo real estará en una restricción activa.

4. **Variables de desviación en PM:** Siempre deben ser ≥ 0. Si en un cálculo alguna resulta negativa, eso indica un error; debe corregirse asignando 0 a la negativa y recalculando la otra.

5. **Interpretación gerencial:** El documento sirve para que Claude Code no solo calcule sino también explique en lenguaje de negocios qué significa el resultado: qué metas se cumplieron, qué recursos son cuellos de botella, y cuál es el costo de las desviaciones en unidades reales (dólares, horas, kWh, galones).

---

*Documento generado para el curso Métodos Cuantitativos para la Toma de Decisiones — Universidad de Costa Rica, Sede del Caribe.*
