import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold text-gradient fs-4" to="/">
                    UserHub
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center">
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link fw-medium" to="/dashboard">Dashboard</Link>
                                </li>
                                {user.role === 'admin' && (
                                    <li className="nav-item">
                                        <Link className="nav-link fw-medium" to="/users">Manage Users</Link>
                                    </li>
                                )}
                                <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                                    <motion.button 
                                        onClick={handleLogout}
                                        className="btn btn-danger btn-sm rounded-pill px-4 shadow-sm"
                                        whileHover={{ scale: 1.05, backgroundColor: '#dc3545' }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Logout
                                    </motion.button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                                    <Link className="btn btn-gradient btn-sm" to="/register">Get Started</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
