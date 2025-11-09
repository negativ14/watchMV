export const dynamic = "force-dynamic";
import ContentCast from "@/components/detail-page/ContentCast";
import ContentDetails from "@/components/detail-page/ContentDetails";
import ContentProvider from "@/components/detail-page/ContentProvider";
import ContentSimilar from "@/components/detail-page/ContentSimilar";
import ContentReviews from "@/components/detail-page/ContentReviews";
import Footer from "@/components/Footer";
import HomeNav from "@/components/HomeNav";
import { Suspense } from "react";
import ContentDetailsSkeleton from "@/components/skeletons/contentDetailsSkeletons";
import ContentProviderSkeleton from "@/components/skeletons/contentProvidersSkeleton";
import ContentCastSkeleton from "@/components/skeletons/contentCastSkeleton";
import ContentSimilarSkeleton from "@/components/skeletons/contentSimilarSkeleton";
import ContentReviewsSkeleton from "@/components/skeletons/contentReviewsSkeletons";
import VideoContainerSkeleton from "@/components/skeletons/videoContainerSkeleton";
import VideoContainer from "@/components/videoContainer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="max-w-[1360px] w-full h-full border-x border-foreground/30 border-dashed"></div>
      </div>

      <HomeNav />
      <div className="border-b border-foreground/30 border-dashed">
        <div className="max-w-7xl mx-auto border">
          <Suspense fallback={<VideoContainerSkeleton />}>
            <VideoContainer contentType="movie" id={id} />
          </Suspense>
        </div>
        <div className="border-t h-10">
          <div className="max-w-7xl mx-auto border-x h-full"></div>
        </div>
      </div>

      <Suspense fallback={<ContentDetailsSkeleton />}>
        <ContentDetails contentType="movie" id={id} />
      </Suspense>
      <Suspense fallback={<ContentProviderSkeleton />}>
        <ContentProvider contentType="movie" id={id} />
      </Suspense>
      <Suspense fallback={<ContentCastSkeleton />}>
        <ContentCast contentType="movie" id={id} />
      </Suspense>
      <Suspense fallback={<ContentReviewsSkeleton />}>
        <ContentReviews contentType="movie" id={id} />
      </Suspense>
      <Suspense fallback={<ContentSimilarSkeleton />}>
        <ContentSimilar contentType="movie" id={id} />
      </Suspense>
      <Footer />
    </div>
  );
}
