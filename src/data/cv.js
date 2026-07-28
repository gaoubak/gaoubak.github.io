export const cv = {
  name: 'Kader Bakayoko',
  role: 'Développeur Full-Stack',
  tagline: "PHP/Symfony · React/Vue.js — 4 ans d'expérience en alternance et freelance, en recherche d'un poste en CDI à partir de septembre 2026.",

  availability: { label: 'Disponible dès Septembre 2026', percent: 90 },

  contact: {
    email: 'kader.bakayoko@yahoo.com',
    linkedin: 'https://www.linkedin.com/in/kader-bakayoko-341b53190/',
    location: 'Noisiel, Île-de-France',
    cvUrl: '/Kader_Bakayoko_CV.pdf',
  },

  differentiators: [
    'From-scratch mindset',
    'Intégrations bancaires complexes',
    'Architecture découplée, agnostique du CMS',
  ],

  education: [
    { degree: 'Master Ingénierie Web et Mobile', school: 'Hetic · Montreuil', period: '2024 – 2026' },
    { degree: 'Bachelor Développeur Web',        school: 'Hetic · Montreuil', period: '2021 – 2024' },
  ],

  languages: [
    { name: 'Français', level: 'Natif' },
    { name: 'Anglais',  level: 'Professionnel' },
  ],

  hobbies: ['Boxe', 'Manga', 'Jeux vidéo', 'Écriture'],

  // ─── Expérience & projets ──────────────────────────────────────
  experience: [
    {
      id: 'siko', kind: 'job',
      company: 'Siko Mobility', role: 'Développeur Full-Stack (Alternance)',
      period: 'Oct 2024 – Présent',
      summary: "Plateforme B2B2C de vente à crédit (mobilité électrique, nautisme, habitat) agrégeant plusieurs banques partenaires.",
      highlights: [
        'Refonte from scratch : API REST Symfony 7 / PHP 8.4',
        'Intégration Floa Bank (dossiers crédit CREDIT/LOA/LLD, logique waterfall)',
        'Synchronisation asynchrone HubSpot CRM via Symfony Messenger',
        'Paiements et abonnements Stripe',
      ],
    },
    {
      id: 'freelance', kind: 'job',
      company: 'Développeur Freelance', role: 'Missions indépendantes',
      period: '2024 – 2025',
      summary: 'Solutions web sur mesure pour des clients variés, en autonomie complète.',
      highlights: [
        'Concierge IA pour locations Airbnb (PHP + intégration LLM)',
        'Phase initiale de Siko Mobility : architecture from scratch',
        'Solutions sur mesure (PHP, API REST) pour des clients variés',
      ],
    },
    {
      id: 'spin', kind: 'job',
      company: 'Spin Interactive', role: 'Développeur Backend (Alternance)',
      period: 'Août 2022 – Sept 2024',
      summary: 'Agence web parisienne : WordPress sur mesure et APIs REST indépendantes du CMS.',
      highlights: [
        'Plugin API REST — WordPress comme backend headless',
        'Frontend Vue.js découplé (composants, état, appels API)',
        'CI/CD et environnements Docker',
      ],
    },
    {
      id: 'dpp', kind: 'project',
      company: 'Plateforme DPP', role: 'Projet personnel',
      period: 'Jan 2026 – Présent',
      summary: 'Digital Product Passports conforme à la réglementation européenne ESPR.',
      highlights: [
        'Traçabilité et dématérialisation des données produit',
        'Architecture orientée services en Java / Spring Boot',
      ],
    },
    {
      id: 'messaging', kind: 'project',
      company: 'Client de messagerie desktop', role: 'Projet personnel',
      period: 'Avr – Juin 2025',
      summary: 'Client de messagerie desktop multiplateforme.',
      highlights: [
        'Architecture MVVM, interface Avalonia',
        'Temps réel via WebSocket, backend Spring Boot',
      ],
    },
  ],

  // ─── Compétences ────────────────────────────────────────────────
  skillCategories: [
    { id: 'backend',      label: 'Backend',           tools: ['Symfony', 'PHP 8', 'Laravel', 'Flask', 'Spring Boot', 'API REST'] },
    { id: 'frontend',     label: 'Frontend',          tools: ['Vue.js 3', 'React 18', 'WordPress', 'jQuery', 'HTML/CSS/JS', 'TypeScript'] },
    { id: 'integrations', label: 'Intégrations',      tools: ['Stripe', 'HubSpot CRM', 'Floa Bank', 'Oney', 'Younited', 'WebSocket', 'IA / LLM'] },
    { id: 'database',     label: 'Base de données',   tools: ['MySQL'] },
    { id: 'devops',       label: 'DevOps & Méthodes', tools: ['Docker', 'CI/CD', 'Git / GitHub / GitLab', 'Agile Scrum', 'MVC / MVVM'] },
  ],

  softSkills: [
    { id: 'autonomy',   label: 'Autonomie / Adaptabilité', value: 88, description: 'From-scratch mindset, prise de décision en autonomie' },
    { id: 'resilience', label: 'Résilience projet',        value: 78, description: 'Livraison maintenue sous contrainte de délai' },
    { id: 'debug',      label: 'Debug & résolution',       value: 85, description: 'Analyse de cause racine, incidents production' },
    { id: 'rigor',      label: 'Rigueur / Refactoring',    value: 80, description: 'Optimisation, code propre, revues de code' },
    { id: 'curiosity',  label: 'Curiosité technique',      value: 76, description: 'Veille active, Java, nouvelles stacks' },
    { id: 'collab',     label: 'Collaboration Agile',      value: 82, description: 'Scrum, relation avec les équipes métier' },
  ],

  // ─── Compétences techniques détaillées (par niveau) ──────────────
  techSkills: [
    { id: 'php',            label: 'PHP 8',          tier: 'mastered',    description: 'PHP 8.x — 4+ ans en production · typed properties, match, fibers' },
    { id: 'symfony',        label: 'Symfony 6/7',    tier: 'mastered',    description: 'Symfony 6/7 — 2+ ans · DI, Messenger, Security, Console' },
    { id: 'react',          label: 'React 18',       tier: 'mastered',    description: 'React 18 — hooks, Context, React Query' },
    { id: 'vue',            label: 'Vue.js 3',       tier: 'mastered',    description: 'Vue 3 — Composition API, Pinia, composants découplés' },
    { id: 'api-platform',   label: 'API Platform',   tier: 'mastered',    description: 'REST/JSON-LD avec Symfony — filtres, JWT, serialization' },
    { id: 'docker',         label: 'Docker',         tier: 'mastered',    description: 'Dev & prod conteneurisés · Compose, multi-stage builds' },
    { id: 'github-actions', label: 'GitHub Actions', tier: 'mastered',    description: 'Pipelines CI/CD · tests automatisés, déploiement staging/prod' },
    { id: 'react-native',   label: 'React Native',   tier: 'mastered',    description: 'React Native + Expo — mobile cross-platform' },
    { id: 'java',           label: 'Java 21',        tier: 'in_progress', description: 'Java 21 — en formation active · POO, collections, streams' },
    { id: 'spring-boot',    label: 'Spring Boot 3',  tier: 'in_progress', description: 'Spring Boot 3 — microservices REST, Spring Security' },
    { id: 'nextjs',         label: 'Next.js',        tier: 'planned',     description: 'Prévu : SSR/SSG avec React, App Router' },
    { id: 'kubernetes',     label: 'Kubernetes',     tier: 'planned',     description: 'Prévu : orchestration de conteneurs, Helm' },
  ],
}
