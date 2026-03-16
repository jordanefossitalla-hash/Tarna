"use client";

// import MessageDisplay from "@/src/components/personnal/ui/messageDisplay";
// import MessageItem from "@/src/components/personnal/ui/messageItem";
// import { conversationsData } from "@/src/data/conversations";
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/src/components/ui/avatar";
// import { Button } from "@/src/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/src/components/ui/card";
// import { Input } from "@/src/components/ui/input";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupInput,
// } from "@/src/components/ui/input-group";
// import {
//   ChevronLeft,
//   EllipsisVertical,
//   ImageIcon,
//   Paperclip,
//   Search,
//   Send,
//   Smile,
// } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// const MessagesPage = () => {
//   const [selectedId, setSelectedId] = useState<number | null>(null);
//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   const selectedConversation = conversationsData.find(
//     (c) => c.id === selectedId
//   );

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "auto" });
//   }, [selectedId]);

//   return (
//     <div className="xl:max-w-2xl w-full xl:w-2xl h-full pb-20 flex flex-row gap-0 justify-between md:px-10 xl:px-0">
//       {/* ─── Conversation List ─── */}
//       <Card
//         className={`${
//           selectedId !== null ? "hidden md:flex" : "flex"
//         } w-full md:w-2/5 flex-col rounded h-full border-0 shadow-none px-1 gap-1`}
//       >
//         <InputGroup className="w-full">
//           <InputGroupInput placeholder="Rechercher une discussion..." />
//           <InputGroupAddon>
//             <Search />
//           </InputGroupAddon>
//         </InputGroup>
//         <div className="flex flex-col gap-1 pr-1 overflow-scroll hide-scrollbar">
//           {conversationsData.map((conversation) => (
//             <MessageItem
//               key={conversation.id}
//               conversation={conversation}
//               isActive={conversation.id === selectedId}
//               onClick={() => setSelectedId(conversation.id)}
//             />
//           ))}
//         </div>
//       </Card>

//       {/* ─── Conversation Thread ─── */}
//       {selectedId !== null && selectedConversation ? (
//         <Card
//           className={`${
//             selectedId !== null ? "flex" : "hidden md:flex"
//           } w-full md:w-3/5 rounded h-full py-0 flex-col justify-between gap-0`}
//         >
//           {/* Header */}
//           <CardHeader className="flex h-16 flex-row items-center justify-between px-3 py-2 rounded border-b">
//             <div className="flex flex-row items-center gap-2">
//               {/* Back button: visible on mobile */}
//               <button
//                 className="md:hidden cursor-pointer p-1 rounded-full hover:bg-accent"
//                 onClick={() => setSelectedId(null)}
//               >
//                 <ChevronLeft className="size-5" />
//               </button>
//               <div className="relative">
//                 <Avatar className="size-9">
//                   <AvatarImage
//                     src={selectedConversation.avatar}
//                     alt={selectedConversation.name}
//                   />
//                   <AvatarFallback>
//                     {selectedConversation.initials}
//                   </AvatarFallback>
//                 </Avatar>
//                 {selectedConversation.online && (
//                   <span className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full border-2 border-background" />
//                 )}
//               </div>
//               <div className="flex flex-col leading-tight">
//                 <p className="font-semibold text-sm truncate max-w-40">
//                   {selectedConversation.name}
//                 </p>
//                 <p className="text-[11px] text-muted-foreground">
//                   {selectedConversation.online ? "En ligne" : "Hors ligne"}
//                 </p>
//               </div>
//             </div>
//             <Card className="cursor-pointer p-1 rounded-full hover:bg-accent border-0 shadow-none">
//               <EllipsisVertical className="size-5" />
//             </Card>
//           </CardHeader>

//           {/* Messages */}
//           <CardContent className="flex h-full flex-col gap-2 px-3 py-4 overflow-scroll hide-scrollbar">
//             {Array.from({ length: 15 }).map((_, index) => (
//               <MessageDisplay key={index} id={index} />
//             ))}
//             <div ref={bottomRef} />
//           </CardContent>

//           {/* Input */}
//           <CardFooter className="h-16 flex flex-row items-center gap-1.5 px-2">
//             <div className="flex flex-row items-center gap-1">
//               <button className="cursor-pointer p-1.5 rounded-full hover:bg-accent">
//                 <Paperclip className="size-5" />
//               </button>
//               <button className="cursor-pointer p-1.5 rounded-full hover:bg-accent">
//                 <ImageIcon className="size-5" />
//               </button>
//             </div>
//             <Card className="flex flex-row items-center gap-1 border py-1 px-3 w-full">
//               <Input
//                 placeholder="Écrire un message..."
//                 className="border-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
//               />
//               <button className="cursor-pointer">
//                 <Smile className="size-4" />
//               </button>
//             </Card>
//             <Button size="icon" className="cursor-pointer">
//               <Send className="size-4" />
//             </Button>
//           </CardFooter>
//         </Card>
//       ) : (
//         /* ─── Empty state (desktop only) ─── */
//         <Card className="hidden md:flex w-3/5 rounded h-full items-center justify-center border-0 shadow-none">
//           <div className="flex flex-col items-center gap-2 text-muted-foreground">
//             <Search className="size-10 opacity-30" />
//             <p className="text-sm">
//               Sélectionnez une conversation pour commencer
//             </p>
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// };
import { InBuild } from "@/src/components/personnal/inBuild";

const MessagesPage = () => {
  return (
    <div className="xl:max-w-2xl w-full xl:w-2xl h-full pb-20 flex flex-row gap-0 justify-between md:px-10 xl:px-0">
      <InBuild />
    </div>
  );
};

export default MessagesPage;
