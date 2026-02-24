import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";

const MessageSend = () => {
  return (
    <div className="flex flex-row justify-end pr-2">
      <div className="bg-primary px-2 py-1 w-3/5 rounded-t-2xl rounded-bl-2xl">
        <div>
          <p className="text-white text-[15px]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos id
            ipsum quaerat vel ab, repudiandae tempora deleniti ullam nemo quis?
          </p>
        </div>
      </div>
    </div>
  );
};
const MessageReceive = () => {
  return (
    <div className="flex flex-row items-end justify-start gap-2">
      <Avatar>
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
      <div className="px-2 py-1 w-3/5 rounded-t-2xl rounded-br-2xl border shadow">
        <div>
          <Badge variant="secondary">Marie Lepen</Badge>
          <p className="text-white text-[15px]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos id
            ipsum quaerat vel ab, repudiandae tempora deleniti ullam nemo quis?
          </p>
        </div>
      </div>
    </div>
  );
};

const MessageGroupDisplay = ({ id }: { id: number }) => {
  return (id + 1) % 2 ? <MessageSend /> : <MessageReceive />;
};

export default MessageGroupDisplay;
