"use client";
import { useEffect, useState } from "react";
import { checkLoginStatus } from "./Utility/authUtils";
import Hero from "@/app/ui/hero";
import toast, { Toaster } from 'react-hot-toast';

// Define the Schedule interface
interface Schedule {
  _id: string; // Adjust types based on your API response
  date: string;
  timeSlot: string;
  trainer: {
    name: string;
  };
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTrainee, setIsTrainee] = useState(false);
  const [isTrainer, setIsTrainer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string | null>(''); // Initial value can be an empty string or null

  const [data, setData] = useState<Schedule[]>([]); // Set the type of data as Schedule[]
  const [trainerData, setTrainerData] = useState<Schedule[]>([]); // Set the type of trainerData

  useEffect(() => {
    const { isLoggedIn, role, id } = checkLoginStatus();
    setIsLoggedIn(isLoggedIn);
    setId(id || '');

    if (role === 'admin') {
      setIsAdmin(true);
    } else if (role === 'Trainer') {
      setIsTrainer(true);
    } else if (role === 'Trainee') {
      setIsTrainee(true);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/schedules", {
          method: "GET"
        });
        const data = await response.json();
        setData(data); // Set the data
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the fetch function
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Avoid fetching if id is not valid
      try {
        const response = await fetch(`http://localhost:8000/api/v1/schedules/trainer/${id}`, {
          method: "GET"
        });
        const data = await response.json();
        setTrainerData(data || []); // Ensure it's an array
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the fetch function
  }, [id]);

  const handelBook = async (itemID: string) => {
    const toastId = toast.loading("Booking...");

    const res = await fetch("http://localhost:8000/api/v1/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trainee: id, schedule: itemID }),
    });

    const { success, message } = await res.json();

    if (success) {
      toast.success("Successfully booked");
    }
    toast.dismiss(toastId);
    toast.success(message);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoggedIn ? (
        <div>
          {isAdmin && (
            <div className="text-green-500">
              <Hero Greeting={<div>
                <h2 className="text-2xl font-bold">Welcome, Admin!</h2>
                <p>You have admin access.</p>
              </div>} />
              <h1 className="font-bold text-2xl text-black px-2 xl:px-12 py-2">Schedules List</h1>
              <div className="absolute flex space-x-2 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-12 ">
                {data.map((item) => (
                  <div key={item._id} className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto bg-black">
                    <span className="relative mt-auto text-center text-xl font-bold text-white">Date: {item?.date}</span>
                    <span className="relative mt-auto text-center text-xl font-bold text-white">TimeSlot: {item?.timeSlot}</span>
                    <span className="relative mt-auto text-center text-xl font-bold text-white">Trainer: {item?.trainer?.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {isTrainer && (
            <div className="text-blue-500">
              <Hero Greeting={<div>
                <h2 className="text-2xl font-bold">Welcome, Trainer!</h2>
                <p>You do not have admin access.</p>
              </div>} />
              <h1 className="font-bold text-2xl text-black px-2 xl:px-12 py-2">My Schedules</h1>
              <div className="absolute flex space-x-2 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-12 ">
                {Array.isArray(trainerData) && trainerData.map((item) => (
                  <div key={item._id} className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto bg-black">
                    <span className="relative mt-auto text-center text-xl font-bold text-white">Date: {item?.date}</span>
                    <span className="relative mt-auto text-center text-xl font-bold text-white">TimeSlot: {item?.timeSlot}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {isTrainee && (
            <div className="text-blue-500">
              <Hero Greeting={<div>
                <h2 className="text-2xl font-bold">Welcome, Trainee!</h2>
                <p>You do not have admin access.</p>
              </div>} />
              <h1 className="font-bold text-2xl text-black px-2 xl:px-12 py-2">Schedules List</h1>
              <div className="absolute flex space-x-2 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-12 ">
                {data.map((item) => (
                  <div key={item._id} className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto bg-black">
                    <span className="relative mt-auto text-center text-xl font-bold text-white">Date: {item?.date}</span>
                    <span className="relative mt-auto text-center text-xl font-bold text-white">TimeSlot: {item?.timeSlot}</span>
                    <span className="relative mt-auto text-center text-xl font-bold text-white">Trainer: {item?.trainer?.name}</span>
                    <div onClick={() => handelBook(item._id)} className="mt-2 inline-flex items-center justify-center text-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 cursor-pointer">
                      Book Now
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
