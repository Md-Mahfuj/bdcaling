


"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

  const router = useRouter();

  // Handle input changes
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  // Validate email and password before submitting
  const validateForm = () => {
    if (!email || !password) {
      toast.error("Email and password are required.");
      return false;
    }
    return true;
  };

  // // Function to check login status (check if JWT token exists in cookies)
  const checkLoginStatus = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));

    // console.log("token",token);
    if (token) {
      setIsLoggedIn(true);  // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  };

  // Check login status on component mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Handle form submission
  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true); // Disable form during submission
    const toastId = toast.loading("Logging in...");

    try {
      // Send login request to server
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const { success, token, message } = await res.json(); // Destructure response

      if (success) {
        // Store token in cookies (you can use cookie library for more control)
        document.cookie = `token=${token}; path=/;`;
        setIsLoggedIn(true);  // Update login state

        // Redirect to home or dashboard after login
        router.replace("/");
        
        if (typeof window !== 'undefined') {
          window.location.reload();
        }

        toast.dismiss(toastId);
        toast.success("Logged in successfully.");
      } else {
        toast.dismiss(toastId);
        toast.error(message || "Login failed.");
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error);
    } finally {
      setIsSubmitting(false);  // Reset submit state
    }
  };

  // If already logged in, redirect or show a message
  if (isLoggedIn) {
    router.replace("/");

  }

  return (
    <>
      <Toaster />
      <div className="py-36 sm:py-28 bg-white sm:bg-gray-100 flex min-h-full flex-1 flex-col justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-6 pb-12 sm:shadow-lg sm:rounded-xl sm:px-12">
            <h2 className="mt-6 pb-12 sm:pt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="w-full">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="mt-2 w-full px-2 py-3"
                />
              </div>
              <div className="w-full">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="mt-2 px-2 py-3 w-full"
                />
              </div>

              <button
                type="submit"
                className={`w-full uppercase rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className="sm:hidden mt-4 text-center text-sm text-gray-500">
                Not a member?{" "}
                <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Create an account
                </a>
              </p>
            </form>
          </div>

          <p className="hidden sm:block mt-4 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
