import {
  AtSign,
  Heart,
  MessageCircle,
  Repeat2,
  UserPlus,
  Users,
  LogIn,
  Info,
  Ellipsis,
  Check,
  Trash2,
  EyeOff,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Notification, NotificationType } from "@/src/types/notification";
import Image from "next/image";

/* ── Icon / couleur par type ── */
const typeConfig: Record<
  NotificationType,
  { icon: React.ElementType; bg: string; color: string }
> = {
  like: {
    icon: Heart,
    bg: "bg-red-100 dark:bg-red-900/30",
    color: "text-red-500",
  },
  comment: {
    icon: MessageCircle,
    bg: "bg-blue-100 dark:bg-blue-900/30",
    color: "text-blue-500",
  },
  follow: {
    icon: UserPlus,
    bg: "bg-violet-100 dark:bg-violet-900/30",
    color: "text-violet-500",
  },
  mention: {
    icon: AtSign,
    bg: "bg-amber-100 dark:bg-amber-900/30",
    color: "text-amber-500",
  },
  group_invite: {
    icon: Users,
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    color: "text-emerald-500",
  },
  group_join: {
    icon: LogIn,
    bg: "bg-teal-100 dark:bg-teal-900/30",
    color: "text-teal-500",
  },
  share: {
    icon: Repeat2,
    bg: "bg-orange-100 dark:bg-orange-900/30",
    color: "text-orange-500",
  },
  system: {
    icon: Info,
    bg: "bg-gray-100 dark:bg-gray-800/50",
    color: "text-gray-500",
  },
};

type NotificationItemProps = {
  notification: Notification;
  onMarkRead?: (id: number) => void;
  onDelete?: (id: number) => void;
};

const NotificationItem = ({
  notification,
  onMarkRead,
  onDelete,
}: NotificationItemProps) => {
  const config = typeConfig[notification.type];
  const Icon = config.icon;

  return (
    <div
      className={`group relative flex flex-row items-start gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors hover:bg-accent/60 ${
        !notification.read ? "bg-accent/40" : ""
      }`}
    >
      {/* Indicateur non lu */}
      {!notification.read && (
        <span className="absolute left-1 top-1/2 -translate-y-1/2 size-2 rounded-full bg-primary" />
      )}

      {/* Avatar avec badge type */}
      <div className="relative shrink-0">
        <Avatar className="size-11">
          <AvatarImage
            src={notification.actor.avatar}
            alt={notification.actor.name}
          />
          <AvatarFallback className="text-xs font-semibold">
            {notification.actor.initials}
          </AvatarFallback>
        </Avatar>
        {/* Badge icône en bas à droite */}
        <span
          className={`absolute -bottom-0.5 -right-0.5 flex items-center justify-center size-5 rounded-full border-2 border-background ${config.bg}`}
        >
          <Icon className={`size-2.5 ${config.color}`} />
        </span>
      </div>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <p className="text-sm leading-snug">
          <span className="font-semibold">{notification.actor.name}</span>{" "}
          <span className="text-muted-foreground">{notification.message}</span>
        </p>

        {/* Groupe concerné */}
        {notification.groupName && (
          <p className="text-xs font-medium text-primary mt-0.5">
            {notification.groupName}
          </p>
        )}

        {/* Aperçu du contenu */}
        {notification.preview && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
            &ldquo;{notification.preview}&rdquo;
          </p>
        )}

        {/* Horodatage */}
        <p className="text-[11px] text-muted-foreground mt-1">
          {notification.timeAgo}
        </p>
      </div>

      {/* Thumbnail (si disponible) */}
      {notification.thumbnail && (
        <div className="shrink-0 size-12 rounded-md overflow-hidden relative">
          <Image
            src={notification.thumbnail}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Menu actions */}
      <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="cursor-pointer p-1 rounded-full hover:bg-accent">
              <Ellipsis className="size-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44" align="end">
            <DropdownMenuGroup>
              {!notification.read && (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => onMarkRead?.(notification.id)}
                >
                  <Check className="size-4 mr-2" />
                  Marquer comme lu
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onDelete?.(notification.id)}
              >
                <Trash2 className="size-4 mr-2" />
                Supprimer
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <EyeOff className="size-4 mr-2" />
                Masquer ce type
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NotificationItem;
