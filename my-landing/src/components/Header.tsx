import { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    const nowDark = html.classList.toggle('dark');
    setDarkMode(nowDark);
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');
  };

  return (
    <header className="gradient-light-header shadow-lg dark:gradient-dark-header">
      <div className="flex items-center container justify-between mx-auto px-4 py-3">
        <h1 
          className="text-2xl font-bold font-poppins text-transparent bg-clip-text gradient-light-text
                      dark:font-boldtext-transparent dark:gradient-dark-text"
        >Brian Cruz</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-indigo-600 transition-all duration-300
                    dark:bg-yellow-500"
          title="Toggle Dark Mode"
        >
          {darkMode ? ("🌞") : ("🌙")}
        </button>
      </div>
    </header>
  );
};

export default Header;