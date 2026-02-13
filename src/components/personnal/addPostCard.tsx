"use client";
import {
  Camera,
  FileText,
  Globe,
  GlobeLock,
  Hash,
  Image,
  Link,
  LucideIcon,
  Smile,
  UserLock,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

type selectType = {
  id: number;
  title: string;
  icon: LucideIcon;
  value: string;
};
type mediaType = {
  id: number;
  title?: string;
  icon: LucideIcon;
};

const SelectElement: selectType[] = [
  {
    id: 0,
    title: "Public",
    icon: Globe,
    value: "public",
  },
  {
    id: 1,
    title: "Private",
    icon: GlobeLock,
    value: "private",
  },
  {
    id: 2,
    title: "Friend",
    icon: Users,
    value: "friend",
  },
  {
    id: 3,
    title: "Group",
    icon: UserLock,
    value: "group",
  },
];
const mediaElement: mediaType[] = [
  {
    id: 0,
    title: "Image",
    icon: Image,
  },
  {
    id: 1,
    title: "Video",
    icon: Camera,
  },
  {
    id: 2,
    title: "Document",
    icon: FileText,
  },
  {
    id: 3,
    title: "Link",
    icon: Link,
  },
  {
    id: 4,
    icon: Smile,
  },
  {
    id: 5,
    icon: Hash,
  },
];

const AddPostCard = () => {
  const [isWrite, setIsWrite] = useState<boolean>(false);
  return (
    <form action="" className="py-4">
      <Card
        className={`h-50 w-2xl py-4 px-3 flex flex-row justify-between ${isWrite ? "shadow-blue-400" : "shadow-none"}`}
      >
        <div className="pl-2">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="profil"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full flex flex-col gap-3">
          <textarea
            name="post"
            id="post"
            placeholder="What's up ?"
            className="w-full h-20 border-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
            onFocus={() => setIsWrite(true)}
            onBlur={() => setIsWrite(false)}
          ></textarea>
          <div className="flex flex-row items-center gap-2 justify-between">
            {mediaElement.map((media, index) => {
              return (
                <Card key={index} className="flex flex-row items-center gap-2 cursor-pointer hover:bg-accent p-2">
                  <media.icon className="size-4" />
                  {media.title ? <p>{media.title}</p> : ""}
                </Card>
              );
            })}
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Visibility</SelectLabel>
                  {SelectElement.map((el, index) => {
                    return (
                      <SelectItem
                        key={index}
                        value={el.value}
                        className="flex flex-row items-center gap-2"
                      >
                        <el.icon /> {el.title}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col justify-end h-full">
          <Button>Publish</Button>
        </div>
      </Card>
    </form>
  );
};

export default AddPostCard;
