"use client";
import { useEffect, useState } from "react";
import { checkLoginStatus } from "../Utility/authUtils";
import Image from 'next/image';
// import Person from "../libs/person.png";
// import Modal from "../components/modal";

export default function Profile() {

    const [name, setName] = useState('')
    const [id, setId] = useState('')

    const [profile, setProfile] = useState([]);


    const [address, setAddress] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleAddreChange = (e) => {
        setAddress(e.target.value);
    };

    const handleSubmit = async () => {

        try {
            let profile ={}
            profile.address=address;
            const res = await fetch(`http://localhost:8000/api/trainers/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name,profile }),
            });
            // const { success } = await res.json();

        } catch (error) {

            console.log(error);
        }

    };


    useEffect(() => {
        const { name, id } = checkLoginStatus();
        setName(name);
        setId(id)


    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/trainee/${id}`, {
                    method: "GET"
                });
                const data = await response.json();
                console.log("trainee", data);
                setAddress(data?.profile?.address)
                setProfile(data); // Set the data
            } catch (error) {
                console.log(error);
            } finally {
                // setLoading(false); // Set loading to false
            }
        };

        fetchData(); // Call the fetch function
    }, [id]);

    return (
        <div className="py-32 sm:py-28 min-h-screen bg-white sm:bg-gray-100 flex items-center justify-center">
            <div className="bg-white text-black p-8 rounded-lg sm:shadow-md w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-32 h-32 p-1 mb-4 rounded-full bg-indigo-100 ring-2 ring-indigo-600">
                        <Image
                            width={200}
                            height={200}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9OA0ui4Ou3m0PMMwbZUMJIeLyAKOBL84F9Q&s"

                            alt="Profile"
                            className="rounded-full object-cover w-[126px] h-[120px] md:w-32 md:h-[113px]"
                        />
                    </div>
                    <h1 className="text-xl font-semibold text-indigo-700"> {name} </h1>
                </div>

                <div>
                    <h2 className="text-lg mt-2  font-semibold mb-1 sm:mb-2">Name :</h2>

                    <div className="mt-2">
                        <input
                            value={name}
                            onChange={handleNameChange}
                            name="name"
                            type="text"
                            placeholder="you@example.com"
                            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <h2 className="text-lg mt-2  font-semibold mb-1 sm:mb-2">Address :</h2>

                    <div className="mt-2">
                        <input
                            value={address}
                            onChange={handleAddreChange}

                            placeholder="address"
                            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <h2 className="text-lg  mt-2 font-semibold mb-1 sm:mb-2">Email :</h2>

                    <div className="mt-2">
                        <input
                            disabled
                            value={profile?.email}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <button
                    onClick={handleSubmit} // Call handleClick when clicked
                    className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md"
                >
                    Submit
                </button>


            </div>
        </div>
    );
}
