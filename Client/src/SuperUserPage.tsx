
import { useEffect, useState } from "react";
import { api } from "@/api/apiClient.ts";
import type { User, SuperUser } from "@/api/Api.ts";

export function SuperUserPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [superusers, setSuperUsers] = useState<SuperUser[]>([]);

    const refreshUsers = async () => {
        try {
            const result = await api.user.userGetAllUsers();
            setUsers(result.data);
        } catch (error) {
            console.error("Failed to retrieve users:", error);
        }
    };

    const refreshSuperUsers = async () => {
        try {
            const result = await api.superUser.superUserGetAllSuperUsers();
            setSuperUsers(result.data);
        } catch (error) {
            console.error("Failed to retrieve superusers:", error);
        }
    };

    useEffect(() => {
        refreshUsers();
        refreshSuperUsers();
    }, []);

    const handleDeleteUser = async (userId?: string) => {
        if (!userId) return;

        try {
            await api.user.userDeleteUser({ userId });
            await refreshUsers();
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    return (
        <>
            <h2>SuperUser page</h2>

            <div className="UsersTableDesign">
                <h2 className="TableHeader">Manage users</h2>

                <table className="Table">
                    <thead>
                    <tr>
                        <th className="UsersTableDesignTh">Username</th>
                        <th className="UsersTableDesignTh">Role</th>
                        <th className="UsersTableDesignTh">Delete user</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td className="UsersTableDesignTh">
                                {u.username}
                            </td>
                            <td className="UsersTableDesignTh">User</td>
                            <td className="UsersTableDesignTh">
                                <button
                                    className="DeleteUserButton"
                                    onClick={() => handleDeleteUser(u.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="UsersTableDesign">
                <h2 className="TableHeader">View superusers</h2>

                <table className="Table">
                    <thead>
                    <tr>
                        <th className="UsersTableDesignTh">Username</th>
                        <th className="UsersTableDesignTh">Role</th>
                    </tr>
                    </thead>

                    <tbody>
                    {superusers.map(su => (
                        <tr key={su.id}>
                            <td className="UsersTableDesignTh">
                                {su.username}
                            </td>
                            <td className="UsersTableDesignTh">
                                SuperUser
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
