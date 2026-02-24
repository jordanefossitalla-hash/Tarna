"use client";
import { useEffect } from "react";
import { useSocket } from "@/src/components/providers/socketProvider";

/**
 * Hook pour écouter un événement WebSocket.
 *
 * @example
 * useSocketEvent<Notification>("notification:new", (data) => {
 *   toast(`New notification from ${data.actor.username}`);
 * });
 */
export function useSocketEvent<T = unknown>(
  event: string,
  handler: (data: T) => void,
) {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on(event, handler);

    return () => {
      socket.off(event, handler);
    };
  }, [socket, event, handler]);
}
