/* eslint-disable react/jsx-no-bind */
import { useState } from 'react';
import NavBar, { Logo, NumResults, SearchBar } from './components/Navbar';
import Main from './components/Main';
import { MovieList } from './components/ListBox';
import { WatchedSummary } from './components/WatchedBox';
import Box from './components/Box';
import WatchedMovieList from './components/WatchedMovie';
import { MovieDetails } from './components/MovieDetails';
import { useMovies } from './customHooks/useMovies';
import { useLocalStorageState } from './customHooks/useLocalStorageState';

/**
 * COMPOSITION
 * Made the Box component reuseable.(No longer need these, save for example)
 *  import ListBox from './components/ListBox';
 *  import WatchedBox, { WatchedSummary } from './components/WatchedBox';
 */

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('');
  // CUSTOM HOOKS
  // Use custom hook to get the movie, destructor what you need from it (what is returned from the hook)
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], 'watched');

  // useEffect(() => {
  //   fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}`)
  //     .then((res) => res.json())
  //     .then((data) => setMovies(data.Search));
  // }, []);

  function handleSelectMovie(id) {
    // CLick to open movie, click again to close movie
    setSelectedId((selectedID) => (id === selectedID ? null : id));
  }

  // Close the 'Movies you watched' box when searching for new movie
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatch(movie) {
    setWatched((currentWatchedMovieArray) => [
      ...currentWatchedMovieArray,
      movie,
    ]);

    // Add the watched movies to local storage (persist data on refresh)
    // Need to make the new array because the watched state has not been updated yet
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  }

  // Delete the movie fro list
  function handleDeleteWatched(id) {
    // filter out the movies we don't want from the current watchedMovies array (only keep movies with id's that DON'T match the passed in ID)
    setWatched((currentlyWatchedArray) =>
      currentlyWatchedArray.filter(
        (selectedMovie) => selectedMovie.imdbID !== id
      )
    );
  }

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* Ugly way of doing it */}
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}

          {/* 
            Only 3 Conditions can happen and ONLY 1 can be true:
            1.) Is loading = true;
            2.) Not loading && no error;
            3.) Is a error;
          */}

          {isLoading && <Loader />}
          {/* Data is NOT loading && there is NO error, then display Movies list */}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatch}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
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

export const Loader = () => {
  return <p className="loader">Loading...</p>;
};

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
}

/* Alternately too 'children' can use 'element' to pass the component explicitly (Used in react-router) 
    <Box element={<MovieList movies={movies} />} />

    <Box
      element={
        <>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </>
      }
    />
*/
