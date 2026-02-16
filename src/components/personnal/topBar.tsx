"use client";
import { Card, CardContent } from "../ui/card";
import {
  Bell,
  GalleryVerticalEnd,
  House,
  LogOut,
  LucideIcon,
  Menu,
  MessageCircle,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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

  const isActive = (prefix: string) =>
    pathname === prefix || pathname.startsWith(prefix + "/");

  return (
    <Card className="flex flex-row justify-between px-4 rounded py-2  xl:w-7xl h-17 z-40">
      {/* logo  */}
      <Card className="shadow-none border-0 p-0 flex flex-row gap-1 items-center">
        <GalleryVerticalEnd className="size-4" />
        <p className="hidden lg:block">Tarna</p>
      </Card>
      {/* search bar and nav item  */}
      <Card className="border-0 shadow-none p-0 w-3/4 hidden lg:block">
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
                  className={`${isActive(item.route) ? "bg-primary text-white hover:text-white" : "bg-transparent text-white hover:text-white hover:bg-accent"} flex flex-row items-center`}
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
            <Avatar className="hidden lg:block">
              <AvatarImage src="https://github.com/shadcn.png" alt="profil" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Card className="flex flex-row items-center cursor-pointer hover:bg-accent p-2 lg:hidden">
              <Menu className="lg:size-4 size-3.5" />
            </Card>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              {menuItem.map((item, index) => {
                return (
                  <DropdownMenuItem
                    asChild
                    key={index}
                    className="flex flex-row gap-2"
                  >
                    <Link href={item.route}>
                      <item.icon className="size-3.5" /> {item.name}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuItem>
                <Avatar size="sm">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="profil"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                Profil
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Card>
    </Card>
  );
};

export default TopBar;
