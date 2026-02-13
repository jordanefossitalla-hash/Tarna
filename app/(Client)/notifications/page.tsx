import NotificationItem from "@/src/components/personnal/ui/notificationItem";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/src/components/ui/empty";
import { Bell, BellDot, Check, Ellipsis, RefreshCcwIcon } from "lucide-react";

export function EmptyMuted() {
  return (
    <Empty className="bg-muted/30 h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Bell />
        </EmptyMedia>
        <EmptyTitle>No Notifications</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          You&apos;re all caught up. New notifications will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">
          <RefreshCcwIcon />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  );
}

const NotificationPage = () => {
  return (
    <div className="max-w-2xl w-2xl pb-20 flex flex-col gap-4 h-full overflow-scroll hide-scrollbar">
      <div className="flex flex-row w-full gap-2 justify-between pt-10">
        <div className="w-3/4">
          <p className="text-2xl font-bold">Notifications</p>
        </div>
        <div className="flex flex-col justify-end">
          <Button
            variant={"ghost"}
            className="flex flex-row items-center gap-2 cursor-pointer"
          >
            <Check />
            Mark all as read
          </Button>
        </div>
      </div>
      <Card className="p-2 bg-accent flex flex-row gap-2 max-w-2xl w-full rounded-md">
        <div className="w-full">
          <Button
            className="w-full cursor-pointer flex flex-row items-center gap-2"
            variant="outline"
          >
            <Bell />
            All
          </Button>
        </div>
        <div className="w-full">
          <Button
            className="w-full cursor-pointer flex flex-row items-cente gap-2r"
            variant="ghost"
          >
            <BellDot />
            Unread
          </Button>
        </div>
      </Card>
      <div className="flex flex-col gap-1">
        {Array.from({ length: 7 }).map((item, index) => {
          return <NotificationItem key={index} />;
        })}
      </div>
    </div>
  );
};

export default NotificationPage;
