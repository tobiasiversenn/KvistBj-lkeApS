import {BrowserRouter, Routes, Route, Link, useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import "./index.css"

import {LoginPage} from "@/LoginPage.tsx";
import {HomePage} from "@/HomePage.tsx";
import {AdminPage} from "@/AdminPage.tsx";
import {UserPage} from "@/UserPage.tsx";
import {SuperUserPage} from "@/SuperUserPage.tsx";


export function App() {
    return (
        <BrowserRouter>
            <AppLayout/>

        </BrowserRouter>
    );
}

function AppLayout() {
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


                    <div className="PageLayout">

                        <div className="NavigationBar">

                            
                        </div>


                        <div className="ContentRightToNavigationBar">

                            <div className="Header">
                                <h1 className="WebsiteNameText"> KvistBjaelkeApS</h1>
                                <Link className="LoggedInText" to="/login">
                                    <h3 className="LoggedInText">User ▾</h3>
                                </Link>
                            </div>
                            <Routes>
                                <Route path="/" element={<LoginPage/>}/>
                                <Route path="/homepage" element={<HomePage/>}/>
                                <Route path="/login" element={<LoginPage/>}/>
                                <Route path="/adminpage" element={<AdminPage/>}/>
                                <Route path="/userpage" element={<UserPage/>}/>
                                <Route path="/superuserpage" element={<SuperUserPage/>}/>
                              


                            </Routes>


                        </div>

                    </div>



                </>

            )}
        </>
    );
}

export default App;
