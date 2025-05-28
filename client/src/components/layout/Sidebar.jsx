import { Link, useLocation } from 'react-router-dom';
import { X, Home, Briefcase, Users, User, Settings, PlusCircle, MessageCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { UserContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

export default function Sidebar({ open, onClose }) {
  const location = useLocation();

  const { user } = useContext(UserContext);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Projects', href: '/projects', icon: Briefcase },
    { name: 'Explore', href: '/explore', icon: Users },
    { name: 'Profile', href: `/profile/${user._id}`, icon: User },
    { name: 'Messages', href: '/messages', icon: MessageCircle },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform overflow-y-auto bg-white transition-transform duration-300 ease-in-out dark:bg-gray-900 lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">DevConnect</span>
          </Link>
          <button
            type="button"
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 lg:hidden"
            onClick={onClose}
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-5 space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-white'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 px-4">
          <Link
            to="/projects/create"
            className="flex w-full items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-400 dark:focus:ring-offset-gray-900"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            New Project
          </Link>
        </div>
      </div>
    </>
  );
}