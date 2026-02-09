import { Button } from "@/components/ui/button";
import useErrorHandler from "@/hooks/ErrorHandler/useErrorHandler";
import React from "react";

const GoogleButton = ({ route }) => {
  const { errorHandler } = useErrorHandler();

  const handleClick = async () => {
    try {
        window.location.href = route ;
    } catch (error) {
      errorHandler(error);
    }
  };
  return (
    <div className="flex justify-center mt-6">
      <Button className="bg-transparent border hover:bg-gray-200 cursor-pointer  min-w-[350px] max-w-[500px] w-full h-[50px] justify-center items-center" onClick={handleClick}>
        <img
          src="google_logo.webp=s48-fcrop64=1,00000000ffffffff-rw"
          className="h-[20px]"
        />
        <p className="text-black">Continue with google</p>
      </Button>
    </div>
  );
};

export default GoogleButton;
