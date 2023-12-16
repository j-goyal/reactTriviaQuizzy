// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Encrypt } from '../utils/EncryptUtils';

const Header = () => {
  const location = useLocation();

  const [previousRandomNumber, setPreviousRandomNumber] = useState(null);
  const [randomQuizLink, setRandomQuizLink] = useState(generateRandomQuizLink());

  function generateRandomNumber(min, max) {
    const newRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return newRandomNumber !== previousRandomNumber ? newRandomNumber : generateRandomNumber(min, max);
  }

  function generateRandomQuizLink() {
    const quizParams = {
      amount: generateRandomNumber(3, 12),
    };

    return `/quiz/${Encrypt(quizParams)}`;
  }

  function handleRandomQuizClick() {
    const newLink = generateRandomQuizLink();
    setPreviousRandomNumber(newLink.amount); // Store the new random number
    setRandomQuizLink(newLink);
  }

  return (
    <header className="bg-blue-500 text-white p-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        TriviaQuizzy
      </Link>
      <nav>
        <NavLink to="/" className={({isActive}) => `mx-2 hover:text-gray-300 ${isActive ? "text-gray-700" : ""}`}>
          Home
        </NavLink>
        <NavLink to={randomQuizLink}  className={`mx-2 hover:text-gray-300 ${location.pathname.startsWith('/quiz') ? 'text-gray-700' : ''}`}
           onClick={handleRandomQuizClick}>
          Random Quiz
        </NavLink>
        <NavLink to="/results" className={({isActive}) => `mx-2 hover:text-gray-300 ${isActive ? "text-gray-700" : ""}`}>
          Results
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
