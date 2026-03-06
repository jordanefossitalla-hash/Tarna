import { Spinner } from "@/src/components/ui/spinner";

const ProfilLoading = () => {
  return (
    <div className="xl:max-w-2xl xl:w-2xl w-full flex flex-row items-center justify-center pb-20 h-full overflow-scroll hide-scrollbar md:px-10 xl:px-0">
      <Spinner className="size-8" />
    </div>
  );
};

export default ProfilLoading;
