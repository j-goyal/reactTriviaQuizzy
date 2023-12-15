// src/components/Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        TriviaQuizzy
      </Link>
      <nav>
        <NavLink to="/" className="mx-2">
          Home
        </NavLink>
        <NavLink to="/quiz" className="mx-2">
          Quiz
        </NavLink>
        <NavLink to="/results" className="mx-2">
          Results
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;



