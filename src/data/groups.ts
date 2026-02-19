import { Group } from "../types/group";

export const groupsData: Group[] = [
  // ─── Mes groupes (isMember: true) ───
  {
    id: 1,
    name: "React & Next.js Africa",
    description:
      "Communauté des développeurs React et Next.js en Afrique. Discussions, entraide et partage de projets.",
    banner:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    avatar:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=150&q=80",
    initials: "RN",
    visibility: "public",
    membersCount: 1243,
    postsCount: 456,
    isMember: true,
    isPending: false,
    category: "Développement",
    lastActivity: "il y a 10 min",
  },
  {
    id: 2,
    name: "DevOps Cameroun",
    description:
      "CI/CD, Docker, Kubernetes et cloud — pour les passionnés du DevOps au Cameroun.",
    banner:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
    avatar:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=150&q=80",
    initials: "DC",
    visibility: "private",
    membersCount: 342,
    postsCount: 128,
    isMember: true,
    isPending: false,
    category: "Infrastructure",
    lastActivity: "il y a 2h",
  },
  {
    id: 3,
    name: "UI/UX Design CMR",
    description:
      "Espace de partage pour les designers UI/UX. Critiques de maquettes, ressources et tendances.",
    banner:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
    avatar:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&q=80",
    initials: "UX",
    visibility: "public",
    membersCount: 876,
    postsCount: 234,
    isMember: true,
    isPending: false,
    category: "Design",
    lastActivity: "il y a 5h",
  },
  {
    id: 4,
    name: "Fullstack Devs CMR",
    description:
      "Groupe privé pour les développeurs fullstack au Cameroun. Projets collaboratifs et mentorat.",
    banner:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    avatar:
      "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=150&q=80",
    initials: "FD",
    visibility: "private",
    membersCount: 198,
    postsCount: 87,
    isMember: true,
    isPending: false,
    category: "Développement",
    lastActivity: "hier",
  },

  // ─── Découvrir (isMember: false, isPending: false) ───
  {
    id: 5,
    name: "Data Science Africa",
    description:
      "Machine learning, analyses de données et IA appliquée au contexte africain.",
    banner:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    avatar:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=150&q=80",
    initials: "DS",
    visibility: "public",
    membersCount: 2100,
    postsCount: 890,
    isMember: false,
    isPending: false,
    category: "Data & IA",
    lastActivity: "il y a 30 min",
  },
  {
    id: 6,
    name: "Mobile Dev Douala",
    description:
      "Flutter, React Native, Swift et Kotlin — la communauté mobile de Douala.",
    banner:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    avatar:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=150&q=80",
    initials: "MD",
    visibility: "public",
    membersCount: 534,
    postsCount: 176,
    isMember: false,
    isPending: false,
    category: "Mobile",
    lastActivity: "il y a 1h",
  },
  {
    id: 7,
    name: "Startup Hub Yaoundé",
    description:
      "Écosystème startup à Yaoundé. Networking, funding et partage d'expériences.",
    banner:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    avatar:
      "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=150&q=80",
    initials: "SH",
    visibility: "public",
    membersCount: 1560,
    postsCount: 412,
    isMember: false,
    isPending: false,
    category: "Entrepreneuriat",
    lastActivity: "il y a 3h",
  },
  {
    id: 8,
    name: "Cybersecurity Central Africa",
    description:
      "Sécurité informatique, pentesting, CTF et veille technologique.",
    banner:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    avatar:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=150&q=80",
    initials: "CS",
    visibility: "private",
    membersCount: 289,
    postsCount: 95,
    isMember: false,
    isPending: false,
    category: "Sécurité",
    lastActivity: "il y a 6h",
  },

  // ─── En attente (isPending: true) ───
  {
    id: 9,
    name: "Tech Leaders CMR",
    description:
      "Groupe exclusif pour les leaders tech au Cameroun. Discussions stratégiques et mentoring.",
    banner:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
    initials: "TL",
    visibility: "private",
    membersCount: 67,
    postsCount: 34,
    isMember: false,
    isPending: true,
    category: "Leadership",
    lastActivity: "il y a 1 jour",
  },
  {
    id: 10,
    name: "Blockchain Cameroun",
    description:
      "Web3, DeFi, smart contracts et l'avenir de la blockchain en Afrique centrale.",
    banner:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80",
    avatar:
      "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=150&q=80",
    initials: "BC",
    visibility: "secret",
    membersCount: 145,
    postsCount: 52,
    isMember: false,
    isPending: true,
    category: "Blockchain",
    lastActivity: "il y a 2 jours",
  },
];
