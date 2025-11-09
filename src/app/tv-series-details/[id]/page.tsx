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
import ContentReviewsSkeleton from "@/components/skeletons/contentReviewsSkeletons";
import ContentSimilarSkeleton from "@/components/skeletons/contentSimilarSkeleton";
import VideoContainerSkeleton from "@/components/skeletons/videoContainerSkeleton";
import VideoContainer from "@/components/videoContainer";

export const revalidate = 7200;

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 right-0 flex justify-center z-50  pointer-events-none">
        <div className="max-w-[1360px] w-full h-full border-x border-dashed border-foreground/30" />
      </div>
      <HomeNav />
      <div className="border-b border-foreground/30 border-dashed">
        <div className="max-w-7xl mx-auto border-x ">
          <Suspense fallback={<VideoContainerSkeleton />}>
            <VideoContainer contentType="tv" id={id} />
          </Suspense>
        </div>
        <div className="border-t">
          <div className="h-10 border-x max-w-7xl mx-auto"></div>
        </div>
      </div>
      <Suspense fallback={<ContentDetailsSkeleton />}>
        <ContentDetails contentType="tv" id={id} />
      </Suspense>

      <Suspense fallback={<ContentProviderSkeleton />}>
        <ContentProvider contentType="tv" id={id} />
      </Suspense>

      <Suspense fallback={<ContentCastSkeleton />}>
        <ContentCast contentType="tv" id={id} />
      </Suspense>

      <Suspense fallback={<ContentReviewsSkeleton />}>
        <ContentReviews contentType="tv" id={id} />
      </Suspense>

      <Suspense fallback={<ContentSimilarSkeleton />}>
        <ContentSimilar contentType="tv" id={id} />
      </Suspense>

      <Footer />
    </div>
  );
}
