import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/page/LoginPage';
import NavBar from './components/component/header/NavBar';
import { SubjectList } from './components/component/quiz/SubjectList';
import { AuthProvider, useAuth } from './utils/AuthContext';
import { QuizResultsPage } from './components/component/quiz/QuizResults';
import About from './components/page/About';
import Community from './components/page/CommunityPage';
import Leaderboard from './components/page/Leaderboard';
import Profile from './components/page/user/Profile';
import { Register } from './components/page/Register';
import Dashboard from './components/page/user/dashboard/Dashboard';
import AdminDashboard from './components/page/admin/dashboard/Dashboard';
import LessonList from './components/page/LearnTheory';
import LessonDetail from './components/page/LessonDetail';
const App: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
 

  return (
    <div>
      {/* Conditionally render NavBar */}
      {role !== 'ADMIN' && <NavBar />}
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/subjects' element={<SubjectList />} />
        <Route path='/' element={<About />} />
        <Route path='/community' element={<Community />} />
        <Route path='/rank' element={<Leaderboard />} />
        <Route path="/quiz-results" element={<QuizResultsPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/learn" element={<LessonList/>} />
        <Route path="/lesson" element={<LessonDetail />} />
        {/* Protected Routes */}
        {isAuthenticated && (
          <>
            <Route path="user/dashboard" element={<Dashboard />} />
          </>
        )}

        {/* Admin Routes - Restricted to Admin */}
        {role === 'ADMIN' && (
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        )}
      </Routes>
    </div>
  );
};

// Wrap the entire app with AuthProvider here
const AppWrapper: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* The NavBar will be conditionally rendered in the App component */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppWrapper;