'use client'
"use client";
import {  useState } from "react";

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

export default function Modal({ open, setOpen }) {

  const [date, setDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [trainer, setTrainer] = useState('')

  const handleNameChange = (e) => {
    setDate(e.target.value);
  };
  const handleTimeSlotChange = (e) => {
    setTimeSlot(e.target.value);
  };
  const handleTrainerChange = (e) => {
    setTrainer(e.target.value);
  };

  const handleSubmit = async () => {

    console.log("schedules create ");


    try {
      const res = await fetch("http://localhost:8000/api/v1/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, timeSlot, trainer }),
      });

      const { success } = await res.json();
      console.log("success schedules ",success);

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
              <div className="mt-3  sm:mt-5">

                <div>
                  <h2 className="text-lg mt-2  font-semibold mb-1 sm:mb-2">date</h2>
                  <div className="mt-2">
                    <input
                      value={date}
                      onChange={handleNameChange}
                      name="name"
                      type="text"
                      placeholder="day month  year"
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-lg mt-2  font-semibold mb-1 sm:mb-2">timeSlot</h2>
                  <div className="mt-2">
                    <input
                      value={timeSlot}
                      onChange={handleTimeSlotChange}
                      name="name"
                      type="text"
                      placeholder="10:00-12:00"
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg mt-2  font-semibold mb-1 sm:mb-2">trainer id</h2>
                  <div className="mt-2">
                    <input
                      value={trainer}
                      onChange={handleTrainerChange}
                      name="name"
                      type="text"
                      placeholder="66fceba8d9041aa68bc79a51"
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>


              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="button"
                onClick={() => handleSubmit()}

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
