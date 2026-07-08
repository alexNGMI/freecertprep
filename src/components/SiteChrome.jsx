import { Link } from 'react-router-dom'
import BrandedName from './BrandedName'
import ThemeToggle from './ThemeToggle'

export function SiteHeader({ className = '', innerClassName = 'max-w-7xl' }) {
  return (
    <header className={`theme-header sticky top-0 z-30 border-b backdrop-blur-xl ${className}`}>
      <div className={`mx-auto flex ${innerClassName} items-center justify-between px-5 py-4 sm:px-6`}>
        <Link to="/" className="transition-opacity hover:opacity-80">
          <BrandedName tone="light" />
        </Link>
        <nav className="site-header-nav hidden items-center gap-6 text-sm font-bold text-slate-600 sm:flex">
          <Link to="/#paths" className="transition-colors">Paths</Link>
          <Link to="/catalog" className="transition-colors">Catalog</Link>
          <Link to="/account" className="transition-colors">Account</Link>
          <ThemeToggle />
        </nav>
        <ThemeToggle className="sm:hidden" />
      </div>
    </header>
  )
}

export function SiteFooter({ className = '', innerClassName = 'max-w-7xl' }) {
  return (
    <footer className={`site-footer border-t border-slate-900/10 bg-[#f7f3eb] py-9 text-slate-600 ${className}`}>
      <div className={`mx-auto flex ${innerClassName} flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-6`}>
        <Link to="/" className="transition-opacity hover:opacity-80">
          <BrandedName size="text-lg" tone="light" />
        </Link>
        <div className="site-footer-links flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
          <Link to="/support" className="font-bold transition-colors">Support</Link>
          <Link to="/privacy" className="font-bold transition-colors">Privacy</Link>
        </div>
      </div>
    </footer>
  )
}
