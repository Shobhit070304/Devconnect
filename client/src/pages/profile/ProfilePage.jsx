import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Github, Linkedin, Globe, MapPin, Calendar, Edit, Mail, MessageCircle, UserPlus, Link as LinkIcon, Briefcase } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import { formatDate } from '../../lib/utils';
import { UserContext } from '../../contexts/AuthContext';
import axios from '../../api/axios';

export default function ProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('projects');
  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState([]);

  // In a real app, we'd fetch data based on the ID
  // For this UI, we'll use mock data
  // Simplified check - in a real app, this would compare with current user ID
  // Mock user data
  // const user = {
  //   id: id || 'current-user',
  //   name: 'Alex Morgan',
  //   avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   role: 'Full Stack Developer',
  //   location: 'San Francisco, CA',
  //   joinedAt: '2024-11-05T00:00:00Z',
  //   bio: 'Experienced full-stack developer with a passion for building scalable web applications. I specialize in React, Node.js, and cloud infrastructure.\n\nCurrently working on open-source projects and looking for collaboration opportunities in the e-commerce and fintech spaces.',
  //   skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'],
  //   links: {
  //     github: 'https://github.com/alexmorgan',
  //     linkedin: 'https://linkedin.com/in/alexmorgan',
  //     website: 'https://alexmorgan.dev'
  //   },
  //   projects: [
  //     {
  //       id: '1',
  //       title: 'E-commerce Platform',
  //       description: 'A modern e-commerce platform with React, Node.js, and Stripe integration.',
  //       tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
  //       createdAt: '2025-01-10T12:00:00Z'
  //     },
  //     {
  //       id: '2',
  //       title: 'Task Management App',
  //       description: 'A collaborative task management app with real-time updates using Socket.io.',
  //       tech: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
  //       createdAt: '2025-01-05T10:30:00Z'
  //     },
  //     {
  //       id: '3',
  //       title: 'Developer Portfolio Generator',
  //       description: 'A tool to help developers create beautiful portfolio websites with minimal effort.',
  //       tech: ['TypeScript', 'Next.js', 'Tailwind CSS'],
  //       createdAt: '2024-12-20T09:15:00Z'
  //     }
  //   ]
  // };

  const randomSeed = Math.random().toString(36).substring(2, 10);
  const avatarUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${randomSeed}`;

  const { user } = useContext(UserContext);
  const isOwnProfile = id === user._id;

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/profile/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("User fetched", response.data.profile);
      setUserData(response.data.profile);
    }
    fetchUser();
  }, [id]);

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
  }, [id]);


  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <Link to="/dashboard" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold">Profile</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          {/* Profile card */}
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar
                src={userData?.avatar || avatarUrl}
                name={userData?.user?.username}
                size="xl"
                className="mx-auto"
              />
              <h2 className="mt-4 text-2xl font-bold">{userData?.user?.username}</h2>
              <p className="text-gray-600 dark:text-gray-400">{userData?.role}</p>

              {/* {user.location && ( */}
              <div className="mt-2 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{userData?.location}</span>
              </div>
              {/* )} */}

              <div className="mt-2 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Joined {formatDate(new Date(userData?.createdAt))}</span>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                {userData?.github && (
                  <a
                    href={userData?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                  >
                    <span className="sr-only">GitHub</span>
                    <Github className="h-5 w-5" />
                  </a>
                )}

                {userData?.linkedin && (
                  <a
                    href={userData?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}

                {userData?.website && (
                  <a
                    href={userData?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                  >
                    <span className="sr-only">Website</span>
                    <Globe className="h-5 w-5" />
                  </a>
                )}
              </div>

              <div className="mt-6">
                {isOwnProfile ? (
                  <Link to="/profile/edit">
                    <Button
                      variant="outline"
                      leftIcon={<Edit className="h-4 w-4" />}
                      className="w-full"
                    >
                      Edit Profile
                    </Button>
                  </Link>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      leftIcon={<Mail className="h-4 w-4" />}
                      className="flex-1"
                    >
                      Message
                    </Button>
                    <Button
                      leftIcon={<UserPlus className="h-4 w-4" />}
                      className="flex-1"
                    >
                      Connect
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Skills card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {userData?.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
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
                Projects
              </button>
              <button
                className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'about'
                  ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300'
                  }`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
            </nav>
          </div>

          {/* Tab content */}
          <div className="mt-6">
            {activeTab === 'projects' && (
              <div className="space-y-6">
                {projects?.map((project) => (
                  <Card key={project._id} hoverable>
                    <CardContent className="p-6">
                      <Link to={`/projects/${project._id}`} className="flex justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{project.name}</h3>
                          <p className="mt-2 text-gray-600 dark:text-gray-400">{project.content}</p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.tech.split(',').map((tech, index) => (
                              <Badge key={index} variant="secondary">{tech}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(new Date(project.createdAt))}
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'about' && (
              <Card>
                <CardContent className="p-6">
                  <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                    {userData?.bio}
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold">Contact Information</h3>
                    <ul className="mt-4 space-y-3">
                      <li className="flex items-center">
                        <Mail className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <span>{userData?.user.email}</span>
                      </li>
                      {userData?.website && (
                        <li className="flex items-center">
                          <Globe className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                          <a
                            href={userData?.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                          >
                            {userData?.website.replace(/(^\w+:|^)\/\//, '')}
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* <div className="mt-8">
                    <h3 className="text-lg font-semibold">Work Experience</h3>
                    <div className="mt-4 space-y-4">
                      <div className="relative border-l-2 border-gray-200 pl-4 dark:border-gray-800">
                        <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-primary-600 dark:border-gray-900 dark:bg-primary-500"></div>
                        <h4 className="font-medium">Senior Developer at TechCorp</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">2022 - Present</p>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                          Leading development of cloud-based applications and mentoring junior developers.
                        </p>
                      </div>

                      <div className="relative border-l-2 border-gray-200 pl-4 dark:border-gray-800">
                        <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-gray-400 dark:border-gray-900"></div>
                        <h4 className="font-medium">Full Stack Developer at WebSolutions</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">2019 - 2022</p>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                          Developed and maintained multiple client projects using React and Node.js.
                        </p>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="mt-8">
                    <h3 className="text-lg font-semibold">Education</h3>
                    <div className="mt-4">
                      <h4 className="font-medium">BS Computer Science</h4>
                      <p className="text-gray-600 dark:text-gray-400">University of Technology</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">2015 - 2019</p>
                    </div>
                  </div> */}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}