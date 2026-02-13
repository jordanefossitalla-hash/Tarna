import ListGroupsItems from "@/src/components/personnal/clientComponent/listGroupsItems";
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
  ChevronLeft,
  Ellipsis,
  EllipsisVertical,
  Image,
  Paperclip,
  Send,
  Smile,
} from "lucide-react";
import Link from "next/link";

const GroupDetailPage = () => {
  return (
    <Card className="w-2xl rounded h-full py-0 flex flex-col justify-between gap-0">
      {/* display message header  */}
      <CardHeader className="flex h-20 flex-row items-center justify-between px-2 py-3 rounded border-b">
        <div className="flex flex-row gap-2 items-center">
          <Link href={"/groups"}>
            <Card className="cursor-pointer p-1 rounded-3xl hover:bg-accent border-0 shadow-none">
              <ChevronLeft className="size-5" />
            </Card>
          </Link>
          <div className="flex flex-row items-center gap-1">
            <div>
              <Avatar>
                <AvatarImage
                  src="http://localhost:3000/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1522071820081-009f0129c71c%3Fw%3D800%26q%3D80&w=1920&q=75"
                  alt="profil"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-0 leading-5">
              <p className=" max-w-[110px] truncate font-semibold">
                Tech KIAMA
              </p>
            </div>
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
            <Ellipsis className="size-5" />
          </Card>
        </div>
      </CardHeader>
      <ListGroupsItems items={[1,2,4,5,6,7,8,9,10,11,12,13,14,15,16]} />
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
  );
};

export default GroupDetailPage;
