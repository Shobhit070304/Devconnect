import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, Moon, Sun, Code2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import Tooltip from '../ui/Tooltip';
import { useContext } from 'react';
import { UserContext } from '../../contexts/AuthContext';


export default function Header({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const randomSeed = Math.random().toString(36).substring(2, 10);
  const avatarUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${randomSeed}`;

  const { user } = useContext(UserContext);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button
            type="button"
            className="mr-4 rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 lg:hidden"
            onClick={onMenuClick}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            <span className="hidden text-xl font-bold text-gray-900 dark:text-white sm:inline-block">DevConnect</span>
          </Link>
        </div>

        <div className="hidden w-full max-w-xs sm:block">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-primary-400 dark:focus:ring-primary-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Tooltip content="Search" position="bottom">
            <button
              type="button"
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 sm:hidden"
              onClick={() => {/* Open mobile search */ }}
            >
              <span className="sr-only">Search</span>
              <Search className="h-5 w-5" />
            </button>
          </Tooltip>

          <Tooltip content="Notifications" position="bottom">
            <button
              type="button"
              className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-error-500"></span>
            </button>
          </Tooltip>

          <Tooltip content={theme === 'dark' ? 'Light mode' : 'Dark mode'} position="bottom">
            <button
              type="button"
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              onClick={toggleTheme}
            >
              <span className="sr-only">Toggle theme</span>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </Tooltip>

          <div className="relative">
            <Tooltip content="Your profile" position="bottom">
              <button
                type="button"
                className="flex rounded-full"
                onClick={() => navigate(`/profile/${user._id}`)}
              >
                <span className="sr-only">Open user menu</span>
                <Avatar src={avatarUrl} name={user.username} size="sm" />
              </button>
            </Tooltip>
          </div>

          <div className="hidden md:flex">
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate('/projects/create')}
            >
              New Project
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}