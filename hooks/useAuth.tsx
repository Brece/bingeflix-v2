import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth';

import { useRouter } from 'next/router';
import { useState, useEffect, useMemo, useContext, createContext } from 'react';
import { auth } from '../firebase';

interface AuthInterface {
    user: User | null,
    signUp: (email: string, password: string) => Promise<void>,
    signIn: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    error: string | null,
    loading: boolean,
}

const AuthContext = createContext<AuthInterface>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
});

interface AuthProviderPropsInterface {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderPropsInterface) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    // block UI with loading screen
    const [initialLoading, setInitialLoading] = useState<boolean>(true);

    // Persisting the user
    // check if user is logged in when accessing the page, if not it redirects to the login page
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                // logged in
                setUser(user);
                setLoading(false);
            } else {
                // not logged in
                setUser(null);
                setLoading(true);
                router.push('/login');
            }

            setInitialLoading(false);
        });
    }, [auth]);

    const signUp = async (email: string, password: string) => {
        setLoading(true);

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                // redirect client to home page after sign up
                router.push('/');
                setLoading(false);
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false));
    };

    const signIn = async (email: string, password: string) => {
        setLoading(true);

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                router.push('/');
                setLoading(false);
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false));
    };

    const logout = async () => {
        setLoading(true);

        signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false));
    };

    // for optimization only re-render when 'user' or 'loading' changed
    const memoedValue = useMemo(() => ({
        user, signUp, signIn, loading, logout, error
    }), [user, loading]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {!initialLoading && children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    return useContext(AuthContext);
}
