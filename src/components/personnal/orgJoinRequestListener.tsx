"use client";

import { useCallback } from "react";
import { useSocketEvent } from "@/src/hooks/useSocketEvent";
import { toast } from "sonner";

type JoinRequestEvent = {
  orgId: string;
  request: {
    id: string;
    status: string;
    user: {
      id: string;
      username: string;
      displayName: string | null;
      avatarUrl: string | null;
    };
  };
};

/**
 * Écoute les événements `org:join-request` et affiche un toast aux admins.
 * À placer dans tout composant client visible par un admin d'organisation.
 */
export default function OrgJoinRequestListener({ orgId }: { orgId: string }) {
  const handleJoinRequest = useCallback(
    (data: JoinRequestEvent) => {
      if (data.orgId !== orgId) return;

      const name = data.request.user.displayName ?? data.request.user.username;

      toast.info(`${name} souhaite rejoindre l'organisation`, {
        description: `@${data.request.user.username} a envoyé une demande d'adhésion.`,
        duration: 8000,
      });
    },
    [orgId],
  );

  useSocketEvent<JoinRequestEvent>("org:join-request", handleJoinRequest);

  return null;
}
