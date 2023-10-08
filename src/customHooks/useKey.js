import { useEffect } from 'react';

//* REUSABLE CUSTOM HOOK

// Allow the use of keypress
export function useKey(key, action) {
  useEffect(() => {
    const callback = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };

    document.addEventListener('keydown', callback);

    // Remove the EventListener (has to have the SAME callback function as the addEventListener)
    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [key, action]);
}
