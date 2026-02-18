"use client";
import { Card, CardContent } from "../ui/card";
import {
  Bell,
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
import Image from "next/image";
import { useUserStore } from "@/src/store/userStore";

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
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const currentUser = useUserStore((state) => state.user);
  return (
    <Card className="flex flex-row justify-between px-4 rounded py-2 w-full xl:w-7xl h-17 z-40">
      {/* logo  */}
      <Card className="shadow-none border-0 p-0 flex flex-row gap-1 items-center">
        <Image src="/logo.svg" alt="Tarna logo" width={20} height={20} />
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
          {isAuthenticated && (
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
          )}
        </CardContent>
      </Card>
      {/* avatar  */}
      <Card className="p-0 border-0 shadow-none flex flex-col items-end">
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Avatar className="hidden lg:block cursor-pointer">
                  <AvatarImage
                    src={currentUser?.avatar_url || ""}
                    alt="profil"
                  />
                  <AvatarFallback>{currentUser?.initials}</AvatarFallback>
                </Avatar>
                <Card className="flex flex-row items-center cursor-pointer hover:bg-accent p-2 lg:hidden">
                  <Menu className="lg:size-4 size-3.5" />
                </Card>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
              <DropdownMenuGroup className="hidden lg:block">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuItem asChild className="flex flex-row gap-2">
                  <div>
                    <User className="size-3.5" /> Profil
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="flex flex-row gap-2">
                  <div>
                    <Settings className="size-3.5" /> Settings
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="flex flex-row gap-2">
                  <div>
                    <LogOut className="size-3.5" /> Log out
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup className="lg:hidden">
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
                      src={currentUser?.avatar_url || ""}
                      alt="profil"
                    />
                    <AvatarFallback>{currentUser?.initials}</AvatarFallback>
                  </Avatar>
                  Profil
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Card className="p-0 border-0 shadow-none flex flex-row items-center gap-2">
            <Button variant={"outline"}>
              <Link href="/login">Login</Link>
            </Button>
            <Button>
              <Link href="/signup">Register</Link>
            </Button>
          </Card>
        )}
      </Card>
    </Card>
  );
};

export default TopBar;
