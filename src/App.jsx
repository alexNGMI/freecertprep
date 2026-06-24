import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import APlus from './pages/APlus'
import Catalog from './pages/Catalog'
import CareerPath from './pages/CareerPath'
import Docs from './pages/Docs'
import CertLayout from './components/CertLayout'
import LoadingState from './components/LoadingState'
import { CertProvider } from './hooks/useCert'

const Account = lazy(() => import('./pages/Account'))
const AdminReports = lazy(() => import('./pages/AdminReports'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Quiz = lazy(() => import('./pages/Quiz'))
const Drill = lazy(() => import('./pages/Drill'))
const Exam = lazy(() => import('./pages/Exam'))
const Results = lazy(() => import('./pages/Results'))
const LearningPlan = lazy(() => import('./pages/LearningPlan'))
const Diagnostic = lazy(() => import('./pages/Diagnostic'))
const CasePractice = lazy(() => import('./pages/CasePractice'))
// Sister-site landing page — distinct light theme, no shared layout.
const RealEstate = lazy(() => import('./pages/RealEstate'))
// Sister-site study app — light theme, reuses the shared cert engine
// pinned to the real-estate-national pool.
const RELayout = lazy(() => import('./pages/realestate/RELayout'))
const REStudyPicker = lazy(() => import('./pages/realestate/REStudyPicker'))
const REDashboard = lazy(() => import('./pages/realestate/REDashboard'))
const REQuiz = lazy(() => import('./pages/realestate/REQuiz'))
const REDrill = lazy(() => import('./pages/realestate/REDrill'))
const REExam = lazy(() => import('./pages/realestate/REExam'))
const REResults = lazy(() => import('./pages/realestate/REResults'))

// Reset ordinary route changes to the top, but honor cross-route hashes
// after React has rendered the destination section.
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const frameId = window.requestAnimationFrame(() => {
        const id = decodeURIComponent(hash.slice(1))
        document.getElementById(id)?.scrollIntoView({ block: 'start' })
      })
      return () => window.cancelAnimationFrame(frameId)
    }

    window.scrollTo(0, 0)
    return undefined
  }, [pathname, hash])

  return null
}

function PageLoader() {
  return <LoadingState label="Opening page" detail="Loading the next workspace." />
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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/comptia/a-plus" element={<APlus />} />
        <Route path="/paths/:pathId" element={<CareerPath />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/real-estate" element={<RealEstate />} />
        <Route path="/real-estate/study" element={<REStudyPicker />} />
        <Route path="/real-estate/study/:reCert" element={<RELayout />}>
          <Route index element={<REDashboard />} />
          <Route path="quiz" element={<REQuiz />} />
          <Route path="drill" element={<REDrill />} />
          <Route path="exam" element={<REExam />} />
          <Route path="results" element={<REResults />} />
        </Route>
        <Route path="/:certId" element={<CertRoutes />}>
          <Route index element={<Dashboard />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="drill" element={<Drill />} />
          <Route path="exam" element={<Exam />} />
          <Route path="results" element={<Results />} />
          <Route path="learning" element={<LearningPlan />} />
          <Route path="learning/diagnostic" element={<Diagnostic />} />
          <Route path="learning/cases" element={<CasePractice />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
