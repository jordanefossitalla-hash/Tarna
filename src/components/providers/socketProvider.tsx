"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { Socket } from "socket.io-client";
import { getSocket, disconnectSocket } from "@/src/lib/socket";
import { useUserStore } from "@/src/store/userStore";

// ── Context ──────────────────────────────────────────────────

const SocketContext = createContext<Socket | null>(null);

export function useSocket(): Socket | null {
  return useContext(SocketContext);
}

// ── Provider ─────────────────────────────────────────────────

export function SocketProvider({ children }: { children: ReactNode }) {
  const accessToken = useUserStore((state) => state.accessToken);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      disconnectSocket();
      socketRef.current = null;
      return;
    }

    const sock = getSocket(accessToken);
    socketRef.current = sock;

    return () => {
      // Cleanup on unmount or token change
      disconnectSocket();
      socketRef.current = null;
    };
  }, [isAuthenticated, accessToken]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
}
