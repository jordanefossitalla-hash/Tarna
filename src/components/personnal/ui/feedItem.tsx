"use client";
import {
  BadgeCheck,
  ChevronDown,
  Ellipsis,
  Handshake,
  Heart,
  Lightbulb,
  MessageCircle,
  Pin,
  Share2,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useState } from "react";
import { Post } from "@/src/types/post";
import Image from "next/image";

const FeedItem = ({ post }: { post: Post }) => {
  const [isLikedType, setIsLikedType] = useState<string>("");
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-2.5">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt="profil" />
            <AvatarFallback>{post.author.initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2">
              <p className="font-bold">{post.author.name}</p>
              <div className="flex flex-row items-center gap-1.5">
                {post.author.isVerified && (
                  <BadgeCheck className="size-3" color="#1549e6" />
                )}
                <Pin className="size-3" />
              </div>
            </div>
            <p className="text-[12px] text-gray-500">
              {post.author.username} . {post.timeAgo}
            </p>
          </div>
        </div>
        <div>
          <Ellipsis />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <p className="text-justify text-[15px]">{post.content}</p>
          {post.image != null && (
            <div className="bg-gray-400 w-full h-50 lg:h-100 rounded-2xl">
              <Image
                src={post.image}
                alt="post image"
                width={600}
                height={400}
                className="rounded-2xl w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <div
            className="flex flex-row items-center gap-2 cursor-pointer"
            onClick={() => {
              setIsLikedType("heart");
            }}
          >
            <Heart
              className="size-5"
              color={isLikedType === "heart" ? "red" : "black"}
            />
            <p>
              {isLikedType === "heart"
                ? post.reactions.heart + 1
                : post.reactions.heart}
            </p>
          </div>
          <div
            className="flex flex-row items-center gap-1 cursor-pointer"
            onClick={() => {
              setIsLikedType("light");
            }}
          >
            <Lightbulb
              className="size-5"
              color={isLikedType === "light" ? "yellow" : "black"}
            />
            <p>
              {isLikedType === "light"
                ? post.reactions.lightbulb + 1
                : post.reactions.lightbulb}
            </p>
          </div>
          <div
            className="flex flex-row items-center gap-2 cursor-pointer"
            onClick={() => {
              setIsLikedType("handshake");
            }}
          >
            <Handshake
              className="size-5"
              color={isLikedType === "handshake" ? "blue" : "black"}
            />
            <p>
              {isLikedType === "handshake"
                ? post.reactions.handshake + 1
                : post.reactions.handshake}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row items-center gap-0.5 cursor-pointer">
            <MessageCircle className="size-5" />
            <p>{post.comments}</p>
            <ChevronDown className="size-5" />
          </div>
          <div className="flex flex-row items-center gap-2 cursor-pointer">
            <Share2 className="size-5" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeedItem;
