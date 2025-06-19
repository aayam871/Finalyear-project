import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Menu from "./Menu";
import Login from "./Login";
import Signup from "./Signup";
import Otp from "./Otp";
import CustomerHome from "./CustomerHome";
import DeliveryHome from "./DeliveryHome";
import Admin from "./Admin";
import Features from "./Features";
import ScrollToTop from "./ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "./AdminDashboard";
import Aorders from "./Aorders";
import Aprofile from "./Aprofile";
import Hudaixa from "./Hudaixa";

function AppWrapper() {
  const location = useLocation();

  // Yo routes ma navbar-footer hataune
  const noNavFooterRoutes = ["/hudaixa"];

  const hideNavFooter = noNavFooterRoutes.includes(location.pathname);

  return (
    <>
      <ScrollToTop />

      {/* Conditionally render Navbar */}
      {!hideNavFooter && <Navbar />}

      <Routes>
        {/* 🏡 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/hudaixa" element={<Hudaixa />} />
        <Route path="/features" element={<Features />} />
        <Route path="/adashboard" element={<AdminDashboard />} />
        <Route path="/aorders" element={<Aorders />} />
        <Route path="/aprofile" element={<Aprofile />} />

        {/* 🔐 Protected Routes */}
        {[
          { path: "/admin", element: <Admin />, role: "ROLE_ADMIN" },
          {
            path: "/customer-home",
            element: <CustomerHome />,
            role: "ROLE_CUSTOMER",
          },
          {
            path: "/delivery-home",
            element: <DeliveryHome />,
            role: "ROLE_DELIVERYAGENT",
          },
        ].map(({ path, element, role }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute requiredRole={role}>{element}</ProtectedRoute>
            }
          />
        ))}
      </Routes>

      {/* Conditionally render Footer */}
      {!hideNavFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
