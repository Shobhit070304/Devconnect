import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, BarChart2, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import { formatDate } from '../../lib/utils';
import axios from "../../api/axios";

export default function DashboardPage() {
  // Mock data - would come from API in real app
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);

  const stats = [
    { title: 'My Projects', value: projects.length, icon: BarChart2, color: 'text-primary-600 dark:text-primary-400' },
    { title: 'Collaborations', value: 12, icon: Users, color: 'text-secondary-600 dark:text-secondary-400' },
    { title: 'Accepted Requests', value: projects.filter(project => project.isOpen).length, icon: CheckCircle, color: 'text-success-500 dark:text-success-500' },
    { title: 'Pending Requests', value: projects.filter(project => !project.isOpen).length, icon: Clock, color: 'text-warning-500 dark:text-warning-500' },
  ];

  const myProjects = [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'A modern e-commerce platform with React, Node.js, and Stripe integration.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      createdAt: '2025-01-10T12:00:00Z',
      lookingFor: true,
      collaborators: [
        { name: 'Alex Morgan', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
      ]
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A collaborative task management app with real-time updates using Socket.io.',
      tech: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
      createdAt: '2025-01-05T10:30:00Z',
      lookingFor: false,
      collaborators: [
        { name: 'Jasmine Wu', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Marcus Johnson', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
      ]
    },
    {
      id: '3',
      title: 'Developer Portfolio Generator',
      description: 'A tool to help developers create beautiful portfolio websites with minimal effort.',
      tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
      createdAt: '2024-12-20T09:15:00Z',
      lookingFor: true,
      collaborators: []
    },
  ];

  const pendingRequests = [
    {
      id: '1',
      project: 'E-commerce Platform',
      from: { name: 'Sophie Taylor', avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
      message: 'I have 3+ years of experience with React and Node.js. I\'d love to help with the authentication system and product catalog.',
      sentAt: '2025-01-15T14:30:00Z',
    },
    {
      id: '2',
      project: 'Developer Portfolio Generator',
      from: { name: 'David Kim', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
      message: 'I\'m passionate about creating beautiful UIs and have expertise in Next.js and Tailwind. Would love to collaborate!',
      sentAt: '2025-01-12T11:45:00Z',
    },
  ];

  const activeCollaborations = [
    {
      id: '1',
      project: 'Weather App',
      owner: { name: 'Emma Wilson', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
      role: 'Frontend Developer',
      startedAt: '2024-12-05T10:00:00Z',
      lastActivity: '2025-01-14T16:20:00Z',
    },
    {
      id: '2',
      project: 'Recipe Sharing Platform',
      owner: { name: 'Ryan Martinez', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
      role: 'Full Stack Developer',
      startedAt: '2024-11-20T14:15:00Z',
      lastActivity: '2025-01-16T09:45:00Z',
    },
  ];

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/post/me', {
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
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <Link to="/projects/create">
          <Button leftIcon={<PlusCircle className="h-5 w-5" />}>
            New Project
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'projects'
              ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300'
              }`}
            onClick={() => setActiveTab('projects')}
          >
            My Projects
          </button>
          <button
            className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'requests'
              ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300'
              }`}
            onClick={() => setActiveTab('requests')}
          >
            Collaboration Requests
            <span className="ml-2 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
              {pendingRequests.length}
            </span>
          </button>
          <button
            className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'collaborations'
              ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300'
              }`}
            onClick={() => setActiveTab('collaborations')}
          >
            Active Collaborations
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {activeTab === 'projects' && (
          <>
            {projects.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <Card key={project.id} hoverable>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="line-clamp-1">{project.name}</CardTitle>
                        {project.isOpen && (
                          <Badge variant="accent">Looking for collaborators</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-400">
                        {project.content}
                      </p>

                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.tech.split(',').map((tech, index) => (
                          <Badge key={index} variant="secondary">{tech}</Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Created {formatDate(new Date(project.createdAt))}
                        </div>

                        {/* <div className="flex -space-x-2">
                          {project.collaborators.map((collab, index) => (
                            <Avatar
                              key={index}
                              src={collab.avatar}
                              name={collab.name}
                              size="sm"
                              className="border-2 border-white dark:border-gray-800"
                            />
                          ))}

                          <Link
                            to={`/projects/${project.id}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary-50 text-xs font-medium text-primary-600 hover:bg-primary-100 dark:border-gray-800 dark:bg-primary-900 dark:text-primary-400 dark:hover:bg-primary-800"
                          >
                            <span className="sr-only">View project</span>
                            <PlusCircle className="h-4 w-4" />
                          </Link>
                        </div> */}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-12 dark:border-gray-700">
                <AlertCircle className="h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No projects yet</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">Get started by creating a new project.</p>
                <Link to="/projects/create" className="mt-4">
                  <Button>Create Project</Button>
                </Link>
              </div>
            )}
          </>
        )}

        {activeTab === 'requests' && (
          <>
            {pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar
                            src={request.from.avatar}
                            name={request.from.name}
                            size="lg"
                          />
                          <div>
                            <h3 className="font-medium">{request.from.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              wants to join <span className="font-medium">{request.project}</span>
                            </p>
                            <p className="mt-2">{request.message}</p>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                              Requested {formatDate(new Date(request.sentAt))}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Decline</Button>
                          <Button size="sm">Accept</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-12 dark:border-gray-700">
                <AlertCircle className="h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No pending requests</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  You don't have any pending collaboration requests.
                </p>
              </div>
            )}
          </>
        )}

        {activeTab === 'collaborations' && (
          <>
            {activeCollaborations.length > 0 ? (
              <div className="space-y-4">
                {activeCollaborations.map((collab) => (
                  <Card key={collab.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar
                            src={collab.owner.avatar}
                            name={collab.owner.name}
                            size="lg"
                          />
                          <div>
                            <h3 className="font-medium">{collab.project}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              with <span className="font-medium">{collab.owner.name}</span>
                            </p>
                            <Badge variant="primary" className="mt-2">{collab.role}</Badge>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                              Joined {formatDate(new Date(collab.startedAt))}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Last activity {formatDate(new Date(collab.lastActivity))}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Button size="sm">View Project</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-12 dark:border-gray-700">
                <AlertCircle className="h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No active collaborations</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  You're not collaborating on any projects yet.
                </p>
                <Link to="/projects" className="mt-4">
                  <Button>Explore Projects</Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}