import React from 'react';

const Introduction: React.FC = () => {
  return (
    <section className="py-16 text-center">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-4xl font-semibold mb-4 font-poppins gradient-light-text
                       dark:font-bold dark:gradient-dark-text">Hello, I'm Brian Cruz!</h2>
        <p className="text-xl max-w-xl mx-auto leading-relaxed">
          I'm a Software Developer with some experience in Software QA, passionate about passionate about building robust, maintainable solutions through clean code and thorough testing.
          Focused on building reliable, high-quality applications that meet user needs and find real-world use.
        </p>
      </div>
    </section>
  );
};

export default Introduction;