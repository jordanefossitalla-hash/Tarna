import { BadgeCheck, Ellipsis, Pin } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

const FeedItem = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-2.5">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
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
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
            soluta velit nulla inventore itaque minus omnis aspernatur,
            cupiditate temporibus animi molestiae, a eos reprehenderit totam
            odit, quisquam labore dicta eaque explicabo accusamus?
          </p>
          <div className="bg-gray-400 w-full h-100">

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedItem;
