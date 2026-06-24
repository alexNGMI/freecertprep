import { createContext, useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCert } from '../data/certs'
import LoadingState from '../components/LoadingState'
import { Button } from '../components/ui/button'

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
  const [loadErrorId, setLoadErrorId] = useState(null)

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
        setLoadErrorId(null)
      }
    }).catch((err) => {
      // A failed dynamic import (offline, bad deploy, corrupt chunk) must
      // not leave the user stuck on the spinner forever. Drop the cached
      // rejected promise so a reload can retry the import cleanly.
      console.error('Failed to load question bank:', err)
      questionCache.delete(certConfig.id)
      if (!cancelled) {
        setLoadErrorId(certConfig.id)
      }
    })

    return () => { cancelled = true }
  }, [certConfig])

  if (!certConfig) {
    return <CertContext.Provider value={null}>{children}</CertContext.Provider>
  }

  if (loadErrorId === certConfig.id) {
    const dark = !light
    return (
      <div className={`min-h-screen flex items-center justify-center px-6 ${dark ? 'bg-[#0a0a23] text-[#f5f6f7]' : 'bg-white text-slate-900'}`}>
        <div className="max-w-sm text-center space-y-5">
          <h1 className="text-2xl font-bold">Couldn’t load questions.</h1>
          <p className={`text-sm leading-relaxed ${dark ? 'text-zinc-400' : 'text-slate-500'}`}>
            The question bank failed to download. This is usually a network blip — your saved progress is safe.
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="accent"
            accentColor={dark ? '#f1be32' : '#e11d48'}
          >
            Try again
          </Button>
        </div>
      </div>
    )
  }

  if (cert?.id !== certConfig.id) {
    return (
      <LoadingState
        label="Loading questions"
        detail="Preparing this certification workspace."
        fullScreen
        light={light}
      />
    )
  }

  return <CertContext.Provider value={cert}>{children}</CertContext.Provider>
}
