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

// const fakeMovieData = new MovieData(
//   "Lorem Ipsum",
//   "https://m.media-amazon.com/images/M/MV5BNTNkNzJmY2MtOGNjYi00NDJmLWIyZTQtNmFmMGQ5M2VlOTI0XkEyXkFqcGc@._V1_QL75_UY281_CR0,0,190,281_.jpg",
//   "9.0",
//   "2000",
//   "Adventure",
//   "Lorem ipsum odor amet, consectetuer adipiscing elit. Facilisis amet pellentesque habitant interdum sagittis convallis condimentum montes torquent. Magna dignissim pretium natoque integer est iaculis molestie quisque lobortis. Consequat magna est ad hac natoque vulputate ad. In urna tristique nostra lectus lacus. Mollis elit ac dapibus, dapibus et pulvinar! Maximus lorem ridiculus phasellus sit suspendisse. Ullamcorper vel facilisis maximus sagittis nec consequat nisi nostra. Neque lectus morbi imperdiet natoque pellentesque ipsum dui. Urna purus ut sem maecenas fringilla; class efficitur. Mauris fermentum porttitor porta ullamcorper maximus himenaeos. Facilisis efficitur natoque elit, mauris facilisis risus. Sapien accumsan feugiat nisi tincidunt aliquet hac. Velit congue vestibulum imperdiet accumsan bibendum maecenas. Nostra scelerisque condimentum rhoncus litora potenti gravida magna ultrices. Laoreet magnis posuere tellus non augue dolor proin ridiculus. Morbi erat ad adipiscing dignissim; eleifend justo. Dolor sociosqu mollis euismod nullam suscipit quam. Netus non bibendum vel tortor bibendum in pulvinar a non. Est enim massa fames montes erat. Taciti lobortis pharetra fames bibendum mattis fames nunc cursus magna. Phasellus ridiculus nascetur penatibus conubia scelerisque, quam tempus. Fusce mauris vestibulum ipsum primis enim faucibus facilisis. Placerat morbi ad dapibus nullam commodo suspendisse. Per hac ipsum hac inceptos turpis curabitur sociosqu gravida. Nascetur nostra tempor nisl aptent donec mauris a non lacus. Per facilisi fames senectus integer diam primis ac. Nunc vestibulum nam augue massa risus potenti scelerisque. Lectus sem varius dictum nec vehicula tortor fames penatibus. Congue porttitor tempus dui habitant dolor class. Malesuada sollicitudin ante lorem maecenas lacus ad euismod morbi. Porta eros finibus eu velit vestibulum cubilia sapien. Urna ligula molestie ex vivamus in ut varius. Lectus pulvinar adipiscing hendrerit parturient at; nec tempor. Condimentum feugiat dui suscipit conubia auctor nostra urna. Rutrum efficitur fusce dis vitae dignissim. Habitant mus volutpat dui, pretium velit auctor phasellus hendrerit. Neque inceptos non nostra vitae ridiculus rhoncus aliquam vehicula. Aenean dui iaculis condimentum leo sit mauris. Facilisi suspendisse morbi nunc magna eleifend viverra integer. Netus tellus suspendisse vehicula duis felis volutpat. Proin senectus parturient pretium fusce eleifend condimentum nam. Suscipit at laoreet cursus varius vel pharetra, libero fusce volutpat. Congue neque sit id vivamus auctor pulvinar nisl.",
//   "R",
//   "Lorem Director Guy",
//   "Lorem Writer Guy",
//   "Lorem Actors",
//   "1000 minutes",
//   "10,000"
// );

// const sleep = (delay: number) =>
//   new Promise((resolve) => setTimeout(resolve, delay));

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
    // await sleep(3000);

    // return fakeMovieData;
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
};
