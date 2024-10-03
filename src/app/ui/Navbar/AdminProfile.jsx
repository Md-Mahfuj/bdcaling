
import {Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import Image from 'next/image'
import { signOut } from "../../Utility/SignOut"

const AdminProfile = () => {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <Image
            width={400}
            height={400}
            alt=""
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9OA0ui4Ou3m0PMMwbZUMJIeLyAKOBL84F9Q&s"
            className="h-8 w-8 rounded-full"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <MenuItem>
          <a href="/schedules" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
           schedules add
          </a>
        </MenuItem>
        <MenuItem>
          <a href="/traineradd" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
          trainers add 
          </a>
        </MenuItem>
        <MenuItem>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100" onClick={() => signOut('/login')}>Sign Out</button>

        </MenuItem>
      </MenuItems>
    </Menu>
  )
}

export default AdminProfile;