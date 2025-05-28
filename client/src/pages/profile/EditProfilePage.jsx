import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, X, Github, Linkedin, Globe, MapPin, Briefcase, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import { UserContext } from '../../contexts/AuthContext';
import axios from '../../api/axios';
export default function EditProfilePage() {
  // Mock data that would be loaded from API in a real app
  const [userData, setUserData] = useState(null);

  const [name, setName] = useState(userData?.user?.username);
  const [role, setRole] = useState(userData?.role);
  const [location, setLocation] = useState(userData?.location);
  const [bio, setBio] = useState(userData?.bio);
  const [githubUrl, setGithubUrl] = useState(userData?.github);
  const [linkedinUrl, setLinkedinUrl] = useState(userData?.linkedin);
  const [websiteUrl, setWebsiteUrl] = useState(userData?.website);
  const [avatar, setAvatar] = useState(userData?.avatar);
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState(userData?.skills);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(UserContext);


  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("User fetched", response.data);
      setUserData(response.data);
    }
    fetchUser();
  }, []);


  const handleAddSkill = () => {
    if (skillInput.trim() === '') return;

    if (!skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
    }

    setSkillInput('');
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !role) {
      setError('Please provide both name and role');
      return;
    }

    if (skills.length === 0) {
      setError('Please add at least one skill');
      return;
    }

    // Clear any previous errors
    setError('');

    // Show loading state
    setIsLoading(true);

    // This would be where you'd handle actual profile update logic
    // For UI purposes, we'll just simulate a delay
    setTimeout(() => {
      setIsLoading(false);
      // Normally you'd redirect on success via React Router
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Link to={`/profile/${user._id}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold">Edit Profile</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6 md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>
                  Upload a profile picture to make your profile more recognizable
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col items-center justify-center space-y-4">
                <Avatar
                  src={userData?.avatar}
                  name={userData?.user.username}
                  size="xl"
                />

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    leftIcon={<Upload className="h-4 w-4" />}
                  >
                    Upload New
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="text-error-600 hover:bg-error-50 hover:text-error-700 dark:text-error-500 dark:hover:bg-error-950 dark:hover:text-error-400"
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
                <CardDescription>
                  Add your technical skills and areas of expertise
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <div className="flex">
                    <Input
                      placeholder="Add a skill"
                      value={skills}
                      onChange={(e) => setSkillInput(e.target.value)}
                      className="rounded-r-none"
                      wrapperClassName="mb-0 flex-1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      className="rounded-l-none"
                      onClick={handleAddSkill}
                    >
                      Add
                    </Button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {userData?.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center space-x-1"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1 rounded-full p-0.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>
                  Add your social media and professional profiles
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <Input
                  label="GitHub"
                  placeholder="https://github.com/username"
                  leftIcon={<Github className="h-4 w-4" />}
                  value={userData?.github}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />

                <Input
                  label="LinkedIn"
                  placeholder="https://linkedin.com/in/username"
                  leftIcon={<Linkedin className="h-4 w-4" />}
                  value={userData?.linkedin}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                />

                <Input
                  label="Personal Website"
                  placeholder="https://yourwebsite.com"
                  leftIcon={<Globe className="h-4 w-4" />}
                  value={userData?.website}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your basic profile information
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {error && (
                  <div className="rounded-md bg-error-50 p-3 dark:bg-error-900/50">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-error-600 dark:text-error-400" />
                      <p className="text-sm font-medium text-error-800 dark:text-error-300">{error}</p>
                    </div>
                  </div>
                )}

                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  value={userData?.user.username}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <Input
                  label="Professional Title"
                  placeholder="Full Stack Developer"
                  leftIcon={<Briefcase className="h-4 w-4" />}
                  value={userData?.role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />

                <Input
                  label="Location"
                  placeholder="City, Country"
                  leftIcon={<MapPin className="h-4 w-4" />}
                  value={userData?.location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bio</CardTitle>
                <CardDescription>
                  Tell others about yourself and your experience
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Textarea
                  placeholder="Write a short bio about yourself, your experience, and what you're looking for"
                  rows={8}
                  value={userData?.bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>
                  Add your recent work experience
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Senior Developer at TechCorp</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">2022 - Present</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Full Stack Developer at WebSolutions</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">2019 - 2022</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                >
                  Add Work Experience
                </Button>
              </CardContent>
            </Card> */}

            <CardFooter className="flex justify-end space-x-4 px-0">
              <Link to="/profile">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" isLoading={isLoading}>
                Save Changes
              </Button>
            </CardFooter>
          </div>
        </div>
      </form>
    </div>
  );
}