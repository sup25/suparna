import React from "react";
import { XCircle } from "lucide-react";

export const SomethingWentWrong = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <div className="text-center p-8 max-w-xl">
        <XCircle className="h-16 w-16 text-rose-500 mx-auto mb-4" />
        <h1 className="heading font-dmSerifDisplay text-rose-500 mb-2">
          Something went wrong
        </h1>
        <p className="text-[rgb(var(--foreground))]  mb-6">
          We encountered an error while processing your request.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-rose-500 rounded hover:bg-rose-600 text-white  transition-colors shadow-sm"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default SomethingWentWrong;
