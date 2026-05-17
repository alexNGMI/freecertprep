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
      certConfig.loadQuestions().then((questions) => questions.default ?? questions)
    )
  }
  return questionCache.get(certConfig.id)
}

export function CertProvider({ children, certId: certIdProp, light = false }) {
  const params = useParams()
  // Sister sites (e.g. the Real Estate study app) mount this provider on a
  // fixed cert without a `:certId` route segment — they pass certId explicitly.
  const certId = certIdProp ?? params.certId
  const certConfig = getCert(certId)
  const [cert, setCert] = useState(null)
  const [loading, setLoading] = useState(!!certConfig)
  const [loadError, setLoadError] = useState(false)

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
    }).catch((err) => {
      // A failed dynamic import (offline, bad deploy, corrupt chunk) must
      // not leave the user stuck on the spinner forever. Drop the cached
      // rejected promise so a reload can retry the import cleanly.
      console.error('Failed to load question bank:', err)
      questionCache.delete(certConfig.id)
      if (!cancelled) {
        setLoadError(true)
        setLoading(false)
      }
    })

    return () => { cancelled = true }
  }, [certConfig])

  if (!certConfig) {
    return <CertContext.Provider value={null}>{children}</CertContext.Provider>
  }

  if (loadError) {
    const dark = !light
    return (
      <div className={`min-h-screen flex items-center justify-center px-6 ${dark ? 'bg-[#0a0a23] text-[#f5f6f7]' : 'bg-white text-slate-900'}`}>
        <div className="max-w-sm text-center space-y-5">
          <h1 className="text-2xl font-bold">Couldn’t load questions.</h1>
          <p className={`text-sm leading-relaxed ${dark ? 'text-zinc-400' : 'text-slate-500'}`}>
            The question bank failed to download. This is usually a network blip — your saved progress is safe.
          </p>
          <button
            onClick={() => window.location.reload()}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${dark ? 'bg-[#f1be32] text-zinc-950 hover:brightness-110' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    if (light) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center space-y-4 animate-fade-up">
            <div className="w-10 h-10 border-3 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Loading questions…</p>
          </div>
        </div>
      )
    }
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
