import { useEffect, useState } from 'react';

//* REUSABLE CUSTOM HOOK

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // Add the watched movies to local storage (persist data on refresh)
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
