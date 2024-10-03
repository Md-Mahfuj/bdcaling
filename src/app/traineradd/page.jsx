
"use client"
import { useEffect, useState } from 'react';

import Modal from "../ui/modal/tainar"

export default function Schedule() {
    const [open, setOpen] = useState(false)

    const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [idSend, setSend] = useState('');



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/trainers", {
                    method: "GET"
                });
                const data = await response.json();
                console.log("data", data);
                setData(data); // Set the data
            } catch (error) {
                console.log(error);
            } finally {
                // setLoading(false); // Set loading to false
            }
        };

        fetchData(); // Call the fetch function
    }, []);

    const updateUser =(id)=>{
        setOpen(true)
        setSend(id)
    }


    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-24">
            <div className="sm:flex sm:items-center">
                <Modal
                  idSend={idSend}
                    open={open}
                    setOpen={setOpen}
                />


                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">All user </h1>

                </div>
           
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        email
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        role
                                        </th>

                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {data?.map((item) => {
                                       
                                        return (
                                            <tr key={item._id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {item?.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item?.email}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item?.role}</td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <div onClick={()=>updateUser(item._id)}  className="text-indigo-600 hover:text-indigo-900">
                                                        Update to trainer <span className="sr-only">, { }</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
