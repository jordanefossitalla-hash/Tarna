import { Comment } from "../types/post";

export const commentsData: Record<number, Comment[]> = {
  1: [
    {
      id: 101,
      author: {
        name: "Sophie Ndong",
        username: "@sophie.dev",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
        initials: "SN",
      },
      content: "Super architecture ! Vous avez pensé à utiliser Kafka pour l'event-driven ?",
      timeAgo: "5h",
      likes: 8,
      replies: [
        {
          id: 102,
          author: {
            name: "Jerry Mbende",
            username: "@mr.shadow",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            initials: "JM",
          },
          content: "Oui exactement, on utilise Kafka avec des consumers en Go pour les tâches critiques.",
          timeAgo: "4h",
          likes: 5,
          replies: [
            {
              id: 103,
              author: {
                name: "David Kamga",
                username: "@david.front",
                avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
                initials: "DK",
              },
              content: "Intéressant ! Ça gère combien de messages/sec en moyenne ?",
              timeAgo: "3h",
              likes: 2,
            },
          ],
        },
        {
          id: 104,
          author: {
            name: "Paul Essono",
            username: "@paul.ops",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
            initials: "PE",
          },
          content: "On devrait planifier une session technique pour partager les détails.",
          timeAgo: "3h",
          likes: 3,
        },
      ],
    },
    {
      id: 105,
      author: {
        name: "Amina Diallo",
        username: "@amina.design",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
        initials: "AD",
      },
      content: "Est-ce que ça va impacter le design system côté performance ?",
      timeAgo: "2h",
      likes: 4,
    },
  ],
  2: [
    {
      id: 201,
      author: {
        name: "Marc Tchangang",
        username: "@marc.tch",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
        initials: "MT",
      },
      content: "Bravo à toute l'équipe ! Hâte de tester les notifs en temps réel.",
      timeAgo: "7h",
      likes: 12,
      replies: [
        {
          id: 202,
          author: {
            name: "Sophie Ndong",
            username: "@sophie.dev",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
            initials: "SN",
          },
          content: "Merci Marc ! Le lien de staging sera partagé demain matin.",
          timeAgo: "6h",
          likes: 6,
          replies: [
            {
              id: 203,
              author: {
                name: "Fatou Sall",
                username: "@fatou.data",
                avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&q=80",
                initials: "FS",
              },
              content: "Est-ce qu'on aura les métriques de latence sur le dashboard ?",
              timeAgo: "5h",
              likes: 3,
            },
          ],
        },
      ],
    },
  ],
  3: [
    {
      id: 301,
      author: {
        name: "Claire Mbarga",
        username: "@claire.pm",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
        initials: "CM",
      },
      content: "Bien noté ! J'ai mis à jour mes tickets ce matin.",
      timeAgo: "9h",
      likes: 2,
    },
  ],
  4: [
    {
      id: 401,
      author: {
        name: "David Kamga",
        username: "@david.front",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
        initials: "DK",
      },
      content: "Les tokens de couleur sont parfaits ! Par contre le spacing semble un peu incohérent sur les cards.",
      timeAgo: "22h",
      likes: 15,
      replies: [
        {
          id: 402,
          author: {
            name: "Amina Diallo",
            username: "@amina.design",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
            initials: "AD",
          },
          content: "Bonne remarque, je corrige ça aujourd'hui. Le spacing passe de 4px à 8px base.",
          timeAgo: "20h",
          likes: 9,
          replies: [
            {
              id: 403,
              author: {
                name: "Nadia Bello",
                username: "@nadia.mobile",
                avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
                initials: "NB",
              },
              content: "Merci Amina ! Ça va faciliter l'intégration mobile aussi.",
              timeAgo: "18h",
              likes: 4,
            },
          ],
        },
      ],
    },
    {
      id: 404,
      author: {
        name: "Olivier Nkomo",
        username: "@olivier.arch",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80",
        initials: "ON",
      },
      content: "Le Figma est super clean. On peut avoir les exports en SVG aussi ?",
      timeAgo: "18h",
      likes: 7,
    },
  ],
  5: [
    {
      id: 501,
      author: {
        name: "Yves Atangana",
        username: "@yves.sec",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
        initials: "YA",
      },
      content: "Bon réflexe pour l'alerte automatique ! On devrait monitorer tous les certificats.",
      timeAgo: "1d",
      likes: 11,
      replies: [
        {
          id: 502,
          author: {
            name: "Paul Essono",
            username: "@paul.ops",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
            initials: "PE",
          },
          content: "Déjà fait ! J'ai ajouté un check global via Certbot + Slack webhook.",
          timeAgo: "1d",
          likes: 8,
        },
      ],
    },
  ],
};
