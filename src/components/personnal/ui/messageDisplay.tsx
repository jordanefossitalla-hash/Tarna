const MessageSend = () => {
  return (
    <div className="flex flex-row justify-end">
      <div className="bg-primary px-2 py-1 w-3/5 rounded-t-2xl rounded-bl-2xl">
        <p className="text-white text-[15px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  );
};
const MessageReceive = () => {
  return (
    <div className="flex flex-row justify-start">
      <div className="px-2 py-1 w-3/5 rounded-t-2xl rounded-br-2xl border shadow">
        <p className="text-white text-[15px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  );
};

const MessageDisplay = ({ id }: { id: number }) => {
  return (id + 1) % 2 ? <MessageSend /> : <MessageReceive />;
};

export default MessageDisplay;
