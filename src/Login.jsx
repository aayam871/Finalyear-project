import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "./images/QuickBites_Logo_Transparent1.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.showMessage) {
      alert("✅ Now login with your email and password");
    }
  }, [location.state]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.roles) {
      console.log("User already logged in:", user);

      if (user.roles.includes("ROLE_ADMIN")) {
        navigate("/admin");
      } else if (user.roles.includes("ROLE_AGENT")) {
        navigate("/delivery-home");
      } else if (user.roles.includes("ROLE_CUSTOMER")) {
        navigate("/customer-home");
      }
    }
  }, [navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://365d-2400-1a00-bb20-29c-d048-1711-eb96-db6e.ngrok-free.app/api/v1/auth/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;
      console.log("Login response:", result);

      if (result.status === "success") {
        const { token, expiresAt, roles } = result.data;
        const userData = { token, expiresAt, roles, username };

        localStorage.setItem("user", JSON.stringify(userData));
        console.log(
          "Saved user in localStorage:",
          JSON.parse(localStorage.getItem("user"))
        );

        alert("Login successful!");

        // ✅ Navigate to correct page based on role
        if (roles && Array.isArray(roles)) {
          if (roles.includes("ROLE_ADMIN")) {
            console.log("Redirecting to /admin");
            navigate("/admin");
          } else if (roles.includes("ROLE_AGENT")) {
            console.log("Redirecting to /delivery-home");
            navigate("/delivery-home");
          } else if (roles.includes("ROLE_CUSTOMER")) {
            console.log("Redirecting to /customer-home");
            navigate("/customer-home");
          } else {
            console.log("Redirecting to /login");
            navigate("/login");
          }
        } else {
          console.warn("Roles is not an array or is undefined:", roles);
          navigate("/login");
        }
      } else {
        console.warn(
          "Login failed! Reason:",
          result.errorMessage || "Unknown error"
        );
        alert(result.errorMessage || "Login failed.");
      }
    } catch (err) {
      console.error("Login error occurred:", err.message || err);
      alert("An error occurred. Please try again.");
      navigate("/login");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="w-full  max-w-md p-8 bg-[#f0e6d2] bg-opacity-90 rounded-lg shadow-lg">
        <div className="w-full text-gray-800">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Logo" className="w-24 h-24" />
          </div>

          <h2 className="text-center text-3xl font-bold mb-2 text-black">
            Welcome Back
          </h2>
          <p className="text-center text-sm mb-8 text-black whitespace-nowrap">
            Log in with your Username and Password to explore QuickBites.
          </p>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block mb-2 font-medium text-black text-lg">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 border border-black outline-none focus:ring-0 focus:border-[#d46a27] transition duration-150"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-black text-lg">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 border border-black outline-none focus:ring-0 focus:border-[#d46a27] transition duration-150"
              />
            </div>
            <div className="flex items-center justify-between text-lg">
              <label className="flex items-center text-black">
                <input
                  type="checkbox"
                  className="mr-2 text-[#d46a27] checked:bg-[#c25e1f] "
                />
                Remember me
              </label>
              <a href="#" className="text-[#d46a27] hover:text-[#c25e1f]">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-[#d46a27] to-[#c25e1f] text-white font-semibold py-3 rounded-md hover:bg-gradient-to-l transition duration-200 text-lg"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-lg text-black">
            Don't have any account?{" "}
            <Link
              to="/signup"
              className="underline font-medium text-[#d46a27] hover:text-[#c25e1f]"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
