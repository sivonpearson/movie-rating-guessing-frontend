export class MovieData {
  title: string;
  posterURL: string;
  rating_score: string;
  year: string;
  genre: string;
  plot: string;
  MPA_rating: string;
  director: string;
  writer: string;
  actors: string;
  runtime: string;
  num_votes: string;

  constructor(
    title: string,
    posterURL: string,
    rating_score: string,
    year: string,
    genre: string,
    plot: string,
    MPA_rating: string,
    director: string,
    writer: string,
    actors: string,
    runtime: string,
    num_votes: string
  ) {
    this.title = title;
    this.posterURL = posterURL;
    this.rating_score = rating_score;
    this.year = year;
    this.genre = genre;
    this.plot = plot;
    this.MPA_rating = MPA_rating;
    this.director = director;
    this.writer = writer;
    this.actors = actors;
    this.runtime = runtime;
    this.num_votes = num_votes;
  }
}

const backend_url =
  "https://movie-rating-guessing-backend.vercel.app/api/proxy";

// OMDb API query
export const fetchMovieData = async () => {
  try {
    const response = await fetch(backend_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Cannot find movie.");
    }

    const data = await response.json();

    console.log(data);

    /*
    We want:
    - Title
    - Year
    - Poster
    - Genre
    - Plot
    - IMDb score (1-10)
    - Rated
    - Director
    - Writer
    - Actors
    - Runtime
    */

    return new MovieData(
      data.Title,
      data.Poster,
      data.imdbRating,
      data.Year,
      data.Genre,
      data.Plot,
      data.Rated,
      data.Director,
      data.Writer,
      data.Actors,
      data.Runtime,
      data.imdbVotes
    );
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
};
