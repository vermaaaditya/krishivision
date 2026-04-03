import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import ScanUpload from './pages/ScanUpload'
import History from './pages/History'
import Results from './pages/Results'
import Insights from './pages/Insights'
import Settings from './pages/Settings'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="scan" element={<ScanUpload />} />
              <Route path="history" element={<History />} />
              <Route path="results" element={<Results />} />
              <Route path="insights" element={<Insights />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  )
}

export default App
