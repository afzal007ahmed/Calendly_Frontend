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
import Public from "@/Pages/Public";
import MainPageWrapper from "./MainPageWrapper";

const RouteManager = () => {
  return (
    <Routes>
      <Route element={<MainPageWrapper />}>
        <Route
          path={routes.scheduling}
          element={
            <ProtectedRoute>
              <Scheduling />
            </ProtectedRoute>
          }
        />
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
        <Route
          path={routes.profile}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.register} element={<Register />} />
      <Route path={routes.redirect} element={<Redirect />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path={routes.booking} element={<Public />} />
    </Routes>
  );
};

export default RouteManager;
