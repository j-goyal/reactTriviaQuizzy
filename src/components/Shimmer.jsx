import React from "react";

export const LoadingQuestion = () => {
  return (
    <div className="max-w-screen-md mx-auto p-6 bg-white shadow-lg rounded-lg animate-pulse">
      <h2 className="text-2xl font-bold mb-6 bg-gray-200 h-8 w-2/3 rounded-md"></h2>
      <ul className="list-none p-0">
        {[1, 2, 3, 4].map((x) => (
          <li key={x} className="bg-gray-100 border border-gray-300 p-4 mb-4 rounded-md">
            <p className="text-lg mb-4 bg-gray-200 h-6 w-full rounded-md"></p>
            <ul className="list-none p-0">
              {[11, 22, 33, 44].map((optionIndex) => (
                <li
                  key={optionIndex}
                  className="flex items-center mb-2 bg-gray-200 h-4 w-1/3 rounded-md"
                ></li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

//export default Loading;
