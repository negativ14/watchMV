import Footer from "@/components/Footer";
import List from "@/components/List";
import Navbar from "@/components/navbar";
import VideoContainer from "@/components/videoContainer";
import { endpoints } from "@/lib/constants";

export default function Page() {
  return (
    <div className="relative">
      <div className="border-px border-b relative">
        <div className="max-w-7xl h-full border-x-px mx-auto relative">
          <div className="h-full w-full">
            <VideoContainer contentType="tv" />
          </div>
          <Navbar />

          <div className="absolute h-full w-10 -left-10 top-0 border bg-background">
            <div className="absolute inset-0 bg-[image:repeating-linear-gradient(315deg,transparent,transparent_4px,var(--pattern-line)_4px,var(--pattern-line)_6px)]" />
          </div>
          <div className="absolute h-full w-10 -right-10 top-0 border bg-background">
            <div className="absolute inset-0 bg-[image:repeating-linear-gradient(315deg,transparent,transparent_4px,var(--pattern-line)_4px,var(--pattern-line)_6px)]" />
          </div>
        </div>
      </div>

      <div className="h-10 border-b relative">
        <div className="absolute inset-0 bg-[image:repeating-linear-gradient(315deg,transparent,transparent_4px,var(--pattern-line)_4px,var(--pattern-line)_6px)]" />
        <div className="w-full max-w-7xl mx-auto h-full border-x bg-background z-0 relative"></div>
      </div>

      <List url={endpoints.trendingTV} title="Trending" />
      <List url={endpoints.airingToday} title="Airing Today" />
      <List url={endpoints.onTheAir} title="On the Air" />
      <List url={endpoints.popularTV} title="popular" />
      <List url={endpoints.topRatedTV} title="Top Rated" />
      <Footer />
    </div>
  );
}
