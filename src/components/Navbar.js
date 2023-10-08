/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { useKey } from '../customHooks/useKey';

const NavBar = ({ children }) => <nav className="nav-bar">{children}</nav>;

export default NavBar;

// ------------------- Navbar broken into reusable components ------------------- //
export const Logo = () => (
  <div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
  </div>
);

export const SearchBar = ({ query, setQuery }) => {
  //  WRONG WAY OF SELECTING ELEMENTS
  // useEffect(() => {
  //   const el = document.querySelector('.search');
  //   console.log(el);
  //   el.focus();
  // }, []);

  //  RIGHT WAY OF SELECTING ELEMENTS
  const inputEl = useRef(null);

  // Allow the use of keypress
  useKey('Enter', () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    // on focus of searchbar, delete previous typed search
    setQuery('');
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

export const NumResults = ({ movies }) => (
  <p className="num-results">
    Found <strong>{movies.length}</strong> results
  </p>
);
