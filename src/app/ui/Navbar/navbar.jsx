"use client"
import Image from 'next/image'


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
