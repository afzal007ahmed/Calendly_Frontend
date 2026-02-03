import { Route, Routes } from "react-router";
import { routes } from "../Routes/routes";
import PageNotFound from "@/Pages/PageNotFound";
import Scheduling from "@/Pages/Scheduling";
import Availability from "@/Pages/Availability";
import Meetings from "@/Pages/Meetings";
import Login from "@/Pages/Login";

const RouteManager = () => {
  return (
    <Routes>
      <Route path={routes.scheduling} element={<Scheduling />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path={routes.availability} element={<Availability />} />
      <Route path={routes.meetings} element={<Meetings />} />
      <Route path={routes.login} element={<Login/>} />
    </Routes>
  );
};

export default RouteManager;
