"use client";
import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { Socket } from "socket.io-client";
import { getSocket, disconnectSocket } from "@/src/lib/socket";
import { useUserStore } from "@/src/store/userStore";

// ── External store for socket ────────────────────────────────────

let _socket: Socket | null = null;
const _listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  _listeners.add(listener);
  return () => { _listeners.delete(listener); };
}

function getSnapshot() {
  return _socket;
}

function getServerSnapshot() {
  return null;
}

function setSocket(socket: Socket | null) {
  _socket = socket;
  _listeners.forEach((l) => l());
}

// ── Context ──────────────────────────────────────────────────

const SocketContext = createContext<Socket | null>(null);

export function useSocket(): Socket | null {
  return useContext(SocketContext);
}

// ── Provider ─────────────────────────────────────────────────

export function SocketProvider({ children }: { children: ReactNode }) {
  const accessToken = useUserStore((state) => state.accessToken);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      disconnectSocket();
      setSocket(null);
      return;
    }

    const sock = getSocket(accessToken);
    setSocket(sock);

    return () => {
      disconnectSocket();
      setSocket(null);
    };
  }, [isAuthenticated, accessToken]);

  const socket = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}
