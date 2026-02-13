"use client";
import { useEffect, useRef } from "react";
import { CardContent } from "../../ui/card";
import MessageGroupDisplay from "../ui/messageGroupDisplay";

const ListGroupsItems = ({ items }: { items: any[] }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" }); // ou 'smooth'
  }, [items.length]);

  return (
    <CardContent className="flex h-full flex-col gap-2 pr-1 overflow-scroll hide-scrollbar">
      {items.map((_, index) => {
        return <MessageGroupDisplay key={index} id={index} />;
      })}
      <div ref={bottomRef} />
    </CardContent>
  );
};

export default ListGroupsItems;
