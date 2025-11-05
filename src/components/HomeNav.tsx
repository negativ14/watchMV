import Link from "next/link";

export default function HomeNav() {
  return (
    <div className="border-b border-dashed border-foreground/30">
      <div className="h-20 border-x max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl font-bold text-white text-shadow-md no-select px-4">
          watch<span className="text-movie-primary">M</span>
          <span className="text-tv-primary">V</span>
        </h1>

        <Link href={"/"} className="relative group mr-4 cursor-pointer">
          Home Page
          <span className="absolute bottom-0 left-0 bg-white h-px w-full rounded-sm origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}
