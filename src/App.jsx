import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Quiz from './pages/Quiz'
import Exam from './pages/Exam'
import Results from './pages/Results'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/results" element={<Results />} />
      </Route>
    </Routes>
  )
}

export default App
