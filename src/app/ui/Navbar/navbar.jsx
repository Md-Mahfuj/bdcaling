"use client"
import Image from 'next/image'
import { useEffect, useState } from "react";
import { checkLoginStatus } from "../../Utility/authUtils";

import TraineeProfile from "@/app/ui/Navbar/TraineeProfile"
import AdminProfile from "@/app/ui/Navbar/AdminProfile"
import TrainerProfile from "@/app/ui/Navbar/TrainerProfile"
const WithoutLogin = () => {
  return (
    <a
      href={"/login"}
      className="my-auto mr-1 flex flex-row items-center">

      <div className=" flex w-28  h-8 items-center ">
        <h3
          className="pr-1 ml-2 text-indigo-500 font-bold cursor-pointer hover:text-color4 text-sm"
        >
          Login/Signup
        </h3>
      </div>
    </a>
  )
}

export default function Navbar() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTrainee, setIsTrainee] = useState(false);
  const [isTrainer, setIsTrainer] = useState(false);
  const [name, setName] = useState('')

  // Usage in a component
  useEffect(() => {
    const { isLoggedIn, role, name } = checkLoginStatus();
    setName(name)
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
  }, []);



  return (
    <div className="bg-white shadow">

      <>
        <div className=" shadow-md fixed z-50 w-full bg-white items-center">
          <div className="max-w-7xl mx-auto  px-4 lg:px-8 flex h-[70px] lg:h-20 justify-between">
            <div className="flex flex-shrink-0 items-center">
              <a href="/">
                <Image
                  width={400}
                  height={400}
                  className="h-16 lg:h-16 w-auto cursor-pointer"
                  src={"https://ibos.io/wp-content/uploads/2024/04/bdCalling-1-1024x259.jpg"}
                  alt="Your Company"
                />
              </a>
            </div>
            <div className=" lg:ml-4 flex items-center">
              {/* Profile dropdown */}

              {
                isLoggedIn ? (
                  <div>
                    {
                      isAdmin &&
                      <div className='flex items-center bg-slate-400 px-2 rounded-md'>
                        <AdminProfile />
                        <h1 className='ml-2 text-white'>{name}</h1>

                      </div>
                    }
                    {
                      isTrainer &&
                      <div className='flex items-center bg-slate-400 px-2 rounded-md'>
                        <TrainerProfile/>
                        <h1 className='ml-2 text-white'>{name}</h1>

                      </div>
                    }
                    {
                      isTrainee &&
                      <div className='flex items-center bg-slate-400 px-2 rounded-md'>
                        <TraineeProfile />
                        <h1 className='ml-2 text-white'>{name}</h1>
                      </div>
                    }

                  </div>
                ) : <WithoutLogin />
              }
            </div>
          </div>
        </div>
      </>
    </div>
  )
}
