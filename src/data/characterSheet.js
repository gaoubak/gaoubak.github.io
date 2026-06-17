/** @type {import('../components/CharacterSheet').CharacterSheetData} */
export const characterSheetData = {
  name: 'Kader Bakayoko',
  title: 'THE BUILDER',
  role: 'Fullstack Engineer',
  subRole: 'PHP/Symfony · React/Vue',
  training: 'Java / Spring Boot',
  monthsProduction: 48, // PHP/Symfony/React/Vue professional months
  monthsGrowth: 6,      // Java/Spring Boot training months

  careerStats: {
    years: 4,
    projects: 8,
    status: 'Available Sept 2026',
  },

  // ─── Weapon slots: core production stack ──────────────────
  stack: [
    {
      id: 'kinetic',
      slot: 'kinetic',
      label: 'Symfony / PHP 8',
      sublabel: 'Backend Core',
      description: 'REST APIs, business logic, Stripe & HubSpot integrations. 2+ years production at Siko Mobility.',
      rarity: 'gold',
      power: 98,
    },
    {
      id: 'energy',
      slot: 'energy',
      label: 'React & Vue.js',
      sublabel: 'Frontend',
      description: 'Vue 3 Composition API, React 18 hooks, Pinia, SPA architecture, component design systems.',
      rarity: 'gold',
      power: 92,
    },
    {
      id: 'heavy',
      slot: 'heavy',
      label: 'API Platform · Docker · CI/CD',
      sublabel: 'Delivery & Infra',
      description: 'Containerized deployments, GitHub Actions pipelines, API Platform JSON-LD generation.',
      rarity: 'blue',
      power: 84,
    },
  ],

  // ─── Armor slots: working style / methodology ─────────────
  armor: [
    {
      id: 'helmet',
      slot: 'helmet',
      label: 'Architecture',
      sublabel: 'System Design',
      description: 'Domain modeling, decoupled services, API-first design with clear boundaries.',
      rarity: 'gold',
      power: 82,
    },
    {
      id: 'arms',
      slot: 'arms',
      label: 'Git & DevOps',
      sublabel: 'Workflow',
      description: 'Feature-branch strategy, CI pipelines, structured code review process.',
      rarity: 'gold',
      power: 85,
    },
    {
      id: 'chest',
      slot: 'chest',
      label: 'Testing',
      sublabel: 'Code Quality',
      description: 'PHPUnit, Cypress E2E, code review discipline, clean code practices.',
      rarity: 'blue',
      power: 76,
    },
    {
      id: 'legs',
      slot: 'legs',
      label: 'Agile Adaptability',
      sublabel: 'Methodology',
      description: 'Scrum, cross-functional collaboration, fast context switching between domains.',
      rarity: 'blue',
      power: 78,
    },
    {
      id: 'class',
      slot: 'class',
      label: 'Fullstack',
      sublabel: 'Class Badge',
      description: 'End-to-end ownership: from DB schema design to deployed, monitored UI.',
      rarity: 'purple',
      power: 90,
    },
  ],

  // ─── 6 stat bars ──────────────────────────────────────────
  stats: [
    { id: 'arch',     label: 'Architecture',    value: 82, description: 'Domain modeling, decoupled APIs, scalable patterns' },
    { id: 'delivery', label: 'Delivery Speed',  value: 88, description: 'Fast iterations, tight deadline delivery' },
    { id: 'quality',  label: 'Code Quality',    value: 80, description: 'Clean code, testing discipline, thorough reviews' },
    { id: 'debug',    label: 'Debugging',        value: 85, description: 'Root cause analysis, monitoring, prod incidents' },
    { id: 'recovery', label: 'Recovery',         value: 75, description: 'Quick rollback, hotfix deployment, post-mortem' },
    { id: 'learning', label: 'Learning Agility', value: 90, description: 'Fast ramp-up on new stacks, frameworks, domains' },
  ],

  // ─── Skill tree (artifact panel) ──────────────────────────
  skills: [
    { id: 'php',            label: 'PHP 8',          tier: 'mastered',    description: 'PHP 8.x — 4+ years production · typed properties, match, fibers' },
    { id: 'symfony',        label: 'Symfony 6/7',    tier: 'mastered',    description: 'Symfony 6/7 — 2+ years · DI, Messenger, Security, Console' },
    { id: 'react',          label: 'React 18',       tier: 'mastered',    description: 'React 18 — hooks, Context, React Query, performance optimization' },
    { id: 'vue',            label: 'Vue.js 3',       tier: 'mastered',    description: 'Vue 3 — Composition API, Pinia, Nuxt, custom component libraries' },
    { id: 'api-platform',   label: 'API Platform',   tier: 'mastered',    description: 'REST/JSON-LD API generation with Symfony — filters, JWT, serialization' },
    { id: 'docker',         label: 'Docker',          tier: 'mastered',    description: 'Containerized dev & prod · Docker Compose, multi-stage builds' },
    { id: 'github-actions', label: 'GitHub Actions', tier: 'mastered',    description: 'CI/CD pipelines · automated testing, staging & production deployments' },
    { id: 'react-native',   label: 'React Native',   tier: 'mastered',    description: 'React Native + Expo — cross-platform mobile, OTA updates' },
    { id: 'java',           label: 'Java 21',         tier: 'in_progress', description: 'Java 21 — actively training · OOP patterns, collections, streams' },
    { id: 'spring-boot',    label: 'Spring Boot 3',  tier: 'in_progress', description: 'Spring Boot 3 — REST microservices, Spring Security · training, not yet production' },
    { id: 'nextjs',         label: 'Next.js',         tier: 'locked',      description: 'Planned: SSR/SSG with React, App Router' },
    { id: 'kubernetes',     label: 'Kubernetes',      tier: 'locked',      description: 'Planned: container orchestration, Helm charts' },
  ],

  status: [
    'Open to opportunities',
    "Master's · Web & Mobile · HETIC",
    '2 days remote min.',
    'Available Sept 2026',
  ],

  teams: [
    { name: 'Siko Mobility', note: 'Alternance · Oct 2024 – Sept 2026' },
    { name: 'Freelance',     note: 'Lunis / UNIRH · 2024–2025' },
  ],

  motto: { text: 'Amor Fati', note: 'Stoic philosophy' },

  champions: [
    'Legacy code modernization',
    'Tight-deadline delivery',
    'Cross-team collaboration',
  ],
}
