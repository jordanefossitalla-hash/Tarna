import AddPostCard from "@/src/components/personnal/addPostCard";
import NewFeed from "@/src/components/personnal/newFeed";

const HomePage = () => {
  return (
    <div className="xl:max-w-2xl xl:w-2xl pb-20 h-full overflow-scroll hide-scrollbar md:px-10 xl:p-0">
      <AddPostCard />
      <NewFeed />
    </div>
  );
};

export default HomePage;
