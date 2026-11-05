
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider.tsx";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles: string[];
}

export function ProtectedRoute({
                                   children,
                                   allowedRoles
                               }: ProtectedRouteProps) {
    const { token, role } = useAuth();

    // Not logged in
    if (!token || !role) {
        return <Navigate to="/login" replace />;
    }

    // Determine the correct page for the user's role
    const roleHomePages: Record<string, string> = {
        User: "/userpage",
        SuperUser: "/superuserpage",
        Admin: "/adminpage"
    };

    // Invalid or unknown role
    const correctPage = roleHomePages[role];

    if (!correctPage) {
        return <Navigate to="/login" replace />;
    }

    // Logged in, but attempting to access another role's page
    if (!allowedRoles.includes(role)) {
        return <Navigate to={correctPage} replace />;
    }

    return <>{children}</>;
}
