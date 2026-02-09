import { Route, Routes } from "react-router";
import { routes } from "../Routes/routes";
import PageNotFound from "@/Pages/PageNotFoundPage";
import Scheduling from "@/Pages/SchedulingPage";
import Availability from "@/Pages/AvailabilityPage";
import Meetings from "@/Pages/MeetingsPage";
import Login from "@/Pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import Register from "@/Pages/RegisterPage";
import Redirect from "@/Pages/RedirectPage";
import Profile from "@/Pages/ProfilePage";
import Public from "@/Pages/PublicPage";
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
      <Route path={routes.booking} element={<Public />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default RouteManager;
