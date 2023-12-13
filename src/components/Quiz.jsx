// src/components/Quiz.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";
import Loading from "./Loading";

const Quiz = () => {

  // Function to shuffle an array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };


//   const fetchQuestions = async () => {
//     try {
//       const response = await axios.get(
//         "https://opentdb.com/api.php?amount=10&type=multiple"
//       );
//       setQuestions(response.data.results);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching quiz questions:", error);
//       setLoading(false);
//     }
//   };

  const fetchQuestions2 = async () => {
    try {
      const response = await fetch(
        'https://opentdb.com/api.php?amount=10&type=multiple'
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setQuestions(data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      setLoading(false);
    }
  };
  

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions2();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-screen-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Quiz Component</h2>
      <ul className="list-none p-0">
        {questions.map((question, index) => (
          <li
            key={index}
            className="bg-gray-100 border border-gray-300 p-4 mb-4 rounded-md"
          >
            <p className="text-lg mb-4">{he.decode(question.question)}</p>
            <ul className="list-none p-0">
              {shuffleArray([
                ...question.incorrect_answers,
                question.correct_answer,
              ]).map((option, optionIndex) => (
                <li key={optionIndex} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    id={`option-${index}-${optionIndex}`}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`option-${index}-${optionIndex}`}
                    className="text-gray-800"
                  >
                    {he.decode(option)}
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;
