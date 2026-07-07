export default function StatsCard({ label, value, accent = 'amber', sublabel }) {
  const accentMap = {
    amber: { text: 'text-amber', dot: 'bg-amber', glow: 'shadow-[0_0_10px_rgba(232,163,61,0.6)]' },
    teal: { text: 'text-teal', dot: 'bg-teal', glow: 'shadow-[0_0_10px_rgba(94,168,138,0.6)]' },
    brick: { text: 'text-brick', dot: 'bg-brick', glow: 'shadow-[0_0_10px_rgba(209,101,79,0.6)]' },
    mist: { text: 'text-mist-50', dot: 'bg-mist-400', glow: '' },
  }
  const a = accentMap[accent] || accentMap.amber

  return (
    <div className="rounded-xl bg-ink-800 border border-ink-700 shadow-panel px-5 py-4 flex flex-col gap-2 min-w-[160px]">
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${a.dot} ${a.glow}`} />
        <p className="text-[11px] font-mono uppercase tracking-wider text-mist-400">{label}</p>
      </div>
      <p className={`font-display font-bold text-3xl ${a.text}`}>{value}</p>
      {sublabel && <p className="text-xs text-mist-400">{sublabel}</p>}
    </div>
  )
}
