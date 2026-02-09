import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { useNavigate } from "react-router";
import { routes } from "@/Routes/routes";

const Navbar = () => {
  const nav = useNavigate();
  return (
    <div className="flex justify-end p-6">
      <div
        className="border border-black rounded-[50px] p-[2px] h-[50px] w-[50px] flex font-bold justify-center items-center cursor-pointer"
        onClick={() => nav(routes.profile)}
      >
        <Avatar className="h-full w-full">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
