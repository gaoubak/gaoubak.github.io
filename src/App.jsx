import SiteNav from './components/SiteNav'
import ErrorBoundary from './components/ErrorBoundary'
import Hero from './components/sections/Hero'
import Experience from './components/sections/Experience'
import Skills from './components/sections/Skills'
import SolarSystemSection from './components/sections/SolarSystemSection'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <div className="app">
      <SiteNav />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <ErrorBoundary fallback={
          <p style={{ padding: '80px 24px', textAlign: 'center', fontFamily: 'var(--font-body)', color: 'var(--paper-dim)' }}>
            La scène 3D n'a pas pu s'afficher. Le reste du site fonctionne normalement.
          </p>
        }>
          <SolarSystemSection />
        </ErrorBoundary>
        <Contact />
      </main>
    </div>
  )
}
