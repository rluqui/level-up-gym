import { Routes, Route } from 'react-router-dom'; // Quitamos el Router de aquí
import { AuthProvider } from './context/AuthContext';
import { ExercisesProvider } from './context/ExercisesContext';
import { GamificationProvider } from './context/GamificationContext';
import Workouts from './pages/Workouts';
import ActiveWorkout from './pages/ActiveWorkout';
import WorkoutDetail from './pages/WorkoutDetail';
import Nutrition from './pages/Nutrition';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Community from './pages/Community';
import RunningMode from './pages/RunningMode';
import Home from './pages/Home'; // Added Home import
import Navigation from './components/BottomNavigation';
import LevelProgress from './components/LevelProgress'; // UI Gamification

function App() {
  return (
    <AuthProvider>
      <ExercisesProvider>
        <GamificationProvider>
          <div className="app-container">
            <LevelProgress />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/workouts/:id" element={<WorkoutDetail />} />
              <Route path="/workouts/ai-:id" element={<WorkoutDetail />} />
              <Route path="/workouts/:id/active" element={<ActiveWorkout />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/community" element={<Community />} />
              <Route path="/running" element={<RunningMode />} />
            </Routes>
            <Navigation />
          </div>
        </GamificationProvider>
      </ExercisesProvider>
    </AuthProvider>
  );
}

export default App;