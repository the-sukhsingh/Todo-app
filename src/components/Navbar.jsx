import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex md:justify-evenly justify-center bg-slate-700 text-white gap-32">
        <div className="logo flex items-center">
            <span className='font-bold text-xl '>iTask</span>
        </div>
        <ul className="flex gap-5 p-5">
            <li className='cursor-pointer hover:scale-[1.2] transition-all'>Home</li>
            <li className='cursor-pointer hover:scale-[1.2] transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
