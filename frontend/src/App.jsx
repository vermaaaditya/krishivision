import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ScanUpload from './pages/ScanUpload'
import History from './pages/History'
import Results from './pages/Results'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/scan" element={<ScanUpload />} />
        <Route path="/history" element={<History />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Layout>
  )
}

export default App
