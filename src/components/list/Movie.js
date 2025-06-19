export default function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)} key={movie.imdbID}>
      <img
        src={movie.Poster}
        alt={`Poster of ${movie.Title} movie`}
        onError={(e) => {
          if (
            e.target.src !==
            window.location.origin + "/images/default-poster.png"
          ) {
            e.target.src = "/images/default-poster.png";
          }
        }}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
