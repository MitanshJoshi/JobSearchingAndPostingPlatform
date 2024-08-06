import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className=''>
      <div className='fixed w-full bg-primary flex justify-between items-center lg:px-16 px-2 py-4 text-white top-0 left-0 right-0'>
        <div className='font-bold'>
            Jobify
        </div>
        <ul className='flex font-[600] gap-4'>
            <Link to={"/"}>Home</Link>
            <Link to={"/jobs"}>Jobs</Link>
            <li>About</li>
        </ul>
      </div>
    </div>
  )
}

export default Header
