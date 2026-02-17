import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import HastagItem, { hastagType } from "./ui/hastagItem";
import GroupeItem, { groupeType } from "./ui/groupeItem";

const hastagTendance: hastagType[] = [
  {
    id: 0,
    title: "#KiamaTeam",
    postCount: 342,
  },
  {
    id: 1,
    title: "#innovation",
    postCount: 256,
  },
  {
    id: 2,
    title: "#TechNews",
    postCount: 189,
  },
  {
    id: 3,
    title: "#projetUpdate",
    postCount: 124,
  },
];
const groupeSuggestion: groupeType[] = [
  {
    id: 0,
    title: "Marketing KIAMA",
    memberCount: 45,
  },
  {
    id: 1,
    title: "RH & Formation",
    memberCount: 32,
  },
  {
    id: 2,
    title: "Développment",
    memberCount: 78,
  },
];

const RightBar = () => {
  return (
    <Card className="w-75 pl-2 rounded h-full border-r-0 shadow-none hidden xl:block">
      {/* <Card className="gap-0 p-1">
        <CardHeader className="p-2">
          <div className="flex flex-row items-center gap-2">
            <TrendingUp className="size-4" color="#1549e6" />
            <CardTitle className="text-[15px]">Tendances</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {hastagTendance.map((item, index) => {
            return <HastagItem item={item} key={index} />;
          })}
        </CardContent>
      </Card> */}
      <Card className="gap-0 p-1">
        <CardHeader className="p-2">
          <div className="flex flex-row items-center gap-2 justify-center">
            <CardTitle className="text-[15px]">Suggested groups</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {groupeSuggestion.slice(0, 3).map((item, index) => {
            return <GroupeItem item={item} key={index} />;
          })}
        </CardContent>
      </Card>
    </Card>
  );
};

export default RightBar;
