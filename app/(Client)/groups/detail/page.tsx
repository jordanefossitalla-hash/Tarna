import AddPostCard from "@/src/components/personnal/addPostCard";
import NewFeed from "@/src/components/personnal/newFeed";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Card } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { ChevronLeft, Globe, Users } from "lucide-react";
import Link from "next/link";

const GroupDetailPage = () => {
  return (
    <div className="xl:max-w-2xl xl:w-2xl pb-20 h-full overflow-scroll hide-scrollbar md:px-10 xl:p-0">
      {/* Group Header */}
      <Card className="flex flex-col gap-0 p-0 overflow-hidden mb-2">
        {/* Cover / Banner */}
        <div className="relative w-full h-32 bg-linear-to-r from-blue-600 to-indigo-700">
          <div className="absolute top-3 left-3">
            <Link href="/groups">
              <Card className="cursor-pointer p-1.5 rounded-full hover:bg-white/20 border-0 shadow-none bg-black/30">
                <ChevronLeft className="size-5 text-white" />
              </Card>
            </Link>
          </div>
          <div className="absolute top-3 right-3">
            {/* <Card className="cursor-pointer p-1.5 rounded-full hover:bg-white/20 border-0 shadow-none bg-black/30">
              <Settings className="size-5 text-white" />
            </Card> */}
          </div>
        </div>
        {/* Group Info */}
        <div>
          <div className="flex flex-row items-end gap-3 px-4">
            <Avatar className="size-16 border-3 border-background">
              <AvatarImage
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Tech KIAMA"
              />
              <AvatarFallback>TK</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5 pb-1">
              <p className="text-lg font-bold leading-tight">Tech KIAMA</p>
              <div className="flex flex-row items-center gap-2 text-xs text-gray-400">
                <div className="flex flex-row items-center gap-1">
                  <Globe className="size-3" />
                  <span>Public</span>
                </div>
                <span>·</span>
                <div className="flex flex-row items-center gap-1">
                  <Users className="size-3" />
                  <span>128 members</span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3">
            <p className="text-sm text-gray-400">
              Espace dédié à l&apos;équipe tech de KIAMA. Partagez vos avancées,
              idées et ressources techniques.
            </p>
            <div className="flex flex-row gap-2 mt-2">
              <Badge variant="secondary">#tech</Badge>
              <Badge variant="secondary">#dev</Badge>
              <Badge variant="secondary">#engineering</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Add Post */}
      <AddPostCard isgroup={true} />

      {/* Group Feed */}
      {/* <NewFeed /> */}
    </div>
  );
};

export default GroupDetailPage;
