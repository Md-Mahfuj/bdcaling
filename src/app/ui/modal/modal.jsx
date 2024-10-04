'use client';
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function Modal({ open, setOpen, trainerslist }) {
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [trainer, setTrainer] = useState('');

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
    console.log("Creating schedule...");

    try {
      const res = await fetch("http://localhost:8000/api/v1/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, timeSlot, trainer }),
      });

      const { success } = await res.json();

      if(success){
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      }
      // console.log("Schedule created successfully", success);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTrainerSelect = (event) => {
    setSelectedTrainer(event.target.value);
    setTrainer(event.target.value); // Set trainer ID
    console.log("Selected Trainer ID:", event.target.value);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          >
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
              </div>
              <div className="mt-3 sm:mt-5">
                <div>
                  <h2 className="text-lg mt-2 font-semibold mb-1 sm:mb-2">Date</h2>
                  <div className="mt-2">
                    <input
                      value={date}
                      onChange={handleNameChange}
                      name="date"
                      type="text"
                      placeholder="Day Month Year"
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-lg mt-2 font-semibold mb-1 sm:mb-2">Time Slot</h2>
                  <div className="mt-2">
                    <input
                      value={timeSlot}
                      onChange={handleTimeSlotChange}
                      name="timeSlot"
                      type="text"
                      placeholder="10:00-12:00"
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-lg mt-2 font-semibold mb-1 sm:mb-2">Trainer Name</h2>
                  <div className="mt-2">
                    <select
                      value={selectedTrainer}
                      onChange={handleTrainerSelect}
                      className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Select a trainer</option>
                      {trainerslist?.map((trainer) => (
                        <option key={trainer._id} value={trainer._id}>
                          {trainer.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
              >
                Add
              </button>
              <button
                type="button"
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
  );
}
