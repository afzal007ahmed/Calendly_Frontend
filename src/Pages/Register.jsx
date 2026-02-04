import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppContext } from "@/context/AppContext";
import GoogleButton from "@/CustomComponents/GoogleButton";
import useErrorHandler from "@/ErrorHandler/useErrorHandler";
import { routes } from "@/Routes/routes";
import { loginService, registerService } from "@/services/auth.services";
import { userDetails } from "@/services/user.services";
import { emailSchema, passwordSchema } from "@/validations/joi.validate";
import { Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Register = () => {
  const nav = useNavigate();
  const { errorHandler } = useErrorHandler();
  const [details, setDetails] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const disable =
    !details.password.trim().length ||
    !details.email.trim().length ||
    !details.name.trim().length;

  async function handleRegister() {
    try {
      setLoading(true);
      const emailValidation = emailSchema.validate(details.email);
      const passwordValidation = passwordSchema.validate(details.password);
      const mail = details.email.split("@");
      if (emailValidation.error) {
        toast.error(emailValidation.error.message);
        return;
      } else if (mail[1] !== "gmail.com") {
        toast.error("We accept only gmail accounts.");
        return;
      } else if (passwordValidation.error) {
        toast.error(passwordValidation.error.message);
        return;
      }
      await registerService(details);
      setLoading(false);
      nav(routes.login);
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if( token ) {
        nav(routes.scheduling) ;
    }
  }, []);

  return (
    <div className="min-h-full flex-1 flex flex-col flex-wrap justify-center items-center bg-[#f8f9fb] rounded-lg">
      <div className="flex items-end gap-2 justify-center mb-5">
        <img src="calendly_logo.svg" className="h-[40px]" />
        <img src="calendly_name.svg" />
      </div>
      <p className="text-[50px] font-bold text-center">Create a account</p>
      <div className="mx-auto bg-white px-8 mt-6 min-w-[350px] w-full max-w-[500px] py-12">
        <div>
          <p className="text-sm font-bold mb-4">Name : </p>
          <Input
            placeholder="Enter your name"
            className="h-[50px]"
            autoFocus={true}
            value={details.name}
            type="name"
            onChange={(e) =>
              setDetails((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="mt-6">
          <p className="text-sm font-bold mb-4">Email : </p>
          <Input
            placeholder="Enter your email"
            className="h-[50px]"
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
          disabled={disable}
          onClick={handleRegister}
        >
          {!loading ? "Register" : <Loader2 className="animate-spin" />}
        </Button>
        <div className="flex items-center gap-2 mt-4">
          <div className="border mt-4 flex-1" style={{ marginTop: 0 }}></div>
          <p className="text-gray-400 font-bold">OR</p>
          <div className=" border mt-4 flex-1" style={{ marginTop: 0 }}></div>
        </div>
        <GoogleButton />
      </div>
    </div>
  );
};

export default Register;
