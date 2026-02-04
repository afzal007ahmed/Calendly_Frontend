import { Route, Routes } from "react-router";
import { routes } from "../Routes/routes";
import PageNotFound from "@/Pages/PageNotFound";
import Scheduling from "@/Pages/Scheduling";
import Availability from "@/Pages/Availability";
import Meetings from "@/Pages/Meetings";
import Login from "@/Pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "@/Pages/Register";
import Redirect from "@/Pages/Redirect";
import Profile from "@/Pages/Profile";

const RouteManager = () => {
  return (
    <Routes>
      <Route
        path={routes.scheduling}
        element={
          <ProtectedRoute>
            <Scheduling />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
      <Route
        path={routes.availability}
        element={
          <ProtectedRoute>
            <Availability />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.meetings}
        element={
          <ProtectedRoute>
            <Meetings />
          </ProtectedRoute>
        }
      />
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.register} element={<Register />} />
      <Route path={routes.redirect} element={<Redirect />} />
      <Route
        path={routes.profile}
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default RouteManager;
