import AddPostCard from "@/src/components/personnal/addPostCard";
import NewFeed from "@/src/components/personnal/newFeed";

const HomePage = () => {
  return (
    <div className="max-w-2xl w-2xl pb-20 h-full overflow-scroll hide-scrollbar">
      <AddPostCard />
      <NewFeed />
    </div>
  );
};

export default HomePage;
