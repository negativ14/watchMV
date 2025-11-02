import Navbar from "@/components/navbar";
import VideoContainer from "@/components/videoContainer";

export default function Home() {
  return (
    <div className="relative">
      {/* <div className="absolute inset-0 bg-gradient-to-b from-movie-primary to-transparent"></div> */}
      {/* <div className="absolute w-full aspect-video overflow-hidden">
        <iframe
          className="absolute top-0 left-0 w-full h-full pointer-events-none blur-[5px]"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&disablekb=1&fs=0&playsinline=1&start=0&end=54&vq=hd1080`}
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
        <div className="h-full w-full bg-black absolute z-0 opacity-30" />
      </div> */}

      <div className="border-px border-b relative">
        <div className="max-w-7xl h-full border-x-px mx-auto relative">
          <div className="h-full w-full">
            <VideoContainer contentType="movie" />
          </div>
          <Navbar />

          {/* extra border fade lines */}
          <div className="absolute h-full w-20 -left-20 top-0 border bg-background">
            <div className="absolute inset-0 bg-[image:repeating-linear-gradient(315deg,transparent,transparent_4px,var(--pattern-line)_4px,var(--pattern-line)_6px)]" />
          </div>
          <div className="absolute h-full w-20 -right-20 top-0 border bg-background">
            <div className="absolute inset-0 bg-[image:repeating-linear-gradient(315deg,transparent,transparent_4px,var(--pattern-line)_4px,var(--pattern-line)_6px)]" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto h-20">hii</div>
    </div>
  );
}
