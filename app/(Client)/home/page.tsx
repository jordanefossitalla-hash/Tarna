import AddPostCard from "@/src/components/personnal/addPostCard";
import NewFeed from "@/src/components/personnal/newFeed";
import { Button } from "@/src/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/src/components/ui/empty";
import { Bell, Image, RefreshCcwIcon } from "lucide-react";

export function EmptyMuted() {
  return (
    <Empty className="bg-muted/30 h-full py-0">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Image />
        </EmptyMedia>
        <EmptyTitle>Aucune publication</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          Vous êtes à jour. Les nouvelles publications apparaîtront ici.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">
          <RefreshCcwIcon />
          Rafraîchir
        </Button>
      </EmptyContent>
    </Empty>
  );
}

const HomePage = () => {
  return (
    <div className="xl:max-w-2xl xl:w-2xl w-full pb-20 h-full overflow-scroll hide-scrollbar md:px-10 xl:px-0">
      <AddPostCard isgroup={false} />
      <NewFeed />
      {/* <EmptyMuted/> */}
    </div>
  );
};

export default HomePage;
