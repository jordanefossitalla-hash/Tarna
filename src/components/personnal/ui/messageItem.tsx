import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card } from "../../ui/card";

const MessageItem = () => {
  return (
    <Card className="flex flex-row items-center justify-between py-2 px-1 cursor-pointer hover:bg-accent">
      <div className="flex flex-row items-center gap-1">
        <div>
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="profil"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-0 leading-5">
          <p className=" max-w-[110px] truncate font-semibold">Marie Dupont</p>
          <p className="text-[14px] max-w-[110px] truncate">
            Great, see you later!
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end leading-5">
        <div className="text-[14px]">14:30</div>
        <p className="text-[10px] text-white bg-primary rounded-3xl p-0 px-1.5">
          3
        </p>
      </div>
    </Card>
  );
};

export default MessageItem;
