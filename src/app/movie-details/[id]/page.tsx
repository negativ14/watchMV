import ContentCast from "@/components/detail-page/ContentCast";
import ContentDetails from "@/components/detail-page/ContentDetails";
import ContentProvider from "@/components/detail-page/ContentProvider";
import Footer from "@/components/Footer";
import HomeNav from "@/components/HomeNav";
import VideoPlayer from "@/components/VideoPlayer";

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
          <VideoPlayer videoKey="7ogVp-d-CdE" />
        </div>
        <div className="border-t h-10">
          <div className="max-w-7xl mx-auto border-x h-full"></div>
        </div>
      </div>

      <ContentDetails contentType="movie" id={id} />
      <ContentProvider contentType="movie" id={id} />
      <ContentCast contentType="movie" id={id} />
      <Footer />
    </div>
  );
}
