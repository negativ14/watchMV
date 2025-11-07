import ContentCast from "@/components/detail-page/ContentCast";
import ContentDetails from "@/components/detail-page/ContentDetails";
import ContentProvider from "@/components/detail-page/ContentProvider";
import ContentReviews from "@/components/detail-page/ContentReviews";
import HomeNav from "@/components/HomeNav";
import VideoPlayer from "@/components/VideoPlayer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return (
    <div>
      <HomeNav />
      <VideoPlayer videoKey="YQeUmSD1c3g" />
      <ContentCast contentType="tv" id={id} />
      <ContentDetails contentType="tv" id={id} />
      <ContentProvider contentType="tv" id={id} />
      {/* <ContentReviews contentType="tv" id={id} /> */}
    </div>
  );
}
