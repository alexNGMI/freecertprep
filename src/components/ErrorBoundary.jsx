import { Component } from 'react'

/**
 * Root error boundary. Without this, any thrown render error unmounts the
 * whole React tree and the user sees a blank page. Catches the error,
 * logs it, and shows a recoverable fallback. Theme-neutral (dark) since a
 * crash can happen on any route, including the light sister site.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // Keep a console trail for debugging / future error reporting.
    console.error('Uncaught error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-[#0a0a23] text-[#f5f6f7] flex items-center justify-center px-6">
          <div className="max-w-md text-center space-y-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
              <svg className="w-7 h-7 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Something broke.</h1>
              <p className="text-sm text-zinc-400 leading-relaxed">
                An unexpected error crashed this page. Your saved progress is stored locally and is safe.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-xl text-sm font-bold bg-[#f1be32] text-zinc-950 hover:brightness-110 transition-all"
              >
                Reload page
              </button>
              <a
                href="/"
                className="px-6 py-3 rounded-xl text-sm font-semibold border border-white/15 text-zinc-300 hover:bg-white/5 transition-all"
              >
                Go home
              </a>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
