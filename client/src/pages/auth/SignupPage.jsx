import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Checkbox from '../../components/ui/Checkbox';
import axios from '../../api/axios';
import { UserContext } from '../../contexts/AuthContext';


export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Simple validation
      if (!username || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (!agreeTerms) {
        setError('Please agree to the terms and conditions');
        return;
      }

      // Clear any previous errors
      setError('');

      // Show loading state
      setIsLoading(true);

      const res = await axios.post('/auth/register', {
        username,
        email,
        password,
      });

      console.log(res.data);

      if (res.status === 200) {
        navigate('/login');
        login(res.data.user);
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Enter your information to create your DevCollab account
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
            label="Full Name"
            name="username"
            type="text"
            placeholder="John Doe"
            leftIcon={<User className="h-4 w-4" />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="name@example.com"
            leftIcon={<Mail className="h-4 w-4" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="h-4 w-4" />}
            helperText="Must be at least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="h-4 w-4" />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Checkbox
            label="I agree to the Terms of Service and Privacy Policy"
            name="agreeTerms"
            checked={agreeTerms}
            onChange={setAgreeTerms}
            required
          />
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            Create account
          </Button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}