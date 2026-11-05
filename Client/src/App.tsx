
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
    useNavigate,
    Navigate
} from "react-router-dom";

import { useAuth } from "../AuthProvider.tsx";
import { AuthProvider } from "../AuthProvider.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";

import "./index.css";

import { LoginPage } from "@/LoginPage.tsx";
import { AdminPage } from "@/AdminPage.tsx";
import { UserPage } from "@/UserPage.tsx";
import { SuperUserPage } from "@/SuperUserPage.tsx";

export function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppLayout />
            </AuthProvider>
        </BrowserRouter>
    );
}

function AppLayout() {
    const { logout, token } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    const isLoginPage =
        location.pathname === "/login" ||
        location.pathname === "/";

    return (
        <>
            {!isLoginPage && token && (
                <div className="Header">
                    <h1 className="WebsiteNameText">
                        KvistBjaelkeApS
                    </h1>

                    <button
                        className="LoggedInText"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </div>
            )}

            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />


                <Route
                    path="/userpage"
                    element={
                        <ProtectedRoute allowedRoles={["User"]}>
                            <UserPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/superuserpage"
                    element={
                        <ProtectedRoute allowedRoles={["SuperUser"]}>
                            <SuperUserPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/adminpage"
                    element={
                        <ProtectedRoute allowedRoles={["Admin"]}>
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>
        </>
    );
}

export default App;
