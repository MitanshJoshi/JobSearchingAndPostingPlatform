import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useSelector } from 'react-redux';

const Footer = () => {

    const {isAuthenticated} = useSelector((state)=>state.user)
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h2 className="text-xl font-bold mb-2">CareerConnect</h2>
            <p className="text-sm">Connecting job seekers with employers seamlessly.</p>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-2">Quick Links</h2>
            <ul className="text-sm">
              <li className="mb-1"><a href="/about" className="hover:underline">About Us</a></li>
              <li className="mb-1"><a href="/contact" className="hover:underline">Contact Us</a></li>
              <li className="mb-1"><a href="/jobs" className="hover:underline">Job Listings</a></li>
              {isAuthenticated?
              <li className="mb-1"><a href="/faq" className="hover:underline">Dashboard</a></li>
                :<></>}
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0 flex flex-col items-center ">
            <h2 className="text-xl font-bold mb-2">Contact Information</h2>
            <p className="text-sm">Gift City Center</p>
            <p className="text-sm">Gandhinagar, Gujarat, 392330</p>
            <p className="text-sm">Email: info@jobportal.com</p>
            <p className="text-sm">Phone: +91 8799103491</p>
          </div>
          <div className="w-full md:w-1/4 flex flex-col items-center ">
            <h2 className="text-xl font-bold mb-2">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className="hover:text-gray-400"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#" className="hover:text-gray-400"><FontAwesomeIcon icon={faLinkedinIn} /></a>
              <a href="#" className="hover:text-gray-400"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          &copy; 2024 Job Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
