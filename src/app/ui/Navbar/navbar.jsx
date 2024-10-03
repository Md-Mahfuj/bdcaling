"use client"
import Image from 'next/image'
// import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
// import { PiShoppingCartSimple } from "react-icons/pi";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// import ProfileBar from './ProfileBar'
// import ProfileBarAdmin from './ProfilebarAdmin'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const WithoutLogin = () => {
  return (
    <a
      href={"/login"}
      className="my-auto mr-1 flex flex-row items-center">
      {/* <div
        className=" hidden md:flex w-10 md:w-10  justify-end">
        <Avatar>
          <AvatarImage className="w-10 h-10 border-2 border-color2  my-auto rounded-full object-cover cursor-pointer" src={"https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"} alt="@shadcn" />
        </Avatar>
      </div> */}
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
//   const { data: session } = useSession({ required: false });
  const router = useRouter();

  // console.log("session 100",session)


  return (
    <div  className="bg-white shadow">
      
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
                  
                   <WithoutLogin />
                }
                {/* {session?.user?.role=="user" ? <ProfileBar session={session} /> : ""}

                {session?.user?.role=="admin" ? <ProfileBarAdmin session={session} /> : ""} */}

              </div>
            </div>





          </div>


        </>
    
    </div>
  )
}
