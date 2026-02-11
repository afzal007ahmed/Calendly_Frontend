import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { config } from "@/config";
import GoogleButton from "@/components/CustomComponents/GoogleButton";
import useErrorHandler from "@/hooks/ErrorHandler/useErrorHandler";
import { routes } from "@/Routes/routes";
import { loginService } from "@/services/auth.services";
import { userDetails } from "@/services/user.services";
import { Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import {
  fetchUserFailed,
  fetchUserLoading,
  fetchUserSuccess,
  userReset,
} from "@/redux/Slices/userSlice";

const Login = () => {
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const { errorHandler } = useErrorHandler();
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const disable =
    !details.password.trim().length || !details.email.trim().length;

  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");

  async function loginHandler() {
    try {
      setLoading(true);
      dispatch(fetchUserLoading());
      await loginService(details);
      const data = await userDetails();
      nav(routes.scheduling);
      dispatch(fetchUserSuccess(data.data));
      setLoading(false);
    } catch (error) {
      dispatch(fetchUserFailed());
      setLoading(false);
      errorHandler(error);
    }
  }

  useEffect(() => {
    if (!token) {
      dispatch(userReset());
    }
    if (message) {
      toast.error(message);
    }
  }, []);

  if (token) {
    return <Navigate to={routes.scheduling} />;
  }

  return (
    <div className="min-h-[100vh] flex-1 flex flex-col flex-wrap justify-center items-center bg-[#f8f9fb] rounded-lg">
      <div className="flex items-end gap-2 justify-center mb-5">
        <img src="calendly_logo.svg" className="h-[40px]" />
        <img src="calendly_name.svg" />
      </div>
      <p className="text-[50px] font-bold text-center">Login to your account</p>
      <div className="mx-auto bg-white px-8 mt-6 min-w-[350px] w-full max-w-[500px] py-12">
        <div>
          <p className="text-sm font-bold mb-4">Email : </p>
          <Input
            placeholder="Enter your email"
            className="h-[50px]"
            autoFocus={true}
            value={details.email}
            type="email"
            onChange={(e) =>
              setDetails((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className="mt-6">
          <p className="text-sm font-bold mb-2">Password :</p>
          <Input
            placeholder="Enter your password"
            className="h-[50px]"
            type="password"
            value={details.password}
            onChange={(e) =>
              setDetails((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        <Button
          className="bg-[#006bff] border text-white font-bold text-lg hover:bg-gray-200 cursor-pointer  min-w-[350px] max-w-[500px] mt-5 w-full h-[50px] justify-center items-center"
          onClick={loginHandler}
          disabled={disable}
        >
          {!loading ? "Login" : <Loader2 className="animate-spin" />}
        </Button>
        <p className="text-sm mt-2">
          New here?{" "}
          <span
            className="underline font-bold text-blue-500 cursor-pointer"
            onClick={() => {
              nav(routes.register);
            }}
          >
            Register
          </span>
        </p>
        <div className="flex items-center gap-2 mt-4">
          <div className="border mt-4 flex-1" style={{ marginTop: 0 }}></div>
          <p className="text-gray-400 font-bold">OR</p>
          <div className=" border mt-4 flex-1" style={{ marginTop: 0 }}></div>
        </div>
        <GoogleButton route={config.google_redirect} />
      </div>
    </div>
  );
};

export default Login;
