import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <motion.div 
                        className="glass-card p-4 p-md-5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="text-center mb-5">
                            <h2 className="fw-bold text-gradient">Welcome Back</h2>
                            <p className="text-muted">Enter your credentials to access your account</p>
                        </div>
                        
                        {error && (
                            <motion.div 
                                className="alert alert-danger rounded-3 small"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                {error}
                            </motion.div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
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
                                Sign In
                            </motion.button>
                        </form>
                        
                        <div className="mt-4 text-center">
                            <span className="text-muted small">Don't have an account? </span>
                            <Link to="/register" className="text-primary small fw-bold text-decoration-none">Create Account</Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Login;