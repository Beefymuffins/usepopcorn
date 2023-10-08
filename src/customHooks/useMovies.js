import { useEffect, useState } from 'react';

// * CUSTOM HOOK: Has to use at least ONE react hook; otherwise its a regular function

// * THIS IS A FUNCTION NOT A COMPONENT

const apiKey = process.env.REACT_APP_API_KEY;
console.log(apiKey);

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Call the passed in callback it it exist (needs passed into useMovies(query, callback))
    // callback?.();

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

    // Call the function
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

  return { movies, isLoading, error };
}
