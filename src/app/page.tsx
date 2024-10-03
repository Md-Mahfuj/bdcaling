"use client";
import { useEffect, useState } from "react";
import { checkLoginStatus } from "./Utility/authUtils"; 
import Hero from "@/app/ui/hero"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTrainee, setIsTrainee] = useState(false);
  const [isTrainer, setIsTrainer] = useState(false);
  const [loading, setLoading] = useState(true);
  // Usage in a component
  useEffect(() => {
    const { isLoggedIn, role } = checkLoginStatus();
    setIsLoggedIn(isLoggedIn);
    if (role === 'admin') {
      setIsAdmin(role === 'admin');
    }
    else if (role === 'Trainer') {
      setIsTrainer(role === 'Trainer');
    }
    else if (role === 'Trainee') {
      setIsTrainee(role === 'Trainee')
    }
    setLoading(false);
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoggedIn ? (
        <div>
          {
            isAdmin &&
            <div className="text-green-500">
              <Hero Greeting={<div>
                <h2 className="text-2xl font-bold">Welcome, Admin!</h2>
                <p>You have admin access.</p></div>}
              />
            </div>
          }
          {
            isTrainer &&
            <div className="text-blue-500">

              <Hero Greeting={<div>
                <h2 className="text-2xl font-bold">Welcome, Trainer!</h2>
                <p>You do not have admin access.</p>
              </div>}
              />
            </div>
          }
          {
            isTrainee &&
            <div className="text-blue-500">
              <Hero Greeting={<div>
                <h2 className="text-2xl font-bold">Welcome, Trainee!</h2>
                <p>You do not have admin access.</p>
              </div>}
              />
            </div>
          }
        </div>
      ) : (
        <div className="text-red-500 ">
          <Hero Greeting={<div>

            <h2 className="text-2xl font-bold">Welcome, Guest!</h2>
            <p>Please log in to access your account.</p>
            <a href="/login" className="text-indigo-600 hover:text-indigo-500">Login here</a>
          </div>} />
        </div>
      )}
    </div>
  );
}
