import { Card, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Bell, House, LucideIcon, MessageCircle, Users } from "lucide-react";
import { FieldSeparator } from "../ui/field";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

type menuItemType = {
  id: number;
  name: string;
  icon: LucideIcon;
  route: string;
};
type groupeType = {
  id: number;
  title: string;
};

const menuItem: menuItemType[] = [
  {
    id: 0,
    name: "Home",
    icon: House,
    route: "/home",
  },
  {
    id: 1,
    name: "Groups",
    icon: Users,
    route: "/groups",
  },
  {
    id: 2,
    name: "Messages",
    icon: MessageCircle,
    route: "/messages",
  },
  {
    id: 3,
    name: "Notifications",
    icon: Bell,
    route: "/notifications",
  },
];
const GroupItem: groupeType[] = [
  {
    id: 0,
    title: "Tech KIAMA",
  },
  {
    id: 1,
    title: "Design Team",
  },
  {
    id: 2,
    title: "General",
  },
];

const Sidebar = () => {
  return (
    <Card className="w-[250px] pr-2 rounded h-fit">
      <Card className="flex flex-col shadow-none border-0 gap-1 p-0">
        {menuItem.map((item, index) => {
          return (
            <Button
              asChild
              key={index}
              className={`${index === 0 ? "bg-primary" : "bg-transparent"} ${index === 0 ? "text-white" : "text-black"} ${index === 0 ? "hover:text-white" : "hover:text-black"} ${index === 0 ? "" : "hover:bg-accent"} flex flex-row items-center justify-start py-5`}
            >
              <Link href={item.route}>
                <item.icon className="size-4" />
                {item.name}
              </Link>
            </Button>
          );
        })}
      </Card>
      <Card className="p-0 pl-2 border-0 shadow-none gap-1.5">
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card" />
        <CardDescription className="font-semibold">MY GROUPS</CardDescription>
      </Card>
      <Card className="gap-1 border-0 shadow-none p-0">
        {GroupItem.slice(0, 3).map((el, index) => {
          return (
            <Button
              asChild
              variant={"ghost"}
              key={index}
              className="justify-start cursor-pointer hover:text-blue-500"
            >
              <Link href={"/groupdetail"}>
                <Avatar className="rounded-md">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="profil"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>{el.title}</p>
              </Link>
            </Button>
          );
        })}
      </Card>
    </Card>
  );
};

export default Sidebar;
