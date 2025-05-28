import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    // Clear any previous errors
    setError('');
    
    // Show loading state
    setIsLoading(true);
    
    // This would be where you'd handle actual password reset logic
    // For UI purposes, we'll just simulate a delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };
  
  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>
            We've sent password reset instructions to <span className="font-medium">{email}</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex flex-col items-center justify-center py-6">
          <Mail className="h-12 w-12 text-primary-600 dark:text-primary-400" />
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            If you don't see the email in your inbox, please check your spam folder.
          </p>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setIsSubmitted(false)}
          >
            Try a different email
          </Button>
          
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            <Link
              to="/login"
              className="inline-flex items-center font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Forgot password?</CardTitle>
        <CardDescription>
          Enter your email and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
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
            label="Email"
            type="email"
            placeholder="name@example.com"
            leftIcon={<Mail className="h-4 w-4" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full"
            isLoading={isLoading}
          >
            Send reset link
          </Button>
          
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            <Link
              to="/login"
              className="inline-flex items-center font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}