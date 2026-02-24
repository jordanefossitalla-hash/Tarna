import { io, Socket } from "socket.io-client";

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL ??
  `${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost"}:${process.env.NEXT_PUBLIC_API_PORT ?? "4000"}`;

let socket: Socket | null = null;

/**
 * Initialise (ou réutilise) la connexion WebSocket avec le JWT.
 */
export function getSocket(token: string): Socket {
  if (socket?.connected) return socket;

  socket = io(WS_URL, {
    auth: { token },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000,
  });

  socket.on("connect", () => {
    console.log("[WS] connected:", socket?.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("[WS] disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    console.warn("[WS] connection error:", err.message);
  });

  return socket;
}

/**
 * Déconnecte proprement le socket (logout, navigation…).
 */
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

/**
 * Retourne le socket courant sans le (re)créer.
 */
export function getCurrentSocket(): Socket | null {
  return socket;
}
