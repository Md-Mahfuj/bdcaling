"use client";
import { useEffect, useState } from "react";
import { checkLoginStatus } from "./Utility/authUtils"; // Adjust the path based on your structure

import Image from 'next/image'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Usage in a component
  useEffect(() => {
    const { isLoggedIn, role } = checkLoginStatus();
    setIsLoggedIn(isLoggedIn);
    setIsAdmin(role === 'admin');
    setLoading(false);
  }, []);


  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoggedIn ? (
        isAdmin ? (
          <div className="text-green-500">
            <h2 className="text-2xl font-bold">Welcome, Admin!</h2>
            <p>You have admin access.</p>
          </div>
        ) : (
          <div className="text-blue-500">
            <h2 className="text-2xl font-bold">Welcome, User!</h2>
            <p>You do not have admin access.</p>
          </div>
        )
      ) : (
        <div className="text-red-500 ">

          <main>
            <div className="relative isolate">
              <svg
                aria-hidden="true"
                className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
              >
                <defs>
                  <pattern
                    x="50%"
                    y={-1}
                    id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M.5 200V.5H200" fill="none" />
                  </pattern>
                </defs>
                <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                  <path
                    d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                    strokeWidth={0}
                  />
                </svg>
                <rect fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" width="100%" height="100%" strokeWidth={0} />
              </svg>
              <div
                aria-hidden="true"
                className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
              >
                <div
                  style={{
                    clipPath:
                      'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
                  }}
                  className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                />
              </div>
              <div className="overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                  <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                    <div className="flex flex-col justify-center items-center md:justify-start md:items-start relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">

                      <h2 className="text-2xl font-bold">Welcome, Guest!</h2>
                      <p>Please log in to access your account.</p>
                      <a href="/login" className="text-indigo-600 hover:text-indigo-500">Login here</a>


                      <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                        Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in quis cupidatat mollit aute velit. Et
                        labore commodo nulla aliqua proident mollit ullamco exercitation tempor. Sint aliqua anim nulla sunt
                        mollit id pariatur in voluptate cillum.
                      </p>
                      <div className="mt-10 flex items-center gap-x-6">
                        <a
                          href="#"
                          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Admission
                        </a>

                      </div>
                    </div>
                    <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                      <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                        <div className="relative">
                          <Image
                            width={400}
                            height={400}
                            alt=""
                            src="https://plus.unsplash.com/premium_photo-1661265933107-85a5dbd815af?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9keWJ1aWxkaW5nfGVufDB8fDB8fHww"
                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                          />
                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                      </div>
                      <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                        <div className="relative">
                          <Image
                            width={400}
                            height={400}
                            alt=""
                            src="https://ironbullstrength.com/cdn/shop/articles/bodybuilding-equiupments-you-must-have_520x500_93a9cd44-733a-4355-9b73-0adb7fe0f7aa.webp?v=1690890453"
                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                          />
                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                        <div className="relative">
                          <Image
                            width={400}
                            height={400}
                            alt=""
                            src="https://myxperiencefitness.com/wp-content/uploads/2019/05/April-20-feature-photo.jpg.webp"
                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                          />
                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                      </div>
                      <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                        <div className="relative">
                          <Image
                            width={400}
                            height={400}
                            alt=""
                            src="https://c8.alamy.com/comp/2PYGPBC/fitness-kettlebell-and-woman-in-gym-with-exercise-portrait-strong-and-weightlifting-and-body-builder-body-workout-training-and-body-building-with-muscle-and-happy-athlete-sports-motivation-2PYGPBC.jpg"
                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                          />
                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                        <div className="relative">
                          <Image
                            width={400}
                            height={400}
                            alt=""
                            src="https://myxperiencefitness.com/wp-content/uploads/2019/05/April-20-feature-photo.jpg.webp"
                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                          />
                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

        </div>
      )}
    </div>
  );
}
