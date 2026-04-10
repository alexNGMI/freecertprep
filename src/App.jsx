import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CertLayout from './components/CertLayout'
import { CertProvider } from './hooks/useCert'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Quiz = lazy(() => import('./pages/Quiz'))
const Drill = lazy(() => import('./pages/Drill'))
const Exam = lazy(() => import('./pages/Exam'))
const Results = lazy(() => import('./pages/Results'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-3 border-[#f1be32] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function CertRoutes() {
  return (
    <CertProvider>
      <CertLayout />
    </CertProvider>
  )
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:certId" element={<CertRoutes />}>
          <Route index element={<Dashboard />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="drill" element={<Drill />} />
          <Route path="exam" element={<Exam />} />
          <Route path="results" element={<Results />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
