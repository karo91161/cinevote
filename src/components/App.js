import NavBar from "./navbar/NavBar";
import Main from "./Main";
import { useEffect, useState } from "react";
import Logo from "./navbar/Logo";
import NumRersults from "./navbar/NumRersults";
import Search from "./navbar/Search";
import Box from "./common/Box";
import MovieList from "./list/MovieList";
import WatchedMoviesList from "./watched/WatchedMoviesList";
import WatchedSummary from "./watched/WatchedSummary";
import Loader from "./common/Loader";
import ErrorMessage from "./common/ErrorMessage";
import MovieDetails from "./list/MovieDetails";

const KEY = process.env.REACT_APP_OMDB_KEY;

export const average = (arr) => {
  if (arr.length === 0) return 0;
  return (
    Math.round((arr.reduce((acc, cur) => acc + cur, 0) / arr.length) * 100) /
    100
  );
};

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // another example to handle the watched movie duplication issue here:
    // setWatched((watched) => {
    //   const exists = watched.some((m) => m.imdbID === movie.imdbID);
    //   return exists ? watched : [...watched, movie];
    // });
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      // browser APi to handle race condition and fetch data cleanup
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          setMovies(data.Search);
          setError("");
        } catch (err) {
          console.error(err.message);

          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 2) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumRersults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {!isLoading && !error && (
            <MovieList onSelectMovie={handleSelectMovie} movies={movies} />
          )}
          {error && <ErrorMessage message={error}></ErrorMessage>}
          {isLoading && <Loader />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
