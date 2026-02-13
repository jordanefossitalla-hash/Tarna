import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Clock9, Sparkle } from "lucide-react";
import FeedItem from "./ui/feedItem";

const NewFeed = () => {
  return (
    <div className="flex flex-col gap-2">
        {/* Feed action  */}
      <Card className="p-2 bg-accent flex flex-row gap-2 max-w-2xl w-full rounded-md">
        <div className="w-full">
          <Button
            className="w-full cursor-pointer flex flex-row items-center gap-2"
            variant="outline"
          >
            <Sparkle />
            For you
          </Button>
        </div>
        <div className="w-full">
          <Button
            className="w-full cursor-pointer flex flex-row items-cente gap-2r"
            variant="ghost"
          >
            <Clock9 />
            Recent
          </Button>
        </div>
      </Card>
      {/* Feed listing  */}
      {
        Array.from({length: 4}).map((_, index) => {
            return <FeedItem key={index}/>
        })
      }
    </div>
  );
};

export default NewFeed;
