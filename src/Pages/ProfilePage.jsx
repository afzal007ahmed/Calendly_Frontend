import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import useErrorHandler from "@/hooks/ErrorHandler/useErrorHandler";
import { userNameChange } from "@/services/user.services";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserFailed,
  fetchUserLoading,
  fetchUserSuccess,
} from "@/redux/Slices/userSlice";

const Profile = () => {
  const [change, setChange] = useState(false);
  const user = useSelector((state) => state.userReducer);
  const [newName, setNewName] = useState(user.data?.name);
  const { errorHandler } = useErrorHandler();
  const dispatch = useDispatch();

  const handleChange = async () => {
    try {
      setChange(false);
      if (!newName.trim().length) {
        toast.error("Enter a valid name.");
        return;
      }
      if (newName.trim() === user.data.name) {
        return;
      }
      dispatch(fetchUserLoading());
      const data = await userNameChange(newName);
      setNewName("");
      dispatch(fetchUserSuccess(data.data));
    } catch (error) {
      dispatch(fetchUserFailed());
      setChange(false);
      setNewName("");
      errorHandler(error);
    }
  };

  return (
    <div className="h-full flex items-center">
      <div className="max-w-[800px] mx-auto flex items-center gap-12">
        <Avatar className="h-[200px] w-[200px]">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          {!change ? (
            <p className="font-bold text-3xl" onClick={() => setChange(true)}>
              {user.data?.name}
            </p>
          ) : (
            <Input
              placeholder="Enter your name..."
              className="font-bold"
              autoFocus={true}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleChange}
            />
          )}
          <p className="font-bold text-xl my-1 text-gray-400">
            {user.data?.email}
          </p>
          <p className="text-xs font-medium">#{user.data?.id}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
