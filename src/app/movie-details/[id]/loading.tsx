import ContentCastSkeleton from "@/components/skeletons/contentCastSkeleton";
import ContentDetailsSkeleton from "@/components/skeletons/contentDetailsSkeletons";
import ContentProviderSkeleton from "@/components/skeletons/contentProvidersSkeleton";
import ContentSimilarSkeleton from "@/components/skeletons/contentSimilarSkeleton";
import ContentReviewsSkeleton from "@/components/skeletons/contentReviewsSkeletons";
import Footer from "@/components/Footer";
import HomeNav from "@/components/HomeNav";
import VideoPlayerSkeleton from "@/components/skeletons/videoPlayerSkeleton";

export default function Loading() {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="max-w-[1360px] w-full h-full border-x border-foreground/30 border-dashed"></div>
      </div>

      <HomeNav />

      <div className="border-b border-foreground/30 border-dashed">
        <div className="max-w-7xl mx-auto border">
          <VideoPlayerSkeleton />
        </div>
        <div className="border-t h-10">
          <div className="max-w-7xl mx-auto border-x h-full"></div>
        </div>
      </div>

      <ContentDetailsSkeleton />
      <ContentProviderSkeleton />
      <ContentCastSkeleton />
      <ContentReviewsSkeleton />
      <ContentSimilarSkeleton />

      <Footer />
    </div>
  );
}
