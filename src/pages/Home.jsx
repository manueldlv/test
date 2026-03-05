import { useEffect, useState } from 'react'
import logo from '../imagenes/logo.png'

const INTRO_DURATION = 3800

export default function Home() {
  const [isReady, setIsReady] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsReady(true)
    }, INTRO_DURATION)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <main className={`landing ${isReady ? 'landing--ready' : ''}`}>
      <section className="preloader">
        <img src={logo} alt="Devforce logo" className="preloader__logo" />
      </section>

      <section className="hero-card">
        <div className="hero-card__media" />
        <div className="hero-card__overlay" />

        <header className="hero-card__header">
          <button
            className={`hero-card__menu ${isMenuOpen ? 'is-open' : ''}`}
            aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <strong>{isMenuOpen ? 'Close' : 'Menu'}</strong>
          </button>
          <img src={logo} alt="Devforce logo" className="hero-card__brand" />
          <a href="#" className="hero-card__investors">
            Investors <span aria-hidden>↗</span>
          </a>
        </header>

        <aside className={`hero-card__submenu ${isMenuOpen ? 'is-open' : ''}`}>
          <div className="hero-card__submenu-top">
            <button
              className="hero-card__submenu-close"
              aria-label="Close navigation"
              onClick={() => setIsMenuOpen(false)}
            >
              <span />
              <span />
              <strong>Close</strong>
            </button>
            <img src={logo} alt="Devforce logo" className="hero-card__submenu-brand" />
            <a href="#" className="hero-card__submenu-investors">
              Investors <span aria-hidden>↗</span>
            </a>
          </div>

          <div className="hero-card__submenu-left">
            <nav className="hero-card__submenu-social">
              <a href="#">Fly Blade</a>
              <a href="#">YouTube</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">X</a>
            </nav>

            <nav className="hero-card__submenu-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Impact Reporting</a>
              <a href="#">Health Plan Transparency</a>
              <a href="#">Safety Policy</a>
            </nav>
          </div>

          <nav className="hero-card__submenu-main">
            <a href="#">Experience</a>
            <a href="#">Technology</a>
            <a href="#">Company</a>
            <a href="#">News</a>
            <a href="#">Careers</a>
          </nav>
        </aside>

        <div className="hero-card__headline">
          <h1>
            Skip traffic.
            <br />
            Time to fly.
          </h1>
        </div>
      </section>

      <section className="blue-strip">
        <p>The future of aviation is coming soon.</p>
      </section>
    </main>
  )
}
