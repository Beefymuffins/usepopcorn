import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import StarRating from './components/StarRating';

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating color="blue" maxRating={10} setMovieRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />

    {/* Testing out the StarRating Component */}
    {/* <StarRating maxRating={5} />
    <StarRating
      maxRating={5}
      color="purple"
      messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
    />
    <StarRating maxRating={10} size={24} color="red" />
    <StarRating maxRating={10} size={32} color="green" defaultRating={5} />

    <Test /> */}
  </React.StrictMode>
);
