// src/components/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Encrypt } from "../utils/EncryptUtils";

const Home = () => {
  const [category, setCategory] = useState("any");
  const [numQuestions, setNumQuestions] = useState(8);
  const [difficulty, setDifficulty] = useState("any");
  const [isTimed, setIsTimed] = useState("false");
  const [linkTo, setLinkTo] = useState("#");

  useEffect(() => {
    const quizParams = {
      amount: numQuestions,
      ...(category !== "any" && { category }),
      ...(difficulty !== "any" && { difficulty }),
      isQuizTimed : isTimed
    };

    const newEncryptedParams = Encrypt(quizParams);
    setLinkTo(
      Object.keys(newEncryptedParams).length > 0
        ? `/quiz/${newEncryptedParams}`
        : "#"
    );
  }, [numQuestions, category, difficulty, isTimed]);

  return (
    <div className="max-w-screen-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">
        Welcome to TriviaQuizzy
      </h2>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-600 mb-1"
          >
            Category:
          </label>
          <select
            id="category"
            name="category"
            className="p-2 border rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime & Manga</option>
            <option value="32">Entertainment: Cartoon & Animations</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="numQuestions"
            className="text-sm font-medium text-gray-600 mb-1"
          >
            Number of Questions:
          </label>
          <input
            type="number"
            id="numQuestions"
            name="numQuestions"
            min="3"
            max="20"
            value={numQuestions}
            onChange={(e) => {
              const value = Math.max(3, Math.min(20, parseInt(e.target.value, 10)));
              setNumQuestions(value);
            }}
            className="p-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="difficulty"
            className="text-sm font-medium text-gray-600 mb-1"
          >
            Difficulty:
          </label>
          <select
            id="difficulty"
            name="difficulty"
            className="p-2 border rounded-md"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="isTimed"
            className="text-sm font-medium text-gray-600 mb-1"
          >
            Countdown Quiz:
          </label>
          <select
            id="isTimed"
            name="isTimed"
            className="p-2 border rounded-md"
            value={isTimed}
            onChange={(e) => setIsTimed(e.target.value)}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <Link to={linkTo}>
          <button
            type="button"
            className="bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Start Quiz
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Home;
