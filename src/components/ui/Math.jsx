import { InlineMath, BlockMath } from 'react-katex'

// Wrappers de KaTeX para fórmulas digitadas.
// <M> para fórmula en línea, <MB> para fórmula en bloque (centrada).
export function M({ children }) {
  return <InlineMath math={String(children)} />
}

export function MB({ children }) {
  return (
    <div className="my-1 overflow-x-auto">
      <BlockMath math={String(children)} />
    </div>
  )
}
