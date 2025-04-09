import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-4xl font-semibold text-blue-600 mb-4">Get In Touch</h2>
        <p className="text-xl text-gray-700 mb-6">
          I’d love to hear from you! Whether you have a question or a project in mind, feel free to reach out.
        </p>
        <a
          href="mailto:youremail@example.com"
          className="inline-block bg-blue-600 text-white text-lg py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Send an Email
        </a>
      </div>
    </section>
  );
};

export default Contact;