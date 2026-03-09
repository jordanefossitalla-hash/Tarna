import {
  Building2,
  Crown,
  Globe,
  ShieldCheck,
  Users,
  Clock,
  Briefcase,
  UserCheck,
  Eye,
} from "lucide-react";
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
import type { OrganizationResponse, OrgRole } from "@/src/types/organization";
import { getAvatarFallbackColor } from "@/src/lib/avatarColor";

const roleConfig: Record<
  OrgRole,
  { icon: React.ElementType; label: string; color: string }
> = {
  owner: {
    icon: Crown,
    label: "Owner",
    color:
      "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400",
  },
  admin: {
    icon: ShieldCheck,
    label: "Admin",
    color:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400",
  },
  manager: {
    icon: Briefcase,
    label: "Manager",
    color:
      "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400",
  },
  member: {
    icon: UserCheck,
    label: "Membre",
    color:
      "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400",
  },
  guest: {
    icon: Eye,
    label: "Invité",
    color:
      "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400",
  },
};

/** Génère les initiales à partir du nom (max 2 caractères). */
function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

type OrgCardProps = {
  org: OrganizationResponse;
  /** "mine" | "discover" | "pending" — détermine le footer affiché */
  variant: "mine" | "discover" | "pending";
  onJoin?: (id: string) => void;
  onCancel?: (id: string) => void;
};

const OrgCard = ({ org, variant, onJoin, onCancel }: OrgCardProps) => {
  const role =
    org.currentUserRole ? roleConfig[org.currentUserRole] : null;
  const RoleIcon = role?.icon;
  const initials = getInitials(org.name);

  return (
    <Card className="overflow-hidden rounded-xl border shadow-sm hover:shadow-md transition-shadow py-0 gap-0">
      {/* Banner + Avatar wrapper */}
      <div className="relative">
        {/* Banner */}
        <div className="relative h-24 overflow-hidden">
          {org.bannerUrl ? (
            <Image
              src={org.bannerUrl}
              alt={org.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-primary/30 to-primary/10" />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

          {/* Rôle badge */}
          {role && RoleIcon && (
            <div className="absolute top-2 right-2">
              <Badge
                variant="secondary"
                className={`text-[10px] gap-1 ${role.color}`}
              >
                <RoleIcon className="size-2.5" />
                {role.label}
              </Badge>
            </div>
          )}

          {/* Secteur */}
          <div className="absolute bottom-2 left-2">
            <Badge
              variant="secondary"
              className="text-[10px] bg-white/90 text-gray-700 dark:bg-black/60 dark:text-gray-300"
            >
              {org.sector}
            </Badge>
          </div>
        </div>

        {/* Logo overlay — outside the overflow-hidden banner */}
        <div className="absolute -bottom-6 right-3 z-10">
          <Avatar className="size-12 border-2 border-background shadow-md rounded-lg">
            {org.logoUrl && (
              <AvatarImage src={org.logoUrl} alt={org.name} />
            )}
            <AvatarFallback className={`rounded-lg text-sm font-bold  ${getAvatarFallbackColor(org.name)}`}>
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Content */}
      <CardHeader className="pt-6 pb-1 px-3 gap-0">
        <CardTitle className="text-base font-semibold leading-tight truncate flex items-center gap-1.5">
          <Building2 className="size-3.5 text-muted-foreground shrink-0" />
          {org.name}
        </CardTitle>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Globe className="size-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{org.domain}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{org.country}</span>
        </div>
        {org.bio && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
            {org.bio}
          </p>
        )}
      </CardHeader>

      <CardContent className="px-3 pb-2 pt-1">
        <div className="flex flex-row items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="size-3" />
            {org._count.memberships.toLocaleString()} membres
          </span>
          <span>·</span>
          <span>{org._count.posts} publications</span>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-3 pb-3 pt-0">
        {variant === "mine" ? (
          <Button
            asChild
            className="w-full cursor-pointer"
            variant="outline"
            size="sm"
          >
            <Link href={`/organizations/${org.id}`}>
              <Building2 className="size-3.5 mr-1.5" />
              Accéder
            </Link>
          </Button>
        ) : variant === "pending" ? (
          <Button
            variant="ghost"
            size="sm"
            className="w-full cursor-pointer text-amber-600 hover:text-amber-700"
            onClick={() => onCancel?.(org.id)}
          >
            <Clock className="size-3.5 mr-1.5" />
            En attente — Annuler
          </Button>
        ) : (
          <Button
            size="sm"
            className="w-full cursor-pointer"
            onClick={() => onJoin?.(org.id)}
          >
            Rejoindre
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default OrgCard;
