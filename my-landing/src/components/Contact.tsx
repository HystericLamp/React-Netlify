import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="py-16 text-center">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-4xl font-semibold mb-4 font-poppins transform transition-all duration-500 text-indigo-700
                       dark:text-yellow-200">
          Get In&nbsp;
          <span className='text-teal-600 dark:text-teal-300'>Touch</span>
          </h2>
        <p className="text-xl mb-6">
          I’d love to hear from you! Whether you have a question or a project in mind, feel free to reach out.
        </p>
        <button className="button-light-gradient-filled dark:button-dark-gradient-filled">
          <a href="mailto:renzbrian.cruz@gmail.com">
            Send an Email
          </a>
        </button>
        
      </div>
    </section>
  );
};

export default Contact;