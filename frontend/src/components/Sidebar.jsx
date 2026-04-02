const Sidebar = () => {
  return (
    <aside className="sidebar" aria-label="Primary">
      <div className="sidebar-brand">KrishiVision</div>
      <nav className="sidebar-nav">
        <a className="sidebar-link active" href="#analysis" aria-current="page">
          Analysis
        </a>
        <a className="sidebar-link" href="#results">
          Results
        </a>
      </nav>
    </aside>
  )
}

export default Sidebar
