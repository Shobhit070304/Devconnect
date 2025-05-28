import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AuthLayout from './components/layout/AuthLayout';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import SignupPage from './pages/auth/SignupPage.jsx';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardPage from './pages/dashboard/DashboardPage.jsx';
import ProfilePage from './pages/profile/ProfilePage.jsx';
import EditProfilePage from './pages/profile/EditProfilePage.jsx';
import ExploreProjectsPage from './pages/projects/ExploreProjectsPage.jsx';
import ProjectDetailPage from './pages/projects/ProjectDetailPage';
import CreateProjectPage from './pages/projects/CreateProjectPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Protected routes - In a real app, these would be protected with auth logic */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/projects" element={<ExploreProjectsPage />} />
        <Route path="/projects/create" element={<CreateProjectPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
      </Route>

      {/* 404 page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;