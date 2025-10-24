import { Routes, Route, Navigate } from 'react-router-dom';
import { UploadPage } from './pages/UploadPage';
import { LoginPage } from './pages/LoginPage';
import { useAuth } from './hooks/useAuth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate
            to='/login'
            replace
        />
    );
};

export const App = () => {
    return (
        <Routes>
            <Route
                path='/login'
                element={<LoginPage />}
            />
            <Route
                path='/'
                element={
                    <ProtectedRoute>
                        <UploadPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};
