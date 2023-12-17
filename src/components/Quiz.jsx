// src/components/Quiz.jsx
import React, { useState, useEffect, useRef } from "react";
import he from "he";
import { LoadingQuestion } from "./Shimmer";
import { useParams } from "react-router-dom";
import { Decrypt } from "../utils/EncryptUtils";
import { FormatTime } from "../utils/TimeUtils";
import { CalculatePercentage } from "../utils/NumberUtils";

const Quiz = () => {
  const { quizid } = useParams();
  const { amount, category, difficulty, isQuizTimed } = Decrypt(quizid);
  var isTimed = isQuizTimed === "true";
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userSelections, setUserSelections] = useState(Array(parseInt(amount)).fill(null));
  const [score, setScore] = useState();
  const [answersChecked, setAnswersChecked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [error, setError] = useState(null);

  const totalTimeRef = useRef(0);
  const timerIntervalRef = useRef(null);

  const calculateTotalTime = () => {
    const difficultyTimeMap = {
      easy: 5,
      medium: 10,
      hard: 15,
    };

    const baseTime = amount * 2;
    const difficultyTime = difficultyTimeMap[difficulty] || 10;
    totalTimeRef.current = baseTime + amount * difficultyTime;

    setRemainingTime(totalTimeRef.current);
  };

  // Function to shuffle an array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchQuestions = async () => {
    try {
      let apiUrl = "https://opentdb.com/api.php?";
      if (amount) apiUrl += `amount=${amount}&`;
      if (category) apiUrl += `category=${category}&`;
      if (difficulty) apiUrl += `difficulty=${difficulty}&`;
      apiUrl += "type=multiple";

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const shuffledQuestions = data.results.map((question) => ({
        ...question,
        options: shuffleArray(
          question.incorrect_answers.concat(question.correct_answer)
        ).map((option) => ({
          text: option,
          isCorrect: false,
          isSelected: false,
        })),
      }));

      setQuestions(shuffledQuestions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      // Update state to indicate an error
      setQuestions([]);
      setLoading(false);
      setError("Failed to fetch quiz questions. Please try again.");
    }
  };

  // Reset state when quizid changes
  useEffect(() => {
    setQuestions([]);
    setLoading(true);
    setUserSelections(Array(parseInt(amount)).fill(null));
    setScore(undefined);
    setAnswersChecked(false);
    setRemainingTime(0);

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  }, [quizid]);

  useEffect(() => {
    const fetchDataAndSetupTimer = async () => {
      await fetchQuestions();

      if (isTimed) {
        calculateTotalTime();

        timerIntervalRef.current = setInterval(() => {
          setRemainingTime((prevTime) => Math.max(0, prevTime - 1));
        }, 1000);

        return () => {
          clearInterval(timerIntervalRef.current);
        };
      }
    };

    fetchDataAndSetupTimer();

    // Clear the interval when the component unmounts
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [quizid]);

  const handleOptionChange = (questionIndex, selectedOption) => {
    if (isTimed && remainingTime === 0) {
      return;
    }
    setUserSelections((prevSelections) => {
      const updatedSelections = [...prevSelections];
      updatedSelections[questionIndex] = selectedOption;
      return updatedSelections;
    });
  };

  const checkAnswersAndCalculateScore = () => {
    const updatedScore = questions.reduce((totalScore, question, index) => {
      const userSelection = userSelections[index];
      const isCorrect = userSelection === question.correct_answer;
      return isCorrect ? totalScore + 1 : totalScore;
    }, 0);

    setScore(updatedScore);
  };

  const handleCheckAnswers = () => {
    checkAnswersAndCalculateScore();

    // After calculating the score, update the UI to show correct/incorrect options
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, index) => ({
        ...question,
        options: question.options.map((option) => ({
          ...option,
          isSelected: option.text === userSelections[index],
          isCorrect: option.text === question.correct_answer,
        })),
      }))
    );

    setAnswersChecked(true);
    if (isTimed) {
      clearInterval(timerIntervalRef.current);
    }
  };

  if (loading) {
    return <LoadingQuestion />;
  }

  if (error) {
    return (
      <div className="max-w-screen-md mx-auto mt-2 p-6 bg-white shadow-lg rounded-lg">
        <div className="text-red-500 font-bold text-md">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto mt-2 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Quiz</h2>
      {isTimed && (
        <div
          className={`fixed top-20 opacity-80 rounded-md right-0 p-3 ${
            CalculatePercentage(remainingTime, totalTimeRef.current) > 50
              ? "bg-green-600"
              : CalculatePercentage(remainingTime, totalTimeRef.current) > 20
              ? "bg-yellow-600"
              : "bg-red-600"
          } text-white`}
        >
          Time Remaining: {FormatTime(remainingTime)}
        </div>
      )}
      <ul className="list-none p-0">
        {questions.map((question, index) => (
          <li
            key={index}
            className="bg-gray-100 border border-gray-300 p-4 mb-4 rounded-md"
          >
            <p className="text-lg mb-4">{he.decode(question.question)}</p>
            <ul className="list-none p-0">
              {question.options.map((option, optionIndex) => (
                <li
                  key={optionIndex}
                  className={`
                  flex items-center mb-2 
                  ${option.isCorrect && "bg-green-200"} 
                  ${!option.isCorrect && option.isSelected && "bg-red-200"} 
                  ${option.isSelected ? "text-blue-600" : "text-gray-800"}
                `}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    id={`option-${index}-${optionIndex}`}
                    className="mr-2"
                    value={option.text}
                    checked={userSelections[index] === option.text}
                    onChange={() => handleOptionChange(index, option.text)}
                    disabled={
                      answersChecked || (isTimed && remainingTime === 0)
                    }
                  />
                  <label htmlFor={`option-${index}-${optionIndex}`}>
                    {he.decode(option.text)}
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <button
          onClick={handleCheckAnswers}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Check Answers
        </button>
        {answersChecked && (
          <div className="text-md font-bold mt-4">
            {score > amount / 2 ? (
              <p className="text-green-500">Congratulations! You did well.</p>
            ) : (
              <p className="text-red-500">Keep practicing. You can do better!</p>
            )}
            Your Score: {score}/{amount}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
