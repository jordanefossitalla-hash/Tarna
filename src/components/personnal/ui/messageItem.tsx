import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card } from "../../ui/card";

export type Conversation = {
  id: number;
  name: string;
  avatar: string;
  initials: string;
  lastMessage: string;
  time: string;
  unread: number;
  online?: boolean;
};

type MessageItemProps = {
  conversation: Conversation;
  isActive?: boolean;
  onClick?: () => void;
};

const MessageItem = ({ conversation, isActive, onClick }: MessageItemProps) => {
  return (
    <Card
      className={`flex flex-row items-center justify-between py-2 px-2 cursor-pointer hover:bg-accent transition-colors ${
        isActive ? "bg-accent border-primary/30" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="relative">
          <Avatar>
            <AvatarImage src={conversation.avatar} alt={conversation.name} />
            <AvatarFallback>{conversation.initials}</AvatarFallback>
          </Avatar>
          {conversation.online && (
            <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-background" />
          )}
        </div>
        <div className="flex flex-col gap-0 leading-5">
          <p className="max-w-27.5 truncate font-semibold">
            {conversation.name}
          </p>
          <p className="text-[13px] max-w-27.5 truncate text-muted-foreground">
            {conversation.lastMessage}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end leading-5 gap-0.5">
        <div className="text-[12px] text-muted-foreground">
          {conversation.time}
        </div>
        {conversation.unread > 0 && (
          <p className="text-[10px] text-white bg-primary rounded-full px-1.5 min-w-4.5 text-center">
            {conversation.unread}
          </p>
        )}
      </div>
    </Card>
  );
};

export default MessageItem;
