import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-sans">
      <div className="mb-8">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyKZlBDaEoyunJXotLeeTAz5hwmCm5IsPBwdv9dA_ntHS2Sc9GlegKyfEnkn4aTdHJeT4&usqp=CAU"
          alt="Error"
          className="w-48 h-auto"
        />
      </div>
      <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
      <div className="text-lg text-center">
        <p>Error Code: {err.status}</p>
        <p>Message: {err.statusText}</p>
        {err.error && (
          <p className="italic text-gray-600">
            Additional Info: {err.error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Error;
