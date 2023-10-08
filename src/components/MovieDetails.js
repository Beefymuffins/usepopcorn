import React, { useEffect, useRef, useState } from 'react';
import StarRating from './StarRating';
import { Loader } from '../App';
import { useKey } from '../customHooks/useKey';

const apiKey = process.env.REACT_APP_API_KEY;

export const MovieDetails = ({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  // Crete a ref to count the amount a times a rating was clicked before adding the movie with a final rating
  const countRef = useRef(0);

  // Update refs with useEffect (shouldn't do it in render logic)
  // Update the '.current' value
  useEffect(() => {
    if (userRating) countRef.current += 1;
  }, [userRating]);

  // Check if the array of already watched movies, contains the ID of the current movie trying to be added
  const isWatched = watched
    .map((watchedMovie) => watchedMovie.imdbID)
    .includes(selectedId);

  // Check if the movie is already rated by the user
  const watchedUserRating = watched.find(
    (watchedMovie) => watchedMovie.imdbID === selectedId
  )?.userRating;

  // Change keys to lowercase
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  // Allow the use of keypress
  useKey('Escape', onCloseMovie);

  // Get movie details when selecting movie
  useEffect(() => {
    try {
      const getMovieDetails = async () => {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      };

      getMovieDetails();
    } catch (error) {
      console.error(error.message);
    }
  }, [selectedId]);

  // Set the Document title to selected movie title
  useEffect(() => {
    if (!title) return;

    document.title = `Movie | ${title}`;

    // Clean up function (prevents bugs, like 'race conditions')
    return () => {
      document.title = 'usePopcorn';
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button type="button" className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {/* Check the movie is not already in the watched list, before allowing to be rated/added. If so, display the users previous rating */}
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      type="button"
                      className="btn-add"
                      onClick={handleAdd}
                    >
                      + Add To List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {watchedUserRating} / 10 <span>⭐</span>
                </p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Staring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};
