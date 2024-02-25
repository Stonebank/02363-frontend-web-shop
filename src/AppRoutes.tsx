import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeView from "./views/HomeView";
import NotFoundView from "./views/errors/NotFoundView";
import Checkout from "./views/checkout/CheckoutView";
import "./styles/shared/App.css";
import Navbar from "./components/navbar/Navbar";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/home" element={<HomeView />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="error404" element={<NotFoundView />} />
          {/* Fallback route if no other route is matched */}
          <Route path="*" element={<Navigate to="/error404" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
