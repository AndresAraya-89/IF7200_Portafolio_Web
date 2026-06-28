# Explicación de Fórmulas — Modelo de Redes

> **Propósito del documento:** Referencia técnica para el desarrollo de un portafolio web e instrucciones para Claude Code. Incluye nombre, descripción, objetivo y explicación de variables de cada fórmula utilizada en las tres técnicas de Optimización de Redes: Ruta Más Corta, Árbol de Expansión Mínima y Flujo Máximo.

---

## Índice

1. [Definición Formal de una Red](#1-definición-formal-de-una-red)
2. [Variable de Decisión Binaria](#2-variable-de-decisión-binaria)
3. [Función Objetivo — Minimización del Costo Total](#3-función-objetivo--minimización-del-costo-total)
4. [Restricciones de Balance de Flujo](#4-restricciones-de-balance-de-flujo)
5. [Restricción de No Negatividad e Integridad](#5-restricción-de-no-negatividad-e-integridad)
6. [Etiqueta Temporal de Dijkstra](#6-etiqueta-temporal-de-dijkstra)
7. [Criterio de Selección del Nodo Permanente](#7-criterio-de-selección-del-nodo-permanente)
8. [Costo Total de la Ruta Óptima](#8-costo-total-de-la-ruta-óptima)
9. [Costo Total del Árbol de Expansión Mínima](#9-costo-total-del-árbol-de-expansión-mínima)
10. [Condición de Árbol de Expansión](#10-condición-de-árbol-de-expansión)
11. [Restricción de Capacidad de Flujo](#11-restricción-de-capacidad-de-flujo)
12. [Restricción de Conservación de Flujo](#12-restricción-de-conservación-de-flujo)
13. [Función Objetivo — Maximización del Flujo Total](#13-función-objetivo--maximización-del-flujo-total)

---

## 1. Definición Formal de una Red

### Fórmula en LaTeX
```latex
G = (N, A)
```

### Descripción
Es la notación matemática que representa cualquier red o grafo. Una red se compone de dos elementos: un conjunto de puntos llamados nodos y un conjunto de conexiones entre esos puntos llamados arcos. Esta expresión es el lenguaje formal con el que se describe cualquier sistema de rutas, tuberías, carreteras o conexiones que se quiera modelar.

### Objetivo
Establecer la estructura base del modelo antes de aplicar cualquier algoritmo de optimización. Al definir formalmente la red como `G = (N, A)`, se delimita con precisión qué puntos existen en el sistema y qué conexiones hay entre ellos, lo cual es el punto de partida obligatorio para las tres técnicas: Ruta Más Corta, Árbol de Expansión Mínima y Flujo Máximo.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `G` | Grafo o Red | El sistema completo que se está modelando (carreteras, tuberías, rutas logísticas) |
| `N` | Conjunto de Nodos | Lista de todos los puntos del sistema (ciudades, intersecciones, almacenes, puertos) |
| `A` | Conjunto de Arcos | Lista de todas las conexiones directas entre pares de nodos (carreteras, tuberías, cables) |

### Componentes de cada elemento

**Nodos (N):** Cada nodo representa una ubicación o entidad del sistema.
- En logística: puertos, centros de distribución, almacenes
- En telecomunicaciones: servidores, antenas, routers
- En el caso de Limón: Terminal de Moín (nodo 1), Matina (nodo 3), Guápiles (nodo 6), San José (nodo 7)

**Arcos (A):** Cada arco conecta dos nodos y tiene un valor asociado `cᵢⱼ`.
- En distancia: kilómetros entre dos puntos
- En tiempo: minutos de tránsito
- En costo: precio del transporte
- En capacidad: unidades máximas que pueden fluir

### Ejemplo de aplicación
Red de transporte de carga en Limón:
- `N = {Moín, Matina, Guácimo, Guápiles, Siquirres, San José}` → 6 nodos
- `A = {(Moín-Matina), (Matina-Guácimo), (Guácimo-Guápiles)...}` → arcos con distancias en km

---

## 2. Variable de Decisión Binaria

### Fórmula en LaTeX
```latex
x_{ij} = \begin{cases}
1 & \text{si el arco } (i,j) \text{ es seleccionado en la ruta} \\
0 & \text{en caso contrario}
\end{cases}
```

### Descripción
Es la variable matemática que le indica al modelo si una conexión específica entre dos nodos es utilizada o no en la solución óptima. Solo puede tomar dos valores: 1 si el arco forma parte de la ruta elegida, o 0 si no se usa. Esta variable convierte el problema de elección de rutas en un problema de programación lineal entera que puede resolverse matemáticamente.

### Objetivo
Permitir que el modelo matemático tome decisiones de tipo sí/no sobre cada arco de la red. Al definir una variable binaria para cada posible conexión, el modelo puede evaluar todas las combinaciones posibles de rutas y seleccionar automáticamente la combinación óptima que minimiza el costo total, sin que el analista tenga que probar cada ruta manualmente.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `xᵢⱼ` | Variable de decisión del arco (i,j) | La decisión de usar o no la conexión que va del nodo i al nodo j |
| `i` | Nodo de origen del arco | El punto de partida de la conexión evaluada |
| `j` | Nodo de destino del arco | El punto de llegada de la conexión evaluada |
| `1` | Valor de selección | Indica que el arco (i,j) SÍ forma parte de la ruta o árbol óptimo |
| `0` | Valor de no selección | Indica que el arco (i,j) NO forma parte de la solución |

### Ejemplo de aplicación
En la red A→F del caso de Limón, si la ruta óptima es A→C→F:
- `x_{AC} = 1` (el arco de A a C SÍ se usa)
- `x_{CF} = 1` (el arco de C a F SÍ se usa)
- `x_{AB} = 0` (el arco de A a B NO se usa)
- `x_{AD} = 0` (el arco de A a D NO se usa)

---

## 3. Función Objetivo — Minimización del Costo Total

### Fórmula en LaTeX
```latex
\min Z = \sum_{(i,j) \in A} c_{ij} \cdot x_{ij}
```

### Descripción
Es la fórmula que define qué se quiere optimizar en el modelo de Ruta Más Corta. Calcula el costo total del recorrido sumando el costo de cada arco multiplicado por la variable de decisión de ese arco. Como `xᵢⱼ` solo puede ser 0 o 1, en la práctica solo se suman los costos de los arcos que fueron seleccionados en la solución. El modelo busca la combinación de arcos que hace que esta suma sea la menor posible.

### Objetivo
Guiar matemáticamente al modelo hacia la selección de la ruta que implica el menor costo, distancia o tiempo total. Es la expresión formal del criterio de decisión: entre todas las rutas posibles que conectan el origen con el destino, elegir aquella cuya suma de costos de arcos sea mínima.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `min Z` | Función objetivo de minimización | Indica que el objetivo es encontrar el valor más pequeño posible de Z |
| `Z` | Costo total de la ruta | El valor que se minimiza: suma de distancias, tiempos o costos de la ruta seleccionada |
| `Σ` | Sumatoria sobre todos los arcos | Indica que se suma el término `cᵢⱼ · xᵢⱼ` para cada arco posible de la red |
| `(i,j) ∈ A` | Condición de la sumatoria | Se recorren todos los arcos que pertenecen al conjunto A de la red |
| `cᵢⱼ` | Costo del arco (i,j) | La distancia, tiempo o costo asociado a la conexión entre el nodo i y el nodo j |
| `xᵢⱼ` | Variable de decisión binaria | Vale 1 si el arco se usa, 0 si no; actúa como filtro que incluye o excluye cada costo |

### Ejemplo de aplicación
Red A→F con arcos seleccionados A→C (5 km) y C→F (4 km):
- `Z = c_{AC} · x_{AC} + c_{CF} · x_{CF} = 5(1) + 4(1) = 9 km`
- Todos los demás arcos tienen `xᵢⱼ = 0`, por lo que no aportan al total.

---

## 4. Restricciones de Balance de Flujo

### Fórmula en LaTeX
```latex
\sum_{j} x_{ij} - \sum_{k} x_{ki} = 
\begin{cases}
+1 & \text{si } i \text{ es el nodo de origen} \\
0  & \text{si } i \text{ es un nodo intermedio} \\
-1 & \text{si } i \text{ es el nodo de destino}
\end{cases}
```

### Descripción
Son las reglas que garantizan que la ruta seleccionada sea continua y coherente: lo que entra a un nodo debe igualar lo que sale de él. En el nodo origen sale flujo sin que entre nada (resultado +1). En los nodos intermedios todo lo que entra debe salir (resultado 0, sin acumulación). En el nodo destino entra flujo sin que salga nada (resultado -1).

### Objetivo
Asegurar que la solución matemática forme una ruta continua y válida desde el origen hasta el destino, sin rutas que se interrumpan en el camino, sin bucles sin sentido y sin saltos entre nodos no conectados. Sin estas restricciones, el modelo podría seleccionar arcos que no forman una ruta coherente pero que matemáticamente tienen un costo bajo.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `Σⱼ xᵢⱼ` | Flujo que sale del nodo i | Suma de todas las variables de arcos que parten desde el nodo i hacia cualquier nodo j |
| `Σₖ xₖᵢ` | Flujo que entra al nodo i | Suma de todas las variables de arcos que llegan al nodo i desde cualquier nodo k |
| `i` | Nodo que se está evaluando | El nodo para el cual se está escribiendo la restricción de balance |
| `+1` | Balance del nodo origen | El origen genera una unidad de flujo neto: sale 1 más de lo que entra |
| `0` | Balance de nodo intermedio | Nodo de paso: todo lo que entra sale; no acumula ni genera flujo |
| `-1` | Balance del nodo destino | El destino absorbe una unidad de flujo neto: entra 1 más de lo que sale |

### Ejemplo de aplicación
En la ruta A→C→F (red del puerto de Limón):
- **Nodo A (origen):** `x_{AC} - 0 = +1` → Sale flujo hacia C, no entra nada
- **Nodo C (intermedio):** `x_{CF} - x_{AC} = 0` → Lo que entra desde A sale hacia F
- **Nodo F (destino):** `0 - x_{CF} = -1` → Entra flujo desde C, no sale nada

---

## 5. Restricción de No Negatividad e Integridad

### Fórmula en LaTeX
```latex
x_{ij} \geq 0 \quad \text{y} \quad x_{ij} \in \{0, 1\}
```

### Descripción
Son dos condiciones que juntas limitan los valores que puede tomar la variable de decisión. La primera condición establece que no puede haber valores negativos (no tiene sentido usar un arco un número negativo de veces). La segunda condición establece que solo se permiten valores enteros de 0 o 1, convirtiendo el problema en un modelo de programación entera binaria donde cada arco o se usa completamente o no se usa.

### Objetivo
Garantizar que la solución matemática tenga sentido físico y práctico. Sin la condición de no negatividad, el algoritmo podría encontrar soluciones absurdas con arcos negativos. Sin la condición de integridad, podría seleccionar fracciones de arcos (por ejemplo, usar el 60% de una carretera), lo cual no tiene significado en la realidad. Juntas, estas condiciones acotan el espacio de soluciones a decisiones reales y ejecutables.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `xᵢⱼ` | Variable de decisión del arco (i,j) | La variable cuyo rango de valores se está definiendo |
| `≥ 0` | Condición de no negatividad | El valor de xᵢⱼ no puede ser negativo; el mínimo permitido es 0 |
| `∈ {0, 1}` | Condición de integridad binaria | xᵢⱼ solo puede ser exactamente 0 (no usar el arco) o exactamente 1 (usar el arco) |
| `{0, 1}` | Conjunto de valores permitidos | Los únicos dos valores válidos para cualquier variable de decisión en este modelo |

---

## 6. Etiqueta Temporal de Dijkstra

### Fórmula en LaTeX
```latex
d(j) = d(i) + c_{ij}
```

### Descripción
Es el cálculo central del Algoritmo de Dijkstra para la Ruta Más Corta. Cada vez que se procesa un nodo permanente i, se calcula una etiqueta temporal para cada nodo j al que se puede llegar directamente desde i. Esta etiqueta representa la distancia acumulada total desde el nodo origen hasta j pasando por el nodo i. Si ya existe una etiqueta temporal para j, se compara y se conserva solo la menor de las dos.

### Objetivo
Propagar las distancias mínimas conocidas desde el nodo origen hacia todos los nodos alcanzables de la red, de forma iterativa. Cada aplicación de esta fórmula actualiza la mejor distancia conocida hasta un nodo vecino, acercando progresivamente el algoritmo a la solución óptima sin necesidad de evaluar todas las rutas posibles de forma exhaustiva.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `d(j)` | Etiqueta temporal del nodo j | La distancia acumulada provisional desde el origen hasta el nodo j; puede actualizarse si se encuentra un camino mejor |
| `d(i)` | Etiqueta permanente del nodo i | La distancia acumulada definitiva desde el origen hasta el nodo i (ya no cambia) |
| `cᵢⱼ` | Costo del arco (i,j) | La distancia, tiempo o costo directo de la conexión entre el nodo i y el nodo j |
| `+` | Suma de distancias | Indica que se acumulan las distancias: la ya recorrida más la del nuevo tramo |
| `i` | Nodo permanente actual | El nodo que se está procesando en la iteración actual del algoritmo |
| `j` | Nodo vecino evaluado | El nodo adyacente a i cuya etiqueta temporal se está calculando o actualizando |

### Regla de actualización
```
Si d(i) + cᵢⱼ  <  d(j) actual  →  actualizar: d(j) = d(i) + cᵢⱼ
Si d(i) + cᵢⱼ  ≥  d(j) actual  →  conservar el valor anterior de d(j)
```

### Ejemplo de aplicación
Desde nodo A (d=0) hacia sus vecinos en la red de Limón:
- `d(B) = d(A) + c_{AB} = 0 + 7 = 7 km` (etiqueta temporal para B)
- `d(C) = d(A) + c_{AC} = 0 + 5 = 5 km` (etiqueta temporal para C)
- `d(D) = d(A) + c_{AD} = 0 + 6 = 6 km` (etiqueta temporal para D)

Desde nodo C (d=5, ya permanente) hacia sus vecinos:
- `d(B) actualizado = d(C) + c_{CB} = 5 + 2 = 7 km` (empata, no mejora)
- `d(F) = d(C) + c_{CF} = 5 + 4 = 9 km` (nueva etiqueta temporal para F)

---

## 7. Criterio de Selección del Nodo Permanente

### Fórmula en LaTeX
```latex
d^*(v) = \min_{j \in T} \left\{ d(j) \right\}
```

### Descripción
Es la regla de decisión que el Algoritmo de Dijkstra aplica en cada iteración para elegir cuál nodo pasa de tener etiqueta temporal a tener etiqueta permanente. De todos los nodos que aún tienen etiqueta temporal, se selecciona el que tenga la distancia acumulada más pequeña. Ese nodo se "congela" y su distancia ya no cambiará en el resto del algoritmo.

### Objetivo
Garantizar que el algoritmo procese los nodos en el orden correcto, siempre expandiendo primero hacia el nodo más cercano al origen entre los que aún no han sido procesados. Este criterio es lo que hace que Dijkstra sea eficiente y correcto: al seleccionar siempre el mínimo entre los temporales, asegura que una vez que un nodo recibe etiqueta permanente, su distancia es definitivamente la menor posible desde el origen.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `d*(v)` | Etiqueta permanente del nodo v | La distancia definitiva y mínima desde el origen hasta el nodo v que se acaba de seleccionar |
| `min` | Operador mínimo | Indica que se selecciona el valor más pequeño del conjunto |
| `j ∈ T` | Condición de búsqueda | Se evalúan solo los nodos j que pertenecen al conjunto T de nodos con etiqueta temporal |
| `T` | Conjunto de nodos temporales | Todos los nodos que ya tienen una distancia calculada pero que aún no han sido permanentes |
| `{d(j)}` | Conjunto de etiquetas temporales | Los valores de distancia acumulada de todos los nodos en el conjunto T |
| `v` | Nodo seleccionado | El nodo con la menor etiqueta temporal que pasa a ser permanente en esta iteración |

### Proceso iterativo completo

```
Iteración 1: Nodo A recibe etiqueta permanente [0, -]
             → Calcular etiquetas temporales para B(7), C(5), D(6)
             → min{7, 5, 6} = 5 → Nodo C pasa a permanente

Iteración 2: Nodo C permanente [5, A]
             → Actualizar etiquetas: B(7), D(8), E(11), F(9)
             → min{7, 6, 11, 9} = 6 → Nodo D pasa a permanente

Iteración 3: Continúa hasta que el destino F recibe etiqueta permanente
```

---

## 8. Costo Total de la Ruta Óptima

### Fórmula en LaTeX
```latex
Z^* = \sum_{(i,j) \in \text{ruta óptima}} c_{ij}
```

### Descripción
Es el cálculo del costo, distancia o tiempo total de la ruta seleccionada como óptima por el algoritmo. Se obtiene sumando los valores de cada arco que forma parte de la ruta definitiva, es decir, de los arcos cuyos nodos tienen etiquetas permanentes encadenadas desde el origen hasta el destino.

### Objetivo
Expresar en un número concreto e interpretable el resultado final de la Ruta Más Corta. Este valor es el que se comunica como solución al problema: la distancia mínima total del recorrido, el tiempo mínimo de viaje o el costo mínimo de transporte entre el origen y el destino.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `Z*` | Costo total óptimo | El valor mínimo alcanzable de la función objetivo; el mejor resultado posible |
| `*` (asterisco) | Superíndice de optimalidad | Indica que este valor es el óptimo, no solo cualquier solución factible |
| `Σ` | Sumatoria sobre la ruta | Indica que se suman los costos de todos los arcos que forman la ruta óptima |
| `(i,j) ∈ ruta óptima` | Condición de la sumatoria | Solo se incluyen los arcos que efectivamente forman parte de la ruta elegida |
| `cᵢⱼ` | Costo del arco (i,j) | El valor individual de cada tramo de la ruta óptima |

### Ejemplo de aplicación
Ruta óptima A→C→F en el caso del puerto de Limón:
- `Z* = c_{AC} + c_{CF} = 5 + 4 = 9 km`
- Esta es la distancia mínima posible entre el Puerto de Limón (A) y San José (F).

---

## 9. Costo Total del Árbol de Expansión Mínima

### Fórmula en LaTeX
```latex
W = \sum_{(i,j) \in T} c_{ij}
```

### Descripción
Es el costo total de construir el árbol que conecta todos los nodos de la red con el menor gasto posible. Se calcula sumando los costos de cada arco seleccionado para el árbol final. A diferencia de la Ruta Más Corta (que conecta solo origen y destino), aquí se suman los arcos que conectan TODOS los nodos de la red entre sí, sin formar ciclos.

### Objetivo
Cuantificar el costo mínimo total de conectar toda la red. Este valor es el resultado final del Algoritmo de Kruskal o Prim y representa el presupuesto mínimo necesario para que todos los puntos de la red queden comunicados entre sí, sin redundancias ni conexiones innecesarias.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `W` | Costo total del árbol | El costo mínimo total para conectar todos los nodos de la red |
| `Σ` | Sumatoria sobre el árbol | Indica que se suman los costos de todos los arcos del árbol T |
| `(i,j) ∈ T` | Condición de la sumatoria | Solo se incluyen los arcos que forman parte del árbol de expansión mínima T |
| `T` | Árbol de expansión mínima | El conjunto de arcos seleccionados que forman el árbol óptimo |
| `cᵢⱼ` | Costo del arco (i,j) | El costo individual de cada conexión incluida en el árbol |

### Ejemplo de aplicación
Árbol de expansión mínima del caso A-F (Kruskal):
- Arcos seleccionados: B-C(2), C-D(3), E-F(3), C-F(4), A-C(5)
- `W = 2 + 3 + 3 + 4 + 5 = 17 km`

---

## 10. Condición de Árbol de Expansión

### Fórmula en LaTeX
```latex
|T| = n - 1
```

### Descripción
Es la regla matemática que establece cuántos arcos debe tener un árbol de expansión válido. Un árbol que conecta n nodos siempre tiene exactamente n-1 arcos: ni uno más (que formaría un ciclo), ni uno menos (que dejaría algún nodo desconectado). Esta condición es la verificación final de que el árbol construido es completo y válido.

### Objetivo
Servir como criterio de parada y verificación del Algoritmo de Kruskal o Prim. Cuando el número de arcos seleccionados alcanza n-1, el algoritmo termina porque ya se han conectado todos los nodos. También permite detectar errores: si el algoritmo termina con menos de n-1 arcos, significa que la red no es completamente conectada (hay nodos aislados que no pueden alcanzarse).

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `|T|` | Cardinalidad del árbol T | El número total de arcos que contiene el árbol de expansión seleccionado |
| `\|·\|` | Operador de cardinalidad | Indica que se cuenta el número de elementos del conjunto T |
| `n` | Número total de nodos | La cantidad de nodos que tiene la red completa G = (N, A) |
| `n - 1` | Número requerido de arcos | Siempre un arco menos que el número de nodos; es la cantidad exacta para un árbol válido |

### Ejemplo de aplicación
Red del caso A-F con 6 nodos (A, B, C, D, E, F):
- `n = 6`
- `|T| = 6 - 1 = 5` arcos requeridos
- Arcos del árbol: B-C, C-D, E-F, C-F, A-C → `|T| = 5` ✓

---

## 11. Restricción de Capacidad de Flujo

### Fórmula en LaTeX
```latex
0 \leq f_{ij} \leq u_{ij}
```

### Descripción
Es la restricción que establece los límites físicos de cuánto puede fluir por cada conexión de la red en el modelo de Flujo Máximo. El flujo en cada arco debe ser mayor o igual a cero (no puede fluir en sentido negativo) y no puede superar la capacidad máxima de ese arco. Esta restricción refleja limitaciones reales como el ancho de una carretera, el diámetro de una tubería o el ancho de banda de una conexión.

### Objetivo
Modelar las restricciones físicas reales de cada conexión de la red. Sin este límite, el modelo podría enviar cantidades infinitas de flujo por un arco, lo cual es imposible en la práctica. Esta restricción es lo que convierte el problema en uno genuinamente útil para tomar decisiones sobre capacidad, cuellos de botella y saturación de la red.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `fᵢⱼ` | Flujo en el arco (i,j) | La cantidad de recursos que efectivamente se envían por la conexión entre el nodo i y el nodo j |
| `0` | Límite inferior del flujo | El flujo no puede ser negativo; el mínimo es cero (no enviar nada por ese arco) |
| `uᵢⱼ` | Capacidad máxima del arco (i,j) | El límite superior de flujo que físicamente puede pasar por esa conexión |
| `≤` | Operador de desigualdad | Indica que el flujo debe ser menor o igual al límite señalado |
| `≥` | Operador de desigualdad | Indica que el flujo debe ser mayor o igual al límite señalado |

---

## 12. Restricción de Conservación de Flujo

### Fórmula en LaTeX
```latex
\sum_{j} f_{ij} - \sum_{k} f_{ki} = 0 \quad \forall i \notin \{s, t\}
```

### Descripción
Es la ley de conservación aplicada a cada nodo intermedio de la red en el modelo de Flujo Máximo. Establece que en cualquier nodo que no sea el origen ni el destino, todo el flujo que entra debe salir completamente. No se permite que los nodos intermedios acumulen, almacenen ni generen flujo por sí mismos; simplemente lo transmiten.

### Objetivo
Garantizar que el flujo sea continuo y coherente a través de toda la red, sin pérdidas ni creaciones artificiales de recursos en los nodos intermedios. Esta restricción refleja principios físicos reales como la ley de Kirchhoff en redes eléctricas o el principio de conservación de masa en tuberías.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `Σⱼ fᵢⱼ` | Flujo total que sale del nodo i | Suma del flujo en todos los arcos que parten desde el nodo i hacia cualquier nodo j |
| `Σₖ fₖᵢ` | Flujo total que entra al nodo i | Suma del flujo en todos los arcos que llegan al nodo i desde cualquier nodo k |
| `= 0` | Condición de balance | La diferencia entre lo que sale y lo que entra debe ser cero; flujo de entrada = flujo de salida |
| `∀i` | Para todo nodo i | Esta condición se aplica a TODOS los nodos del sistema |
| `∉ {s, t}` | Excepto origen y destino | El origen (s) genera flujo y el destino (t) lo absorbe, por lo que quedan excluidos de esta restricción |
| `s` | Nodo fuente (source) | El nodo de origen donde el flujo se origina |
| `t` | Nodo sumidero (sink) | El nodo de destino donde el flujo termina su recorrido |

---

## 13. Función Objetivo — Maximización del Flujo Total

### Fórmula en LaTeX
```latex
\max F = \sum_{j} f_{sj}
```

### Descripción
Es la fórmula que define el objetivo del modelo de Flujo Máximo: encontrar la cantidad máxima de recursos que pueden enviarse desde el nodo origen hasta el nodo destino. Se calcula sumando todo el flujo que sale del nodo origen hacia sus nodos vecinos. Este valor representa la capacidad real máxima de la red para transportar recursos.

### Objetivo
Determinar el límite superior de transporte de la red, identificando cuánto puede fluir como máximo desde la fuente hasta el sumidero considerando todas las restricciones de capacidad de los arcos. También identifica automáticamente los cuellos de botella: los arcos que están operando a máxima capacidad y que, si se amplían, aumentarían el flujo total de la red.

### Explicación de Variables

| Variable | Nombre | Significado |
|----------|--------|-------------|
| `max F` | Función objetivo de maximización | Indica que el objetivo es encontrar el valor más grande posible de F |
| `F` | Flujo máximo total | La cantidad total de recursos que pueden transportarse de la fuente al sumidero; resultado de la fórmula |
| `Σⱼ` | Sumatoria sobre nodos vecinos del origen | Suma el flujo de todos los arcos que salen del nodo s hacia cualquier nodo j |
| `fₛⱼ` | Flujo en el arco (s,j) | La cantidad de recursos enviada por cada arco que parte del nodo origen s |
| `s` | Nodo fuente (source) | El nodo de origen desde donde se genera y envía todo el flujo |
| `j` | Nodo vecino del origen | Cualquier nodo directamente conectado al origen y hacia donde puede salir flujo |

---

## Resumen General de Fórmulas

| # | Nombre | Fórmula (LaTeX) | Técnica que la usa |
|---|--------|-----------------|-------------------|
| 1 | Definición Formal de Red | `G = (N, A)` | Las tres técnicas |
| 2 | Variable de Decisión Binaria | `x_{ij} \in \{0,1\}` | Ruta Más Corta, Árbol |
| 3 | Función Objetivo Minimización | `\min Z = \sum c_{ij} \cdot x_{ij}` | Ruta Más Corta, Árbol |
| 4 | Balance de Flujo | `\sum x_{ij} - \sum x_{ki} = \{+1, 0, -1\}` | Ruta Más Corta |
| 5 | No Negatividad e Integridad | `x_{ij} \geq 0,\; x_{ij} \in \{0,1\}` | Las tres técnicas |
| 6 | Etiqueta Temporal Dijkstra | `d(j) = d(i) + c_{ij}` | Ruta Más Corta |
| 7 | Nodo Permanente Dijkstra | `d^*(v) = \min_{j \in T}\{d(j)\}` | Ruta Más Corta |
| 8 | Costo Total Ruta Óptima | `Z^* = \sum_{ruta} c_{ij}` | Ruta Más Corta |
| 9 | Costo Total Árbol | `W = \sum_{T} c_{ij}` | Árbol de Expansión Mínima |
| 10 | Condición de Árbol Válido | `\|T\| = n - 1` | Árbol de Expansión Mínima |
| 11 | Capacidad de Flujo | `0 \leq f_{ij} \leq u_{ij}` | Flujo Máximo |
| 12 | Conservación de Flujo | `\sum f_{ij} - \sum f_{ki} = 0` | Flujo Máximo |
| 13 | Función Objetivo Maximización | `\max F = \sum_j f_{sj}` | Flujo Máximo |

---

## Las Tres Técnicas — Comparación y Flujo de Aplicación

### Técnica 1: Ruta Más Corta (Algoritmo de Dijkstra)

```
Pregunta que responde: ¿Cuál es el camino más eficiente entre A y B?

PASO 1 → Definir la red G = (N, A)              [Fórmula 1]
              ↓
PASO 2 → Asignar etiqueta permanente [0,-] al nodo origen
              ↓
PASO 3 → Calcular etiquetas temporales de nodos vecinos
         d(j) = d(i) + cᵢⱼ                      [Fórmula 6]
              ↓
PASO 4 → Seleccionar el nodo con menor etiqueta temporal
         d*(v) = min{d(j)}                        [Fórmula 7]
         → Convertirlo en nodo permanente
              ↓
PASO 5 → Repetir pasos 3 y 4 hasta que el destino sea permanente
              ↓
PASO 6 → Rastrear la ruta hacia atrás y calcular Z*
         Z* = Σ cᵢⱼ sobre la ruta óptima         [Fórmula 8]
```

### Técnica 2: Árbol de Expansión Mínima (Algoritmo de Kruskal)

```
Pregunta que responde: ¿Cómo conecto TODOS los nodos con el menor costo?

PASO 1 → Definir la red G = (N, A)              [Fórmula 1]
              ↓
PASO 2 → Ordenar TODOS los arcos de menor a mayor costo
              ↓
PASO 3 → Seleccionar el arco de menor costo disponible
         Verificar que NO forme un ciclo
              ↓
PASO 4 → Agregar el arco al árbol T
              ↓
PASO 5 → Verificar si |T| = n - 1               [Fórmula 10]
         Si NO → regresar al Paso 3
         Si SÍ → el árbol está completo
              ↓
PASO 6 → Calcular el costo total W
         W = Σ cᵢⱼ sobre los arcos de T         [Fórmula 9]
```

### Técnica 3: Flujo Máximo (Ford-Fulkerson / Simplex de Redes)

```
Pregunta que responde: ¿Cuánto puedo transportar como máximo de S a T?

PASO 1 → Definir la red G = (N, A) con capacidades uᵢⱼ  [Fórmula 1]
              ↓
PASO 2 → Aplicar restricciones de capacidad
         0 ≤ fᵢⱼ ≤ uᵢⱼ                         [Fórmula 11]
              ↓
PASO 3 → Aplicar conservación de flujo en nodos intermedios
         Σ fᵢⱼ - Σ fₖᵢ = 0                      [Fórmula 12]
              ↓
PASO 4 → Maximizar el flujo total
         max F = Σ fₛⱼ                           [Fórmula 13]
              ↓
PASO 5 → Identificar cuellos de botella
         (arcos donde fᵢⱼ = uᵢⱼ, operando al 100% de capacidad)
```

---

## Diferencias Clave entre las Tres Técnicas

| Criterio | Ruta Más Corta | Árbol Expansión Mínima | Flujo Máximo |
|----------|---------------|------------------------|--------------|
| **Objetivo** | Minimizar distancia origen→destino | Minimizar costo de conectar toda la red | Maximizar recursos transportados |
| **Nodos involucrados** | Solo origen y destino (+ intermedios necesarios) | TODOS los nodos de la red | Origen y destino (+ nodos intermedios) |
| **Arcos resultantes** | Subconjunto que forma una sola ruta | Subconjunto que forma un árbol sin ciclos | Asignación de flujo a cada arco |
| **Algoritmo principal** | Dijkstra (etiquetado iterativo) | Kruskal (selección por costo mínimo) | Ford-Fulkerson / Simplex de Redes |
| **Pregunta gerencial** | ¿Cuál es la ruta más barata/rápida? | ¿Cómo instalo la red con menor inversión? | ¿Cuánto puedo transportar al máximo? |
| **Ejemplo en Limón** | Puerto Moín → San José (169 km) | Conectar todas las sucursales con fibra óptica | Máxima carga diaria de contenedores |

---

*Documento creado como referencia para portafolio web y desarrollo con Claude Code.*
*Tema: Optimización de Redes — Métodos Cuantitativos para la Toma de Decisiones*
