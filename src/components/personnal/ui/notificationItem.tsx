import { Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card } from "../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const NotificationItem = () => {
  return (
    <Card className="w-full px-4 flex flex-row items-center justify-between h-18">
      <div className="flex flex-row items-center gap-2">
        <div>
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className="font-bold">Marie Dupont</p>
          <p className="font-normal text-[14px] text-gray-500">
            liked your post
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Action</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer">
                Mark as read
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div>
          <p className="font-normal text-[14px] text-gray-500">5 minutes ago</p>
        </div>
      </div>
    </Card>
  );
};

export default NotificationItem;
