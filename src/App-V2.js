/* eslint-disable react/jsx-no-bind */
import { useEffect, useState } from 'react';
import { tempMovieData, tempWatchedData } from './data';
import NavBar, { Logo, NumResults, SearchBar } from './components/Navbar';
import Main from './components/Main';
import { MovieList } from './components/ListBox';
import { WatchedSummary } from './components/WatchedBox';
import Box from './components/Box';
import WatchedMovieList from './components/WatchedMovie';
import { MovieDetails } from './components/MovieDetails';
/**
 * COMPOSITION
 * Made the Box component reuseable.(No longer need these, save for example)
 *  import ListBox from './components/ListBox';
 *  import WatchedBox, { WatchedSummary } from './components/WatchedBox';
 */

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const apiKey = process.env.REACT_APP_API_KEY;

  // useEffect(() => {
  //   fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}`)
  //     .then((res) => res.json())
  //     .then((data) => setMovies(data.Search));
  // }, []);

  function handleSelectMovie(id) {
    // CLick to open movie, click again to close movie
    setSelectedId((selectedID) => (id === selectedID ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatch(movie) {
    setWatched((currentWatchedMovieArray) => [
      ...currentWatchedMovieArray,
      movie,
    ]);
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

  // Fetch Movies (ASYNC)
  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        // Reset ERROR STATE before searching
        setError('');

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error('Something went wrong with fetching movies!');

        const data = await res.json();

        if (data.Response === 'False') throw new Error('Movie Not Found!');

        setMovies(data.Search);
        setError('');
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error(error.message);
          setError(error.message);
        }
      } finally {
        // finally: Will ALWAYS be ran at the end
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    // Close the 'Movies you watched' box when searching for new movie
    handleCloseMovie();

    fetchMovies();

    /**
     * Cleanup function
     *
     * On every keystroke the component will rerender, causing the cleanup function to run
     * canceling the initial request and replacing it with the new one
     *
     * See example of this by:
     * watching the network tab in chrome and typing a movie in the searchbar
     */
    return () => {
      controller.abort();
    };
  }, [query]);

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
