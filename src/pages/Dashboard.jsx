import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalUsers: 0, admins: 0 });

    useEffect(() => {
        if (user?.role === 'admin') {
            const fetchStats = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, "users"));
                    const users = querySnapshot.docs.map(doc => doc.data());
                    setStats({
                        totalUsers: users.length,
                        admins: users.filter(u => u.role === 'admin').length
                    });
                } catch (err) {
                    console.error("Failed to fetch stats", err);
                }
            };
            fetchStats();
        }
    }, [user]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="container pb-5">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mt-4 mb-4 flex-wrap gap-3">
                    <motion.div variants={cardVariants}>
                        <h2 className="fw-bold mb-0">Welcome, <span className="text-gradient">{user?.username}</span>!</h2>
                        <p className="text-muted mb-0">What would you like to do today?</p>
                    </motion.div>
                    <motion.button 
                        variants={cardVariants}
                        onClick={logout}
                        className="btn btn-outline-danger rounded-pill px-4 d-flex align-items-center gap-2 shadow-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                            <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                        Logout
                    </motion.button>
                </div>

                {/* Stats Section (Admin Only) */}
                {user?.role === 'admin' && (
                    <div className="row g-4 mb-5">
                        <div className="col-12 col-sm-6 col-lg-3">
                            <motion.div variants={cardVariants} className="glass-card p-4 text-center h-100" whileHover={{ y: -5 }}>
                                <div className="text-primary fs-1 mb-2">👥</div>
                                <h3 className="fw-bold">{stats.totalUsers}</h3>
                                <p className="text-muted small mb-0">Total Users</p>
                            </motion.div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <motion.div variants={cardVariants} className="glass-card p-4 text-center h-100" whileHover={{ y: -5 }}>
                                <div className="text-danger fs-1 mb-2">🛡️</div>
                                <h3 className="fw-bold">{stats.admins}</h3>
                                <p className="text-muted small mb-0">System Admins</p>
                            </motion.div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <motion.div variants={cardVariants} className="glass-card p-4 text-center h-100" whileHover={{ y: -5 }}>
                                <div className="text-success fs-1 mb-2">📈</div>
                                <h3 className="fw-bold">Active</h3>
                                <p className="text-muted small mb-0">System Status</p>
                            </motion.div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <motion.div variants={cardVariants} className="glass-card p-4 text-center h-100" whileHover={{ y: -5 }}>
                                <div className="text-warning fs-1 mb-2">⚡</div>
                                <h3 className="fw-bold">Fast</h3>
                                <p className="text-muted small mb-0">Performance</p>
                            </motion.div>
                        </div>
                    </div>
                )}

                {/* Main Actions */}
                <div className="row g-4">
                    <div className="col-12 col-lg-8">
                        <motion.div variants={cardVariants} className="glass-card p-4 h-100">
                            <h4 className="fw-bold mb-4">Quick Actions</h4>
                            <div className="row g-3">
                                <div className="col-12 col-sm-6">
                                    <a href="https://mhrfajle01.github.io/Portfolio/" className="btn btn-light w-100 p-4 rounded-4 text-start shadow-sm" target="_blank" rel="noopener noreferrer">
                                        <div className="fs-3 mb-2">🎨</div>
                                        <div className="fw-bold">View Portfolio</div>
                                        <div className="small text-muted">Check out my latest works</div>
                                    </a>
                                </div>
                                {user?.role === 'admin' && (
                                    <div className="col-12 col-sm-6">
                                        <Link to="/users" className="btn btn-light w-100 p-4 rounded-4 text-start shadow-sm text-decoration-none">
                                            <div className="fs-3 mb-2">⚙️</div>
                                            <div className="fw-bold text-dark">Manage Users</div>
                                            <div className="small text-muted">Control user access & roles</div>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                    
                    <div className="col-12 col-lg-4">
                        <motion.div variants={cardVariants} className="glass-card p-4 bg-gradient text-white h-100">
                            <h4 className="fw-bold mb-3">Your Profile</h4>
                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold fs-3 me-3" style={{ width: '60px', height: '60px' }}>
                                    {(user?.username || '?').charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="fw-bold fs-5">{user?.username}</div>
                                    <div className="small opacity-75">{user?.email}</div>
                                </div>
                            </div>
                            <hr className="bg-white opacity-25" />
                            <div className="small mb-1 opacity-75">Account Type</div>
                            <div className="badge bg-white text-primary rounded-pill px-3 py-2 mb-3">
                                {user?.role.toUpperCase()}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;