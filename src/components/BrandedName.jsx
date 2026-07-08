export default function BrandedName({ size = 'text-2xl', accentColor = null, tone = 'dark' }) {
  const muted = tone === 'light' ? 'text-slate-500' : 'text-zinc-500'
  const main = tone === 'light' ? 'text-slate-950' : 'text-zinc-100'

  return (
    <span className={`font-heading tracking-tight ${size}`}>
      <span className={`font-bold ${muted}`}>free</span>
      <span
        className={`font-black ${accentColor ? '' : main}`}
        style={accentColor ? { color: accentColor } : undefined}
      >cert</span>
      <span className={`font-bold ${muted}`}>prep</span>
    </span>
  )
}
