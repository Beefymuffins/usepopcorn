import { useState } from 'react';
import { tempMovieData, tempWatchedData } from './data';
import NavBar, { Logo, NumResults, SearchBar } from './components/Navbar';
import Main from './components/Main';
import { MovieList } from './components/ListBox';
import { WatchedSummary } from './components/WatchedBox';
import Box from './components/Box';
import WatchedMovieList from './components/WatchedMovie';
/**
 * COMPOSITION
 * Made the Box component reuseable.(No longer need these, save for example)
 *  import ListBox from './components/ListBox';
 *  import WatchedBox, { WatchedSummary } from './components/WatchedBox';
 */

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
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
