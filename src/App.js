import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Menu from "./Menu";
import Login from "./Login";
import Signup from "./Signup";
import Otp from "./Otp";
import CustomerHome from "./CustomerHome";

import Features from "./Features";
import ScrollToTop from "./ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import Hudaixa from "./Hudaixa";
import ContactUs from "./ContactUs";
import Faqs from "./Faqs";
import SuccessPage from "./SuccessPage";
import FailurePage from "./FailurePage";
import Cart from "./Cart";
import Cprofile from "./Cprofile";
import Support from "./Support";
import OrdersPage from "./OrdersPage";
import Refund from "./Refund";
import Terms from "./Terms";
import Privacy from "./Privacy";
import Confirmation from "./Confirmation";
import StaffDashboard from "./staff/StaffDashboard";
import StaffDashboardLayout from "./staff/StaffDashboardLayout";

import AdminDashboardRoutes from "./admin/AdminDashboardRoutes";
import Aprofile from "./Aprofile";
import AgentDashboardLayout from "./delivery/AgentDashboardLayout";
import AgentRoutes from "./delivery/AgentRoutes";

function AppWrapper() {
  const location = useLocation();
  const noNavFooterRoutes = [
    "/hudaixa",
    "/login",
    "/signup",
    "/otp",
    "/staff-dashboard",
    "/delivery-agent",
    "/admin",
  ];
  const hideNavFooter = noNavFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  // Restrict admin to only /admin/* routes
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.roles && user.roles.includes("ROLE_ADMIN");
  if (isAdmin && !location.pathname.startsWith("/admin")) {
    window.location.replace("/admin/dashboard");
    return null;
  }

  // Restrict delivery agent to only /delivery-agent/* routes
  const isDeliveryAgent =
    user && user.roles && user.roles.includes("ROLE_DELIVERYAGENT");
  if (isDeliveryAgent && !location.pathname.startsWith("/delivery-agent")) {
    window.location.replace("/delivery-agent/dashboard");
    return null;
  }

  return (
    <>
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {!hideNavFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/hudaixa" element={<Hudaixa />} />
        <Route path="/features" element={<Features />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/support" element={<Support />} />
        <Route path="/refund-policy" element={<Refund />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/ordersPage" element={<OrdersPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route
          path="/staff-dashboard"
          element={
            <ProtectedRoute requiredRole="ROLE_RESTURANTSTAFF">
              <StaffDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StaffDashboard />} />
        </Route>

        <Route path="/failure" element={<FailurePage />} />
        <Route path="/privacy" element={<Privacy />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AdminDashboardRoutes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/aprofile"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <Aprofile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer-home"
          element={
            <ProtectedRoute requiredRole="ROLE_CUSTOMER">
              <CustomerHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cprofile"
          element={
            <ProtectedRoute requiredRole="ROLE_CUSTOMER">
              <Cprofile />
            </ProtectedRoute>
          }
        />

        <Route path="/delivery-agent/*" element={<AgentDashboardLayout />}>
          <Route path="*" element={<AgentRoutes />} />
        </Route>
      </Routes>

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
