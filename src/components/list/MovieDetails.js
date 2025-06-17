import { useEffect, useState } from "react";
import StarRating from "../common/StarRating";
import Loader from "../common/Loader";

const KEY = process.env.REACT_APP_OMDB_KEY;

export default function MovieDetails({ selectedId, onCloseMovie }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbrating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          // setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movie details");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie detail not found");
          }
          setMovie(data);
        } catch (err) {
          console.error(err.message);
          // setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
      console.log(movie.poster);
    },
    [selectedId]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img
              src={poster}
              alt={`Poster of ${title} movie`}
              onError={(e) => {
                if (
                  e.target.src !==
                  window.location.origin + "/images/default-poster.png"
                ) {
                  e.target.src = "/images/default-poster.png";
                }
              }}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbrating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating size={24} />
            </div>
            <p>
              <em>{plot}</em>
              <br />
              <br />
              <p>Starring {actors}</p>
              <br />
              <p>Directed By {director}</p>
            </p>
          </section>
        </>
      )}
    </div>
  );
}
