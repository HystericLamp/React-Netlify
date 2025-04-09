import React from 'react';
import Header from './components/Header';
import Introduction from './components/Introduction';
import ProjectGrid from './components/ProjectGrid';
import Contact from './components/Contact';
import ASolverDemo from './components/ASolverDemo';

const App: React.FC = () => {
  return (
    <div className="font-sans bg-gray-50">
      <Header />
      <Introduction />
      <ProjectGrid />
      <ASolverDemo/>
      <Contact />
    </div>
  );
};

export default App;
