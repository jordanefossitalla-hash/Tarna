import { Spinner } from "@/src/components/ui/spinner";

const UserDashLoading = async () => {
  return (
    <div className="xl:max-w-full xl:w-full w-full flex flex-row items-center justify-center pb-20 h-full overflow-scroll hide-scrollbar md:px-10 xl:px-0">
      <Spinner className="size-8" />
    </div>
  );
};

export default UserDashLoading;
