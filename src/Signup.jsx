import React, { useState, useEffect } from "react";
import Otp from "./Otp.jsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const customerSchema = z.object({
  firstName: z.string().min(1, "Naam lekhna xutais bhai"),
  lastName: z.string().min(1, "Thar lekhna ta nabirsi yar"),
  address: z.string().min(1, "Kaa basxas ta thahuna paryo ni"),
  email: z.string().email("Valid email halna parcha ni"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^\d{10}$/, "Phone number must be 10 digits"),
  userName: z.string().min(5, "Username must be at least 5 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const deliverySchema = customerSchema.extend({
  citizenshipPhoto: z
    .any()
    .refine((file) => file?.length === 1, "Citizenship photo is required"),
  drivingLicense: z
    .any()
    .refine((file) => file?.length === 1, "Driving license photo is required"),
});

const Signup = () => {
  const [role, setRole] = useState("customer");
  const schema = role === "customer" ? customerSchema : deliverySchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    reset();
  }, [role, reset]);

  const onSubmit = async (data) => {
    try {
      if (role === "customer") {
        const response = await axios.post(
          "https://365d-2400-1a00-bb20-29c-d048-1711-eb96-db6e.ngrok-free.app/api/v1/auth/signup/customer",
          data,
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.status === 200) {
          alert("Signup successful! Now verify OTP.");
          navigate("/otp", { state: { role, email: data.email } });
        } else {
          alert(response.data.errorMessage || "Signup failed.");
        }
      } else {
        const formData = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("address", data.address);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("userName", data.userName);
        formData.append("password", data.password);
        formData.append("citizenshipPhoto", data.citizenshipPhoto[0]);
        formData.append("drivingLicense", data.drivingLicense[0]);

        const response = await axios.post(
          "https://365d-2400-1a00-bb20-29c-d048-1711-eb96-db6e.ngrok-free.app/api/v1/auth/signup/delivery",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.status === 200) {
          alert("Signup successful! Now verify OTP.");
          navigate("/otp", { state: { role, email: data.email } });
        } else {
          alert(response.data.errorMessage || "Signup failed.");
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong.");
    }
  };

  const activeTab = "bg-[#d46a27] text-white";
  const inactiveTab = "bg-white text-black";

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="w-full max-w-md bg-[#f0e6d2] p-4 rounded-xl shadow-2xl backdrop-blur-md border border-gray-200">
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setRole("customer")}
            className={`px-4 py-2 rounded-l-full border border-[#d46a27] font-semibold ${
              role === "customer" ? activeTab : inactiveTab
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setRole("delivery")}
            className={`px-4 py-2 rounded-r-full border border-[#d46a27] font-semibold ${
              role === "delivery" ? activeTab : inactiveTab
            }`}
          >
            Delivery Agent
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
          encType="multipart/form-data"
        >
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block font-medium text-black text-sm">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName")}
                placeholder="Enter your First name"
                className="w-full p-2 border border-gray-300 rounded-md focus:border-[#d46a27] focus:outline-none placeholder-gray-500 text-sm"
              />
              {errors.firstName && (
                <p className="text-xs text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="block font-medium text-black text-sm">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName")}
                placeholder="Enter your Last name"
                className="w-full p-2 border border-gray-300 rounded-md focus:border-[#d46a27] focus:outline-none placeholder-gray-500 text-sm"
              />
              {errors.lastName && (
                <p className="text-xs text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-medium text-black text-sm">
              Address
            </label>
            <input
              type="text"
              {...register("address")}
              placeholder="Enter your address"
              className="w-full p-2 border border-gray-300 rounded-md focus:border-[#d46a27] focus:outline-none placeholder-gray-500 text-sm"
            />
            {errors.address && (
              <p className="text-xs text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-black text-sm">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-md focus:border-[#d46a27] focus:outline-none placeholder-gray-500 text-sm"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium text-black text-sm">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phone")}
              placeholder="Enter your Phone Number"
              className="w-full p-2 border border-gray-300 rounded-md focus:border-[#d46a27] focus:outline-none placeholder-gray-500 text-sm"
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-black text-sm">
              Username
            </label>
            <input
              type="text"
              {...register("userName")}
              placeholder="Enter your username"
              className="w-full p-2 border border-gray-300 rounded-md focus:border-[#d46a27] focus:outline-none placeholder-gray-500 text-sm"
            />
            {errors.userName && (
              <p className="text-xs text-red-500">{errors.userName.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-black text-sm">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded-md focus:border-[#d46a27] focus:outline-none placeholder-gray-500 text-sm"
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {role === "delivery" && (
            <>
              <div>
                <label className="block font-medium text-black text-sm">
                  Citizenship Photo
                </label>
                <input
                  type="file"
                  {...register("citizenshipPhoto")}
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-md bg-white"
                />
                {errors.citizenshipPhoto && (
                  <p className="text-xs text-red-500">
                    {errors.citizenshipPhoto.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block font-medium text-black text-sm">
                  Driving License Photo
                </label>
                <input
                  type="file"
                  {...register("drivingLicense")}
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-md bg-white"
                />
                {errors.drivingLicense && (
                  <p className="text-xs text-red-500">
                    {errors.drivingLicense.message}
                  </p>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-[#d46a27] to-[#c25e1f] text-white font-semibold py-2 rounded-md hover:bg-gradient-to-l transition duration-200 text-sm"
          >
            Register as {role === "customer" ? "Customer" : "Delivery Agent"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
