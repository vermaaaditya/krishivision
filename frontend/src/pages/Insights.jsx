const MAX_CHART_HEIGHT = 160

const diseaseBreakdown = [
  { name: 'Wheat Rust', count: 38, pct: 78 },
  { name: 'Powdery Mildew', count: 24, pct: 49 },
  { name: 'Blight', count: 19, pct: 39 },
  { name: 'Nitrogen Deficit', count: 14, pct: 29 },
  { name: 'Leaf Spot', count: 9, pct: 18 },
]

const monthlyScans = [
  { month: 'Oct', healthy: 45, diseased: 8 },
  { month: 'Nov', healthy: 52, diseased: 14 },
  { month: 'Dec', healthy: 39, diseased: 7 },
  { month: 'Jan', healthy: 61, diseased: 18 },
  { month: 'Feb', healthy: 48, diseased: 11 },
  { month: 'Mar', healthy: 57, diseased: 22 },
]

const maxBar = Math.max(...monthlyScans.map((m) => m.healthy + m.diseased))

const recommendations = [
  {
    icon: 'water_drop',
    color: 'text-primary',
    bg: 'bg-primary-fixed',
    title: 'Reduce irrigation in North Quadrant',
    desc: 'High moisture detected; fungal risk elevated over next 72 hours.',
  },
  {
    icon: 'bug_report',
    color: 'text-tertiary',
    bg: 'bg-tertiary-fixed',
    title: 'Schedule fungicide treatment for Wheat Rust',
    desc: '38 instances recorded this season. Early intervention reduces spread by 60%.',
  },
  {
    icon: 'eco',
    color: 'text-secondary',
    bg: 'bg-secondary-container',
    title: 'Boost nitrogen levels in Soybean Section 4',
    desc: 'Leaf yellowing detected — soil amendment recommended within 2 weeks.',
  },
]

export default function Insights() {
  return (
    <div className="p-6 md:p-12 pb-32 md:pb-12 bg-surface min-h-screen">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Crop Insights
        </h1>
        <p className="text-on-surface-variant mt-2 text-lg">
          Season-wide analytics across all your scans and field data.
        </p>
      </header>

      {/* Stats Row */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { icon: 'analytics', color: 'text-primary', value: '1,284', label: 'Total Scans' },
          { icon: 'coronavirus', color: 'text-tertiary', value: '104', label: 'Disease Cases' },
          { icon: 'verified', color: 'text-secondary', value: '91%', label: 'Detection Accuracy' },
          { icon: 'potted_plant', color: 'text-primary', value: '42', label: 'Crops Monitored' },
        ].map((s) => (
          <div key={s.label} className="bg-surface-container-low p-7 rounded-3xl flex flex-col justify-between h-40">
            <span className={`material-symbols-outlined ${s.color} text-3xl`}>{s.icon}</span>
            <div>
              <p className="font-extrabold text-3xl text-on-surface" style={{ fontFamily: 'Manrope, sans-serif' }}>{s.value}</p>
              <p className="text-on-surface-variant uppercase tracking-widest text-xs mt-1">{s.label}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Monthly Scan Trend */}
        <section className="lg:col-span-2 bg-surface-container-low p-8 rounded-3xl">
          <h2 className="text-xl font-bold text-on-surface mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Monthly Scan Trend
          </h2>
          <div className="flex items-end gap-4 h-48">
            {monthlyScans.map((m) => {
                const healthyH = Math.round((m.healthy / maxBar) * MAX_CHART_HEIGHT)
              const diseasedH = Math.round((m.diseased / maxBar) * MAX_CHART_HEIGHT)
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col-reverse gap-[2px]">
                    <div
                      className="w-full bg-primary-fixed rounded-t-lg transition-all"
                      style={{ height: `${healthyH}px` }}
                      title={`${m.healthy} healthy`}
                    />
                    <div
                      className="w-full bg-error-container rounded-t-lg transition-all"
                      style={{ height: `${diseasedH}px` }}
                      title={`${m.diseased} diseased`}
                    />
                  </div>
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mt-2">{m.month}</span>
                </div>
              )
            })}
          </div>
          <div className="flex gap-6 mt-4">
            <span className="flex items-center gap-2 text-xs text-on-surface-variant">
              <span className="w-3 h-3 rounded-sm bg-primary-fixed inline-block" />
              Healthy
            </span>
            <span className="flex items-center gap-2 text-xs text-on-surface-variant">
              <span className="w-3 h-3 rounded-sm bg-error-container inline-block" />
              Diseased
            </span>
          </div>
        </section>

        {/* Top Diseases */}
        <section className="bg-surface-container-low p-8 rounded-3xl">
          <h2 className="text-xl font-bold text-on-surface mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Top Diseases
          </h2>
          <div className="flex flex-col gap-5">
            {diseaseBreakdown.map((d) => (
              <div key={d.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-on-surface">{d.name}</span>
                  <span className="text-on-surface-variant">{d.count} cases</span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Recommendations */}
      <section>
        <h2 className="text-2xl font-bold text-on-surface mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Actionable Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((r) => (
            <div key={r.title} className="bg-surface-container-low p-7 rounded-3xl flex flex-col gap-4">
              <div className={`w-11 h-11 rounded-xl ${r.bg} flex items-center justify-center`}>
                <span className={`material-symbols-outlined text-[20px] ${r.color}`}>{r.icon}</span>
              </div>
              <h3 className="font-bold text-on-surface leading-snug" style={{ fontFamily: 'Manrope, sans-serif' }}>{r.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
