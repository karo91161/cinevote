import NavBar from "./navbar/NavBar";
import Main from "./Main";
import { useState } from "react";
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
import { useMovies } from "./common/useMovies";
import { useLocalStorage } from "./common/useLocalStorage";

export const average = (arr) => {
  if (arr.length === 0) return 0;
  return (
    Math.round((arr.reduce((acc, cur) => acc + cur, 0) / arr.length) * 100) /
    100
  );
};

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  //calling my custom hook which handle local storage get and set operations globally
  const [watched, setWatched] = useLocalStorage([], "watched");

  //calling my custom fetch hook and returning the needed state values for the JSX here
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

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
