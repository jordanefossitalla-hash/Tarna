import { Card, CardContent } from "../ui/card";
import {
  Bell,
  GalleryVerticalEnd,
  House,
  LucideIcon,
  MessageCircle,
  Search,
  Users,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type menuItemType = {
  id: number;
  name: string;
  icon: LucideIcon;
  route: string;
};

const menuItem: menuItemType[] = [
  {
    id: 0,
    name: "Home",
    icon: House,
    route: "/home"
  },
  {
    id: 1,
    name: "Groups",
    icon: Users,
    route: "/groups"
  },
  {
    id: 2,
    name: "Messages",
    icon: MessageCircle,
    route: "/home"
  },
  {
    id: 3,
    name: "Notifications",
    icon: Bell,
    route: "/home"
  },
];

const TopBar = () => {
  return (
    <Card className="flex flex-row justify-between px-4 rounded py-2">
      {/* logo  */}
      <Card className="shadow-none border-0 p-0 flex flex-row gap-1 items-center">
        <GalleryVerticalEnd className="size-4" />
        <p>Tarna</p>
      </Card>
      {/* search bar and nav item  */}
      <Card className="border-0 shadow-none p-0 w-3/4">
        <CardContent className="flex flex-row justify-between items-center p-0 gap-2">
          <Card className="flex flex-row items-center gap-1 border py-1 px-3 w-full">
            <Search className="size-4" />
            <Input
              placeholder="Search anythings..."
              className="border-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
              tabIndex={-1}
            />
          </Card>
          <Card className="flex flex-row items-center gap-2 p-0 shadow-none border-0 w-fit">
            {menuItem.map((item, index) => {
              return (
                <Button
                  key={index}
                  className={`${index === 0 ? "bg-primary" : "bg-transparent"} ${index === 0 ? "text-white" : "text-black"} ${index === 0 ? "hover:text-white" : "hover:text-black"} ${index === 0 ? "" : "hover:bg-accent"} flex flex-row items-center`}
                >
                  <item.icon className="size-4" />
                  {item.name}
                </Button>
              );
            })}
          </Card>
        </CardContent>
      </Card>
      {/* avatar  */}
      <Card className="p-0 border-0 shadow-none flex flex-col items-end">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="grayscale"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Card>
    </Card>
  );
};

export default TopBar;
