import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Registration failed');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <motion.div 
                        className="glass-card p-4 p-md-5"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="text-center mb-5">
                            <h2 className="fw-bold text-gradient">Create Account</h2>
                            <p className="text-muted">Join us today and start managing your profile</p>
                        </div>
                        
                        {error && (
                            <motion.div 
                                className="alert alert-danger rounded-3 small"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                {error}
                            </motion.div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label small fw-bold">Username</label>
                                <input 
                                    type="text" 
                                    className="form-control rounded-3 border-0 bg-light p-3" 
                                    placeholder="johndoe"
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold">Email Address</label>
                                <input 
                                    type="email" 
                                    className="form-control rounded-3 border-0 bg-light p-3" 
                                    placeholder="name@example.com"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label small fw-bold">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control rounded-3 border-0 bg-light p-3" 
                                    placeholder="••••••••"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <motion.button 
                                type="submit" 
                                className="btn btn-gradient w-100 p-3 fs-5"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Get Started
                            </motion.button>
                        </form>
                        
                        <div className="mt-4 text-center">
                            <span className="text-muted small">Already have an account? </span>
                            <Link to="/login" className="text-primary small fw-bold text-decoration-none">Sign In</Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Register;