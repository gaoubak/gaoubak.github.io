export const skillCategories = [
  {
    id: 1,
    name: 'BACKEND',
    icon: '⚙',
    rarity: 'legendary',
    rarityLabel: 'LÉGENDAIRE',
    items: ['Symfony (PHP)', 'Laravel', 'Flask', 'Spring Boot', 'API REST'],
  },
  {
    id: 2,
    name: 'FRONTEND',
    icon: '◈',
    rarity: 'rare',
    rarityLabel: 'RARE',
    items: ['Vue.js', 'React', 'TypeScript', 'HTML / CSS', 'jQuery'],
  },
  {
    id: 3,
    name: 'INTÉGRATIONS',
    icon: '⬡',
    rarity: 'exotic',
    rarityLabel: 'EXOTIQUE',
    items: ['Stripe', 'HubSpot CRM', 'Floa Bank', 'WebSocket', 'LLM / IA'],
  },
  {
    id: 4,
    name: 'BASE DE DONNÉES',
    icon: '▣',
    rarity: 'uncommon',
    rarityLabel: 'AVANCÉ',
    items: ['MySQL'],
  },
  {
    id: 5,
    name: 'DEVOPS',
    icon: '◎',
    rarity: 'rare',
    rarityLabel: 'RARE',
    items: ['Docker', 'CI/CD', 'Git', 'GitHub', 'GitLab'],
  },
  {
    id: 6,
    name: 'MÉTHODES',
    icon: '◆',
    rarity: 'uncommon',
    rarityLabel: 'AVANCÉ',
    items: ['Agile Scrum', 'MVC', 'MVVM', 'Architecture découplée'],
  },
]

export const stats = [
  { name: 'PHP / SYMFONY', value: 90, icon: '▲', delay: 0 },
  { name: 'VUE.JS / REACT', value: 75, icon: '◎', delay: 100 },
  { name: 'JAVA / SPRING', value: 60, icon: '◈', delay: 200 },
  { name: 'DOCKER / CI-CD', value: 70, icon: '⬡', delay: 300 },
  { name: 'MYSQL', value: 80, icon: '▣', delay: 400 },
  { name: 'TYPESCRIPT', value: 70, icon: '◆', delay: 500 },
]
