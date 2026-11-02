import {createContext, useContext, useState} from "react";
import type {LoginRequest} from "./LoginRequest.ts";
import type {LoginResponse} from "./LoginResponse.ts"; 
import type {ReactNode} from "react";


export interface AuthContextType {
    token: string | null;
    login: (request: LoginRequest) => Promise<string>
    logout: () => void
}


const AuthContext = createContext<AuthContextType | null>(null);
export function useAuth(){
    const context = useContext(AuthContext);
    if (context == null){
        throw new Error()
    }
    return context;
}

export function AuthProvider({children}: {children: ReactNode}) {
    const [token, setToken] = useState<string | null>(
        sessionStorage.getItem("token")
    );
    
    async function login(request: LoginRequest) : Promise<string> {
        const response = await fetch("http://localhost:5000/LoginControllerQueries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            }
        )

        console.log("Status:", response.status);
        console.log("Response:", await response.clone().text());
        
        if (response.status === 200){
            const data: LoginResponse = await response.json();
            sessionStorage.setItem("token", data.token);
            setToken(data.token);
            return data.role;
            
        }

        if (response.status === 401){
            throw new Error("Incorrect credentials");
        }

        if (!response.ok) {
            throw new Error("Login failed");
        }
        throw new Error("Unexpected login response");
}

function logout(){
        sessionStorage.removeItem("token");
        setToken(null);
}

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

}