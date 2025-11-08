import VideoPlayerSkeleton from "@/components/skeletons/videoPlayerSkeleton";
import ContentCastSkeleton from "@/components/skeletons/contentCastSkeleton";
import ContentDetailsSkeleton from "@/components/skeletons/contentDetailsSkeletons";
import ContentProviderSkeleton from "@/components/skeletons/contentProvidersSkeleton";
import ContentSimilarSkeleton from "@/components/skeletons/contentSimilarSkeleton";
import ContentReviewsSkeleton from "@/components/skeletons/contentReviewsSkeletons";
import Footer from "@/components/Footer";
import HomeNav from "@/components/HomeNav";

export default function Loading() {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="max-w-[1360px] w-full h-full border-x border-dashed border-foreground/30" />
      </div>

      {/* Top Navbar */}
      <HomeNav />

      <div className="border-b border-foreground/30 border-dashed">
        <div className="max-w-7xl mx-auto border-x">
          <VideoPlayerSkeleton />
        </div>
        <div className="border-t">
          <div className="h-10 border-x max-w-7xl mx-auto"></div>
        </div>
      </div>

      <ContentDetailsSkeleton />
      <ContentProviderSkeleton />
      <ContentCastSkeleton />
      <ContentReviewsSkeleton />
      <ContentSimilarSkeleton />

      {/* Footer (static) */}
      <Footer />
    </div>
  );
}
