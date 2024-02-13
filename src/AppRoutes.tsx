import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeView from "./views/HomeView";
import NotFoundView from "./views/errors/NotFoundView";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/home" element={<HomeView />} />
        <Route path="error404" element={<NotFoundView />} />
        {/* Fallback route if no other route is matched */}
        <Route path="*" element={<Navigate to="/error404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
