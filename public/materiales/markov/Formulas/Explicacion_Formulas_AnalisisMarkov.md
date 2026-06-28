# Explicación de Fórmulas — Análisis de Markov

> **Propósito del documento:** Referencia técnica para el desarrollo de un portafolio web e instrucciones para Claude Code. Incluye nombre, descripción, objetivo y explicación de variables de cada fórmula utilizada en el Análisis de Cadenas de Markov.

---

## Índice

1. [Vector de Estado](#1-vector-de-estado)
2. [Ecuación de Recurrencia](#2-ecuación-de-recurrencia)
3. [Matriz de Probabilidades de Transición](#3-matriz-de-probabilidades-de-transición)
4. [Condición de Renglón](#4-condición-de-renglón)
5. [Ecuación de Estado Estable](#5-ecuación-de-estado-estable)
6. [Sistema de Ecuaciones de Estado Estable](#6-sistema-de-ecuaciones-de-estado-estable)
7. [Restricción de Normalización](#7-restricción-de-normalización)
8. [Cálculo Elemento a Elemento](#8-cálculo-elemento-a-elemento)
9. [Sistema Lineal del Estado Estable](#9-sistema-lineal-del-estado-estable)

---

## 1. Vector de Estado

### Fórmula en LaTeX
```latex
\pi^{(n)} = [\pi_1^{(n)}, \pi_2^{(n)}, \ldots, \pi_k^{(n)}]
```

### Descripción
Es una lista ordenada de números que representa cómo está distribuido el sistema entre todos sus estados posibles en un momento específico del tiempo. Cada posición del vector corresponde a un estado diferente del sistema.

### Objetivo
Expresar matemáticamente la situación actual del sistema en un período determinado, mostrando qué fracción o probabilidad corresponde a cada estado posible. Sirve como punto de partida para hacer pronósticos futuros.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `π` (pi) | Vector de probabilidades de estado | Símbolo que representa el conjunto completo de probabilidades del sistema |
| `(n)` | Índice de período | Indica en qué período de tiempo se encuentra el sistema (0 = período inicial, 1 = primer pronóstico, etc.) |
| `π₁⁽ⁿ⁾` | Probabilidad del estado 1 en el período n | Proporción del sistema que se encuentra en el estado 1 durante el período n |
| `π₂⁽ⁿ⁾` | Probabilidad del estado 2 en el período n | Proporción del sistema que se encuentra en el estado 2 durante el período n |
| `πₖ⁽ⁿ⁾` | Probabilidad del estado k en el período n | Proporción del sistema que se encuentra en el estado k (último) durante el período n |
| `k` | Número total de estados | Cantidad de situaciones posibles en que puede encontrarse el sistema |

### Ejemplo de aplicación
En el caso de telefonía (Kölbi, Liberty, Claro):
- `π⁽⁰⁾ = [0.372, 0.401, 0.227]`
- Kölbi tiene el 37.2%, Liberty el 40.1%, Claro el 22.7% del mercado en el período inicial.

---

## 2. Ecuación de Recurrencia

### Fórmula en LaTeX
```latex
\pi^{(n+1)} = \pi^{(n)} \cdot P
```

### Descripción
Es la fórmula central del análisis de Markov. Permite calcular cómo quedará distribuido el sistema en el siguiente período multiplicando el vector de estado actual por la matriz de transición. Se aplica repetidamente para hacer pronósticos período a período.

### Objetivo
Pronosticar el comportamiento futuro del sistema a partir del estado presente y las probabilidades de cambio conocidas. Con esta fórmula se puede calcular el estado del sistema para cualquier período futuro aplicándola de forma iterativa.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `π⁽ⁿ⁺¹⁾` | Vector de estado del próximo período | Distribución del sistema en el período siguiente al actual |
| `π⁽ⁿ⁾` | Vector de estado del período actual | Distribución del sistema en el período presente, que actúa como punto de partida |
| `P` | Matriz de probabilidades de transición | Tabla de probabilidades que indica con qué frecuencia el sistema cambia de un estado a otro |
| `·` (punto) | Operación de multiplicación matricial | Indica que se realiza el producto entre el vector fila y la matriz cuadrada |
| `n` | Número del período actual | Contador de períodos (0, 1, 2, 3...) que indica en qué momento se está haciendo el cálculo |
| `n+1` | Número del período siguiente | El período inmediatamente posterior al actual |

### Ejemplo de aplicación
- Período actual: `π⁽⁰⁾ = [0.372, 0.401, 0.227]`
- Aplicando la fórmula: `π⁽¹⁾ = π⁽⁰⁾ · P = [0.3835, 0.3813, 0.2352]`

---

## 3. Matriz de Probabilidades de Transición

### Fórmula en LaTeX
```latex
P = \begin{pmatrix}
p_{11} & p_{12} & p_{13} \\
p_{21} & p_{22} & p_{23} \\
p_{31} & p_{32} & p_{33}
\end{pmatrix}
```

### Descripción
Es una tabla cuadrada donde cada fila representa un estado de origen y cada columna representa un estado de destino. Cada celda contiene la probabilidad de que el sistema pase del estado de la fila al estado de la columna en un período. La suma de cada fila siempre debe ser igual a 1.

### Objetivo
Registrar de forma organizada todas las probabilidades de cambio entre estados del sistema. Es el componente clave que describe el comportamiento del sistema a lo largo del tiempo y permanece constante en todos los períodos del análisis.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `P` | Matriz de transición | Tabla cuadrada de dimensión k×k que contiene todas las probabilidades de cambio |
| `pᵢⱼ` | Probabilidad de transición del estado i al estado j | Probabilidad de que el sistema pase del estado i (fila) al estado j (columna) en un período |
| `p₁₁` | Probabilidad de permanecer en estado 1 | Probabilidad de que quien está en el estado 1 siga en el estado 1 (diagonal: lealtad) |
| `p₁₂` | Probabilidad de pasar del estado 1 al estado 2 | Probabilidad de que quien está en el estado 1 cambie al estado 2 (fuera de diagonal: deserción) |
| `i` | Índice de fila (estado de origen) | Identifica el estado desde el que se parte |
| `j` | Índice de columna (estado de destino) | Identifica el estado al que se llega |
| `k` | Dimensión de la matriz | Número total de estados posibles; la matriz tiene tamaño k×k |

### Ejemplo de aplicación
Matriz del caso de telefonía (Kölbi, Liberty, Claro):

|       | Kölbi | Liberty | Claro |
|-------|-------|---------|-------|
| **Kölbi** | 0.85  | 0.08    | 0.07  |
| **Liberty** | 0.10  | 0.82    | 0.08  |
| **Claro** | 0.12  | 0.10    | 0.78  |

---

## 4. Condición de Renglón

### Fórmula en LaTeX
```latex
\sum_{j=1}^{k} p_{ij} = 1 \quad \forall i
```

### Descripción
Es una regla matemática que debe cumplir cada fila de la matriz de transición. Establece que si se suman todas las probabilidades de una misma fila, el resultado siempre debe ser exactamente 1 (o 100%). Esto garantiza que el sistema siempre estará en alguno de los estados posibles.

### Objetivo
Verificar que la matriz de transición es válida y coherente. Si alguna fila no suma 1, significa que hay un error en los datos y el modelo no puede utilizarse. Es la prueba de consistencia del modelo de Markov.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `Σ` (Sigma) | Sumatoria | Indica que se deben sumar todos los términos que siguen |
| `j=1` | Límite inferior de la sumatoria | El índice j empieza desde el primer estado |
| `k` | Límite superior de la sumatoria | El índice j termina en el último estado |
| `pᵢⱼ` | Probabilidad de transición del estado i al estado j | Cada uno de los valores que se suman en la fila i |
| `1` | Resultado requerido | La suma debe ser igual a 1 (certeza total: el sistema estará en algún estado) |
| `∀i` | Para todo i | Indica que esta condición debe cumplirse en TODAS las filas de la matriz, sin excepción |

### Ejemplo de aplicación
Verificación de la fila de Kölbi: `0.85 + 0.08 + 0.07 = 1.00` ✓

---

## 5. Ecuación de Estado Estable

### Fórmula en LaTeX
```latex
\pi = \pi \cdot P
```

### Descripción
Es la ecuación que define el punto de equilibrio del sistema. Cuando el sistema ha evolucionado durante muchos períodos con las mismas probabilidades de transición, llega a un punto donde la distribución ya no cambia aunque siga aplicando la matriz de transición. Ese vector que se repite es el estado estable.

### Objetivo
Determinar la distribución de largo plazo del sistema, es decir, cómo quedará repartido el mercado (o el sistema) después de muchos períodos si las probabilidades de cambio se mantienen constantes. Responde la pregunta: ¿A dónde converge el sistema eventualmente?

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `π` (izquierda) | Vector de estado estable (resultado) | La distribución de largo plazo que buscamos calcular |
| `π` (derecha) | Vector de estado estable (entrada) | El mismo vector, que al multiplicarse por P produce el mismo resultado |
| `P` | Matriz de probabilidades de transición | La misma matriz utilizada en todos los períodos del análisis |
| `·` (punto) | Multiplicación matricial | Operación que combina el vector fila con la matriz cuadrada |

### Nota importante
Esta ecuación dice que `π` es un vector que no cambia cuando se multiplica por `P`. Es un **punto fijo** del sistema. Para poder resolverlo, se combina con la restricción de normalización (fórmula 7).

---

## 6. Sistema de Ecuaciones de Estado Estable

### Fórmula en LaTeX
```latex
\pi_1 = p_{11}\pi_1 + p_{21}\pi_2 + p_{31}\pi_3 \\
\pi_2 = p_{12}\pi_1 + p_{22}\pi_2 + p_{32}\pi_3 \\
\pi_3 = p_{13}\pi_1 + p_{23}\pi_2 + p_{33}\pi_3
```

### Descripción
Es la forma expandida de la ecuación de estado estable. Al desarrollar la multiplicación matricial `π = π · P`, se obtiene un sistema de ecuaciones donde cada ecuación representa un estado del sistema. Cada ecuación dice que la probabilidad de estar en un estado en el futuro es igual a la suma de todas las probabilidades de llegar a ese estado desde cualquier otro.

### Objetivo
Transformar la ecuación matricial del estado estable en un sistema de ecuaciones algebraicas que pueda resolverse manualmente o con calculadora. Permite encontrar el valor numérico exacto de cada `πᵢ` del estado estable.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `π₁` | Probabilidad estable del estado 1 | Fracción del sistema que estará permanentemente en el estado 1 a largo plazo |
| `π₂` | Probabilidad estable del estado 2 | Fracción del sistema que estará permanentemente en el estado 2 a largo plazo |
| `π₃` | Probabilidad estable del estado 3 | Fracción del sistema que estará permanentemente en el estado 3 a largo plazo |
| `p₁₁` | Probabilidad de permanecer en estado 1 | Diagonal: probabilidad de que quien está en 1 siga en 1 |
| `p₂₁` | Probabilidad de pasar del estado 2 al estado 1 | Probabilidad de que quien está en 2 cambie a 1 (aporte desde estado 2) |
| `p₃₁` | Probabilidad de pasar del estado 3 al estado 1 | Probabilidad de que quien está en 3 cambie a 1 (aporte desde estado 3) |

### Ejemplo de aplicación
Caso Kölbi, Liberty, Claro desarrollado:
- `π₁ = 0.85π₁ + 0.10π₂ + 0.12π₃` (Kölbi)
- `π₂ = 0.08π₁ + 0.82π₂ + 0.10π₃` (Liberty)
- `π₃ = 0.07π₁ + 0.08π₂ + 0.78π₃` (Claro)

---

## 7. Restricción de Normalización

### Fórmula en LaTeX
```latex
\pi_1 + \pi_2 + \pi_3 = 1
```

### Descripción
Es la condición que establece que la suma de todas las probabilidades del estado estable debe ser igual a 1. Esta restricción es indispensable porque el sistema de ecuaciones del estado estable por sí solo tiene infinitas soluciones; esta condición elimina la ambigüedad y garantiza una solución única.

### Objetivo
Cerrar el sistema de ecuaciones para que tenga solución única. En el proceso de resolución del estado estable, una de las ecuaciones de Markov se reemplaza por esta restricción para poder calcular los valores exactos de cada `πᵢ`. Garantiza que los resultados representen proporciones reales (entre 0 y 1) que sumen el 100% del mercado o sistema.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `π₁` | Proporción estable del estado 1 | Participación de largo plazo del estado 1; debe estar entre 0 y 1 |
| `π₂` | Proporción estable del estado 2 | Participación de largo plazo del estado 2; debe estar entre 0 y 1 |
| `π₃` | Proporción estable del estado 3 | Participación de largo plazo del estado 3; debe estar entre 0 y 1 |
| `1` | Total del sistema | Representa el 100% del mercado, sistema o población analizada |

### Ejemplo de aplicación
Resultado del caso telefonía: `0.4202 + 0.3271 + 0.2527 = 1.0000` ✓
- Kölbi: 42.02%, Liberty: 32.71%, Claro: 25.27%

---

## 8. Cálculo Elemento a Elemento

### Fórmula en LaTeX
```latex
\pi_j^{(n+1)} = \sum_{i=1}^{k} \pi_i^{(n)} \cdot p_{ij}
```

### Descripción
Es la fórmula que detalla cómo se calcula cada valor individual del vector de estado en el siguiente período. Para obtener la probabilidad del estado j en el período n+1, se multiplica la probabilidad de cada estado i en el período n por la probabilidad de pasar de ese estado i al estado j, y luego se suman todos esos productos.

### Objetivo
Mostrar el mecanismo matemático interno de la multiplicación vectorial que ocurre al aplicar `π⁽ⁿ⁺¹⁾ = π⁽ⁿ⁾ · P`. Permite calcular manualmente cada componente del nuevo vector de estado, columna por columna, sin necesidad de hacer la multiplicación matricial completa de una vez.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `π_j^{(n+1)}` | Probabilidad del estado j en el período n+1 | El valor específico que queremos calcular: cuánto del sistema estará en el estado j en el próximo período |
| `Σ` | Sumatoria | Indica que se suman todos los aportes de los diferentes estados de origen |
| `i=1` | Límite inferior | El índice i empieza desde el primer estado posible |
| `k` | Límite superior | El índice i llega hasta el último estado posible |
| `π_i^{(n)}` | Probabilidad del estado i en el período actual | La proporción del sistema que actualmente está en el estado i |
| `p_{ij}` | Probabilidad de pasar del estado i al estado j | La probabilidad de transición que multiplica cada componente del vector actual |
| `j` | Estado de destino que se está calculando | El estado cuya probabilidad futura queremos determinar |

### Ejemplo de aplicación
Calculando π₁⁽¹⁾ (Kölbi en período 1):
- `π₁⁽¹⁾ = (0.372)(0.85) + (0.401)(0.10) + (0.227)(0.12) = 0.3835`

---

## 9. Sistema Lineal del Estado Estable

### Fórmula en LaTeX
```latex
\begin{cases}
(p_{11}-1)\pi_1 + p_{21}\pi_2 + p_{31}\pi_3 = 0 \\
p_{12}\pi_1 + (p_{22}-1)\pi_2 + p_{32}\pi_3 = 0 \\
\pi_1 + \pi_2 + \pi_3 = 1
\end{cases}
```

### Descripción
Es la forma estándar reorganizada del sistema de ecuaciones del estado estable, lista para resolverse con calculadora o por métodos algebraicos. Se obtiene al pasar todos los términos de las ecuaciones de Markov al mismo lado de la igualdad (dejando 0 en el lado derecho) y reemplazando una de esas ecuaciones por la restricción de normalización.

### Objetivo
Presentar el sistema en el formato de entrada requerido por calculadoras científicas o métodos de resolución de sistemas 3×3 (o k×k). Facilita el uso directo de herramientas como la calculadora o Excel QM para obtener los valores del estado estable sin necesidad de resolver las ecuaciones manualmente paso a paso.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `(p₁₁ - 1)` | Coeficiente ajustado de π₁ en la ecuación 1 | Al pasar `π₁` al lado derecho de la primera ecuación, el coeficiente de `π₁` pasa a ser `p₁₁ - 1` |
| `p₂₁` | Coeficiente de π₂ en la ecuación 1 | Probabilidad de pasar del estado 2 al estado 1 (sin modificar) |
| `p₃₁` | Coeficiente de π₃ en la ecuación 1 | Probabilidad de pasar del estado 3 al estado 1 (sin modificar) |
| `0` | Resultado de las ecuaciones de Markov | Al reorganizar, las dos primeras ecuaciones quedan igualadas a cero |
| `1` | Resultado de la tercera ecuación | La restricción de normalización: todas las probabilidades suman 1 |
| `π₁, π₂, π₃` | Incógnitas del sistema | Los valores del estado estable que se buscan calcular |

### Forma matricial equivalente para calculadora

```
| Coef. π₁      | Coef. π₂      | Coef. π₃      | = Resultado |
|---------------|---------------|---------------|-------------|
| (p₁₁ - 1)    | p₂₁           | p₃₁           |      0      |
| p₁₂           | (p₂₂ - 1)    | p₃₂           |      0      |
| 1             | 1             | 1             |      1      |
```

### Ejemplo de aplicación
Caso telefonía ingresado en calculadora:

| Ec. | Coef. π₁ | Coef. π₂ | Coef. π₃ | = |
|-----|----------|----------|----------|---|
| 1   | 0.15     | -0.10    | -0.12    | 0 |
| 2   | -0.08    | 0.18     | -0.10    | 0 |
| 3   | 1        | 1        | 1        | 1 |

Resultado: `π = [0.4202, 0.3271, 0.2527]`

---

## Resumen General de Fórmulas

| # | Nombre | Fórmula (LaTeX) | Cuándo se usa |
|---|--------|-----------------|---------------|
| 1 | Vector de Estado | `\pi^{(n)} = [\pi_1^{(n)}, \ldots, \pi_k^{(n)}]` | Al inicio del análisis para representar la distribución actual |
| 2 | Ecuación de Recurrencia | `\pi^{(n+1)} = \pi^{(n)} \cdot P` | Para calcular pronósticos período a período |
| 3 | Matriz de Transición | `P = (p_{ij})_{k \times k}` | Para registrar todas las probabilidades de cambio entre estados |
| 4 | Condición de Renglón | `\sum_{j=1}^{k} p_{ij} = 1` | Para verificar que la matriz de transición es válida |
| 5 | Ecuación de Estado Estable | `\pi = \pi \cdot P` | Para plantear el equilibrio de largo plazo |
| 6 | Sistema Expandido | `\pi_j = \sum_i p_{ij} \pi_i` | Para desarrollar manualmente las ecuaciones de equilibrio |
| 7 | Restricción de Normalización | `\sum_{i=1}^{k} \pi_i = 1` | Para cerrar el sistema y obtener solución única |
| 8 | Cálculo Elemento a Elemento | `\pi_j^{(n+1)} = \sum_i \pi_i^{(n)} p_{ij}` | Para calcular cada valor del vector futuro individualmente |
| 9 | Sistema Lineal Estándar | Sistema 3×3 con resultado [0, 0, 1] | Para resolver el estado estable con calculadora o software |

---

## Flujo de Aplicación del Análisis de Markov

```
PASO 1 → Definir los estados del sistema
         (ej: Kölbi, Liberty, Claro)
              ↓
PASO 2 → Construir el vector inicial π⁽⁰⁾
         (Fórmula 1: distribución actual del mercado)
              ↓
PASO 3 → Construir la matriz de transición P
         (Fórmula 3: probabilidades de cambio)
         Verificar con Fórmula 4 que cada fila sume 1
              ↓
PASO 4 → Calcular pronósticos período a período
         (Fórmula 2: π⁽ⁿ⁺¹⁾ = π⁽ⁿ⁾ · P)
         Usando Fórmula 8 para cada elemento
              ↓
PASO 5 → Calcular el estado estable
         (Fórmulas 5, 6 y 7 combinadas)
         Resolver con el Sistema de Fórmula 9
              ↓
PASO 6 → Interpretar los resultados gerencialmente
```

---

*Documento creado como referencia para portafolio web y desarrollo con Claude Code.*
*Tema: Análisis de Cadenas de Markov — Métodos Cuantitativos para la Toma de Decisiones*
