export default function BrandedName({ size = 'text-2xl', accentColor = null }) {
  return (
    <span className={`font-heading tracking-tight ${size}`}>
      <span className="font-bold text-zinc-500">free</span>
      <span
        className={`font-black ${accentColor ? '' : 'text-zinc-100'}`}
        style={accentColor ? { color: accentColor } : undefined}
      >cert</span>
      <span className="font-bold text-zinc-500">prep</span>
    </span>
  )
}
