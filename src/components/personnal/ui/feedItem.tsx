import {
  BadgeCheck,
  ChevronDown,
  Ellipsis,
  Handshake,
  Heart,
  Lightbulb,
  MessageCircle,
  Pin,
  Share2,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

const FeedItem = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-2.5">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="profil"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2">
              <p className="font-bold">Jerry Mbende</p>
              <div className="flex flex-row items-center gap-1.5">
                <BadgeCheck className="size-3" color="#1549e6" />
                <Pin className="size-3" />
              </div>
            </div>
            <p className="text-[12px] text-gray-500">@mr.shadow . 6h</p>
          </div>
        </div>
        <div>
          <Ellipsis />
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-justify text-[15px]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
            soluta velit nulla inventore itaque minus omnis aspernatur,
            cupiditate temporibus animi molestiae, a eos reprehenderit totam
            odit, quisquam labore dicta eaque explicabo accusamus?
          </p>
          {/* <div className="bg-gray-400 w-full h-100 rounded-2xl"></div> */}
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row items-center gap-2 cursor-pointer">
            <Heart className="size-5" />
            <p>60</p>
          </div>
          <div className="flex flex-row items-center gap-1 cursor-pointer">
            <Lightbulb className="size-5" />
            <p>12</p>
          </div>
          <div className="flex flex-row items-center gap-2 cursor-pointer">
            <Handshake className="size-5" />
            <p>9</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row items-center gap-0.5 cursor-pointer">
            <MessageCircle className="size-5" />
            <p>5</p>
            <ChevronDown className="size-5" />
          </div>
          <div className="flex flex-row items-center gap-2 cursor-pointer">
            <Share2 className="size-5" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeedItem;
