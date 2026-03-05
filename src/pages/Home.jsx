import { useState } from 'react'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' }
]

const services = [
  {
    title: 'Design',
    text: 'Custom designs tailored to your brand. Clean, modern and built with user experience in mind.'
  },
  {
    title: 'Development',
    text: 'Built in Webflow for speed and simplicity. Fast load times and fully responsive on every screen.'
  },
  {
    title: 'Support & Edit',
    text: 'Already on Webflow? Get fast support for edits, improvements and cleanups without rebuilding everything.'
  }
]

const projects = [
  {
    year: '2025',
    name: 'Bankruptcy in Europe',
    role: 'Web Design + Web Development',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80'
  },
  {
    year: '2024',
    name: 'Redsand',
    role: 'Web Design + Web Development',
    image:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80'
  },
  {
    year: '2024',
    name: 'River',
    role: 'Web Development',
    image:
      'https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?auto=format&fit=crop&w=1400&q=80'
  },
  {
    year: '2024',
    name: 'Bierens Law',
    role: 'Web Design + Web Development',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80'
  }
]

const timelineSteps = [
  {
    step: 'Step 1',
    title: 'Quick chat',
    text: 'You tell me what you need. I ask focused questions and define the brief.'
  },
  {
    step: 'Step 2',
    title: 'Design',
    text: 'I turn your ideas into a clean visual direction that fits your brand and goals.'
  },
  {
    step: 'Step 3',
    title: 'Build & launch',
    text: 'Once approved, I build in Webflow and launch with performance and SEO in mind.'
  }
]

const faqs = [
  {
    q: 'What services do you offer?',
    a: 'Custom website design, Webflow development, responsive layouts, CMS setup, SEO optimization, interactions and maintenance.'
  },
  {
    q: 'How much does a website cost?',
    a: 'Pricing depends on project scope. Landing pages usually start lower, while CMS and e-commerce projects require larger budgets.'
  },
  {
    q: 'Do you offer ongoing maintenance?',
    a: 'Yes. You can request one-off updates or choose a monthly support plan for improvements and routine updates.'
  }
]

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <article className={`faq-item ${open ? 'open' : ''}`}>
      <button type="button" className="faq-trigger" onClick={() => setOpen((prev) => !prev)}>
        <span>{question}</span>
        <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open ? <p className="faq-answer">{answer}</p> : null}
    </article>
  )
}

export default function Home() {
  return (
    <>
      <header className="hero" id="top">
        <div className="hero-overlay" aria-hidden="true" />
        <img
          className="hero-bg"
          src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=2200&q=80"
          alt=""
          aria-hidden="true"
        />

        <nav className="top-nav">
          <a className="brand" href="#top">
            tan tran
          </a>
          <ul>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a className="contact-link" href="mailto:hello@tantran.nl">
            hello@tantran.nl
          </a>
        </nav>

        <div className="hero-content">
          <p className="availability">June - July 2025 • Available for new projects</p>
          <h1>Beautiful and Functional Websites Built with Webflow</h1>
          <p className="hero-copy">
            I&apos;m a Webflow expert from The Netherlands who works closely with clients to bring
            their ideas to life.
          </p>
          <div className="hero-actions">
            <a className="btn btn-solid" href="mailto:hello@tantran.nl">
              Get in touch
            </a>
            <a className="btn btn-ghost" href="#work">
              View work
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="services section" id="services">
          <div className="section-heading">
            <p className="eyebrow">What I do</p>
            <h2>Fast and affordable way to launch your website.</h2>
          </div>
          <div className="service-grid">
            {services.map((item) => (
              <article key={item.title} className="service-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="work section" id="work">
          <div className="section-heading compact">
            <p className="eyebrow">Selected projects</p>
            <h2>Work Gallery</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.name} className="project-card">
                <img src={project.image} alt={project.name} loading="lazy" />
                <div className="project-meta">
                  <span>{project.year}</span>
                  <h3>{project.name}</h3>
                  <p>{project.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="process section" id="process">
          <div className="section-heading compact">
            <p className="eyebrow">Project timeline</p>
            <h2>Simple process, clear delivery.</h2>
          </div>
          <div className="timeline-grid">
            {timelineSteps.map((item) => (
              <article key={item.step} className="timeline-card">
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about section" id="about">
          <div>
            <p className="eyebrow">About me</p>
            <h2>Hi, I&apos;m Tan. Webflow Expert & Designer.</h2>
          </div>
          <p>
            I have been working as a designer for 5+ years and 3+ years as a Webflow developer in
            The Netherlands. My background in both design and development allows me to deliver
            solutions that are visually strong and technically robust.
          </p>
        </section>

        <section className="faq section" id="faq">
          <div className="section-heading compact">
            <p className="eyebrow">FAQ</p>
            <h2>Questions?</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <FaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© Tan Tran</p>
        <a href="mailto:hello@tantran.nl">hello@tantran.nl</a>
      </footer>
    </>
  )
}
