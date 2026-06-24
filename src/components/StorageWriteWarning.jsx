import { useEffect, useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { subscribeToStorageErrors } from '../utils/storage'

export default function StorageWriteWarning() {
  const [visible, setVisible] = useState(false)

  useEffect(
    () => subscribeToStorageErrors(() => setVisible(true)),
    [],
  )

  if (!visible) return null

  return (
    <div
      role="alert"
      className="fixed inset-x-4 bottom-4 z-[70] mx-auto flex max-w-3xl items-start gap-3 border border-amber-400/40 bg-zinc-950 px-4 py-3 text-sm text-amber-100 shadow-2xl"
    >
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
      <div className="min-w-0 flex-1">
        <p className="font-bold">This browser could not save your latest study change.</p>
        <p className="mt-1 leading-relaxed text-amber-100/75">
          Export your current progress and free some browser storage before continuing.
        </p>
        <Link to="/account" className="mt-2 inline-block font-bold text-amber-300 hover:text-amber-200">
          Open account and export tools
        </Link>
      </div>
      <button
        type="button"
        aria-label="Dismiss storage warning"
        onClick={() => setVisible(false)}
        className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center text-amber-200 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
