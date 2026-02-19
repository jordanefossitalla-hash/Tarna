"use client";
import { Heart, MessageCircle, ChevronDown, ChevronUp, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Card } from "../../ui/card";
import { Comment } from "@/src/types/post";
import { useState } from "react";

const MAX_DEPTH = 3;

const CommentItem = ({
  comment,
  depth = 1,
}: {
  comment: Comment;
  depth?: number;
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [liked, setLiked] = useState(false);

  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className={`flex flex-col gap-2 ${depth > 1 ? "ml-8 border-l-2 border-muted pl-3" : ""}`}>
      <div className="flex flex-row gap-2">
        <Avatar className="size-7">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback className="text-xs">{comment.author.initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 w-full">
          <Card className="bg-accent/50 px-3 py-2 gap-0">
            <div className="flex flex-row items-center gap-2">
              <p className="text-sm font-semibold">{comment.author.name}</p>
              <p className="text-xs text-muted-foreground">{comment.timeAgo}</p>
            </div>
            <p className="text-sm">{comment.content}</p>
          </Card>
          <div className="flex flex-row items-center gap-3 px-1">
            <button
              type="button"
              onClick={() => setLiked(!liked)}
              className="flex flex-row items-center gap-1 text-xs text-muted-foreground hover:text-red-500 cursor-pointer"
            >
              <Heart className="size-3" fill={liked ? "red" : "none"} color={liked ? "red" : "currentColor"} />
              <span>{liked ? comment.likes + 1 : comment.likes}</span>
            </button>
            {depth < MAX_DEPTH && (
              <button
                type="button"
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="flex flex-row items-center gap-1 text-xs text-muted-foreground hover:text-primary cursor-pointer"
              >
                <MessageCircle className="size-3" />
                <span>Reply</span>
              </button>
            )}
            {hasReplies && (
              <button
                type="button"
                onClick={() => setShowReplies(!showReplies)}
                className="flex flex-row items-center gap-1 text-xs text-muted-foreground hover:text-primary cursor-pointer"
              >
                {showReplies ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
                <span>
                  {comment.replies!.length} {comment.replies!.length > 1 ? "replies" : "reply"}
                </span>
              </button>
            )}
          </div>
          {showReplyInput && depth < MAX_DEPTH && (
            <div className="flex flex-row items-center gap-2 mt-1">
              <Avatar className="size-6">
                <AvatarImage src="https://github.com/shadcn.png" alt="you" />
                <AvatarFallback className="text-xs">ME</AvatarFallback>
              </Avatar>
              <div className="flex flex-row items-center gap-1 border rounded-full px-3 py-1 w-full">
                <Input
                  placeholder="Write a reply..."
                  className="border-0 h-7 text-sm focus:outline-none focus:ring-0 focus-visible:ring-0 p-0"
                />
                <Button variant="ghost" size="sm" className="p-1 h-6 cursor-pointer">
                  <Send className="size-3" />
                </Button>
              </div>
            </div>
          )}
          {showReplies && hasReplies && (
            <div className="flex flex-col gap-2 mt-1">
              {comment.replies!.map((reply) => (
                <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
