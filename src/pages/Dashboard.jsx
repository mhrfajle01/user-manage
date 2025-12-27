import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4">
                <h2>Welcome, {user?.username}!</h2>
                <p>Role: <span className="badge bg-info">{user?.role}</span></p>
                <div className="mt-4">
                    {user?.role === 'admin' && (
                        <Link to="/users" className="btn btn-primary me-2">Manage Users</Link>
                    )}
                    <button onClick={logout} className="btn btn-danger">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
