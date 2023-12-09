import React, { useState } from 'react';
import { HiOutlineSearch, HiOutlineBell } from 'react-icons/hi';
import UserButton from './UserButton';

const Header = () => {
  return (
    <div className="bg-white h-16 px-4 flex flex-row justify-between">
      <div className="relative my-auto">
        <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
        <input type="text" placeholder="Search..." className="text-sm focus:outline-none active:outline-orange border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-md hover:border-orange-500" />
      </div>

      <div className="my-3 mx-3 flex flex-row space-x-3.5 items-center">
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
