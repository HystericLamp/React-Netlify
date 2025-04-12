import React from 'react';
import Header from './components/Header';
import Introduction from './components/Introduction';
import ProjectGrid from './components/ProjectGrid';
import Contact from './components/Contact';
import ASolverDemo from './components/ASolverDemo';

const App: React.FC = () => {
  return (
    <div className="light-background dark:dark-background">
      <Header />
      <Introduction />
      <ProjectGrid />
      <ASolverDemo/>
      <Contact />
    </div>
  );
};

export default App;
