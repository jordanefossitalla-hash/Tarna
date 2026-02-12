import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "../../ui/item";

export type groupeType = {
  id: number;
  title: string;
  memberCount: number;
};

const GroupeItem = ({ item }: { item: groupeType }) => {
  return (
    <Item
      variant="outline"
      className="flex flex-row items-center justify-between border-0 shadow-none"
    >
      <div className="flex flex-row items-center gap-2">
        <div>
          <Avatar className="rounded-md">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <ItemContent className="gap-0">
          <p className="max-w-[95px] truncate font-semibold">{item.title}</p>
          <ItemDescription className="font-medium text-[13px]">
            {item.memberCount} membres
          </ItemDescription>
        </ItemContent>
      </div>
      <div>
        <ItemActions>
          <Button variant="outline" size="sm">
            Rejoindre
          </Button>
        </ItemActions>
      </div>
    </Item>
  );
};

export default GroupeItem;
