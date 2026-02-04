import { Button } from "@/components/ui/button";
import { config } from "@/config";
import useErrorHandler from "@/ErrorHandler/useErrorHandler";
import React from "react";

const GoogleButton = () => {
  const { errorHandler } = useErrorHandler();

  const handleClick = async () => {
    try {
        window.location.href = config.google_redirect ;
    } catch (error) {
      errorHandler(error);
    }
  };
  return (
    <div className="flex justify-center mt-6">
      <Button className="bg-transparent border hover:bg-gray-200 cursor-pointer  min-w-[350px] max-w-[500px] w-full h-[50px] justify-center items-center">
        <img
          src="google_logo.webp=s48-fcrop64=1,00000000ffffffff-rw"
          className="h-[20px]"
        />
        <p className="text-black" onClick={handleClick}>Continue with google</p>
      </Button>
    </div>
  );
};

export default GoogleButton;
