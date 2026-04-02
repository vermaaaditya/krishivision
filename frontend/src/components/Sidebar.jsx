import { useEffect, useState } from 'react'

const Sidebar = () => {
  const [activeHash, setActiveHash] = useState(() => window.location.hash || '#analysis')

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash || '#analysis')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar-brand">KrishiVision</div>
      <nav className="sidebar-nav">
        <a className={`sidebar-link${activeHash === '#analysis' ? ' active' : ''}`} href="#analysis" aria-current={activeHash === '#analysis' ? 'location' : undefined}>
          Analysis
        </a>
        <a className={`sidebar-link${activeHash === '#results' ? ' active' : ''}`} href="#results" aria-current={activeHash === '#results' ? 'location' : undefined}>
          Results
        </a>
      </nav>
    </aside>
  )
}

export default Sidebar
