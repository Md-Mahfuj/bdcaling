



"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  
  // Form fields and error states
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, setError: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
    setError("");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setNameError("Name is required.");
      isValid = false;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    }

    return isValid;
  };

  const resetErrors = () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");
  };

  const handleSubmit = async () => {
    resetErrors();
    const isValid = validateForm();

    if (isValid) {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:8000/api/trainers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const { success } = await res.json();
        setIsLoading(false);
        if (success) {
          router.replace("/login");
         
        }
      } catch (error) {

        console.log(error);
     
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="py-36 sm:py-28 bg-white sm:bg-gray-100 flex min-h-full flex-1 flex-col justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 pb-12 sm:shadow-lg sm:rounded-xl sm:px-12">
            <h2 className="mt-6 pb-12 sm:pt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create  your account
            </h2>
            <div className="space-y-6">
              {/* Name Input */}
              <div  className="w-full">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Full Name
                </label>
                <input
                  onChange={handleInputChange(setName, setNameError)}
                  value={name}
                  className="mt-2 w-full py-3"
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                />
                {nameError && <p className="mt-1 text-red-500 text-sm">{nameError}</p>}
              </div>

              {/* Email Input */}
              <div className="w-full">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <input
                  onChange={handleInputChange(setEmail, setEmailError)}
                  value={email}
                  className="mt-2 w-full py-3"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                />
                {emailError && <p className="mt-1 text-red-500 text-sm">{emailError}</p>}
              </div>

              {/* Password Input */}
              <div className="w-full">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <input
                  onChange={handleInputChange(setPassword, setPasswordError)}
                  value={password}
                  className="mt-2 w-full py-3"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                />
                {passwordError && <p className="mt-1 text-red-500 text-sm">{passwordError}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full uppercase rounded-md bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm ${
                    isLoading ? "cursor-not-allowed opacity-50" : "hover:bg-indigo-700"
                  }`}
                >
                  {isLoading ? "Signing up..." : "Signup"}
                </button>
              </div>

              <p className="sm:hidden text-center text-sm text-gray-500">
                Already have an account?{" "}
                <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Please Login
                </a>
              </p>
            </div>
          </div>

          <p className="hidden sm:block text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Please Login
            </a>
          </p>
        </div>
      </div>
      {/* <Toaster /> */}
    </>
  );
}
