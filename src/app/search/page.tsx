"use client";
import useWatchHistory from "@/hooks/useWatchHistory";
import useWatchLater from "@/hooks/useWatchLater";

export default function Page() {
  const tv = {
    backdrop_path: "/mAJ84W6I8I272Da87qplS2Dp9ST.jpg",
    first_air_date: "2023-01-23",
    genre_ids: [9648, 18],
    id: 202250,
    name: "Dirty Linen",
    origin_country: ["PH"],
    original_language: "tl",
    original_name: "Dirty Linen",
    overview:
      "To exact vengeance, a young woman infiltrates the household of an influential family as a housemaid to expose their dirty secrets. However, love will get in the way of her revenge plot.",
    popularity: 2797.914,
    poster_path: "/aoAZgnmMzY9vVy9VWnO3U5PZENh.jpg",
    vote_average: 5,
    vote_count: 13,
  };

  const movie = {
    adult: false,
    backdrop_path: "/gMJngTNfaqCSCqGD4y8lVMZXKDn.jpg",
    genre_ids: [28, 12, 878],
    id: 6401415,
    original_language: "en",
    original_title: "Ant-Man and the Wasp: Quantumania",
    overview:
      "Super-Hero partners Scott Lang and Hope van Dyne, along with with Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter Cassie Lang, find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that will push them beyond the limits of what they thought possible.",
    popularity: 8567.865,
    poster_path: "/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg",
    release_date: "2023-02-15",
    title: "Ant-Man and the Wasp: Quantumania",
    video: false,
    vote_average: 6.5,
    vote_count: 1886,
  };

  const { handleAddToWatchHistory, handleRemoveFromWatchHistory } = useWatchHistory();

  return (
    <div className="flex gap-6">
      <button
        onClick={() => {
          handleAddToWatchHistory({
            contentType: "movie",
            contentDetails: movie,
          });
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          handleRemoveFromWatchHistory(6401415);
        }}
      >
        Remove
      </button>
    </div>
  );
}
