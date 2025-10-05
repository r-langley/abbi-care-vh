"use client"

interface SpiderChartProps {
  data: {
    trait: string
    score: number
    active?: boolean
  }[]
  size?: number
}

export function SpiderChart({ data, size = 250 }: SpiderChartProps) {
  const center = size / 2
  const maxRadius = size / 2 - 40
  const levels = 5
  const angleStep = (2 * Math.PI) / data.length

  // Calculate points for the data polygon
  const dataPoints = data.map((item, index) => {
    const angle = angleStep * index - Math.PI / 2
    const radius = (item.score / 100) * maxRadius
    const x = center + radius * Math.cos(angle)
    const y = center + radius * Math.sin(angle)
    return { x, y, ...item }
  })

  // Create path for data polygon
  const dataPath = dataPoints.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z'

  // Calculate label positions
  const labels = data.map((item, index) => {
    const angle = angleStep * index - Math.PI / 2
    const labelRadius = maxRadius + 30
    const x = center + labelRadius * Math.cos(angle)
    const y = center + labelRadius * Math.sin(angle)
    return { x, y, text: item.trait, active: item.active }
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {/* Background circles (levels) */}
      {Array.from({ length: levels }).map((_, i) => {
        const radius = ((i + 1) / levels) * maxRadius
        return (
          <circle
            key={`level-${i}`}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#e7e7e7"
            strokeWidth="1"
          />
        )
      })}

      {/* Axis lines */}
      {data.map((_, index) => {
        const angle = angleStep * index - Math.PI / 2
        const x = center + maxRadius * Math.cos(angle)
        const y = center + maxRadius * Math.sin(angle)
        return (
          <line
            key={`axis-${index}`}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="#e7e7e7"
            strokeWidth="1"
          />
        )
      })}

      {/* Data polygon */}
      <path
        d={dataPath}
        fill="rgba(88, 97, 88, 0.2)"
        stroke="#586158"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {dataPoints.map((point, index) => (
        <circle
          key={`point-${index}`}
          cx={point.x}
          cy={point.y}
          r="4"
          fill="#586158"
        />
      ))}

      {/* Labels */}
      {labels.map((label, index) => (
        <text
          key={`label-${index}`}
          x={label.x}
          y={label.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className={`tracking-normal text-xs font-semibold ${
            label.active 
              ? 'font-bold fill-[#586158]' 
              : 'font-medium fill-[#586158] opacity-50'
          }`}
          style={{ fontFamily: 'Figtree, sans-serif' }}
        >
          {label.text}
        </text>
      ))}
    </svg>
  )
}
