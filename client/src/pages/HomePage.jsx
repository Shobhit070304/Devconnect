import { Link } from 'react-router-dom';
import { Code2, Users, Lightbulb, MessageSquare, ChevronRight, Github, Linkedin, Twitter, Sun, Moon } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { useTheme } from '../contexts/ThemeContext';
import Avatar from '../components/ui/Avatar';
import { UserContext } from '../contexts/AuthContext';
import { useContext } from 'react';

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();

  const { user, logout } = useContext(UserContext);
  console.log(user);

  // Sample developers
  const featuredDevs = [
    { name: 'Alex Morgan', role: 'Frontend Developer', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Jasmine Wu', role: 'Full Stack Developer', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Marcus Johnson', role: 'Backend Developer', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  ];

  // Sample testimonials
  const testimonials = [
    {
      content: "DevConnect helped me find the perfect team for my startup idea. We're now getting ready for our first funding round!",
      author: "Sarah L.",
      role: "Founder, TechStart"
    },
    {
      content: "As a self-taught developer, finding mentors was always hard. On DevConnect, I connected with senior devs who helped me grow my skills exponentially.",
      author: "Michael T.",
      role: "Junior Developer"
    },
    {
      content: "The quality of developers on this platform is outstanding. I've hired three team members through DevConnect for our remote team.",
      author: "Jessica K.",
      role: "CTO, RemoteForce"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">DevConnect</span>
            </Link>
          </div>

          <nav className="hidden space-x-8 md:flex">
            <Link to='/projects' className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
              Explore Projects
            </Link>
            <Link to={user ? '/dashboard' : '/login'} className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
              Dashboard
            </Link>
          </nav>


          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              onClick={toggleTheme}
            >
              {theme === 'dark' ?
                <span className="sr-only">Switch to light mode</span> :
                <span className="sr-only">Switch to dark mode</span>
              }
              {theme === 'dark' ?
                <Sun className="h-5 w-5" /> :
                <Moon className="h-5 w-5" />
              }
            </button>

            {user ? (
              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                <Link to="/profile">
                  <Avatar src={user.avatar} name={user.name} size="sm" />
                </Link>
                <Button variant="outline" onClick={logout}>Logout</Button>
              </div>
            ) : <div className="hidden sm:flex sm:items-center sm:space-x-4">
              <Link to="/login">
                <Button variant="outline">Sign in</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>}
          </div>
        </div>
      </header>

      <main>
        {/* Hero section */}
        <section className="relative bg-gradient-to-b from-white to-gray-100 py-16 dark:from-gray-900 dark:to-gray-950 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2">
                <h1 className="animate-fadeIn text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block">Connect. Collaborate.</span>
                  <span className="block text-primary-600 dark:text-primary-400">Create amazing things.</span>
                </h1>
                <p className="mt-6 max-w-2xl animate-slideUp text-lg text-gray-600 dark:text-gray-300">
                  Join the community where developers find teammates, mentors, and collaborators for exciting projects. Turn your ideas into reality with the right team.
                </p>
                <div className="mt-10 flex animate-slideUp items-center space-x-6">
                  <Link to="/projects">
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link to="/projects" className="flex items-center text-primary-600 transition duration-150 ease-in-out hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                    <span>Explore projects</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="mt-10 animate-slideInRight md:mt-0 md:w-1/2">
                <img
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Developers collaborating"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Feature section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Why Join DevConnect?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                The platform built by developers for developers to collaborate effectively
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card hoverable className="transform transition-transform duration-300 hover:scale-105">
                <CardContent className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 text-primary-600 dark:text-primary-400" />
                  <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">Find Your Team</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Connect with developers who complement your skills and share your vision.
                  </p>
                </CardContent>
              </Card>

              <Card hoverable className="transform transition-transform duration-300 hover:scale-105">
                <CardContent className="flex flex-col items-center text-center">
                  <Lightbulb className="h-12 w-12 text-primary-600 dark:text-primary-400" />
                  <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">Showcase Ideas</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Present your projects and get valuable feedback from the community.
                  </p>
                </CardContent>
              </Card>

              <Card hoverable className="transform transition-transform duration-300 hover:scale-105">
                <CardContent className="flex flex-col items-center text-center">
                  <MessageSquare className="h-12 w-12 text-primary-600 dark:text-primary-400" />
                  <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">Seamless Communication</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Collaborate efficiently with integrated messaging and project tools.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured developers */}
        <section className="bg-gray-50 py-16 dark:bg-gray-900 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Featured Developers
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                Meet some of our talented community members
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredDevs.map((dev, index) => (
                <Card key={index} hoverable>
                  <CardContent className="flex flex-col items-center py-6 text-center">
                    <Avatar
                      src={dev.avatar}
                      name={dev.name}
                      size="xl"
                      className="mb-4"
                    />
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">{dev.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{dev.role}</p>

                    <div className="mt-4 flex space-x-4">
                      <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <Github className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <Linkedin className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <Twitter className="h-5 w-5" />
                      </button>
                    </div>

                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => {/* View profile */ }}
                    >
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/explore">
                <Button variant="outline">
                  Explore All Developers
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                What Our Users Say
              </h2>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800">
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">"{testimonial.content}"</p>
                    <div className="mt-6">
                      <p className="font-medium text-gray-900 dark:text-white">{testimonial.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-primary-600 py-16 dark:bg-primary-800 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to start collaborating?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
                Join thousands of developers who are already building amazing projects together.
              </p>
              <div className="mt-10">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="bg-white text-primary-600 hover:bg-gray-100 dark:bg-white dark:text-primary-600 dark:hover:bg-gray-100"
                  >
                    Sign up for free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center">
              <Code2 className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">DevConnect</span>
            </div>

            <nav className="mt-8 flex flex-wrap justify-center space-x-6 md:mt-0">
              <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                About
              </Link>
              <Link to="/faq" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                FAQ
              </Link>
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Privacy
              </Link>
              <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Terms
              </Link>
              <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Contact
              </Link>
            </nav>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              &copy; 2025 DevConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}