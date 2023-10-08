import { useEffect } from 'react';

/**
 * Each useEffect() should only do ONE thing.
 * Okay to have multiple.
 */

useEffect(() => {
  'This is the function you want to be called on mount and when rerendered (based on dependency array)';

  return () => {
    'This is where the CLEAN UP function will go (Optional: Depends on the use)';
    /**
     * Runs on two different occasions:
     *
     * 1.) Before the effect is executed again
     * 2.) After a component has unmounted
     */
  };
}, [
  'This is the dependency array. UseEffect will be recalled EVERY TIME this value here is updated',
]);
