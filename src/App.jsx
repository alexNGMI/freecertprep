import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CertLayout from './components/CertLayout'
import { CertProvider } from './hooks/useCert'
import Dashboard from './pages/Dashboard'
import Quiz from './pages/Quiz'
import Exam from './pages/Exam'
import Results from './pages/Results'

function CertRoutes() {
  return (
    <CertProvider>
      <CertLayout />
    </CertProvider>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:certId" element={<CertRoutes />}>
        <Route index element={<Dashboard />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="exam" element={<Exam />} />
        <Route path="results" element={<Results />} />
      </Route>
    </Routes>
  )
}

export default App
