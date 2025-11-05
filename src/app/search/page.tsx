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

  const movie1 = {
    adult: false,
    backdrop_path: "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    genre_ids: [28, 12, 878],
    id: 101,
    original_language: "en",
    original_title: "Avatar: The Way of Water",
    overview:
      "Jake Sully lives with his newfound family on Pandora. When a familiar threat returns, he must fight once more to protect their world.",
    popularity: 9000.123,
    poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    release_date: "2022-12-14",
    title: "Avatar: The Way of Water",
    video: false,
    vote_average: 7.6,
    vote_count: 5200,
  };

  const movie2 = {
    adult: false,
    backdrop_path: "/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
    genre_ids: [878, 12, 28],
    id: 102,
    original_language: "en",
    original_title: "Guardians of the Galaxy Vol. 3",
    overview:
      "Peter Quill rallies his team to defend the universe and protect one of their own — a mission that could mean the end of the Guardians.",
    popularity: 8200.456,
    poster_path: "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    release_date: "2023-05-03",
    title: "Guardians of the Galaxy Vol. 3",
    video: false,
    vote_average: 8.0,
    vote_count: 6700,
  };

  const movie3 = {
    adult: false,
    backdrop_path: "/aHckrLZlknTOrY1rPr6jYHTXo9A.jpg",
    genre_ids: [28, 53],
    id: 103,
    original_language: "en",
    original_title: "John Wick: Chapter 4",
    overview:
      "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table.",
    popularity: 7800.345,
    poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    release_date: "2023-03-22",
    title: "John Wick: Chapter 4",
    video: false,
    vote_average: 8.1,
    vote_count: 4200,
  };

  const movie4 = {
    adult: false,
    backdrop_path: "/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg",
    genre_ids: [16, 12, 35, 14],
    id: 104,
    original_language: "en",
    original_title: "Puss in Boots: The Last Wish",
    overview:
      "Puss in Boots discovers that his passion for adventure has taken its toll — he has burned through eight of his nine lives.",
    popularity: 7200.321,
    poster_path: "/kuf6dutpsT0vSVehic3EZIqkOBt.jpg",
    release_date: "2022-12-21",
    title: "Puss in Boots: The Last Wish",
    video: false,
    vote_average: 8.3,
    vote_count: 8700,
  };

  const movie5 = {
    adult: false,
    backdrop_path: "/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
    genre_ids: [28, 35, 80],
    id: 105,
    original_language: "en",
    original_title: "The Man from Toronto",
    overview:
      "A case of mistaken identity forces a bumbling entrepreneur to team up with a notorious assassin known as The Man from Toronto.",
    popularity: 6200.213,
    poster_path: "/uTCfTibqtk4f90cC59bLPMOmsfc.jpg",
    release_date: "2022-06-24",
    title: "The Man from Toronto",
    video: false,
    vote_average: 6.2,
    vote_count: 2200,
  };

  const movie6 = {
    adult: false,
    backdrop_path: "/b1Y8SUb12gPHCSSSNlbX4nB3IKy.jpg",
    genre_ids: [16, 12, 35, 10751],
    id: 106,
    original_language: "en",
    original_title: "The Super Mario Bros. Movie",
    overview:
      "While working underground to fix a water main, Mario and Luigi are transported to a magical new world where they get separated.",
    popularity: 9400.998,
    poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    release_date: "2023-04-05",
    title: "The Super Mario Bros. Movie",
    video: false,
    vote_average: 7.8,
    vote_count: 8500,
  };

  const movie7 = {
    adult: false,
    backdrop_path: "/faXT8V80JRhnArTAeYXz0Eutpv9.jpg",
    genre_ids: [16, 28, 12],
    id: 107,
    original_language: "en",
    original_title: "Spider-Man: Across the Spider-Verse",
    overview:
      "Miles Morales embarks on a new adventure across the Multiverse where he meets a team of Spider-People charged with protecting its existence.",
    popularity: 8800.456,
    poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    release_date: "2023-06-02",
    title: "Spider-Man: Across the Spider-Verse",
    video: false,
    vote_average: 8.7,
    vote_count: 12000,
  };

  const movie8 = {
    adult: false,
    backdrop_path: "/aWeKITRFbbwY8txG5uCj4rMCfSP.jpg",
    genre_ids: [28, 12, 878],
    id: 108,
    original_language: "en",
    original_title: "Black Panther: Wakanda Forever",
    overview:
      "Queen Ramonda, Shuri, and the Dora Milaje fight to protect their nation from intervening world powers after King T'Challa's death.",
    popularity: 8100.456,
    poster_path: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    release_date: "2022-11-09",
    title: "Black Panther: Wakanda Forever",
    video: false,
    vote_average: 7.3,
    vote_count: 6200,
  };

  const movie9 = {
    adult: false,
    backdrop_path: "/Aqldsq65Nj1KAkQD2MzkZsAk5N5.jpg",
    genre_ids: [28, 12, 53],
    id: 109,
    original_language: "en",
    original_title: "Mission: Impossible – Dead Reckoning Part One",
    overview:
      "Ethan Hunt and his IMF team must track down a terrifying new weapon that threatens humanity before it falls into the wrong hands.",
    popularity: 8500.234,
    poster_path: "/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
    release_date: "2023-07-12",
    title: "Mission: Impossible – Dead Reckoning Part One",
    video: false,
    vote_average: 7.6,
    vote_count: 5400,
  };

  const movie10 = {
    adult: false,
    backdrop_path: "/dKqa850uvbNSCaQCV4Im1XlzEtQ.jpg",
    genre_ids: [35, 80, 9648],
    id: 110,
    original_language: "en",
    original_title: "Glass Onion: A Knives Out Mystery",
    overview:
      "Detective Benoit Blanc travels to Greece to peel back the layers of a mystery involving a new cast of colorful suspects.",
    popularity: 6400.654,
    poster_path: "/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg",
    release_date: "2022-12-23",
    title: "Glass Onion: A Knives Out Mystery",
    video: false,
    vote_average: 7.1,
    vote_count: 6900,
  };

  const allMovies = [
    movie1,
    movie2,
    movie3,
    movie4,
    movie5,
    movie6,
    movie7,
    movie8,
    movie9,
    movie10,
  ];

  const { handleAddToWatchHistory, handleRemoveFromWatchHistory } =
    useWatchHistory();

  return (
    <div className="flex gap-6">
      <button
        onClick={() => {
          handleAddToWatchHistory({
            contentType: "movie",
            contentDetails: allMovies[Math.floor(Math.random() * 10)],
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
