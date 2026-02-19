import BottomBar from "@/src/components/personnal/bottomBar";
import NewFeed from "@/src/components/personnal/newFeed";
import TopBar from "@/src/components/personnal/topBar";

export default function Home() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex flex-col w-full h-full max-w-7xl mx-auto">
        <div className="absolute top-0 left-0 right-0 lg:left-auto lg:right-auto z-10">
          <TopBar />
        </div>
        <div className="flex flex-row justify-between h-full w-full pt-17">
          <div className=" w-full px-3 lg:px-0">
            <div className="pb-20 h-full overflow-scroll hide-scrollbar md:px-10 xl:p-0">
              <NewFeed />
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
