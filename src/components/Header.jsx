// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Encrypt } from '../utils/EncryptUtils';
import { GenerateUniqueRandomNumber } from '../utils/NumberUtils';

const Header = () => {
  const location = useLocation();
  const difficultyOptions = ["easy", "medium", "hard"];
  const [previousRandomNumber, setPreviousRandomNumber] = useState(null);
  const [randomQuizLink, setRandomQuizLink] = useState(generateRandomQuizLink());


  function generateRandomQuizLink() {
    const quizParams = {
      amount: GenerateUniqueRandomNumber(3, 12, previousRandomNumber),
      ...(Math.random() < 0.25 && { category: Math.floor(Math.random() * (30 - 12 + 1)) + 12}),
      ...(Math.random() < 0.3 && { difficulty: difficultyOptions[Math.floor(Math.random() * difficultyOptions.length)]}),
    };
  
    return `/quiz/${Encrypt(quizParams)}`;
  }

  function handleRandomQuizClick() {
    const newLink = generateRandomQuizLink();
    setPreviousRandomNumber(newLink.amount);
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
        <NavLink to={randomQuizLink} className={`mx-2 hover:text-gray-300 ${location.pathname.startsWith('/quiz') ? 'text-gray-700' : ''}`}
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
