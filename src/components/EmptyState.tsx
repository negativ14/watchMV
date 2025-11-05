import { ContentMode } from "@/types/types";
import Link from "next/link";

export default function EmptyState({
  message,
  contentType,
}: {
  message: string;
  contentType?: ContentMode;
}) {
  return (
    <div className="flex flex-col gap-2 p-4">
      <p>{message}</p>
      <p className="text-sm text-muted-foreground mt-2">
        Start exploring and add something!{" "}
        {contentType === "tv" ? (
          <Link
            href={"/tv-series"}
            className="text-foreground underline underline-offset-4 ml-1"
          >
            Explore now
          </Link>
        ) : (
          <Link
            href={"/"}
            className="text-foreground underline underline-offset-4 ml-1"
          >
            Explore now
          </Link>
        )}
      </p>
    </div>
  );
}
