import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../../ui/item";
import { Hash } from "lucide-react";

export type hastagType = {
  id: number;
  title: string;
  postCount: number;
};

const HastagItem = ({ item }: { item: hastagType }) => {
  return (
    <Item
      variant="outline"
      size="sm"
      className="p-2 border-0 shadow-none"
      asChild
    >
      <a href="#" className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row items-center gap-1.5">
          <ItemMedia>
            <Hash className="size-4" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="hover:text-blue-500 font-normal">{item.title}</ItemTitle>
          </ItemContent>
        </div>
        <div>
          <ItemDescription>{item.postCount} post</ItemDescription>
        </div>
      </a>
    </Item>
  );
};

export default HastagItem;
