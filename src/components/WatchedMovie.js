import React from 'react';

const WatchedMovieList = ({ watched, onDeleteWatched }) => (
  <ul className="list">
    {watched.map((movie) => (
      <WatchedMovie
        movie={movie}
        key={movie.imdbID}
        onDeleteWatched={onDeleteWatched}
      />
    ))}
  </ul>
);

export default WatchedMovieList;

export const WatchedMovie = ({ movie, onDeleteWatched }) => (
  <li>
    <img src={movie.poster} alt={`${movie.title} poster`} />
    <h3>{movie.title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>

      <button
        type="button"
        className="btn-delete"
        onClick={() => onDeleteWatched(movie.imdbID)}
      >
        X
      </button>
    </div>
  </li>
);
