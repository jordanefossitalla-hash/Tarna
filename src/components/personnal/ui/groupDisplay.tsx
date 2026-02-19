import { Globe, GlobeLock, Lock, Users, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import Image from "next/image";
import { Badge } from "../../ui/badge";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Group, GroupVisibility } from "@/src/types/group";

const visibilityConfig: Record<
  GroupVisibility,
  { icon: React.ElementType; label: string; variant: "secondary" | "destructive" | "outline" }
> = {
  public: { icon: Globe, label: "Public", variant: "secondary" },
  private: { icon: GlobeLock, label: "Privé", variant: "destructive" },
  secret: { icon: Lock, label: "Secret", variant: "outline" },
};

type GroupDisplayProps = {
  group: Group;
  onJoin?: (id: number) => void;
  onCancel?: (id: number) => void;
};

const GroupDisplay = ({ group, onJoin, onCancel }: GroupDisplayProps) => {
  const vis = visibilityConfig[group.visibility];
  const VisIcon = vis.icon;

  return (
    <Card className="overflow-hidden rounded-xl border shadow-sm hover:shadow-md transition-shadow py-0 gap-0">
      {/* Banner */}
      <div className="relative h-28 overflow-hidden">
        <Image
          src={group.banner}
          alt={group.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        {/* Badge visibilité */}
        <div className="absolute top-2 right-2">
          <Badge
            variant={vis.variant}
            className={`text-[10px] gap-1 ${
              group.visibility === "private"
                ? "bg-red-100 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-400"
                : group.visibility === "secret"
                ? "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400"
                : "bg-green-100 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400"
            }`}
          >
            <VisIcon className="size-2.5" />
            {vis.label}
          </Badge>
        </div>
        {/* Category */}
        <div className="absolute bottom-2 left-2">
          <Badge
            variant="secondary"
            className="text-[10px] bg-white/90 text-gray-700 dark:bg-black/60 dark:text-gray-300"
          >
            {group.category}
          </Badge>
        </div>
        {/* Avatar overlay */}
        <div className="absolute -bottom-5 left-3">
          <Avatar className="size-10 border-2 border-background shadow-sm rounded-lg">
            <AvatarImage src={group.avatar} alt={group.name} />
            <AvatarFallback className="rounded-lg text-xs font-bold">
              {group.initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Content */}
      <CardHeader className="pt-7 pb-1 px-3 gap-0">
        <CardTitle className="text-base font-semibold leading-tight truncate">
          {group.name}
        </CardTitle>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
          {group.description}
        </p>
      </CardHeader>

      <CardContent className="px-3 pb-2 pt-1">
        <div className="flex flex-row items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="size-3" />
            {group.membersCount.toLocaleString()}
          </span>
          <span>·</span>
          <span>{group.postsCount} posts</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {group.lastActivity}
          </span>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-3 pb-3 pt-0">
        {group.isMember ? (
          <Button
            asChild
            className="w-full cursor-pointer"
            variant="outline"
            size="sm"
          >
            <Link href="/groups/detail">Voir le groupe</Link>
          </Button>
        ) : group.isPending ? (
          <Button
            variant="ghost"
            size="sm"
            className="w-full cursor-pointer text-amber-600 hover:text-amber-700"
            onClick={() => onCancel?.(group.id)}
          >
            <Clock className="size-3.5 mr-1.5" />
            En attente — Annuler
          </Button>
        ) : (
          <Button
            size="sm"
            className="w-full cursor-pointer"
            onClick={() => onJoin?.(group.id)}
          >
            Rejoindre
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default GroupDisplay;
