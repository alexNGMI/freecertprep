export default function BrandedName({ size = 'text-2xl' }) {
  return (
    <span className={`font-heading font-black tracking-tight ${size}`}>
      <span className="text-zinc-100">Free</span>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.4)]">Cert</span>
      <span className="text-zinc-100">Prep</span>
    </span>
  )
}
