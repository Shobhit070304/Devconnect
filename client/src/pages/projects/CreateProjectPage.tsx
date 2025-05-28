import { useState } from 'react';
import { ArrowLeft, Plus, X, Upload, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Switch from '../../components/ui/Switch';
import Badge from '../../components/ui/Badge';

export default function CreateProjectPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [lookingForCollaborators, setLookingForCollaborators] = useState(true);
  const [techInput, setTechInput] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAddTech = () => {
    if (techInput.trim() === '') return;
    
    if (!techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
    }
    
    setTechInput('');
  };
  
  const handleRemoveTech = (tech: string) => {
    setTechStack(techStack.filter(t => t !== tech));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!title || !description) {
      setError('Please provide both title and description');
      return;
    }
    
    if (techStack.length === 0) {
      setError('Please add at least one technology');
      return;
    }
    
    // Clear any previous errors
    setError('');
    
    // Show loading state
    setIsLoading(true);
    
    // This would be where you'd handle actual project creation logic
    // For UI purposes, we'll just simulate a delay
    setTimeout(() => {
      setIsLoading(false);
      // Normally you'd redirect on success via React Router
    }, 1500);
  };
  
  // List of suggested technologies
  const suggestedTech = [
    'React', 'Vue.js', 'Angular', 'Next.js', 'TypeScript', 'JavaScript',
    'Node.js', 'Express', 'MongoDB', 'PostgreSQL'
  ];
  
  const handleSuggestedTechClick = (tech: string) => {
    if (!techStack.includes(tech)) {
      setTechStack([...techStack, tech]);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Link to="/dashboard" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold">Create New Project</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Provide information about your project to help others understand it
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <div className="rounded-md bg-error-50 p-3 dark:bg-error-900/50">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-error-600 dark:text-error-400" />
                  <p className="text-sm font-medium text-error-800 dark:text-error-300">{error}</p>
                </div>
              </div>
            )}
            
            <Input
              label="Project Title"
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            
            <Textarea
              label="Description"
              placeholder="Describe your project, its goals, and what you're trying to achieve"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tech Stack
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="secondary"
                    className="flex items-center space-x-1"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="ml-1 rounded-full p-0.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <div className="flex">
                  <Input
                    placeholder="Add technology"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    className="h-8 w-40 rounded-r-none"
                    wrapperClassName="mb-0"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTech();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    className="h-8 rounded-l-none px-2"
                    onClick={handleAddTech}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Suggested:
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {suggestedTech.filter(tech => !techStack.includes(tech)).map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                      onClick={() => handleSuggestedTechClick(tech)}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <Input
              label="GitHub Repository"
              placeholder="https://github.com/username/repo"
              helperText="Optional: Link to your project's source code"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
            
            <Input
              label="Demo URL"
              placeholder="https://your-project-demo.com"
              helperText="Optional: Link to a live demo of your project"
              value={demoLink}
              onChange={(e) => setDemoLink(e.target.value)}
            />
            
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <h3 className="text-lg font-medium">Project Screenshots</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add screenshots to showcase your project (optional)
              </p>
              
              <div className="mt-4 flex flex-wrap gap-4">
                <button
                  type="button"
                  className="flex h-40 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 sm:w-60"
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Upload Image
                  </span>
                  <span className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                    PNG, JPG up to 5MB
                  </span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Switch
                checked={lookingForCollaborators}
                onChange={setLookingForCollaborators}
                label="Looking for collaborators"
                description="Turn on if you want others to join your project"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end space-x-4">
            <Link to="/dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" isLoading={isLoading}>
              Create Project
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}