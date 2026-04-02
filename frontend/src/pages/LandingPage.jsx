import { Link } from 'react-router-dom'

const features = [
  {
    icon: 'center_focus_strong',
    title: 'AI-Powered Scanning',
    description: 'Instantly detect crop diseases with our advanced machine learning model trained on thousands of plant samples.',
  },
  {
    icon: 'analytics',
    title: 'Field Analytics',
    description: 'Track scan history, disease trends, and crop health metrics across all your fields in one place.',
  },
  {
    icon: 'notifications_active',
    title: 'Early Warnings',
    description: 'Get proactive environmental advisories and alerts before diseases spread across your crops.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5">
        <div>
          <span className="text-xl font-black text-primary uppercase tracking-wider">KrishiVision</span>
          <span className="ml-2 text-xs font-bold text-on-surface-variant uppercase tracking-widest hidden sm:inline">
            Field Intelligence
          </span>
        </div>
        <Link
          to="/dashboard"
          className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Open Dashboard
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="inline-flex items-center gap-2 bg-primary-fixed text-on-primary-fixed px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>eco</span>
          Smart Crop Health Platform
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface tracking-tight max-w-3xl leading-tight mb-6">
          Detect Crop Diseases{' '}
          <span className="text-primary">Instantly</span>
        </h1>

        <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed mb-12">
          KrishiVision uses AI to scan your crops, identify diseases early, and provide
          actionable insights — so you never lose a harvest to guesswork.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/dashboard"
            className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 shadow-lg hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
            Get Started
          </Link>
          <Link
            to="/scan"
            className="bg-surface-container-low text-on-surface px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined">photo_camera</span>
            Scan a Crop
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-surface-container-low p-8 rounded-3xl flex flex-col gap-4"
            >
              <div className="w-12 h-12 bg-primary-fixed rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-fixed-variant text-2xl">{f.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface">{f.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center pb-8 text-xs text-on-surface-variant font-medium">
        © {new Date().getFullYear()} KrishiVision · Field Intelligence
      </footer>
    </div>
  )
}
