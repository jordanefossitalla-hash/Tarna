import { Lock, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import Image from "next/image";
import { Badge } from "../../ui/badge";

const GroupDisplay = () => {
  return (
    <div className="rounded-2xl">
      <div className="bg-gray-500 h-35 rounded-t-2xl relative overflow-hidden">
        <Image
          src={
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
          }
          alt="group image"
          fill
          className="object-cover"
        />
        <div className="absolute w-full flex flex-row justify-end items-center pr-2 pt-2">
          <Badge variant="secondary" className="text-red-500">
            <Lock className="size-3" color="red" />
            Private
          </Badge>
        </div>
      </div>
      <Card className="border-0 shadow-xl px-0">
        <CardHeader className="flex flex-col gap-1 px-2 py-0">
          <CardTitle className="text-xl font-semibold">Tech KIAMA</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Exercitationem, omnis!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row items-center gap-2">
          <div className="flex flex-row items-center gap-1">
            <Users className="size-4" color="gray" />
            <p className="text-[14px] text-gray-500">156 members</p>
          </div>
          <div>
            <p className="text-[14px] text-gray-500">342 posts</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full cursor-pointer" variant={"outline"}>
            See group
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GroupDisplay;
