import {BrowserRouter, Routes, Route, Link, useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { useAuth } from "../AuthProvider.tsx"
import "./index.css"

import {LoginPage} from "@/LoginPage.tsx";
import {HomePage} from "@/HomePage.tsx";
import {AdminPage} from "@/AdminPage.tsx";
import {UserPage} from "@/UserPage.tsx";
import {SuperUserPage} from "@/SuperUserPage.tsx";

import { AuthProvider } from "../AuthProvider.tsx";

export function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
            <AppLayout/>
            </AuthProvider>

        </BrowserRouter>
    );
}

function AppLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    function handleLogout() {
        logout();
        navigate("/login");
    }

    
    const location = useLocation();
    const isLoginPage = location.pathname === "/login" || location.pathname === "/";
    return (
        <>
            {isLoginPage ? (
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/adminpage" element={<AdminPage/>}/>
                </Routes>
            ) : (

                <>


                   

                            <div className="Header">
                                <h1 className="WebsiteNameText"> KvistBjaelkeApS</h1>
                                <button className="LoggedInText" onClick={handleLogout}>
                                    Log out
                                </button>
                            </div>
                            <Routes>
                                <Route path="/" element={<LoginPage/>}/>
                                <Route path="/homepage" element={<HomePage/>}/>
                                <Route path="/login" element={<LoginPage/>}/>
                                <Route path="/adminpage" element={<AdminPage/>}/>
                                <Route path="/userpage" element={<UserPage/>}/>
                                <Route path="/superuserpage" element={<SuperUserPage/>}/>
                              


                            </Routes>
                    


                </>

            )}
        </>
    );
}

export default App;
