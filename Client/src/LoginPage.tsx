import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function LoginPage(){


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        
        navigate("/userpage");
    }
    return (
        <>
            <div className="LoginPage">
                <br/>
                <h1 className="AlignTextToLeft">Login</h1>
                <label className="AlignTextToLeft" >Log in with your credentials to access Kvist Bjaelke ApS</label>

                <br/>
                <label className="AlignTextToLeft">Username</label>
                <input className="InputFieldLoginPage" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <br/>
                <br/>
                <label className="AlignTextToLeft">Password</label>
                <input className="InputFieldLoginPage" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <br/>
                <br/>

                <button onClick={handleLogin} className="ButtonLoginPage">Log in</button>
            </div>
        </>
    )
}