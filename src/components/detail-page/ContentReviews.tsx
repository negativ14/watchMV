import fetchTMDB from "@/lib/fetchTMDB";
import { BASE_URL } from "@/lib/constants";
import { ContentMode } from "@/types/types";
import Reviews from "./Reviews";

export default async function ContentReviews({
  contentType,
  id,
}: {
  contentType: ContentMode;
  id: number;
}) {
  const url = `${BASE_URL}/${contentType}/${id}/reviews?language=en-US&page=1`;
  const data = await fetchTMDB(url);
  console.log("teh urla nd dat", url,data)
  const reviews = data.results;

  return (
    <div>
      <Reviews reviews={reviews} />
    </div>
  );
}

// use username content
//10-11 reviews present

//'https://api.themoviedb.org/3/tv/series_id/reviews?language=en-US&page=1'

// {
//   "id": 1399,
//   "page": 1,
//   "results": [
//     {
//       "author": "lmao7",
//       "author_details": {
//         "name": "lmao7",
//         "username": "lmao7",
//         "avatar_path": "/ekmYOUU4tfx9zGGadjRdE7UPce.jpg",
//         "rating": 9
//       },
//       "content": "I started watching when it came out as I heard that fans of LOTR also liked this. I stopped watching after Season 1 as I was devastated lol kinda. Only 2015 I decided to continue watching and got addicted like it seemed complicated at first, too many stories and characters. I even used a guide from internet like family tree per house while watching or GOT wiki so I can have more background on the characters. For a TV series, this show can really take you to a different world and never knowing what will happen. It is very daring that any time anybody can just die (I learned not to be attached and have accepted that they will all die so I won't be devastated hehe). I have never read the books but the show is entertaining and you will really root for your faves and really hate on those you hate. \r\n\r\nFantasy, action, drama, comedy, love...and lots of surprises!",
//       "created_at": "2017-02-20T05:47:28.872Z",
//       "id": "58aa82f09251416f92006a3a",
//       "updated_at": "2021-06-23T15:57:54.649Z",
//       "url": "https://www.themoviedb.org/review/58aa82f09251416f92006a3a"
//     },
//     {
//       "author": "Vlad Ulbricht",
//       "author_details": {
//         "name": "Vlad Ulbricht",
//         "username": "PresidentPutin",
//         "avatar_path": "/srVsbbWgrmA4lmpqsrIYRYxJerc.jpg",
//         "rating": 9
//       },
//       "content": "Cruel, bloody, vulgar, Machiavellian, unrepentant. And that is just the writing. The camera angles, the score, the pacing mesh together for grand storytelling: a mix of horror, swords and sorcery, and endless treachery. \r\n\r\nAnd all of that would be somewhat squandered if it wasn't for the best casting I've ever seen. From Lena Headey as soft spoken Cersei to Peter Vaughan as ancient Maester Aemon, each character pulses with depth and believability. Peter Dinklage may have sacrificed a virgin princess to get this role; I've never seen a better fit, not in size (though there is that) but in the way his eyes convey shrewd arrogance coupled with unabashed debauchery.",
//       "created_at": "2017-05-11T03:53:19.211Z",
//       "id": "5913e02fc3a3683a93004984",
//       "updated_at": "2021-06-23T15:57:57.184Z",
//       "url": "https://www.themoviedb.org/review/5913e02fc3a3683a93004984"
//     },
//     {
//       "author": "tmdb92828292",
//       "author_details": {
//         "name": "",
//         "username": "tmdb92828292",
//         "avatar_path": null,
//         "rating": 10
//       },
//       "content": "LOTR meets House of Cards. Imagine a fantasy novel if all of the beasts and mythologies were transported to the real world. There's no such thing as a happy ending, or an ending for that matter (unless you're dead). So as you watch the show make predictions, draw conspiracy theories, and watch them blow up in your face. This show is that kind of a ride!",
//       "created_at": "2018-08-24T00:54:33.538Z",
//       "id": "5b7f57499251416c89002511",
//       "updated_at": "2021-06-23T15:58:11.571Z",
//       "url": "https://www.themoviedb.org/review/5b7f57499251416c89002511"
//     },
