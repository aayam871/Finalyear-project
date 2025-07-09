import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "leaflet/dist/leaflet.css";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Menu from "./Menu";
import Login from "./Login";
import Signup from "./Signup";
import Otp from "./Otp";
import CustomerHome from "./CustomerHome";
import DeliveryHome from "./DeliveryHome";
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

import AdminDashboardRoutes from "./admin/AdminDashboardRoutes";
import Aprofile from "./Aprofile";

function AppWrapper() {
  const location = useLocation();
  const noNavFooterRoutes = ["/hudaixa", "/login", "/signup", "/otp"];
  const hideNavFooter = noNavFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      <ScrollToTop />
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
        <Route
          path="/delivery-home"
          element={
            <ProtectedRoute requiredRole="ROLE_DELIVERYAGENT">
              <DeliveryHome />
            </ProtectedRoute>
          }
        />
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
