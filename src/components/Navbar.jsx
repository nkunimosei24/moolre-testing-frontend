import React from "react";


const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
       
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold tracking-wide">Moolre</h1>
        </div>

        
        <div className="hidden md:flex space-x-8">
          <a href="/" className="hover:text-gray-200 transition">Transfer Money</a>
          <a href="/singleSMS" className="hover:text-gray-200 transition">Send Single SMS</a>
          <a href="/bulkSms" className="hover:text-gray-200 transition">Send Bulk SMS</a>
          
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
