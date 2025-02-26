import React from "react";
import { FileX } from "lucide-react";

const NoWorkToShow = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-8 my-8">
      <FileX className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        No Work to Show
      </h3>
      <p className="text-gray-600 text-center mb-6 max-w-md text-[rgb(var(--foreground))]">
        It looks like there aren't any projects to display at the moment. Check
        back later or use the filters above to adjust your search.
      </p>
    </div>
  );
};

export default NoWorkToShow;
