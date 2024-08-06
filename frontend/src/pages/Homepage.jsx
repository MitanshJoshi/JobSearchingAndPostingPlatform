import React from 'react'
import Topfields from '../components/Topfields'
import HowItWorks from '../components/HowItWorks'

const Homepage = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-[92.3vh] max-w-screen mt-[-30px]'>
        <h1 className='text-[35px] mb-11 font-bold'>Find The Job You Need</h1>
        <p className='text-[20px] text-gray-400 mb-11'>Find The Job You Need</p>
        <div className='lg:w-[35%] w-[90%] p-7 bg-primary3 rounded-2xl hover:text-white hover:bg-black font-[400] cursor-pointer shadow-md'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ex eveniet voluptatem amet quidem ipsum dolore. Qui minus, et iusto voluptatem, ratione eaque dolorem possimus ipsa saepe aut a perspiciatis, numquam obcaecati facere incidunt maiores quia sed! Tempora, delectus! Veritatis quidem cumque quod ab culpa.
        </div>
      </div>
      <Topfields />
      <HowItWorks/>
    </>
  )
}

export default Homepage
