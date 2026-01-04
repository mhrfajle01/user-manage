import { useState, useEffect, useContext } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [error, setError] = useState('');
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const usersList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(usersList);
                setFilteredUsers(usersList);
            } catch (err) {
                console.error("Error fetching users:", err);
                setError('Failed to fetch users');
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        let result = users;
        
        if (filterRole !== 'all') {
            result = result.filter(u => u.role === filterRole);
        }
        
        if (searchTerm) {
            result = result.filter(u => 
                u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        setFilteredUsers(result);
    }, [searchTerm, filterRole, users]);

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteDoc(doc(db, "users", id));
                setUsers(users.filter(u => u.id !== id));
            } catch (err) {
                console.error("Error deleting user:", err);
                alert('Delete failed');
            }
        }
    };

    return (
        <div className="container pb-5">
            <motion.div 
                className="glass-card p-4 mt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <h2 className="fw-bold mb-0">User Management</h2>
                    <div className="d-flex gap-2">
                        <span className="badge bg-primary-subtle text-primary border p-2">
                            Total: {users.length}
                        </span>
                        <span className="badge bg-success-subtle text-success border p-2">
                            Showing: {filteredUsers.length}
                        </span>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="row g-3 mb-4">
                    <div className="col-12 col-md-8">
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0 rounded-start-3">
                                🔍
                            </span>
                            <input 
                                type="text" 
                                className="form-control border-start-0 rounded-end-3 p-2" 
                                placeholder="Search by name or email..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <select 
                            className="form-select rounded-3 p-2" 
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admins</option>
                            <option value="user">Users</option>
                        </select>
                    </div>
                </div>

                {error && <div className="alert alert-danger rounded-3">{error}</div>}

                <div className="table-responsive rounded-3">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th>User</th>
                                <th className="d-none d-md-table-cell">Email</th>
                                <th>Role</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {filteredUsers.map((u, index) => (
                                    <motion.tr 
                                        key={u.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: Math.min(index * 0.05, 0.5) }}
                                    >
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="avatar me-3 bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', fontWeight: 'bold' }}>
                                                    {(u.username || '?').charAt(0).toUpperCase()}
                                                </div>
                                                <span className="fw-semibold">{u.username || 'Unknown'}</span>
                                            </div>
                                        </td>
                                        <td className="d-none d-md-table-cell text-muted small">{u.email}</td>
                                        <td>
                                            <span className={`badge rounded-pill px-3 ${u.role === 'admin' ? 'bg-danger-subtle text-danger border border-danger' : 'bg-success-subtle text-success border border-success'}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="text-end">
                                            <motion.button 
                                                className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2" 
                                                onClick={() => deleteUser(u.id)}
                                                disabled={currentUser && currentUser.id === u.id}
                                                whileHover={{ scale: 1.2, backgroundColor: '#fee2e2' }}
                                                whileTap={{ scale: 0.9 }}
                                                title={currentUser && currentUser.id === u.id ? "You cannot delete yourself" : "Delete User"}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                </svg>
                                            </motion.button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-5 text-muted">
                                        No users found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default UserManagement;