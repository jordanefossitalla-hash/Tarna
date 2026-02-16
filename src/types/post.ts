export type Comment = {
  id: number;
  author: {
    name: string;
    username: string;
    avatar: string;
    initials: string;
  };
  content: string;
  timeAgo: string;
  likes: number;
  replies?: Comment[];
};

export type Post = {
  id: number;
  author: {
    name: string;
    username: string;
    avatar: string;
    initials: string;
    isVerified: boolean;
  };
  content: string;
  isPinned: boolean;
  image: string | null;
  reactions: {
    heart: number;
    lightbulb: number;
    handshake: number;
  };
  comments: number;
  shares: number;
  createdAt: string;
  timeAgo: string;
};