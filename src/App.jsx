import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import PrivateRoute from './components/PrivateRoute';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const location = useLocation();

    return (
        <AuthProvider>
            <AnimatedBackground />
            <Navbar />
            <main className="py-4">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/login" element={
                            <PageTransition>
                                <Login />
                            </PageTransition>
                        } />
                        <Route path="/register" element={
                            <PageTransition>
                                <Register />
                            </PageTransition>
                        } />
                        
                        <Route path="/dashboard" element={
                            <PrivateRoute>
                                <PageTransition>
                                    <Dashboard />
                                </PageTransition>
                            </PrivateRoute>
                        } />
                        
                        <Route path="/users" element={
                            <PrivateRoute role="admin">
                                <PageTransition>
                                    <UserManagement />
                                </PageTransition>
                            </PrivateRoute>
                        } />

                        <Route path="/" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </AnimatePresence>
            </main>
        </AuthProvider>
    );
}

export default App;