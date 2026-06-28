import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import TopicPage from './pages/TopicPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Una sola ruta dinámica sirve a los 6 temas: /markov, /transporte, ... */}
        <Route path="/:id" element={<TopicPage />} />
      </Routes>
    </Layout>
  )
}
