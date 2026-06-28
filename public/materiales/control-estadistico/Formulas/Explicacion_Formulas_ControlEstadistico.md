# Explicación de Fórmulas — Control Estadístico de la Calidad

**Curso:** IF7200 — Control Estadístico  
**Institución:** Universidad de Costa Rica, Sede del Caribe  
**Docente:** Michelle Jiménez  
**Elaborado por:** Andres Araya Agüero, Bryan Martinéz Gutiérrez, Jean Carlos Gutiérrez Carrillo, Danny Castillo Solano  
**Fecha:** Junio, 2026

---

## Contexto General

El Control Estadístico de la Calidad (CEQ) es una herramienta que usa datos y gráficas para vigilar si un proceso productivo se mantiene estable o presenta señales de falla. Se fundamenta en el concepto de **variabilidad**: ningún proceso produce resultados idénticos todo el tiempo. Esta variabilidad puede ser:

- **Causa común:** variación normal e inherente al proceso.
- **Causa especial:** algo anormal que está afectando el proceso y requiere intervención.

Las fórmulas que se documentan a continuación se aplican principalmente en dos tipos de gráficas de control:

- **Gráfica X̄-R:** para variables medibles (peso, tiempo, temperatura).
- **Gráfica p:** para atributos contados (defectuoso / no defectuoso).

---

## Sección 1 — Gráfica X̄-R (Variables Medibles)

---

### 1.1 Media del Subgrupo (X̄)

**Descripción:**  
Calcula el valor promedio de las mediciones tomadas dentro de un mismo subgrupo de muestreo. Representa el comportamiento central del proceso en ese momento específico.

**Fórmula:**

$$\bar{x} = \frac{\sum_{i=1}^{n} x_i}{n}$$

**Objetivo:**  
Resumir en un solo número el comportamiento de todas las mediciones de un subgrupo, para poder comparar ese valor con los límites de control y detectar si el proceso se está desplazando.

**Variables:**

| Variable | Significado |
|----------|-------------|
| `x̄` | Media o promedio del subgrupo |
| `xᵢ` | Cada valor individual medido dentro del subgrupo |
| `n` | Cantidad de observaciones en el subgrupo (tamaño del subgrupo) |
| `Σ` | Sumatoria de todos los valores individuales del subgrupo |

---

### 1.2 Rango del Subgrupo (R)

**Descripción:**  
Mide la variabilidad o dispersión dentro de un subgrupo. Se calcula como la diferencia entre el valor máximo y el valor mínimo observados en ese subgrupo. Es una forma rápida y sencilla de cuantificar qué tan dispersos están los datos.

**Fórmula:**

$$R = x_{max} - x_{min}$$

**Objetivo:**  
Detectar si la variabilidad interna del proceso aumenta o disminuye con el tiempo. Un rango alto indica que los datos dentro del subgrupo están muy dispersos; un rango bajo indica consistencia.

**Variables:**

| Variable | Significado |
|----------|-------------|
| `R` | Rango del subgrupo |
| `x_max` | Valor más alto observado dentro del subgrupo |
| `x_min` | Valor más bajo observado dentro del subgrupo |

---

### 1.3 Gran Media (X̄̄)

**Descripción:**  
Es el promedio de todas las medias de los subgrupos. También llamada "promedio de promedios". Representa el valor central alrededor del cual el proceso debería operar cuando está bajo control estadístico.

**Fórmula:**

$$\bar{\bar{x}} = \frac{\sum_{i=1}^{k} \bar{x}_i}{k}$$

**Objetivo:**  
Establecer la línea central (LC) de la gráfica X̄. Es el punto de referencia principal del proceso: si los subgrupos se agrupan cerca de este valor, el proceso es estable.

**Variables:**

| Variable | Significado |
|----------|-------------|
| `x̄̄` | Gran Media (promedio de todos los promedios de subgrupo) |
| `x̄ᵢ` | Media calculada de cada subgrupo individual |
| `k` | Número total de subgrupos recolectados |
| `Σ` | Sumatoria de todas las medias de subgrupo |

---

### 1.4 Rango Promedio (R̄)

**Descripción:**  
Es el promedio de todos los rangos calculados para cada subgrupo. Representa el nivel de variabilidad típico o esperado del proceso.

**Fórmula:**

$$\bar{R} = \frac{\sum_{i=1}^{k} R_i}{k}$$

**Objetivo:**  
Establecer la línea central de la gráfica R y servir como insumo para calcular los límites de control tanto de la gráfica R como de la gráfica X̄.

**Variables:**

| Variable | Significado |
|----------|-------------|
| `R̄` | Rango promedio de todos los subgrupos |
| `Rᵢ` | Rango calculado de cada subgrupo individual |
| `k` | Número total de subgrupos |
| `Σ` | Sumatoria de todos los rangos |

---

### 1.5 Límites de Control — Gráfica X̄

Los límites de control de la gráfica X̄ definen la zona dentro de la cual se espera que caigan las medias de los subgrupos cuando el proceso está bajo control. Existen tres líneas:

---

#### LCS X̄ — Límite de Control Superior

**Descripción:**  
Es el techo estadístico de la gráfica X̄. Cualquier media de subgrupo que supere este valor indica que el proceso salió de control hacia arriba y debe investigarse.

**Fórmula:**

$$LCS_{\bar{x}} = \bar{\bar{x}} + A_2 \cdot \bar{R}$$

**Objetivo:**  
Detectar desplazamientos positivos del proceso (la media sube más de lo estadísticamente esperado).

**Variables:**

| Variable | Significado |
|----------|-------------|
| `LCS_x̄` | Límite de Control Superior de la gráfica X̄ |
| `x̄̄` | Gran Media del proceso |
| `A₂` | Constante estadística tabular que depende del tamaño del subgrupo `n` (para n=5: A₂ = 0.577) |
| `R̄` | Rango promedio de todos los subgrupos |

---

#### LC X̄ — Línea Central

**Descripción:**  
Es la línea de referencia central de la gráfica X̄. Representa el valor promedio esperado del proceso cuando está estable.

**Fórmula:**

$$LC_{\bar{x}} = \bar{\bar{x}}$$

**Objetivo:**  
Servir como punto de comparación visual. Los puntos deben distribuirse aleatoriamente alrededor de esta línea sin tendencias ni patrones.

**Variables:**

| Variable | Significado |
|----------|-------------|
| `LC_x̄` | Línea Central de la gráfica X̄ |
| `x̄̄` | Gran Media del proceso |

---

#### LCI X̄ — Límite de Control Inferior

**Descripción:**  
Es el piso estadístico de la gráfica X̄. Cualquier media de subgrupo que caiga por debajo de este valor indica que el proceso salió de control hacia abajo.

**Fórmula:**

$$LCI_{\bar{x}} = \bar{\bar{x}} - A_2 \cdot \bar{R}$$

**Objetivo:**  
Detectar desplazamientos negativos del proceso (la media baja más de lo estadísticamente esperado).

**Variables:**

| Variable | Significado |
|----------|-------------|
| `LCI_x̄` | Límite de Control Inferior de la gráfica X̄ |
| `x̄̄` | Gran Media del proceso |
| `A₂` | Constante estadística tabular según tamaño de subgrupo (para n=5: A₂ = 0.577) |
| `R̄` | Rango promedio de todos los subgrupos |

---

### 1.6 Límites de Control — Gráfica R

Los límites de control de la gráfica R definen la zona de variabilidad aceptable. Permiten detectar si la dispersión del proceso aumenta o disminuye de forma anormal.

---

#### LCS R — Límite de Control Superior

**Descripción:**  
Es el techo estadístico de la gráfica R. Si el rango de un subgrupo supera este valor, la variabilidad del proceso es inusualmente alta.

**Fórmula:**

$$LCS_R = D_4 \cdot \bar{R}$$

**Objetivo:**  
Detectar incrementos anormales en la variabilidad del proceso que puedan indicar problemas como cambios de operario, materiales defectuosos o mal funcionamiento de equipos.

**Variables:**

| Variable | Significado |
|----------|-------------|
| `LCS_R` | Límite de Control Superior de la gráfica R |
| `D₄` | Constante estadística tabular según tamaño de subgrupo (para n=5: D₄ = 2.114) |
| `R̄` | Rango promedio de todos los subgrupos |

---

#### LC R — Línea Central

**Descripción:**  
Es la línea de referencia central de la gráfica R. Representa el nivel de variabilidad promedio esperado del proceso.

**Fórmula:**

$$LC_R = \bar{R}$$

**Objetivo:**  
Mostrar el nivel de variabilidad "normal" del proceso para comparación visual.

**Variables:**

| Variable | Significado |
|----------|-------------|
| `LC_R` | Línea Central de la gráfica R |
| `R̄` | Rango promedio de todos los subgrupos |

---

#### LCI R — Límite de Control Inferior

**Descripción:**  
Es el piso estadístico de la gráfica R. Para subgrupos pequeños (n ≤ 6), este límite es igual a cero porque D₃ = 0 en esos casos. Un rango inusualmente bajo puede indicar un cambio positivo en el proceso que también vale la pena investigar.

**Fórmula:**

$$LCI_R = D_3 \cdot \bar{R}$$

**Objetivo:**  
Detectar disminuciones inusuales en la variabilidad del proceso.

**Variables:**

| Variable | Significado |
|----------|-------------|
| `LCI_R` | Límite de Control Inferior de la gráfica R |
| `D₃` | Constante estadística tabular según tamaño de subgrupo (para n=5: D₃ = 0) |
| `R̄` | Rango promedio de todos los subgrupos |

---

### 1.7 Tabla de Constantes Estadísticas (Montgomery)

Las constantes A₂, D₃, D₄ y d₂ se obtienen de tablas estadísticas estandarizadas según el tamaño del subgrupo `n`.

| n | A₂ | D₃ | D₄ | d₂ |
|---|----|----|----|----|
| 2 | 1.880 | 0 | 3.267 | 1.128 |
| 3 | 1.023 | 0 | 2.574 | 1.693 |
| 4 | 0.729 | 0 | 2.282 | 2.059 |
| **5** | **0.577** | **0** | **2.114** | **2.326** |
| 6 | 0.483 | 0 | 2.004 | 2.534 |
| 7 | 0.419 | 0.076 | 1.924 | 2.704 |
| 8 | 0.373 | 0.136 | 1.864 | 2.847 |
| 10 | 0.308 | 0.223 | 1.777 | 3.078 |

> **Nota:** En el caso práctico del presente trabajo se usó n = 5 (5 cajas por subgrupo), por lo que A₂ = 0.577, D₃ = 0, D₄ = 2.114 y d₂ = 2.326.

---

## Sección 2 — Índices de Capacidad del Proceso

Los índices de capacidad miden qué tan bien el proceso cumple con las especificaciones definidas por el cliente o el estándar. Se calculan a partir de la variabilidad estimada del proceso.

---

### 2.1 Desviación Estándar del Proceso (σ)

**Descripción:**  
Estima la dispersión o variabilidad del proceso a partir del rango promedio, usando la constante d₂. A diferencia de la desviación estándar muestral convencional, esta versión es más robusta para procesos industriales continuos.

**Fórmula:**

$$\sigma = \frac{\bar{R}}{d_2}$$

**Objetivo:**  
Obtener una estimación confiable de la variabilidad del proceso para usarla en el cálculo de los índices de capacidad Cp y Cpk.

**Variables:**

| Variable | Significado |
|----------|-------------|
| `σ` | Desviación estándar estimada del proceso |
| `R̄` | Rango promedio de todos los subgrupos |
| `d₂` | Constante estadística tabular según tamaño de subgrupo (para n=5: d₂ = 2.326) |

---

### 2.2 Índice de Capacidad del Proceso (Cp)

**Descripción:**  
Compara el ancho de las especificaciones del cliente (tolerancia total) contra el ancho natural del proceso (seis sigmas). Indica si el proceso tiene suficiente "espacio" para operar dentro de los límites sin producir defectos, asumiendo que el proceso está perfectamente centrado.

**Fórmula:**

$$C_p = \frac{LSE - LIE}{6\sigma}$$

**Objetivo:**  
Responder a la pregunta: ¿el proceso es capaz de cumplir con las especificaciones? No considera si el proceso está centrado, solo si tiene suficiente amplitud.

**Interpretación:**

| Valor de Cp | Significado |
|-------------|-------------|
| Cp < 1.00 | El proceso NO es capaz; produce fuera de especificaciones |
| Cp = 1.00 | El proceso es apenas capaz; está justo en el límite |
| 1.00 ≤ Cp < 1.33 | El proceso es capaz pero no suficientemente robusto |
| Cp ≥ 1.33 | El proceso es capaz y adecuado (nivel aceptable en industria) |

**Variables:**

| Variable | Significado |
|----------|-------------|
| `Cp` | Índice de Capacidad del Proceso |
| `LSE` | Límite Superior de Especificación (definido por el cliente o estándar) |
| `LIE` | Límite Inferior de Especificación (definido por el cliente o estándar) |
| `σ` | Desviación estándar estimada del proceso |
| `6σ` | Ancho natural del proceso (±3σ a cada lado de la media) |

---

### 2.3 Índice de Capacidad Centrado (Cpk)

**Descripción:**  
Es una versión mejorada del Cp que sí considera si el proceso está centrado dentro de las especificaciones. Calcula la capacidad hacia cada uno de los dos límites por separado y toma el valor más pequeño, que representa el lado más crítico (el más cercano al límite de especificación).

**Fórmula:**

$$C_{pk} = \min\left(\frac{LSE - \bar{\bar{x}}}{3\sigma},\ \frac{\bar{\bar{x}} - LIE}{3\sigma}\right)$$

**Objetivo:**  
Responder a la pregunta: ¿el proceso es capaz Y está centrado? Un Cpk menor que el Cp indica que el proceso está desplazado hacia uno de los límites de especificación.

**Interpretación:**

| Comparación | Significado |
|-------------|-------------|
| Cpk = Cp | El proceso está perfectamente centrado entre los dos límites |
| Cpk < Cp | El proceso está descentrado; se acerca más a uno de los límites |
| Cpk < 1.00 | El proceso produce defectos independientemente de si está centrado |

**Variables:**

| Variable | Significado |
|----------|-------------|
| `Cpk` | Índice de Capacidad Centrado |
| `LSE` | Límite Superior de Especificación |
| `LIE` | Límite Inferior de Especificación |
| `x̄̄` | Gran Media del proceso |
| `σ` | Desviación estándar estimada del proceso |
| `3σ` | Distancia desde la media hasta cada límite de control (3 sigmas) |
| `min(...)` | Se toma el valor menor de los dos cocientes |

---

## Sección 3 — Gráfica p (Atributos: Proporción de Defectuosos)

La gráfica p se usa cuando los datos son atributos binarios (una unidad es defectuosa o no lo es). No se mide una característica cuantitativa, sino que se cuenta la fracción de unidades que no cumplen con los requisitos.

---

### 3.1 Proporción de Defectuosos por Turno (p)

**Descripción:**  
Calcula la fracción de unidades defectuosas encontradas en cada turno o lote inspeccionado. Es el dato principal que se grafica en la gráfica p para cada período.

**Fórmula:**

$$p = \frac{d}{n}$$

**Objetivo:**  
Conocer qué proporción de las unidades inspeccionadas en un turno resultó defectuosa, para detectar si esa proporción es normal o anormal.

**Variables:**

| Variable | Significado |
|----------|-------------|
| `p` | Proporción de defectuosos del turno |
| `d` | Cantidad de unidades defectuosas encontradas en el turno |
| `n` | Total de unidades inspeccionadas en el turno |

---

### 3.2 Proporción Promedio Global (p̄)

**Descripción:**  
Es la proporción de defectuosos considerando todos los turnos en conjunto. Representa la tasa de defectos "global" del proceso y sirve como la línea central de la gráfica p.

**Fórmula:**

$$\bar{p} = \frac{\sum_{i=1}^{k} d_i}{\sum_{i=1}^{k} n_i}$$

**Objetivo:**  
Establecer el nivel base de defectos del proceso para calcular los límites de control y servir como referencia de comparación para cada turno.

**Variables:**

| Variable | Significado |
|----------|-------------|
| `p̄` | Proporción promedio global de defectuosos |
| `dᵢ` | Cantidad de defectuosos en cada turno `i` |
| `nᵢ` | Total de unidades inspeccionadas en cada turno `i` |
| `Σdᵢ` | Suma total de defectuosos en todos los turnos |
| `Σnᵢ` | Suma total de unidades inspeccionadas en todos los turnos |

---

### 3.3 Línea Central — Gráfica p (LC)

**Descripción:**  
Es la línea de referencia central de la gráfica p. Es igual a la proporción promedio global. Representa el nivel de defectos "normal" del proceso.

**Fórmula:**

$$LC = \bar{p}$$

**Objetivo:**  
Servir como punto de comparación: los puntos deben distribuirse aleatoriamente alrededor de esta línea. Su valor es constante para todos los turnos.

**Variables:**

| Variable | Significado |
|----------|-------------|
| `LC` | Línea Central de la gráfica p |
| `p̄` | Proporción promedio global de defectuosos |

---

### 3.4 Límite de Control Superior — Gráfica p (LCS)

**Descripción:**  
Es el techo estadístico de la gráfica p. Si la proporción de defectuosos de un turno supera este límite, el proceso está fuera de control y debe investigarse la causa del aumento de defectos. A diferencia de las gráficas X̄-R, este límite **varía en cada turno** porque depende del tamaño del lote inspeccionado en ese turno.

**Fórmula:**

$$LCS = \bar{p} + 3\sqrt{\frac{\bar{p}(1-\bar{p})}{n}}$$

**Objetivo:**  
Detectar turnos donde la proporción de defectuosos es inusualmente alta, señalando una causa especial que requiere acción correctiva.

**Variables:**

| Variable | Significado |
|----------|-------------|
| `LCS` | Límite de Control Superior de la gráfica p |
| `p̄` | Proporción promedio global de defectuosos |
| `n` | Total de unidades inspeccionadas en ese turno específico (varía por turno) |
| `3` | Factor de 3 desviaciones estándar (nivel de confianza ~99.73%) |
| `√(p̄(1-p̄)/n)` | Desviación estándar de la proporción para ese turno |

---

### 3.5 Límite de Control Inferior — Gráfica p (LCI)

**Descripción:**  
Es el piso estadístico de la gráfica p. Si la proporción de defectuosos de un turno cae por debajo de este límite, significa que algo inusualmente positivo ocurrió (muy pocos defectos) y también debe investigarse para replicar esa mejora. Al igual que el LCS, **varía en cada turno** según el tamaño del lote. Si el resultado es negativo, se toma como 0 (una proporción no puede ser negativa).

**Fórmula:**

$$LCI = \bar{p} - 3\sqrt{\frac{\bar{p}(1-\bar{p})}{n}}$$

**Objetivo:**  
Detectar turnos donde la proporción de defectuosos es inusualmente baja, lo cual puede indicar una mejora real que se desea sostener o replicar.

**Variables:**

| Variable | Significado |
|----------|-------------|
| `LCI` | Límite de Control Inferior de la gráfica p |
| `p̄` | Proporción promedio global de defectuosos |
| `n` | Total de unidades inspeccionadas en ese turno específico (varía por turno) |
| `3` | Factor de 3 desviaciones estándar |
| `√(p̄(1-p̄)/n)` | Desviación estándar de la proporción para ese turno |

> **Regla práctica:** Si LCI resulta en un valor negativo, se establece LCI = 0, ya que una proporción de defectuosos no puede ser menor que cero.

---

## Resumen Rápido de Fórmulas

| # | Nombre | Fórmula | Aplicación |
|---|--------|----------|------------|
| 1 | Media del Subgrupo | x̄ = Σxᵢ / n | Gráfica X̄ |
| 2 | Rango del Subgrupo | R = x_max − x_min | Gráfica R |
| 3 | Gran Media | x̄̄ = Σx̄ᵢ / k | Línea central gráfica X̄ |
| 4 | Rango Promedio | R̄ = ΣRᵢ / k | Línea central gráfica R |
| 5 | LCS Gráfica X̄ | x̄̄ + A₂ · R̄ | Límite superior gráfica X̄ |
| 6 | LC Gráfica X̄ | x̄̄ | Línea central gráfica X̄ |
| 7 | LCI Gráfica X̄ | x̄̄ − A₂ · R̄ | Límite inferior gráfica X̄ |
| 8 | LCS Gráfica R | D₄ · R̄ | Límite superior gráfica R |
| 9 | LC Gráfica R | R̄ | Línea central gráfica R |
| 10 | LCI Gráfica R | D₃ · R̄ | Límite inferior gráfica R |
| 11 | Desviación Estándar | σ = R̄ / d₂ | Capacidad del proceso |
| 12 | Índice Cp | (LSE − LIE) / 6σ | Capacidad sin centrado |
| 13 | Índice Cpk | min((LSE−x̄̄)/3σ, (x̄̄−LIE)/3σ) | Capacidad con centrado |
| 14 | Proporción por Turno | p = d / n | Gráfica p |
| 15 | Proporción Promedio | p̄ = Σdᵢ / Σnᵢ | Línea central gráfica p |
| 16 | LCS Gráfica p | p̄ + 3√(p̄(1−p̄)/n) | Límite superior gráfica p |
| 17 | LC Gráfica p | p̄ | Línea central gráfica p |
| 18 | LCI Gráfica p | p̄ − 3√(p̄(1−p̄)/n) | Límite inferior gráfica p |

---

## Valores del Caso Práctico (Bananera — Zona de Matina, Limón)

| Parámetro | Valor |
|-----------|-------|
| Variable medida | Peso neto de cajas de banano (kg) |
| Peso objetivo en finca | 18.75 kg |
| LIE (Límite Inferior de Especificación) | 18.50 kg |
| LSE (Límite Superior de Especificación) | 19.05 kg |
| Tamaño de subgrupo (n) | 5 cajas |
| Número de subgrupos (k) | 25 |
| Gran Media (x̄̄) | 18.8193 kg |
| Rango Promedio (R̄) | 0.2156 kg |
| Desviación Estándar (σ) | 0.0927 kg |
| LCS Gráfica X̄ | 18.9437 kg |
| LCI Gráfica X̄ | 18.6949 kg |
| LCS Gráfica R | 0.4558 kg |
| LCI Gráfica R | 0 |
| Cp | 0.9889 |
| Cpk | 0.8297 |
| Proporción Promedio (p̄) | 0.0885 (8.85%) |

---

*Documento preparado para uso en portafolio web y referencia técnica del curso IF7200.*
