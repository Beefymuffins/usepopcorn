import { useState } from 'react';

/**
 * Alternately too 'children' can use 'element' to pass the component explicitly
 * Instead of: const Box = ({ children }) => {}
 * Would be: const Box = ({ element }) => {}
 *
 * Children: Preferred way to do it.
 *
 */
const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button
        type="button"
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? '–' : '+'}
      </button>

      {isOpen && children}
    </div>
  );
};

export default Box;
