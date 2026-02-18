import { Notification } from "../types/notification";

function hoursAgo(n: number): string {
  return new Date(Date.now() - n * 3600_000).toISOString();
}

function formatTimeAgo(hours: number): string {
  if (hours < 1) {
    const mins = Math.round(hours * 60);
    return `il y a ${mins} min`;
  }
  if (hours < 24) return `il y a ${Math.round(hours)}h`;
  const days = Math.round(hours / 24);
  if (days === 1) return "hier";
  if (days < 7) return `il y a ${days} jours`;
  const weeks = Math.round(days / 7);
  if (weeks === 1) return "il y a 1 semaine";
  return `il y a ${weeks} semaines`;
}

export const notificationsData: Notification[] = [
  // ─── Aujourd'hui ───
  {
    id: 1,
    type: "like",
    actor: {
      name: "Marie Dupont",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      initials: "MD",
    },
    message: "a aimé votre publication",
    preview: "Les nouvelles fonctionnalités de React 19 sont incroyables…",
    createdAt: hoursAgo(0.1),
    timeAgo: formatTimeAgo(0.1),
    read: false,
  },
  {
    id: 2,
    type: "comment",
    actor: {
      name: "Jerry Mbende",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
      initials: "JM",
    },
    message: "a commenté votre publication",
    preview: "Totalement d'accord ! Next.js 15 a vraiment simplifié le SSR.",
    createdAt: hoursAgo(0.5),
    timeAgo: formatTimeAgo(0.5),
    read: false,
  },
  {
    id: 3,
    type: "follow",
    actor: {
      name: "Sophie Ndong",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      initials: "SN",
    },
    message: "a commencé à vous suivre",
    createdAt: hoursAgo(1),
    timeAgo: formatTimeAgo(1),
    read: false,
  },
  {
    id: 4,
    type: "mention",
    actor: {
      name: "Alain Kamga",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
      initials: "AK",
    },
    message: "vous a mentionné dans un commentaire",
    preview: "@vous devriez regarder cette approche avec les Server Actions !",
    createdAt: hoursAgo(2),
    timeAgo: formatTimeAgo(2),
    read: false,
  },
  {
    id: 5,
    type: "like",
    actor: {
      name: "Claire Essomba",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
      initials: "CE",
    },
    message: "a aimé votre commentaire",
    preview: "Le pattern Repository est sous-estimé en frontend…",
    createdAt: hoursAgo(3),
    timeAgo: formatTimeAgo(3),
    read: true,
  },
  // ─── Cette semaine ───
  {
    id: 6,
    type: "group_invite",
    actor: {
      name: "Paul Nkoulou",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
      initials: "PN",
    },
    message: "vous a invité à rejoindre un groupe",
    groupName: "DevOps Cameroun",
    createdAt: hoursAgo(30),
    timeAgo: formatTimeAgo(30),
    read: false,
  },
  {
    id: 7,
    type: "share",
    actor: {
      name: "Fatou Diallo",
      avatar:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&q=80",
      initials: "FD",
    },
    message: "a partagé votre publication",
    preview: "Guide complet : Déployer une app Next.js sur AWS…",
    thumbnail:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=150&q=80",
    createdAt: hoursAgo(48),
    timeAgo: formatTimeAgo(48),
    read: true,
  },
  {
    id: 8,
    type: "comment",
    actor: {
      name: "Thierry Manga",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
      initials: "TM",
    },
    message: "a répondu à votre commentaire",
    preview: "Bonne remarque, je vais ajuster le middleware en conséquence.",
    createdAt: hoursAgo(72),
    timeAgo: formatTimeAgo(72),
    read: true,
  },
  {
    id: 9,
    type: "group_join",
    actor: {
      name: "Nadia Fouda",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
      initials: "NF",
    },
    message: "a rejoint votre groupe",
    groupName: "React & Next.js Africa",
    createdAt: hoursAgo(96),
    timeAgo: formatTimeAgo(96),
    read: true,
  },
  // ─── Plus ancien ───
  {
    id: 10,
    type: "system",
    actor: {
      name: "Tarna",
      avatar: "/logo.svg",
      initials: "T",
    },
    message:
      "Bienvenue sur Tarna ! Complétez votre profil pour mieux vous connecter.",
    createdAt: hoursAgo(200),
    timeAgo: formatTimeAgo(200),
    read: true,
  },
  {
    id: 11,
    type: "follow",
    actor: {
      name: "Yves Atangana",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
      initials: "YA",
    },
    message: "a commencé à vous suivre",
    createdAt: hoursAgo(250),
    timeAgo: formatTimeAgo(250),
    read: true,
  },
  {
    id: 12,
    type: "like",
    actor: {
      name: "Amina Bella",
      avatar:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&q=80",
      initials: "AB",
    },
    message: "et 4 autres personnes ont aimé votre publication",
    preview: "Tailwind CSS v4 est une révolution pour le design system…",
    thumbnail:
      "https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=150&q=80",
    createdAt: hoursAgo(340),
    timeAgo: formatTimeAgo(340),
    read: true,
  },
  {
    id: 13,
    type: "share",
    actor: {
      name: "Olivier Tagne",
      avatar:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80",
      initials: "OT",
    },
    message: "a partagé votre publication dans un groupe",
    groupName: "Fullstack Devs CMR",
    preview: "Comment structurer un monorepo avec Turborepo…",
    createdAt: hoursAgo(400),
    timeAgo: formatTimeAgo(400),
    read: true,
  },
  {
    id: 14,
    type: "system",
    actor: {
      name: "Tarna",
      avatar: "/logo.svg",
      initials: "T",
    },
    message:
      "Nouvelle fonctionnalité : vous pouvez désormais créer des groupes privés.",
    createdAt: hoursAgo(500),
    timeAgo: formatTimeAgo(500),
    read: true,
  },
];
