import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../useAuthStore';

export default function ProtectedAdminRoute({ children }) {
    const { user } = useAuthStore();

    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return children;
}