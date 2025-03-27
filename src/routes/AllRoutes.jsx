import { Route, Routes } from "react-router-dom";
import { LinkInputPage, RecommendationsPage, ChartsPage, ProfilePage } from "../pages";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LinkInputPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="charts" element={<ChartsPage />} />
        <Route path="recommendations" element={<RecommendationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};