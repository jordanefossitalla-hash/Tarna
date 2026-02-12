import AddPostCard from "@/src/components/personnal/addPostCard";
import NewFeed from "@/src/components/personnal/newFeed";

const HomePage = () => {
  return (
    <div className="max-w-2xl h-fit pb-20">
      <AddPostCard />
      <NewFeed />
    </div>
  );
};

export default HomePage;
