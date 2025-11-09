"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Search page error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-2">
        Something went wrong!!!
      </h1>
      <p className="text-muted-foreground mb-6">
        Don’t worry — this may be cause due to excess use of api. Try sometimes later.
      </p>
      <div className="flex gap-3">
        <Button onClick={() => reset()}>Try Again</Button>
        <Button
          variant="outline"
          onClick={() => router.push("/")}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
