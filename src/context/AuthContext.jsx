/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUser({
                            id: currentUser.uid,
                            email: currentUser.email,
                            ...userData
                        });
                    } else {
                        // Fallback if doc doesn't exist (shouldn't happen for new users)
                        setUser({
                            id: currentUser.uid,
                            email: currentUser.email,
                            username: currentUser.email.split('@')[0],
                            role: 'user'
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password);
        // State update handled by onAuthStateChanged
    };

    const register = async (username, email, password) => {
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = {
            username,
            email,
            role: email.toLowerCase().includes('admin') ? 'admin' : 'user', // Auto-admin for testing
            createdAt: new Date().toISOString()
        };
        // Create user document in Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), newUser);
        // State update handled by onAuthStateChanged
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};