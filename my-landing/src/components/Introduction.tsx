import React from 'react';

const Introduction: React.FC = () => {
  return (
    <section className="py-16 text-center">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-4xl font-semibold text-blue-600 mb-4">Hello, I'm Your Name!</h2>
        <p className="text-xl text-gray-700">
          I'm a passionate web developer with experience in React, TypeScript, and modern web technologies. Let's create something amazing together!
        </p>
      </div>
    </section>
  );
};

export default Introduction;