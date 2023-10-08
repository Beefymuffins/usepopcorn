/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';

const ListBox = ({ children }) => {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        type="button"
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? '–' : '+'}
      </button>

      {isOpen1 && children}
    </div>
  );
};

export default ListBox;

export const MovieList = ({ movies, onSelectMovie }) => (
  <ul className="list list-movies">
    {movies?.map((movie) => (
      <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
    ))}
  </ul>
);

export const Movie = ({ movie, onSelectMovie }) => {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};
