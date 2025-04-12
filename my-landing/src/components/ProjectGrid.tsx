import React from 'react';

const ProjectGrid: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-8 gradient-light-text dark:gradient-dark-text">My Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example Project 1 */}
          <div className="project-card-light dark:project-card-dark">
            <h3>Project 1</h3>
            <p>WIP</p>
          </div>
          {/* Example Project 2 */}
          <div className="project-card-light dark:project-card-dark">
            <h3>Project 2</h3>
            <p>WIP</p>
          </div>
          {/* Example Project 3 */}
          <div className="project-card-light dark:project-card-dark">
            <h3>Project 3</h3>
            <p>WIP</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;