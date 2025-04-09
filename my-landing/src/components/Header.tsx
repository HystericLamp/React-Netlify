import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-800 via-purple-700 to-teal-600 shadow-lg p-6">
      <div className="flex items-center container justify-between mx-auto px-4 py-3">
        <h1 className="text-2xl font-bold font-poppins text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-teal-300">Your Name</h1>
        <p className="text-yellow-200 font-medium">Web Developer & Designer</p>
      </div>
    </header>
  );
};

export default Header;