"use client";

import NotificationItem from "@/src/components/personnal/ui/notificationItem";
import { notificationsData } from "@/src/data/notifications";
import { Notification } from "@/src/types/notification";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import {
  Bell,
  BellDot,
  Check,
  RefreshCcw,
  Settings,
} from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/src/components/ui/empty";
import { useState, useMemo } from "react";

type Filter = "all" | "unread";

/** Regroupe les notifications par période */
function groupByPeriod(notifications: Notification[]) {
  const now = Date.now();
  const today: Notification[] = [];
  const thisWeek: Notification[] = [];
  const earlier: Notification[] = [];

  for (const n of notifications) {
    const diff = now - new Date(n.createdAt).getTime();
    const hours = diff / 3_600_000;
    if (hours < 24) today.push(n);
    else if (hours < 168) thisWeek.push(n);
    else earlier.push(n);
  }

  return { today, thisWeek, earlier };
}

const NotificationPage = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [notifications, setNotifications] =
    useState<Notification[]>(notificationsData);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const filtered = useMemo(
    () =>
      filter === "unread" ? notifications.filter((n) => !n.read) : notifications,
    [filter, notifications]
  );

  const { today, thisWeek, earlier } = useMemo(
    () => groupByPeriod(filtered),
    [filtered]
  );

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: number) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const deleteNotification = (id: number) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const SectionHeader = ({ label }: { label: string }) => (
    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 pt-4 pb-1">
      {label}
    </p>
  );

  return (
    <div className="xl:max-w-2xl w-full xl:w-2xl pb-20 flex flex-col gap-0 h-full overflow-scroll hide-scrollbar md:px-10 xl:px-0">
      {/* ─── Header ─── */}
      <div className="flex flex-row w-full items-center justify-between pt-8 pb-4 px-2">
        <div className="flex flex-row items-center gap-2">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="flex items-center justify-center text-xs font-bold text-primary-foreground bg-primary rounded-full size-6">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex flex-row items-center gap-1">
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer text-xs gap-1.5"
              onClick={markAllRead}
            >
              <Check className="size-4" />
              <span className="hidden sm:inline">Tout marquer comme lu</span>
            </Button>
          )}
        </div>
      </div>

      {/* ─── Filtres ─── */}
      <div className="flex flex-row gap-2 px-2 pb-3">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          className="cursor-pointer gap-1.5 rounded-full"
          onClick={() => setFilter("all")}
        >
          <Bell className="size-3.5" />
          Toutes
        </Button>
        <Button
          variant={filter === "unread" ? "default" : "outline"}
          size="sm"
          className="cursor-pointer gap-1.5 rounded-full"
          onClick={() => setFilter("unread")}
        >
          <BellDot className="size-3.5" />
          Non lues
          {unreadCount > 0 && (
            <span className="ml-0.5 text-[10px] font-bold bg-primary-foreground/20 rounded-full px-1.5">
              {unreadCount}
            </span>
          )}
        </Button>
      </div>

      {/* ─── Liste groupée ─── */}
      {filtered.length === 0 ? (
        <Empty className="bg-muted/30 h-full rounded-lg mx-2">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              {filter === "unread" ? <BellDot /> : <Bell />}
            </EmptyMedia>
            <EmptyTitle>
              {filter === "unread"
                ? "Aucune notification non lue"
                : "Aucune notification"}
            </EmptyTitle>
            <EmptyDescription className="max-w-xs text-pretty">
              {filter === "unread"
                ? "Vous êtes à jour ! Toutes les notifications ont été lues."
                : "Les nouvelles notifications apparaîtront ici."}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            {filter === "unread" ? (
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => setFilter("all")}
              >
                Voir toutes les notifications
              </Button>
            ) : (
              <Button variant="outline" className="cursor-pointer">
                <RefreshCcw className="size-4" />
                Actualiser
              </Button>
            )}
          </EmptyContent>
        </Empty>
      ) : (
        <Card className="border-0 shadow-none flex flex-col gap-0 py-0">
          {/* Aujourd'hui */}
          {today.length > 0 && (
            <>
              <SectionHeader label="Aujourd'hui" />
              {today.map((n) => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  onMarkRead={markRead}
                  onDelete={deleteNotification}
                />
              ))}
            </>
          )}

          {/* Cette semaine */}
          {thisWeek.length > 0 && (
            <>
              <SectionHeader label="Cette semaine" />
              {thisWeek.map((n) => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  onMarkRead={markRead}
                  onDelete={deleteNotification}
                />
              ))}
            </>
          )}

          {/* Plus ancien */}
          {earlier.length > 0 && (
            <>
              <SectionHeader label="Plus ancien" />
              {earlier.map((n) => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  onMarkRead={markRead}
                  onDelete={deleteNotification}
                />
              ))}
            </>
          )}
        </Card>
      )}
    </div>
  );
};

export default NotificationPage;
