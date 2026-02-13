import MessageDisplay from "@/src/components/personnal/ui/messageDisplay";
import MessageItem from "@/src/components/personnal/ui/messageItem";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
  EllipsisVertical,
  Image,
  Paperclip,
  Phone,
  Search,
  Send,
  Smile,
  Video,
} from "lucide-react";

const MessagesPage = () => {
  return (
    <div className="max-w-2xl w-2xl h-full pb-20 flex flex-row gap-0 justify-between">
      <Card className="w-2/5 rounded h-full border-0 shadow-none px-1">
        <Card className="flex flex-row items-center gap-1 border py-1 px-2 w-full">
          <Search className="size-4" />
          <Input
            placeholder="search for a conversation..."
            className="border-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
            tabIndex={-1}
          />
        </Card>
        <div className="flex flex-col gap-2 pr-1 overflow-scroll hide-scrollbar">
          {Array.from({ length: 15 }).map((item, index) => {
            return <MessageItem key={index} />;
          })}
        </div>
      </Card>
      <Card className="w-3/5 rounded h-full py-0 flex flex-col justify-between gap-0">
        {/* display message header  */}
        <CardHeader className="flex h-20 flex-row items-center justify-between px-2 py-3 rounded border-b">
          <div className="flex flex-row items-center gap-1">
            <div>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="profil"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-0 leading-5">
              <p className=" max-w-[110px] truncate font-semibold">
                Marie Dupont
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-1.5">
            {/* <Card className="cursor-pointer p-1 rounded-3xl hover:bg-accent border-0 shadow-none">
              <Phone className="size-5" />
            </Card>
            <Card className="cursor-pointer p-1 rounded-3xl hover:bg-accent border-0 shadow-none">
              <Video className="size-5" />
            </Card> */}
            <Card className="cursor-pointer p-1 rounded-3xl hover:bg-accent border-0 shadow-none">
              <EllipsisVertical className="size-5" />
            </Card>
          </div>
        </CardHeader>
        <CardContent className="flex h-full flex-col gap-2 pr-1 overflow-scroll hide-scrollbar">
          {Array.from({ length: 15 }).map((_, index) => {
            return <MessageDisplay key={index} id={index} />;
          })}
        </CardContent>
        {/* read section  */}
        <CardFooter className="h-20 flex flex-row items-center gap-1">
          <div className="flex flex-row items-center gap-2">
            <Card className="cursor-pointer p-1 rounded-3xl hover:bg-accent border-0 shadow-none">
              <Paperclip className="size-5" />
            </Card>
            <Card className="cursor-pointer p-1 rounded-3xl hover:bg-accent border-0 shadow-none">
              <Image className="size-5" />
            </Card>
          </div>
          <Card className="flex flex-row items-center gap-1 border py-1 px-3 w-full">
            <Input
              placeholder="Read anything..."
              className="border-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
              tabIndex={-1}
            />
            <div className="cursor-pointer">
              <Smile className="size-4" />
            </div>
          </Card>
          <div>
            <Button>
              <Send />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MessagesPage;
