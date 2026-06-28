// Índice de contenido por tema. A medida que cada tema se desarrolle,
// se importa aquí su módulo. Los temas sin contenido aún devuelven null.
import { controlEstadistico } from './control-estadistico'
import { markov } from './markov'
import { simulacion } from './simulacion'
import { transporte } from './transporte'
import { redes } from './redes'
import { programacion } from './programacion'

export const contenidoPorTema = {
  'control-estadistico': controlEstadistico,
  markov,
  simulacion,
  transporte,
  redes,
  programacion,
}

export function getContenido(id) {
  return contenidoPorTema[id] ?? null
}
