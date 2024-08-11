import React from 'react'
import Topfields from '../components/Topfields'
import HowItWorks from '../components/HowItWorks'
import Footer from '../components/Footer'

const Homepage = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-[92.3vh] max-w-screen mt-[-30px]'>
        <h1 className='text-[35px] mb-11 font-bold'>Find The Job You Need</h1>
        <p className='text-[20px] text-gray-400 mb-11'>Find The Job You Need</p>
        <div className='lg:w-[35%] w-[90%] p-7 bg-primary3 rounded-2xl hover:text-white hover:bg-black font-[400] cursor-pointer shadow-md'>
        CareerConnect streamlines the job search and hiring process by connecting job seekers with employers in a user-friendly platform. Job seekers can effortlessly search for positions that match their interests, while employers can easily post job openings and manage applications. With features like scheduled email notifications and profile management, our website ensures a seamless experience for both candidates and recruiters, helping them find the perfect match efficiently.
        </div>
      </div>
      <Topfields />
      <HowItWorks/>
      <Footer/>
    </>
  )
}

export default Homepage
