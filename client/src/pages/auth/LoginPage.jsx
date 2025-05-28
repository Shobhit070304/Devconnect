import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Checkbox from '../../components/ui/Checkbox';
import axios from '../../api/axios';
import { UserContext } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Clear any previous errors
    setError('');

    // Show loading state
    setIsLoading(true);

    try {
      const res = await axios.post('/auth/login', {
        email,
        password,
      });
      console.log("Login response ", res.data);
      if (res.status === 200) {
        navigate('/');
        login(res.data);
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
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Enter your credentials to sign in to your account
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
            name="email"
            placeholder="name@example.com"
            leftIcon={<User className="h-4 w-4" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="h-4 w-4" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              checked={rememberMe}
              onChange={setRememberMe}
            />
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Forgot password?
            </Link>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            Sign in
          </Button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}