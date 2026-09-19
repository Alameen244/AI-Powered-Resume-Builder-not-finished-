import { ContactSection } from '../../components/sections/ContactSection.jsx'
import { HeroSection } from '../../components/sections/HeroSection.jsx'
import { AiSupportSection } from '../../components/sections/AiSupportSection.jsx'
import { NetworkStory } from '../../components/sections/NetworkStory.jsx'
import { ProjectShowcase } from '../../components/sections/ProjectShowcase.jsx'
import { ResumeExplorer } from '../../components/sections/ResumeExplorer.jsx'
import { TechnologySection } from '../../components/sections/TechnologySection.jsx'
import { useLenisGsap } from '../../hooks/useLenisGsap.js'
import { useInitialHeroAnimation } from '../../hooks/useInitialHeroAnimation.js'
import { useMagneticElements } from '../../hooks/useMagneticElements.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import { useScrollAnimations } from '../../hooks/useScrollAnimations.js'
import { useThemeMode } from '../../hooks/useThemeMode.js'
import { MainLayout } from '../../layout/MainLayout.jsx'

export default function Home({ ready }) {
  const reducedMotion = useReducedMotion()
  const { mode, toggleMode } = useThemeMode()
  useLenisGsap(reducedMotion)
  useInitialHeroAnimation(reducedMotion, ready)
  useMagneticElements(reducedMotion, ready)
  useScrollAnimations(reducedMotion, ready)

  return (
    <MainLayout mode={mode} onToggleMode={toggleMode} reducedMotion={reducedMotion}>
      <HeroSection />
      <NetworkStory />
      <ResumeExplorer />
      <ProjectShowcase />
      <AiSupportSection />
      <TechnologySection />
      <ContactSection />
    </MainLayout>
  )
}
