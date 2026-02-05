import { Routes, Route } from 'react-router-dom'; // Quitamos el Router de aquí
import { AuthProvider } from './context/AuthContext';
import Workouts from './pages/Workouts';
import ActiveWorkout from './pages/ActiveWorkout';
import WorkoutDetail from './pages/WorkoutDetail';
import Nutrition from './pages/Nutrition';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Navigation from './components/BottomNavigation';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/:id" element={<WorkoutDetail />} />
          <Route path="/workouts/ai-:id" element={<WorkoutDetail />} />
          <Route path="/workouts/:id/active" element={<ActiveWorkout />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Navigation />
      </div>
    </AuthProvider>
  );
}

export default App;