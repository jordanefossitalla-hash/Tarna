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
  Plus,
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
import { useRef, useState } from "react";
import NextImage from "next/image";
import { X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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

const AddPostCard = ({ isgroup }: { isgroup: boolean }) => {
  const [isWrite, setIsWrite] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePdfUpload = () => {
    pdfInputRef.current?.click();
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const removePdf = () => {
    setPdfFile(null);
    if (pdfInputRef.current) pdfInputRef.current.value = "";
  };
  return (
    <form action="" className="py-4">
      <Card
        className={`h-60 lg:w-full py-4 px-3 flex flex-row justify-between ${isWrite ? "shadow-blue-400" : "shadow-none"}`}
      >
        <div className="pl-2 flex flex-col justify-between lg:block">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="profil" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Card className="flex flex-row items-center lg:gap-2 cursor-pointer hover:bg-accent p-2">
                  <Plus className="lg:size-4 size-3.5" />
                </Card>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Medias</DropdownMenuLabel>
                  {mediaElement.map((media, index) => {
                    return (
                      <DropdownMenuItem
                        key={index}
                        className="flex flex-row gap-2"
                      >
                        <media.icon className="lg:size-4 size-3.5" />
                        {media.title ? <p>{media.title}</p> : ""}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 justify-between lg:justify-normal">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <input
            type="file"
            ref={pdfInputRef}
            accept="application/pdf"
            className="hidden"
            onChange={handlePdfChange}
          />
          <textarea
            name="post"
            id="post"
            placeholder="What's up ?"
            className="w-full h-full lg:h-50 border-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
            onFocus={() => setIsWrite(true)}
            onBlur={() => setIsWrite(false)}
          ></textarea>
          {imagePreview && (
            <div className="relative w-20 h-80 rounded-xl overflow-hidden">
              <NextImage
                src={imagePreview}
                alt="preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>
          )}
          {pdfFile && (
            <div className="flex flex-row items-center gap-2 bg-accent rounded-lg px-3 py-2 w-fit">
              <FileText className="size-4 text-red-500" />
              <p className="text-sm truncate max-w-48">{pdfFile.name}</p>
              <Button
                type="button"
                onClick={removePdf}
                className="bg-black/60 text-white rounded-full p-0.5 hover:bg-black/80 cursor-pointer"
              >
                <X className="size-3" />
              </Button>
            </div>
          )}
          <div className="flex-row flex-wrap items-center gap-2 hidden lg:flex">
            <Card
              className="flex flex-row items-center lg:gap-2 cursor-pointer hover:bg-accent p-2"
              onClick={handleImageUpload}
            >
              <Image className="lg:size-4 size-3.5" />
            </Card>
            <Card className="flex flex-row items-center lg:gap-2 cursor-pointer hover:bg-accent p-2">
              <Camera className="lg:size-4 size-3.5" />
            </Card>
            <Card
              className="flex flex-row items-center lg:gap-2 cursor-pointer hover:bg-accent p-2"
              onClick={handlePdfUpload}
            >
              <FileText className="lg:size-4 size-3.5" />
            </Card>
            <Card className="flex flex-row items-center lg:gap-2 cursor-pointer hover:bg-accent p-2">
              <Link className="lg:size-4 size-3.5" />
            </Card>
            <Card className="flex flex-row items-center lg:gap-2 cursor-pointer hover:bg-accent p-2">
              <Smile className="lg:size-4 size-3.5" />
            </Card>
            <Card className="flex flex-row items-center lg:gap-2 cursor-pointer hover:bg-accent p-2">
              <Hash className="lg:size-4 size-3.5" />
            </Card>
          </div>

          {!isgroup && (
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
          )}
        </div>
        <div className="flex flex-col justify-end h-full">
          <Button>Publish</Button>
        </div>
      </Card>
    </form>
  );
};

export default AddPostCard;
