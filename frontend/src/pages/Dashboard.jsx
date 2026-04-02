import { Link } from 'react-router-dom'

const recentScans = [
  {
    id: 1,
    title: 'Main Wheat Field',
    location: 'North Quadrant • 2 hours ago',
    status: 'critical',
    statusLabel: 'Rust Detected',
    statusNote: 'Action Required',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5mjicLj5UnZCx-puO4VqW9UH-kHiHSJJCmZ_lqaBPdSwQr6Ez2v3dSwbYSqx2xaQ7jnn5x9dfCCZCcDsK__-Erl7UKM859rLxPwUxRdQye4J4GtwBGG4c0tf6Ke54_ErpV88XEBWQ0pJNuTTN3nDu2xUcwX-t431yejcjAFA2BP9q6OXt1Sqkq0TjWwPG1B8jiM5_vJthIewA7p8ChFMuPmT3zgiqp5R7TV0F9Hdl-WQx5j2tG4E4BzEpXUKXOnAdfaJRLuDjFlo',
  },
  {
    id: 2,
    title: 'Hydroponic Batch B',
    location: 'Greenhouse 02 • 5 hours ago',
    status: 'healthy',
    statusLabel: 'Healthy',
    statusNote: 'Optimal Growth',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGbfHYi5NoAJP2WrQ1qMv8Z9lQPCcNbGb3cVa9OKJYhuJPYjMyCD9gjGkpgSZ7J6Ly_kOzFtoAvIpi5PeF6vdfDxxfy3ivWPjgyUnKqqEZEzKi306QkurWvbT-SUXaT478rbtJdwuMj8UJV_Xus9xenrENI_BK66CWuTEWDbiMDdQk-phaZvIYjPLfWnGrALElcEfLTy_lsVf5HaLG5x_IaRyBHOotrteW2qmQ_gnDXJpRiqlaOb0gKCSWicTLdb8a7wy2-ehI3W0',
  },
  {
    id: 3,
    title: 'Soybean Section 4',
    location: 'East Ridge • Yesterday',
    status: 'warning',
    statusLabel: 'Warning',
    statusNote: 'Nitrogen Deficit',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyRiuAJFSbOa4BsiyAndXICFpbtPNvR0LSHWTcsdUGExZP1m0TeeSeNecjSOVqDbj4HScnNtgSd7fqJn18b6-31HL6mc4B253oaQl92r6iVHxwu3KkrwQTMN9Ehmqy34pArNwsj4qS8YrOUPK-CYO8IFwGF-ZEed63k83_JKUQWIvHcig2lkEUzwDyRNIhLtUWDaLLdFCwAVtQmc9ZZIbQtaw4ZX9tjEe2nIlNmw-ElJ3I2TJPVm934ZyU9iwL7JYSZA2zsMEJ83o',
  },
]

const statusStyles = {
  critical: 'bg-error-container text-on-error-container',
  healthy: 'bg-primary-fixed text-on-primary-fixed-variant',
  warning: 'bg-secondary-container text-on-secondary-container',
}

export default function Dashboard() {
  return (
    <div className="p-6 md:p-12 pb-32 md:pb-12 bg-surface min-h-screen">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Welcome Back
          </h1>
          <p className="text-on-surface-variant mt-2 text-lg">
            Your crops are showing promising growth today. Review areas that need attention.
          </p>
        </div>
        <Link
          to="/scan"
          className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold flex items-center gap-3 shadow-lg hover:opacity-90 transition-opacity"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          <span className="material-symbols-outlined">photo_camera</span>
          Start New Scan
        </Link>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-surface-container-low p-8 rounded-3xl flex flex-col justify-between h-48">
          <span className="material-symbols-outlined text-primary text-3xl">analytics</span>
          <div>
            <p className="font-extrabold text-3xl" style={{ fontFamily: 'Manrope, sans-serif' }}>1,284</p>
            <p className="text-on-surface-variant uppercase tracking-widest text-xs mt-1">Scans Done</p>
          </div>
        </div>
        <div className="bg-surface-container-low p-8 rounded-3xl flex flex-col justify-between h-48">
          <span className="material-symbols-outlined text-tertiary text-3xl">coronavirus</span>
          <div>
            <p className="font-extrabold text-3xl" style={{ fontFamily: 'Manrope, sans-serif' }}>12</p>
            <p className="text-on-surface-variant uppercase tracking-widest text-xs mt-1">Diseases Detected</p>
          </div>
        </div>
        <div className="bg-surface-container-low p-8 rounded-3xl flex flex-col justify-between h-48">
          <span className="material-symbols-outlined text-secondary text-3xl">potted_plant</span>
          <div>
            <p className="font-extrabold text-3xl" style={{ fontFamily: 'Manrope, sans-serif' }}>42</p>
            <p className="text-on-surface-variant uppercase tracking-widest text-xs mt-1">Crops Monitored</p>
          </div>
        </div>
      </section>

      {/* Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Scans */}
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-on-surface" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Recent Field Scans
            </h3>
            <Link to="/history" className="text-primary font-bold text-sm hover:underline" style={{ fontFamily: 'Manrope, sans-serif' }}>
              View History
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {recentScans.map((scan) => (
              <div
                key={scan.id}
                className="bg-surface-container-lowest p-5 rounded-2xl flex items-center gap-6 shadow-sm border border-outline-variant/10 hover:bg-surface-container-low transition-colors duration-300"
              >
                <img
                  src={scan.image}
                  alt={scan.title}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-on-surface" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {scan.title}
                  </h4>
                  <p className="text-on-surface-variant text-sm">{scan.location}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`${statusStyles[scan.status]} px-3 py-1 rounded-full font-bold uppercase tracking-widest`} style={{ fontSize: '10px' }}>
                    {scan.statusLabel}
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">{scan.statusNote}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Environmental Advisory */}
        <section className="lg:col-span-1">
          <div className="bg-surface-container-high p-8 rounded-3xl h-full flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-on-surface leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Environmental Advisory
              </h3>
              <p className="text-on-surface-variant mt-3 leading-relaxed">
                High humidity expected for the next 48 hours. This may increase the spread of{' '}
                <strong className="text-primary">Wheat Rust</strong> in the North Quadrant.
              </p>
            </div>
            <div className="mt-auto relative z-10 bg-surface-container-lowest/50 backdrop-blur-md p-4 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <span className="material-symbols-outlined text-primary">wb_sunny</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Current Weather</p>
                  <p className="font-bold text-on-surface text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>24°C • Humid</p>
                </div>
              </div>
              <Link
                to="/scan"
                className="block w-full py-3 bg-primary text-on-primary rounded-xl font-bold text-sm text-center hover:opacity-90 transition-opacity"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Apply Preventative Measure
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
