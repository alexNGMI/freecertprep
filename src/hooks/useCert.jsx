import { createContext, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { getCert } from '../data/certs'

const CertContext = createContext(null)

export function CertProvider({ children }) {
  const { certId } = useParams()
  const cert = getCert(certId)
  return <CertContext.Provider value={cert}>{children}</CertContext.Provider>
}

export function useCert() {
  return useContext(CertContext)
}
