import GroupDisplay from "@/src/components/personnal/ui/groupDisplay";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Plus, Search } from "lucide-react";

const GroupsPage = () => {
  return (
    <div className="w-2xl pb-20 flex flex-col gap-3 h-full overflow-scroll hide-scrollbar">
      <div className="flex flex-row w-full gap-2 justify-between pt-10">
        <div className="w-3/4">
          <p className="text-2xl font-bold">Groups</p>
          <p className="text-gray-600">
            Join communities and connect with your colleagues
          </p>
        </div>
        <div className="flex flex-col justify-end">
          <Button className="flex flex-row items-center gap-2 cursor-pointer">
            <Plus />
            Create group
          </Button>
        </div>
      </div>
      <Card className="flex flex-row items-center gap-1 border py-1 px-3 w-full">
        <Search className="size-4" />
        <Input
          placeholder="Search group..."
          className="border-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
          tabIndex={-1}
        />
      </Card>
      <Card className="p-2 bg-accent flex flex-row gap-2 max-w-2xl w-full rounded-md">
        <div className="w-full">
          <Button
            className="w-full cursor-pointer flex flex-row items-center gap-2"
            variant="outline"
          >
            My groups
          </Button>
        </div>
        <div className="w-full">
          <Button
            className="w-full cursor-pointer flex flex-row items-cente gap-2r"
            variant="ghost"
          >
            Discover
          </Button>
        </div>
        <div className="w-full">
          <Button
            className="w-full cursor-pointer flex flex-row items-cente gap-2r"
            variant="ghost"
          >
            pending
          </Button>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        <GroupDisplay/>
        <GroupDisplay/>
        <GroupDisplay/>
      </div>
    </div>
  );
};

export default GroupsPage;
