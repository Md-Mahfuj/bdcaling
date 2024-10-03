'use client'
"use client";
import { useState } from "react";

import { Dialog, DialogBackdrop, DialogPanel} from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

export default function Modal({ open, setOpen,idSend }) {
    const [role, setRole] = useState('Trainer'); 
    const handleRoleChange = (event) => {
        setRole(event.target.value); 
    };
    const handleSubmit = async (id) => {
        try {
              const res = await fetch(`http://localhost:8000/api/trainers/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({role }),
              });
            //   const { success } = await res.json();

              if (typeof window !== 'undefined') {
                window.location.reload();
              }
              setOpen(false);

            // setIsLoading(false);
            // if (success) {
            //   router.replace("/login");

            // }
        } catch (error) {
            console.log(error);
        }

    };
    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div>
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                <CheckIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={role} // Bind the value to the state
                                    onChange={handleRoleChange} // Handle changes in the dropdown
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option>Trainer</option>
                                    <option>Trainee</option>
                                </select>
                            </div>

                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                                type="button"
                                onClick={() => handleSubmit(idSend)}

                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                            >
                                Add
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => setOpen(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
