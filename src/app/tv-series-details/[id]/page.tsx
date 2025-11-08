import ContentCast from "@/components/detail-page/ContentCast";
import ContentDetails from "@/components/detail-page/ContentDetails";
import ContentProvider from "@/components/detail-page/ContentProvider";
import ContentRecommendation from "@/components/detail-page/ContentRecommendation";
import ContentReviews from "@/components/detail-page/ContentReviews";
import Footer from "@/components/Footer";
import HomeNav from "@/components/HomeNav";
import VideoPlayer from "@/components/VideoPlayer";

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
          <VideoPlayer videoKey="7ogVp-d-CdE" />
        </div>
        <div className="border-t">
          <div className="h-10 border-x max-w-7xl mx-auto"></div>
        </div>
      </div>
      <ContentDetails contentType="tv" id={id} />
      <ContentProvider contentType="tv" id={id} />
      <ContentCast contentType="tv" id={id} />
      <ContentReviews contentType="tv" id={id} />
      <ContentRecommendation contentType="tv" id={id} />
      <Footer />
    </div>
  );
}
