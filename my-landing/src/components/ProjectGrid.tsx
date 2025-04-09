import React from 'react';

const ProjectGrid: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-4xl font-semibold text-blue-600 mb-8">My Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example Project 1 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800">Project 1</h3>
            <p className="text-gray-600 mt-2">A brief description of what this project is about.</p>
          </div>
          {/* Example Project 2 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800">Project 2</h3>
            <p className="text-gray-600 mt-2">A brief description of what this project is about.</p>
          </div>
          {/* Example Project 3 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800">Project 3</h3>
            <p className="text-gray-600 mt-2">A brief description of what this project is about.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;