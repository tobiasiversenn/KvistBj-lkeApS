import {useState} from "react";
import {useNavigate} from "react-router-dom";
import type {LoginRequest} from "../LoginRequest.ts";
import {useAuth} from "../AuthProvider.tsx"

export function LoginPage(){


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const credentials: LoginRequest = {
            username: username,
            password: password
        }
        try {
            const role = await login(credentials);

            if (role === "User") {
                navigate("/userpage");
            }
            else if (role === "Admin") {
                navigate("/adminpage");
            }
            else if (role === "SuperUser") {
                navigate("/superuserpage");
            }

        }
        catch (error) {
            console.log(error);
            alert("Incorrect credentials");
        }
        
        
    }
    return (
        <>
            <form className="LoginPage" onSubmit={handleLogin}>
                <br/>
                <h1 className="AlignTextToLeft">Login</h1>
                <label className="AlignTextToLeft" >Log in with your credentials to access Kvist Bjaelke ApS</label>

                <br/>
                <label className="AlignTextToLeft">Username</label>
                <input className="InputFieldLoginPage" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <br/>
                <br/>
                <label className="AlignTextToLeft">Password</label>
                <input className="InputFieldLoginPage" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <br/>
                <br/>
                <br/>

                <button type="submit" className="ButtonLoginPage">Log in</button>
            </form>
        </>
    )
}