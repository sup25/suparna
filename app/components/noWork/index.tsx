import React from "react";
import { FileX } from "lucide-react";

const NoWorkToShow = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-8 gap-5  my-8">
      <FileX className="w-16 h-16 text-[rgb(var(--foreground))] mb-4" />
      <h3 className="text-xl font-semibold  mb-2 text-[rgb(var(--foreground))]">
        No Work to Show
      </h3>
      <p className=" text-center mb-6 max-w-md text-[rgb(var(--foreground))]">
        It looks like there aren't any projects to display at the moment. Check
        back later for updates or explore other sections of the site.
      </p>
    </div>
  );
};

export default NoWorkToShow;
