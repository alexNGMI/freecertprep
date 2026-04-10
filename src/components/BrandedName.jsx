export default function BrandedName({ size = 'text-2xl' }) {
  return (
    <span className={`font-heading tracking-tight ${size}`}>
      <span className="font-bold text-zinc-200">free</span>
      <span className="font-black text-sky-400">cert</span>
      <span className="font-bold text-zinc-200">prep</span>
    </span>
  )
}
