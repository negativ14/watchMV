import { Loader } from "lucide-react";

export default function AIResultsSkeleton() {
  return (
    <div className="w-full h-full border-b border-dashed border-foreground/30">
      <div className="max-w-7xl mx-auto border-x overflow-hidden h-full">
        <div className="flex justify-center items-center h-[60vh] w-full">
          <Loader className="size-5 animate-spin transition-transform duration-700 ease-linear" />
          <span className="text-xl font-semibold tracking-tight">
            AI is analysing your search.
          </span>
        </div>
      </div>
    </div>
  );
}
