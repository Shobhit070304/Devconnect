import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Edit, Flag, MessageSquare, User, Calendar, Code2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Textarea from '../../components/ui/Textarea';
import { formatDate } from '../../lib/utils';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [requestMessage, setRequestMessage] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  
  // Mock data - would come from API in real app
  const project = {
    id: id || '1',
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform built with React and Node.js, featuring a responsive UI, secure authentication, payment processing with Stripe, and a comprehensive admin dashboard.\n\nThe platform includes product catalog management, shopping cart functionality, order processing, and user account management. The backend API is built with Express and uses MongoDB for data storage.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    createdAt: '2025-01-10T12:00:00Z',
    updatedAt: '2025-01-15T09:30:00Z',
    lookingFor: true,
    githubUrl: 'https://github.com/username/ecommerce-platform',
    demoUrl: 'https://ecommerce-demo.example.com',
    images: [
      'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5082577/pexels-photo-5082577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    owner: {
      id: 'user1',
      name: 'Alex Morgan',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      role: 'Full Stack Developer',
      joinedAt: '2024-11-05T00:00:00Z'
    },
    collaborators: [
      {
        id: 'user2',
        name: 'Jasmine Wu',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        role: 'Frontend Developer',
        joinedAt: '2025-01-12T00:00:00Z'
      }
    ]
  };
  
  const handleSendRequest = () => {
    // In a real app, this would send the request to the backend
    setRequestSent(true);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div className="flex items-center space-x-2">
          <Link to="/projects" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold">{project.title}</h1>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                leftIcon={<Github className="h-5 w-5" />}
              >
                View on GitHub
              </Button>
            </a>
          )}
          
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                leftIcon={<ExternalLink className="h-5 w-5" />}
              >
                Live Demo
              </Button>
            </a>
          )}
          
          <Button
            variant="outline"
            leftIcon={<Flag className="h-5 w-5" />}
          >
            Report
          </Button>
        </div>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Project details */}
          <Card>
            <CardContent className="p-6">
              <div className="mb-6 flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                  <Badge key={index} variant="secondary">{tech}</Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar 
                    src={project.owner.avatar}
                    name={project.owner.name}
                    size="md"
                  />
                  <div>
                    <p className="font-medium">{project.owner.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{project.owner.role}</p>
                  </div>
                </div>
                
                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                  <p>Created {formatDate(new Date(project.createdAt))}</p>
                  <p>Updated {formatDate(new Date(project.updatedAt))}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold">Description</h2>
                <div className="mt-2 whitespace-pre-line text-gray-700 dark:text-gray-300">
                  {project.description}
                </div>
              </div>
              
              {project.images.length > 0 && (
                <div className="mt-8">
                  <h2 className="mb-4 text-xl font-semibold">Screenshots</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="h-auto w-full rounded-lg object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Comments section could go here */}
        </div>
        
        <div className="space-y-6">
          {/* Project status */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Project Status</h2>
              
              <div className="mt-4">
                {project.lookingFor ? (
                  <Badge variant="accent" className="text-base">Looking for collaborators</Badge>
                ) : (
                  <Badge variant="outline" className="text-base">Not seeking collaborators</Badge>
                )}
              </div>
              
              {project.lookingFor && !requestSent && (
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium">Want to collaborate?</h3>
                  <Textarea
                    placeholder="Introduce yourself and explain why you want to join this project..."
                    rows={4}
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                  />
                  <Button
                    className="w-full"
                    leftIcon={<MessageSquare className="h-5 w-5" />}
                    onClick={handleSendRequest}
                    disabled={!requestMessage.trim()}
                  >
                    Send Request
                  </Button>
                </div>
              )}
              
              {requestSent && (
                <div className="mt-6 rounded-md bg-secondary-50 p-4 dark:bg-secondary-900/30">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-secondary-800 dark:text-secondary-300">Request sent</h3>
                      <div className="mt-2 text-sm text-secondary-700 dark:text-secondary-400">
                        <p>Your collaboration request has been sent to the project owner. You'll be notified when they respond.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Team members */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Team</h2>
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                  {project.collaborators.length + 1} members
                </span>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar 
                      src={project.owner.avatar}
                      name={project.owner.name}
                      size="md"
                    />
                    <div>
                      <p className="font-medium">{project.owner.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{project.owner.role}</p>
                    </div>
                  </div>
                  <Badge>Owner</Badge>
                </div>
                
                {project.collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar 
                        src={collaborator.avatar}
                        name={collaborator.name}
                        size="md"
                      />
                      <div>
                        <p className="font-medium">{collaborator.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{collaborator.role}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Joined {formatDate(new Date(collaborator.joinedAt))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Similar projects */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Similar Projects</h2>
              
              <div className="space-y-4">
                <Link to="/projects/2" className="flex items-start space-x-3 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Code2 className="mt-1 h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <div>
                    <h3 className="font-medium">Task Management App</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Collaborative task management with real-time updates</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">React</Badge>
                      <Badge variant="secondary" className="text-xs">Express</Badge>
                    </div>
                  </div>
                </Link>
                
                <Link to="/projects/3" className="flex items-start space-x-3 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Code2 className="mt-1 h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <div>
                    <h3 className="font-medium">Developer Portfolio Generator</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Create beautiful portfolio websites with minimal effort</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">Next.js</Badge>
                      <Badge variant="secondary" className="text-xs">Tailwind</Badge>
                    </div>
                  </div>
                </Link>
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm">
                  View More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}