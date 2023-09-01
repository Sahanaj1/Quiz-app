import React from 'react';
import user from "../assets/user1.png"
const Navbar = ({ name, onLogout }) => {
  
  return (
    <nav className="bg-indigo-600 p-4 w-full">
      <div className="container mx-auto">
        <div className='flex justify-between'>
          <h1 className="text-2xl text-white font-semibold">Quiz App</h1>
          <div className="flex items-center">
            {name  ? <><img src={user} className='h-6 1-6 lg:h-8 lg:w-8' />
              <div className='text-sm lg:text-xl text-white font-semibold ml-2'>{name }</div>
              <div className='text-xs lg:text-sm text-white font-semibold ml-2 cursor-pointer' onClick={onLogout}>Logout</div></>
              : ""
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
