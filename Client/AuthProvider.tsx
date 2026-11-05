
import { createContext, useContext, useState } from "react";
import type { LoginRequest } from "./LoginRequest.ts";
import type { LoginResponse } from "./LoginResponse.ts";
import type { ReactNode } from "react";

export interface AuthContextType {
    token: string | null;
    role: string | null;
    login: (request: LoginRequest) => Promise<string>;
    logout: () => void;
    getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);

    if (context == null) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(
        sessionStorage.getItem("token")
    );

    const [role, setRole] = useState<string | null>(
        sessionStorage.getItem("role")
    );

    const getToken = () => token;

    async function login(request: LoginRequest): Promise<string> {
        const response = await fetch("http://localhost:5000/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Incorrect credentials");
            }

            throw new Error(`Login failed: ${response.status}`);
        }

        const data: LoginResponse = await response.json();

        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", data.role);

        setToken(data.token);
        setRole(data.role);

        return data.role;
    }

    function logout() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");

        setToken(null);
        setRole(null);
    }

    return (
        <AuthContext.Provider value={{ token, role, login, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    );
}
