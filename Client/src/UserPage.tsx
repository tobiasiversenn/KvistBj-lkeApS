
import { useEffect, useState } from "react";
import { api } from "@/api/apiClient.ts";
import type { User } from "@/api/Api.ts";

export function UserPage() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        api.getAllUsers.userQueriesGetAllUsers()
            .then(r => {
                setUsers(r);
            })
            .catch(error => {
                console.error("Failed to retrieve users:", error);
            });
    }, []);

    return (
        <>
            <h2>User page</h2>

            <div className="UsersTableDesign">
                <h2 className="TableHeader">View users</h2>

                <table className="Table">
                    <thead>
                    <tr>
                        <th className="UsersTableDesignTh">
                            Username
                        </th>
                        <th className="UsersTableDesignTh">
                            Role
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td className="UsersTableDesignTh">
                                {u.username}
                            </td>
                            <td className="UsersTableDesignTh">
                                User
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
