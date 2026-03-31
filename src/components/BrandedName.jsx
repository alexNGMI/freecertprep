export default function BrandedName({ size = 'text-lg' }) {
  return (
    <span className={size} style={{ fontFamily: "'Lato', sans-serif" }}>
      <span className="font-normal">free</span>
      <span className="font-bold">CertPrep</span>
      <span className="text-[#f1be32] ml-0.5">(&#9650;)</span>
    </span>
  )
}
