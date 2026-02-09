import { Ban } from "lucide-react";
import React from "react";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center gap-10 flex-1 justify-center h-full">
      <Ban color="red" size={200} />
      <div className="text-center">
        <p className="font-bold text-2xl">Page Not Found.</p>
        <p className="font-medium text-sm mt-2">Please check the route.</p>
      </div>
    </div>
  );
};

export default PageNotFound;
