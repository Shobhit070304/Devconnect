import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Code2, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function AuthLayout() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">DevCollab</span>
          </Link>
          
          <button
            type="button"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            onClick={toggleTheme}
          >
            <span className="sr-only">Toggle theme</span>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>
      
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
      
      <footer className="border-t border-gray-200 py-4 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
        <div className="mx-auto max-w-7xl px-4">
          <p>© 2025 DevCollab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}