"use client"
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
import Link from "next/link";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { usePathname } from "next/navigation";

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

const TopBar = () => {
  const pathname = usePathname();

  // Renvoie le premier prefix qui matche, ou undefined
  const currentPrefix = menuItem.find(
    (p) => pathname === p.route || pathname.startsWith(p.route + "/"),
  );
  const isActive = (prefix: string) =>
    pathname === prefix || pathname.startsWith(prefix + "/");

  return (
    <Card className="flex flex-row justify-between px-4 rounded py-2 fixed w-7xl h-17 z-40">
      {/* logo  */}
      <Card className="shadow-none border-0 p-0 flex flex-row gap-1 items-center">
        <GalleryVerticalEnd className="size-4" />
        <p>Tarna</p>
      </Card>
      {/* search bar and nav item  */}
      <Card className="border-0 shadow-none p-0 w-3/4">
        <CardContent className="flex flex-row justify-between items-center p-0 gap-2">
          <InputGroup className="w-full">
            <InputGroupInput placeholder="Search anything..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <Card className="flex flex-row items-center gap-2 p-0 shadow-none border-0 w-fit">
            {menuItem.map((item, index) => {
              return (
                <Button
                  asChild
                  key={index}
                  className={`${isActive(item.route) ? "bg-primary text-white hover:text-white" : "bg-transparent text-black hover:text-black hover:bg-accent"} flex flex-row items-center`}
                >
                  <Link href={item.route}>
                    <item.icon className="size-4" />
                    {item.name}
                  </Link>
                </Button>
              );
            })}
          </Card>
        </CardContent>
      </Card>
      {/* avatar  */}
      <Card className="p-0 border-0 shadow-none flex flex-col items-end">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="profil" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Card>
    </Card>
  );
};

export default TopBar;
