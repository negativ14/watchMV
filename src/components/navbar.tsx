"use client";
import { useNavbar } from "@/hooks/useNavbar";
import Link from "next/link";
import MoreDropdown from "./MoreDropdown";
import Menubar from "./Menubar";
import { Search } from "lucide-react";

export default function Navbar() {
  const { navUrls, handleKidMode } = useNavbar();

  return (
    <nav className="absolute top-0 inset-x-0 px-4 md:px-8 flex justify-between items-center">
      <h1 className="text-2xl md:text-4xl font-bold text-white text-shadow-md pb-8 mt-4 no-select">
        watch<span className="text-movie-primary">M</span>
        <span className="text-tv-primary">V</span>
      </h1>

      {/* for md++ sscreen */}
      <div className="md:flex hidden gap-6">
        <ul className="flex items-center gap-6 text-white">
          {navUrls.map((item) => (
            <li key={item.id} className="relative group">
              <Link href={item.path} className="px-1.5">
                {item.name}
              </Link>
              <span className="absolute -bottom-1 left-0 bg-white h-px w-full rounded-sm origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </li>
          ))}
        </ul>

        <button
          onClick={handleKidMode}
          className="flex items-center group text-white gap-0.5 py-1 px-2 cursor-pointer hover:text-shadow-sm relative"
        >
          Kid Mode
          <span className="absolute bottom-0 left-0 bg-white h-px w-full rounded-sm origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </button>

        <MoreDropdown />
      </div>

      {/* phone */}
      <div className="md:hidden flex items-center gap-6 mb-4">
        <Link href={"/search"}>
          <Search className="size-5 text-white" />
        </Link>
        <Menubar />
      </div>
    </nav>
  );
}
