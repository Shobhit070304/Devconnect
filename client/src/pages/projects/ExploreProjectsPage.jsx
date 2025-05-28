import { useState, useContext, useEffect } from 'react';
import { Search, Filter, Code2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Checkbox from '../../components/ui/Checkbox';
import { formatDate } from '../../lib/utils';
import { UserContext } from '../../contexts/AuthContext';
import axios from '../../api/axios';

export default function ExploreProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTechStack, setSelectedTechStack] = useState([]);
  const [onlyLookingForCollaborators, setOnlyLookingForCollaborators] = useState(false);
  const [projects, setProjects] = useState([]);

  const randomSeed = Math.random().toString(36).substring(2, 10);
  const avatarUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${randomSeed}`;

  // Mock data - would come from API in real app
  const projectss = [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'A modern e-commerce platform with React, Node.js, and Stripe integration.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      createdAt: '2025-01-10T12:00:00Z',
      lookingFor: true,
      owner: {
        name: 'Alex Morgan',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A collaborative task management app with real-time updates using Socket.io.',
      tech: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
      createdAt: '2025-01-05T10:30:00Z',
      lookingFor: false,
      owner: {
        name: 'Jasmine Wu',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    },
    {
      id: '3',
      title: 'Developer Portfolio Generator',
      description: 'A tool to help developers create beautiful portfolio websites with minimal effort.',
      tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
      createdAt: '2024-12-20T09:15:00Z',
      lookingFor: true,
      owner: {
        name: 'Marcus Johnson',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    },
    {
      id: '4',
      title: 'AR Navigation App',
      description: 'An augmented reality app for indoor navigation in large buildings like malls and airports.',
      tech: ['React Native', 'ARKit', 'ARCore', 'Firebase'],
      createdAt: '2025-01-15T14:00:00Z',
      lookingFor: true,
      owner: {
        name: 'Sophie Taylor',
        avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    },
    {
      id: '5',
      title: 'Meal Planning Service',
      description: 'A meal planning and grocery delivery service with custom recipes and nutrition tracking.',
      tech: ['Vue.js', 'Django', 'PostgreSQL'],
      createdAt: '2024-12-28T11:20:00Z',
      lookingFor: false,
      owner: {
        name: 'David Kim',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    },
    {
      id: '6',
      title: 'Crypto Trading Bot',
      description: 'An automated trading bot for cryptocurrency markets with custom strategies and analytics.',
      tech: ['Python', 'TensorFlow', 'MongoDB', 'WebSocket'],
      createdAt: '2025-01-08T08:45:00Z',
      lookingFor: true,
      owner: {
        name: 'Emma Wilson',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    },
  ];

  const allTechOptions = [
    'React', 'Vue.js', 'Angular', 'Next.js', 'TypeScript', 'JavaScript',
    'Node.js', 'Express', 'Django', 'Ruby on Rails', 'Flask',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase',
    'TensorFlow', 'PyTorch', 'Rust', 'Go', 'Swift', 'Kotlin',
    'React Native', 'Flutter', 'Tailwind CSS', 'Socket.io'
  ];

  const { user } = useContext(UserContext);
  // Filter projects
  const filteredProjects = projectss.filter(project => {
    // Filter by search query
    if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !project.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Filter by tech stack
    if (selectedTechStack.length > 0 && !project.tech.some(tech => selectedTechStack.includes(tech))) {
      return false;
    }

    // Filter by looking for collaborators
    if (onlyLookingForCollaborators && !project.lookingFor) {
      return false;
    }

    return true;
  });

  const toggleTechFilter = (tech) => {
    if (selectedTechStack.includes(tech)) {
      setSelectedTechStack(selectedTechStack.filter(t => t !== tech));
    } else {
      setSelectedTechStack([...selectedTechStack, tech]);
    }
  };

  //Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/post/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Projects fetched", response.data.posts);
      setProjects(response.data.posts);
    };
    fetchProjects();
  }, []);


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Explore Projects</h1>
        <p className="text-gray-600 dark:text-gray-400">Discover projects and find collaboration opportunities</p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <div className="relative flex-1">
          <Input
            placeholder="Search projects..."
            leftIcon={<Search className="h-5 w-5" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <Button
          variant="outline"
          leftIcon={<Filter className="h-5 w-5" />}
          onClick={() => setFilterOpen(!filterOpen)}
        >
          Filters
          {(selectedTechStack.length > 0 || onlyLookingForCollaborators) && (
            <span className="ml-2 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
              {selectedTechStack.length + (onlyLookingForCollaborators ? 1 : 0)}
            </span>
          )}
        </Button>

        <Select
          options={[
            { value: 'newest', label: 'Newest' },
            { value: 'oldest', label: 'Oldest' },
            { value: 'az', label: 'A-Z' },
            { value: 'za', label: 'Z-A' },
          ]}
          className="w-full sm:w-40"
        />
      </div>

      {/* Filters panel */}
      {filterOpen && (
        <Card className="p-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-medium">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {allTechOptions.map((tech) => (
                  <button
                    key={tech}
                    className={`rounded-full px-3 py-1 text-sm ${selectedTechStack.includes(tech)
                      ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                      }`}
                    onClick={() => toggleTechFilter(tech)}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-medium">Other Filters</h3>
              <Checkbox
                label="Only show projects looking for collaborators"
                checked={onlyLookingForCollaborators}
                onChange={setOnlyLookingForCollaborators}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedTechStack([]);
                setOnlyLookingForCollaborators(false);
              }}
            >
              Clear All
            </Button>
            <Button onClick={() => setFilterOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </Card>
      )}

      {/* Projects grid */}
      {projects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project._id} hoverable>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar
                      src={avatarUrl}
                      name={project.user.username}
                      size="sm"
                    />
                    <span className="text-sm font-medium">{project.user.username}</span>
                  </div>
                  {project.isOpen && (
                    <Badge variant="accent">Looking for collaborators</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <h3 className="mb-2 text-xl font-semibold">{project.name}</h3>
                <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-400">
                  {project.content}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tech.split(',').map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Created {formatDate(new Date(project.createdAt))}
                </p>
              </CardContent>

              <CardFooter className="pt-2 flex gap-2">
                <Button
                  variant="outline"
                  className="w-1/2"
                >
                  View Details
                </Button>

                {project.isOpen && (
                  <Button className="w-1/2">
                    Request to Join
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-16 dark:border-gray-700">
          <Code2 className="h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">No projects found</h3>
          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
          <Button
            className="mt-4"
            onClick={() => {
              setSearchQuery('');
              setSelectedTechStack([]);
              setOnlyLookingForCollaborators(false);
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}