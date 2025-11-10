import { IReview } from "./ContentReviews";
import ReviewCard from "./ReviewCard";

export default function Reviews({ reviews }: { reviews: IReview[] }) {
  return (
    <div className="border-b border-foreground/30 border-dashed">
      <div className="max-w-7xl mx-auto border-x">
        <h1 className="text-2xl font-semibold tracking-tight px-4 py-1 border-b">
          Reviews
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="flex flex-col gap-4">
            {reviews?.slice(0, 3).map((item) => (
              <ReviewCard key={item.id} item={item} />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {reviews?.slice(3, 6).map((item) => (
              <ReviewCard key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="h-10 border-t" />
      </div>
    </div>
  );
}
