import { Navigate } from "react-router-dom";
import { useAuthStore } from "../components/tempStorage.jsx";

const ProtectedRoute = ({ children, roles }) => {
    const user = useAuthStore((s) => s.user);

    if (!user) return <Navigate to="/login" />;

    if (roles && !roles.includes(user.role)) {
        return <div>403 Forbidden</div>;
    }

    return children;
};

export default ProtectedRoute;