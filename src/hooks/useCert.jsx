import { createContext, useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCert } from '../data/certs'

const CertContext = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
export function useCert() {
  return useContext(CertContext)
}

// Cache promises to avoid re-fetching
const questionCache = new Map()

function getQuestionPromise(certConfig) {
  if (!certConfig) return null
  if (!questionCache.has(certConfig.id)) {
    questionCache.set(
      certConfig.id,
      certConfig.loadQuestions().then((m) => m.default)
    )
  }
  return questionCache.get(certConfig.id)
}

export function CertProvider({ children }) {
  const { certId } = useParams()
  const certConfig = getCert(certId)
  const [cert, setCert] = useState(null)
  const [loading, setLoading] = useState(!!certConfig)

  useEffect(() => {
    if (!certConfig) return

    let cancelled = false
    const promise = getQuestionPromise(certConfig)

    promise.then((questions) => {
      if (!cancelled) {
        setCert({
          ...certConfig,
          questions,
        })
        setLoading(false)
      }
    })

    return () => { cancelled = true }
  }, [certConfig])

  if (!certConfig) {
    return <CertContext.Provider value={null}>{children}</CertContext.Provider>
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a23] flex items-center justify-center">
        <div className="text-center space-y-4 animate-fade-up">
          <div className="w-10 h-10 border-3 border-[#f1be32] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[#a5abc4] text-sm font-bold uppercase tracking-wider">Loading questions…</p>
        </div>
      </div>
    )
  }

  return <CertContext.Provider value={cert}>{children}</CertContext.Provider>
}
