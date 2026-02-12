import { Card, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Bell, House, LucideIcon, MessageCircle, Users } from "lucide-react";
import { FieldSeparator } from "../ui/field";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type menuItemType = {
  id: number;
  name: string;
  icon: LucideIcon;
};

const menuItem: menuItemType[] = [
  {
    id: 0,
    name: "Acceuil",
    icon: House,
  },
  {
    id: 1,
    name: "Groupes",
    icon: Users,
  },
  {
    id: 2,
    name: "Messages",
    icon: MessageCircle,
  },
  {
    id: 3,
    name: "Notifications",
    icon: Bell,
  },
];

const Sidebar = () => {
  return (
    <Card className="w-[250px] pr-2 rounded h-full">
      <Card className="flex flex-col shadow-none border-0 gap-4 p-0">
        {menuItem.map((item, index) => {
          return (
            <Button
              key={index}
              className={`${index === 0 ? "bg-primary" : "bg-transparent"} ${index === 0 ? "text-white" : "text-black"} ${index === 0 ? "hover:text-white" : "hover:text-white"} flex flex-row items-center justify-start py-5`}
            >
              <item.icon className="size-4" />
              {item.name}
            </Button>
          );
        })}
      </Card>
      <Card className="p-0 pl-2 border-0 shadow-none gap-1.5">
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card" />
        <CardDescription className="font-semibold">MY GROUPS</CardDescription>
      </Card>
      <Card className="gap-1 border-0 shadow-none p-0">
        {Array.from({ length: 4 }).map((el, index) => {
          return (
            <Button variant={"ghost"} key={index} className="justify-start">
              <Avatar className="rounded-md">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>Group Name</p>
            </Button>
          );
        })}
      </Card>
    </Card>
  );
};

export default Sidebar;
