import { Post } from "../types/post";

export const PostsData: Post[] = [
  {
    // Texte seul (aucun média)
    id: 1,
    author: {
      name: "Jerry Mbende",
      username: "@mr.shadow",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
      initials: "JM",
      isVerified: true,
    },
    content:
      "Nous venons de finaliser l'architecture microservices pour le projet Tarna. Le passage à une approche event-driven va considérablement améliorer la scalabilité. Hâte de voir les benchmarks en production !",
    isPinned: true,
    media: [],
    reactions: { heart: 60, lightbulb: 12, handshake: 9 },
    comments: 5,
    shares: 3,
    createdAt: "2026-02-16T08:30:00Z",
    timeAgo: "6h",
  },
  {
    // Texte + 1 image
    id: 2,
    author: {
      name: "Sophie Ndong",
      username: "@sophie.dev",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      initials: "SN",
      isVerified: true,
    },
    content:
      "La nouvelle feature de notifications en temps réel est enfin en staging ! Merci à toute l'équipe back-end pour le travail sur les WebSockets. On teste ce week-end et on déploie lundi si tout est OK.",
    isPinned: false,
    media: [
      {
        id: 1,
        type: "image",
        url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
        alt: "Code sur écran montrant les WebSockets",
      },
    ],
    reactions: { heart: 128, lightbulb: 34, handshake: 22 },
    comments: 18,
    shares: 7,
    createdAt: "2026-02-16T06:15:00Z",
    timeAgo: "8h",
  },
  {
    // Texte seul
    id: 3,
    author: {
      name: "Marc Tchangang",
      username: "@marc.tch",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
      initials: "MT",
      isVerified: false,
    },
    content:
      "Petit reminder : la rétrospective sprint 14 est demain à 10h. Préparez vos feedbacks, on a beaucoup de points à couvrir. N'oubliez pas de mettre à jour vos tickets Jira avant la réunion.",
    isPinned: false,
    media: [],
    reactions: { heart: 15, lightbulb: 3, handshake: 8 },
    comments: 2,
    shares: 0,
    createdAt: "2026-02-16T04:00:00Z",
    timeAgo: "10h",
  },
  {
    // Texte + plusieurs images (galerie)
    id: 4,
    author: {
      name: "Amina Diallo",
      username: "@amina.design",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
      initials: "AD",
      isVerified: true,
    },
    content:
      "Je viens de publier le nouveau design system sur Figma. Tous les composants sont maintenant alignés avec notre charte graphique v3. Les tokens de couleur et typographie sont documentés. Voici quelques aperçus !",
    isPinned: false,
    media: [
      {
        id: 1,
        type: "image",
        url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
        alt: "Design system – palette de couleurs",
      },
      {
        id: 2,
        type: "image",
        url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
        alt: "Design system – composants UI",
      },
      {
        id: 3,
        type: "image",
        url: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
        alt: "Design system – typographie",
      },
    ],
    reactions: { heart: 245, lightbulb: 67, handshake: 41 },
    comments: 32,
    shares: 15,
    createdAt: "2026-02-15T18:30:00Z",
    timeAgo: "1d",
  },
  {
    // Texte + 1 document
    id: 5,
    author: {
      name: "Paul Essono",
      username: "@paul.ops",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
      initials: "PE",
      isVerified: false,
    },
    content:
      "Incident résolu ! Le downtime de 15 minutes ce matin était dû à un certificat SSL expiré sur le CDN. J'ai mis en place une alerte automatique 30 jours avant expiration. Voici le post-mortem complet.",
    isPinned: false,
    media: [
      {
        id: 1,
        type: "document",
        url: "/documents/postmortem-cdn-ssl-2026-02-15.pdf",
        alt: "Post-mortem incident CDN SSL",
        fileName: "postmortem-cdn-ssl-2026-02-15.pdf",
        fileSize: 245000,
        fileExtension: "pdf",
      },
    ],
    reactions: { heart: 89, lightbulb: 45, handshake: 56 },
    comments: 11,
    shares: 4,
    createdAt: "2026-02-15T14:00:00Z",
    timeAgo: "1d",
  },
  {
    // Texte + image + document
    id: 6,
    author: {
      name: "Claire Mbarga",
      username: "@claire.pm",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      initials: "CM",
      isVerified: true,
    },
    content:
      "Résultats du sondage interne : 87% des collaborateurs souhaitent maintenir le format hybride 3j bureau / 2j remote. On intègre ça dans la politique RH Q2. Merci à tous pour vos retours !",
    isPinned: false,
    media: [
      {
        id: 1,
        type: "image",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        alt: "Graphique résultats du sondage hybride",
      },
      {
        id: 2,
        type: "document",
        url: "/documents/sondage-hybride-q1-2026.xlsx",
        alt: "Résultats complets du sondage",
        fileName: "sondage-hybride-q1-2026.xlsx",
        fileSize: 128000,
        fileExtension: "xlsx",
      },
    ],
    reactions: { heart: 312, lightbulb: 28, handshake: 95 },
    comments: 47,
    shares: 22,
    createdAt: "2026-02-15T10:00:00Z",
    timeAgo: "1d",
  },
  {
    // Texte + 2 images (avant / après)
    id: 7,
    author: {
      name: "David Kamga",
      username: "@david.front",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
      initials: "DK",
      isVerified: false,
    },
    content:
      "J'ai migré notre app de React 18 à React 19 ce week-end. Les Server Components changent complètement notre approche du data fetching. Le bundle size a diminué de 23%. Voici les métriques avant/après.",
    isPinned: false,
    media: [
      {
        id: 1,
        type: "image",
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        alt: "Métriques avant migration React 19",
      },
      {
        id: 2,
        type: "image",
        url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
        alt: "Métriques après migration React 19",
      },
    ],
    reactions: { heart: 176, lightbulb: 89, handshake: 33 },
    comments: 24,
    shares: 18,
    createdAt: "2026-02-14T16:45:00Z",
    timeAgo: "2d",
  },
  {
    // Texte + document seul (rapport)
    id: 8,
    author: {
      name: "Fatou Sall",
      username: "@fatou.data",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&q=80",
      initials: "FS",
      isVerified: true,
    },
    content:
      "Le dashboard analytics est live ! Voici le rapport détaillé des KPIs : engagement, rétention, DAU/MAU. L'intégration avec notre data warehouse Snowflake fonctionne parfaitement.",
    isPinned: false,
    media: [
      {
        id: 1,
        type: "document",
        url: "/documents/rapport-kpi-analytics-q1.pdf",
        alt: "Rapport KPI Analytics Q1 2026",
        fileName: "rapport-kpi-analytics-q1.pdf",
        fileSize: 1520000,
        fileExtension: "pdf",
      },
    ],
    reactions: { heart: 98, lightbulb: 52, handshake: 27 },
    comments: 9,
    shares: 6,
    createdAt: "2026-02-14T12:00:00Z",
    timeAgo: "2d",
  },
  {
    // Texte + 1 image + 2 documents
    id: 9,
    author: {
      name: "Yves Atangana",
      username: "@yves.sec",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
      initials: "YA",
      isVerified: false,
    },
    content:
      "Rappel sécurité : activez le 2FA sur tous vos comptes professionnels avant vendredi. C'est obligatoire dans le cadre de notre certification ISO 27001. Tutoriel et checklist en pièce jointe.",
    isPinned: false,
    media: [
      {
        id: 1,
        type: "image",
        url: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
        alt: "Illustration sécurité 2FA",
      },
      {
        id: 2,
        type: "document",
        url: "/documents/tutoriel-2fa-setup.pdf",
        alt: "Tutoriel activation 2FA",
        fileName: "tutoriel-2fa-setup.pdf",
        fileSize: 890000,
        fileExtension: "pdf",
      },
      {
        id: 3,
        type: "document",
        url: "/documents/checklist-securite-iso27001.docx",
        alt: "Checklist sécurité ISO 27001",
        fileName: "checklist-securite-iso27001.docx",
        fileSize: 54000,
        fileExtension: "docx",
      },
    ],
    reactions: { heart: 42, lightbulb: 18, handshake: 31 },
    comments: 6,
    shares: 12,
    createdAt: "2026-02-14T09:30:00Z",
    timeAgo: "2d",
  },
  {
    // Texte + 4 images (galerie riche)
    id: 10,
    author: {
      name: "Nadia Bello",
      username: "@nadia.mobile",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
      initials: "NB",
      isVerified: true,
    },
    content:
      "La version mobile de Tarna passe en beta ouverte ! Voici un aperçu des principaux écrans. On cherche des testeurs internes pour les 2 prochaines semaines. Objectif : 50 beta testeurs minimum.",
    isPinned: false,
    media: [
      {
        id: 1,
        type: "image",
        url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
        alt: "Écran d'accueil de l'app mobile Tarna",
      },
      {
        id: 2,
        type: "image",
        url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
        alt: "Écran de profil utilisateur",
      },
      {
        id: 3,
        type: "image",
        url: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80",
        alt: "Écran de messagerie",
      },
      {
        id: 4,
        type: "image",
        url: "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=800&q=80",
        alt: "Écran de notifications",
      },
    ],
    reactions: { heart: 203, lightbulb: 15, handshake: 64 },
    comments: 38,
    shares: 25,
    createdAt: "2026-02-13T15:00:00Z",
    timeAgo: "3d",
  },
  {
    // Texte + 1 document (doc technique)
    id: 11,
    author: {
      name: "Olivier Nkomo",
      username: "@olivier.arch",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80",
      initials: "ON",
      isVerified: false,
    },
    content:
      "Après 3 mois de refacto, notre API REST est officiellement migrée en GraphQL. Les temps de réponse ont chuté de 40% grâce à l'élimination de l'over-fetching. Documentation complète ci-jointe.",
    isPinned: false,
    media: [
      {
        id: 1,
        type: "document",
        url: "/documents/migration-graphql-documentation.pdf",
        alt: "Documentation migration GraphQL",
        fileName: "migration-graphql-documentation.pdf",
        fileSize: 3200000,
        fileExtension: "pdf",
      },
    ],
    reactions: { heart: 156, lightbulb: 78, handshake: 45 },
    comments: 21,
    shares: 14,
    createdAt: "2026-02-13T11:00:00Z",
    timeAgo: "3d",
  },
  {
    // Texte seul
    id: 12,
    author: {
      name: "Léa Fotso",
      username: "@lea.hr",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
      initials: "LF",
      isVerified: true,
    },
    content:
      "Bienvenue aux 5 nouveaux membres qui rejoignent KIAMA cette semaine ! N'hésitez pas à vous présenter dans le canal #nouveaux-arrivants. Un buddy vous sera assigné pour faciliter votre onboarding.",
    isPinned: false,
    media: [],
    reactions: { heart: 267, lightbulb: 8, handshake: 112 },
    comments: 43,
    shares: 5,
    createdAt: "2026-02-13T08:00:00Z",
    timeAgo: "3d",
  },
];
