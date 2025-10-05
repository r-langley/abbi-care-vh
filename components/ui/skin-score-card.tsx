interface SkinScoreCardProps {
  score: number
  label: string
}

export function SkinScoreCard({ score, label }: SkinScoreCardProps) {
  // Lower score = higher need (worse condition)
  // 0-33: Red (worst), 34-66: Orange (needs attention), 67-100: Green (healthy)
  const getActiveSection = (score: number) => {
    if (score <= 33) return "red"
    if (score <= 66) return "orange"
    return "green"
  }

  const activeSection = getActiveSection(score)

  return (
    <div className="bg-[var(--skin-score-bg)] flex flex-col gap-[var(--skin-score-gap)] px-[var(--skin-score-padding-x)] py-[var(--skin-score-padding-y)] flex-1 rounded-[var(--skin-score-radius)]">
      <p className="text-[var(--skin-score-number-color)] font-semibold text-[var(--skin-score-number-size)] font-mono text-2xl text-foreground">
        {score}
      </p>
      <p className="text-[var(--skin-score-label-color)] font-medium text-[var(--skin-score-label-size)] text-sm">{label}</p>

      <div className="flex gap-[2px] h-[var(--skin-score-bar-height)]">
        {/* Red section (0-33) */}
        <div
          className={`flex-1 rounded-full transition-all duration-300 ${
            activeSection === "red"
              ? "bg-[var(--skin-score-low)] opacity-100"
              : "bg-[var(--skin-score-bar-bg)] opacity-50"
          }`}
        />
        {/* Orange section (34-66) */}
        <div
          className={`flex-1 rounded-full transition-all duration-300 ${
            activeSection === "orange"
              ? "bg-[var(--skin-score-medium)] opacity-100"
              : "bg-[var(--skin-score-bar-bg)] opacity-50"
          }`}
        />
        {/* Green section (67-100) */}
        <div
          className={`flex-1 rounded-full transition-all duration-300 ${
            activeSection === "green"
              ? "bg-[var(--skin-score-high)] opacity-100"
              : "bg-[var(--skin-score-bar-bg)] opacity-50"
          }`}
        />
      </div>
    </div>
  )
}
