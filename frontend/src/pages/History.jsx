import { useState } from 'react'
import { Link } from 'react-router-dom'

const mockScans = [
  {
    id: 1,
    crop: 'Tomato Solanum',
    title: 'Early Blight Detection',
    status: 'critical',
    date: 'Oct 24, 14:30',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQhzFgPzhDVRroy5SZdjhc5mVgXUrkZX-d_cSNWzeLj0nSKE-rTepfY9e7jcLxqdaiuKgTO-yK0rLj6qB2UIY3ogL5e_bEaq1o4_vffIJ8iqIaVGQO671FSyWKA963upbpcuKeL1nXyPKwETPYetvHfItDqd4keAwj0K-6wecSD3InQlsvQh4v259rQi25U9jNRwpwkeIRhLSyAeRyQ-sP9SIsSX9hbnt93HujJyc6VQkLF6yJR42Uyt7IdAIB2vywBvcqNcWNOW4',
  },
  {
    id: 2,
    crop: 'Maize Zea Mays',
    title: 'Optimal Nutrient Level',
    status: 'healthy',
    date: 'Oct 22, 09:15',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2FL5i1T0zNaw_iRaJOElQwOPps6GIkPoHi6m7CPLIj3f_ggZkUjkXgzzuhICG2TPEj1uZLbvxt83sUB1RTfWIWyf9vWtegzTDPPnyfLkGbXKPlbeSUZnuTjhV2hRPqIT7SDHIR52oAUIE9fDqzKHKq1eSUi_6fVu8SN803wmCLhVmAOdR1S2CZsc-uzbUvvtjVBC2rj1mwPnjq8ROxJ2nEXm4u3F80DviUdZV3Fy6VgpOeiGRKxsq3w9EZQd7GSZ8GQyqsQ61s-4',
  },
  {
    id: 3,
    crop: 'Grapes Vitis',
    title: 'Powdery Mildew',
    status: 'warning',
    date: 'Oct 20, 16:45',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnlO8A7bAsX6UE266qc6m6ApsyWYgA4_1FKGgrh3deQKomnYgtRZ68RNPt9LCpUI2yMJE-8e-SZcl31-EX0fJKCy0m5LQvsODbeGOVtfSCdmlcny4iBwqr1_2JZahoTfU5hyh-3FwVdmHLz8icsVVylCS8yzM51q0eDoF-tIEqpsYtXzG4_icH1qeI6WTCPCQ-pLoN-_KFpa9beJuCBcLR8xxFZklLtQ4oT3HQRBcg-dXVbZDAb74y-uxfu4FRzseV1dKKLDBnpFs',
  },
  {
    id: 4,
    crop: 'Wheat Triticum',
    title: 'Pre-harvest Check',
    status: 'healthy',
    date: 'Oct 18, 11:00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUq12a8iQq_LbabavUyPb0elVYSeT-aqh52M0YcLB0EIJBIaZJ2GAlfaDs0IpNwqECC5vn_9IKGsk4y8Pp04LkBREd1sI57zia4UtYNyLRn3JsfYaIPDhz75Y1cPP1Yuo-pRUkd19EBeVCu0kO7JNZ4IDcsbqfdB86p324l36KlmigQTyyTCc1f5aEsi1xEXWaexR4eXE8hRE0t0BDag9KB-U8etkQS0SzlXIvJTnYhtqkInZUoA3g82sT5t531Nt8Q5GF_ezhOWs',
  },
  {
    id: 5,
    crop: 'Potato Solanum',
    title: 'Late Blight Outbreak',
    status: 'critical',
    date: 'Oct 15, 08:30',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMH4gYiYhsWZP5tpwolQtVYuKifIngiMy-Iu7g6PeLZvUjg8ldVpsNP0TL3pz3gewXFfM7AKgipTLWNWO3MQuWRbamjr87dvek25qn8UDnTYiWJqIqVkmhvZ2m1zAbsk0c4td-3-l0gD9hOBEzkZpiqNuO2EjMvBZfhKYKbQiv55tGSEa6SXHr6g_q6BDxEYnwOupeuxDied1XuQ3kUaDR3hG_5YLMxNTTk14Ys6RWN5RmiQEuYZwniOgqHSm5iNdzOgUV5h2Ecb4',
  },
]

const statusConfig = {
  critical: {
    badge: 'bg-error-container text-on-error-container',
    icon: 'warning',
    label: 'CRITICAL',
  },
  healthy: {
    badge: 'bg-primary-fixed text-on-primary-fixed-variant',
    icon: 'check_circle',
    label: 'HEALTHY',
  },
  warning: {
    badge: 'bg-secondary-container text-on-secondary-container',
    icon: 'error',
    label: 'WARNING',
  },
}

export default function History() {
  const [search, setSearch] = useState('')

  const filtered = mockScans.filter(
    (scan) =>
      scan.title.toLowerCase().includes(search.toLowerCase()) ||
      scan.crop.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl px-6 py-8 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary leading-none" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Scan History
              </h1>
              <p className="mt-2 text-on-surface-variant">Review and manage your historical crop diagnostics.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-on-surface-variant">
              <span className="text-sm font-medium">{mockScans.length} Total Scans</span>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center bg-surface-container-low p-2 rounded-2xl">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline" style={{ fontSize: '20px' }}>search</span>
              <input
                type="text"
                placeholder="Search by crop or disease..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-surface-container-lowest rounded-xl pl-12 pr-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-outline-variant border-none"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-surface-container-lowest px-5 py-3 rounded-xl text-on-surface-variant font-medium hover:bg-white transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>filter_list</span>
                <span>Crop Type</span>
              </button>
              <button className="flex items-center gap-2 bg-surface-container-lowest px-5 py-3 rounded-xl text-on-surface-variant font-medium hover:bg-white transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>calendar_today</span>
                <span>Recent</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cards Grid */}
      <section className="px-6 md:px-12 mt-4 max-w-6xl mx-auto pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((scan) => {
            const cfg = statusConfig[scan.status]
            return (
              <div
                key={scan.id}
                className="group bg-surface-container-lowest rounded-3xl overflow-hidden hover:shadow-[0_12px_40px_rgba(25,28,28,0.06)] transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={scan.image}
                    alt={scan.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`${cfg.badge} px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1`}>
                      <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>
                        {cfg.icon}
                      </span>
                      {cfg.label}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs font-bold text-outline uppercase tracking-widest mb-1">{scan.crop}</p>
                  <h3 className="text-xl font-bold text-on-surface mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>{scan.title}</h3>
                  <div className="mt-auto flex items-center justify-between border-t border-outline-variant/10 pt-4">
                    <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>schedule</span>
                      <span>{scan.date}</span>
                    </div>
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            )
          })}

          {/* New Scan Card */}
          <Link
            to="/scan"
            className="group border-2 border-dashed border-outline-variant/30 rounded-3xl p-6 flex flex-col items-center justify-center text-center bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary text-3xl">add_a_photo</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Scan New Sample
            </h3>
            <p className="text-sm text-on-surface-variant mt-1">Add a new diagnostic to your history</p>
          </Link>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-4 block text-outline-variant">search_off</span>
            <p className="text-lg font-medium">No scans found for &quot;{search}&quot;</p>
          </div>
        )}

        {/* Load More */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            className="bg-surface-container-high text-on-surface-variant font-bold py-4 px-10 rounded-2xl hover:bg-surface-container-highest transition-colors flex items-center gap-2"
          >
            <span>Load Previous Scans</span>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>keyboard_arrow_down</span>
          </button>
        </div>
      </section>
    </div>
  )
}
