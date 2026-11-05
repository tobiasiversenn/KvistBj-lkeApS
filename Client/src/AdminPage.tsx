
import { useEffect, useState } from "react";
import { api } from "@/api/apiClient.ts";
import type { Admin, User, SuperUser } from "@/api/Api.ts";

export function AdminPage() {
    const [user, setUsers] = useState<User[]>([]);
    const [admin, setAdmins] = useState<Admin[]>([]);
    const [superuser, setSuperUsers] = useState<SuperUser[]>([]);

    const [createNewUserForm, setCreateNewUserForm] = useState(false);
    const [createNewAdminForm, setCreateNewAdminForm] = useState(false);
    const [createNewSuperUserForm, setCreateNewSuperUserForm] = useState(false);

    const [usernameToCreate, setUsernameToCreate] = useState("");
    const [passwordToCreate, setPasswordToCreate] = useState("");

    const [editUserForm, setEditUserForm] = useState(false);
    const [editAdminForm, setEditAdminForm] = useState(false);
    const [editSuperUserForm, setEditSuperUserForm] = useState(false);

    const [editedUsername, setEditedUsername] = useState("");
    const [editedPassword, setEditedPassword] = useState("");
    const [IdOfUserToEdit, setIdOfUserToEdit] = useState<string | undefined>(undefined);

    // Fetch all users
    const refreshUsers = async () => {
        try {
            const r = await api.user.userGetAllUsers();
            setUsers(r.data);
        } catch (error) {
            console.error("Failed to retrieve users:", error);
        }
    };

    // Fetch all admins
    const refreshAdmins = async () => {
        try {
            const r = await api.admin.adminGetAllAdmins();
            setAdmins(r.data);
        } catch (error) {
            console.error("Failed to retrieve admins:", error);
        }
    };

    // Fetch all superusers
    const refreshSuperUsers = async () => {
        try {
            const r = await api.superUser.superUserGetAllSuperUsers();
            setSuperUsers(r.data);
        } catch (error) {
            console.error("Failed to retrieve superusers:", error);
        }
    };

    useEffect(() => {
        refreshUsers();
        refreshAdmins();
        refreshSuperUsers();
    }, []);

    // Reset forms
    const resetCreateForm = () => {
        setUsernameToCreate("");
        setPasswordToCreate("");
    };

    const resetEditForm = () => {
        setEditedUsername("");
        setEditedPassword("");
        setIdOfUserToEdit(undefined);
    };

// Register a regular user
    const handleRegisterUser = async () => {
        try {
            await api.user.userPostUser({
                username: usernameToCreate,
                passwordhash: passwordToCreate,
            });

            await refreshUsers();
            setCreateNewUserForm(false);
            resetCreateForm();
        } catch (error) {
            console.error("Failed to create user:", error);
        }
    };

    // Register an admin
    const handleRegisterAdmin = async () => {
        try {
            await api.admin.adminPostAdmin({
                username: usernameToCreate,
                passwordhash: passwordToCreate,
            });

            await refreshAdmins();
            setCreateNewAdminForm(false);
            resetCreateForm();
        } catch (error) {
            console.error("Failed to create admin:", error);
        }
    };

    // Register a superuser
    const handleRegisterSuperUser = async () => {
        try {
            await api.superUser.superUserPostSuperUser({
                username: usernameToCreate,
                passwordhash: passwordToCreate,
            });

            await refreshSuperUsers();
            setCreateNewSuperUserForm(false);
            resetCreateForm();
        } catch (error) {
            console.error("Failed to create superuser:", error);
        }
    };

    // Edit a regular user
    const handleEditUser = async () => {
        if (!IdOfUserToEdit) return;

        try {
            await api.user.userEditUser({
                userId: IdOfUserToEdit,
                newUsername: editedUsername,
                newPassword: editedPassword,
            });

            await refreshUsers();
            setEditUserForm(false);
            resetEditForm();
        } catch (error) {
            console.error("Failed to edit user:", error);
        }
    };

    // Edit an admin
    const handleEditAdmin = async () => {
        if (!IdOfUserToEdit) return;

        try {
            await api.user.userEditAdmin({
                adminId: IdOfUserToEdit,
                newUsername: editedUsername,
                newPassword: editedPassword,
            });

            await refreshAdmins();
            setEditAdminForm(false);
            resetEditForm();
        } catch (error) {
            console.error("Failed to edit admin:", error);
        }
    };

    // Edit a superuser
    const handleEditSuperUser = async () => {
        if (!IdOfUserToEdit) return;

        try {
            await api.user.userEditSuperUser({
                superuserId: IdOfUserToEdit,
                newUsername: editedUsername,
                newPassword: editedPassword,
            });

            await refreshSuperUsers();
            setEditSuperUserForm(false);
            resetEditForm();
        } catch (error) {
            console.error("Failed to edit superuser:", error);
        }
    };

    // Delete a regular user
    const handleDeleteUser = async (userId?: string) => {
        if (!userId) return;

        try {
            await api.user.userDeleteUser({ userId });
            await refreshUsers();
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    // Delete a superuser
    const handleDeleteSuperUser = async (superUserId?: string) => {
        if (!superUserId) return;

        try {
            await api.superUser.superUserDeleteSuperUser({ superUserId });
            await refreshSuperUsers();
        } catch (error) {
            console.error("Failed to delete superuser:", error);
        }
    };

    // Delete an admin
    const handleDeleteAdmin = async (adminId?: string) => {
        if (!adminId) return;

        try {
            await api.admin.adminDeleteAdmin({ adminId });
            await refreshAdmins();
        } catch (error) {
            console.error("Failed to delete admin:", error);
        }
    };

    return (
        <>

            {/* CREATE USER FORM */}
            {createNewUserForm && (
                <div className="ModalOverlay">
                    <div className="RegisterPopUp">
                        <h1 className="AlignTextToLeft">Register user</h1>
                        <label>Fill in the values to create a new user</label>
                        <br />
                        <label>Username</label>
                        <input
                            className="InputFieldLoginPage"
                            value={usernameToCreate}
                            onChange={(e) => setUsernameToCreate(e.target.value)}
                        />
                        <br /><br />
                        <label>Password</label>
                        <input
                            className="InputFieldLoginPage"
                            type="password"
                            value={passwordToCreate}
                            onChange={(e) => setPasswordToCreate(e.target.value)}
                        />
                        <br /><br />
                        <button onClick={handleRegisterUser} className="ButtonLoginPage">
                            Register user
                        </button>
                    </div>
                </div>
            )}

            {/* CREATE ADMIN FORM */}
            {createNewAdminForm && (
                <div className="ModalOverlay">
                    <div className="RegisterPopUp">
                        <h1 className="AlignTextToLeft">Register Admin</h1>
                        <label>Fill in the values to create a new Admin</label>
                        <br />
                        <label>Username</label>
                        <input
                            className="InputFieldLoginPage"
                            value={usernameToCreate}
                            onChange={(e) => setUsernameToCreate(e.target.value)}
                        />
                        <br /><br />
                        <label>Password</label>
                        <input
                            className="InputFieldLoginPage"
                            type="password"
                            value={passwordToCreate}
                            onChange={(e) => setPasswordToCreate(e.target.value)}
                        />
                        <br /><br />
                        <button onClick={handleRegisterAdmin} className="ButtonLoginPage">
                            Register Admin
                        </button>
                    </div>
                </div>
            )}

            {/* CREATE SUPERUSER FORM */}
            {createNewSuperUserForm && (
                <div className="ModalOverlay">
                    <div className="RegisterPopUp">
                        <h1 className="AlignTextToLeft">Register SuperUser</h1>
                        <label>Fill in the values to create a new SuperUser</label>
                        <br />
                        <label>Username</label>
                        <input
                            className="InputFieldLoginPage"
                            value={usernameToCreate}
                            onChange={(e) => setUsernameToCreate(e.target.value)}
                        />
                        <br /><br />
                        <label>Password</label>
                        <input
                            className="InputFieldLoginPage"
                            type="password"
                            value={passwordToCreate}
                            onChange={(e) => setPasswordToCreate(e.target.value)}
                        />
                        <br /><br />
                        <button onClick={handleRegisterSuperUser} className="ButtonLoginPage">
                            Register SuperUser
                        </button>
                    </div>
                </div>
            )}

            {/* EDIT USER FORM */}
            {editUserForm && (
                <div className="ModalOverlay">
                    <div className="RegisterPopUp">
                        <h1 className="AlignTextToLeft">Edit user</h1>
                        <label>Fill in the values to edit the user</label>
                        <br />
                        <label>Username</label>
                        <input
                            className="InputFieldLoginPage"
                            value={editedUsername}
                            onChange={(e) => setEditedUsername(e.target.value)}
                        />
                        <br /><br />
                        <label>Password</label>
                        <input
                            className="InputFieldLoginPage"
                            type="password"
                            value={editedPassword}
                            onChange={(e) => setEditedPassword(e.target.value)}
                        />
                        <br /><br />
                        <button onClick={handleEditUser} className="ButtonLoginPage">
                            Edit user
                        </button>
                    </div>
                </div>
            )}

            {/* EDIT ADMIN FORM */}
            {editAdminForm && (
                <div className="ModalOverlay">
                    <div className="RegisterPopUp">
                        <h1 className="AlignTextToLeft">Edit Admin</h1>
                        <label>Fill in the values to edit the Admin</label>
                        <br />
                        <label>Username</label>
                        <input
                            className="InputFieldLoginPage"
                            value={editedUsername}
                            onChange={(e) => setEditedUsername(e.target.value)}
                        />
                        <br /><br />
                        <label>Password</label>
                        <input
                            className="InputFieldLoginPage"
                            type="password"
                            value={editedPassword}
                            onChange={(e) => setEditedPassword(e.target.value)}
                        />
                        <br /><br />
                        <button onClick={handleEditAdmin} className="ButtonLoginPage">
                            Edit Admin
                        </button>
                    </div>
                </div>
            )}

            {/* EDIT SUPERUSER FORM */}
            {editSuperUserForm && (
                <div className="ModalOverlay">
                    <div className="RegisterPopUp">
                        <h1 className="AlignTextToLeft">Edit SuperUser</h1>
                        <label>Fill in the values to edit the SuperUser</label>
                        <br />
                        <label>Username</label>
                        <input
                            className="InputFieldLoginPage"
                            value={editedUsername}
                            onChange={(e) => setEditedUsername(e.target.value)}
                        />
                        <br /><br />
                        <label>Password</label>
                        <input
                            className="InputFieldLoginPage"
                            type="password"
                            value={editedPassword}
                            onChange={(e) => setEditedPassword(e.target.value)}
                        />
                        <br /><br />
                        <button onClick={handleEditSuperUser} className="ButtonLoginPage">
                            Edit SuperUser
                        </button>
                    </div>
                </div>
            )}

            <h2>Admin page</h2>

            {/* MANAGE USERS */}
            <div className="UsersTableDesign">
                <h2 className="TableHeader">Manage users</h2>

                <button
                    className="AddUser"
                    onClick={() => setCreateNewUserForm(true)}
                >
                    Create a new user
                </button>

                <table className="Table">
                    <thead>
                    <tr>
                        <th className="UsersTableDesignTh">Username</th>
                        <th className="UsersTableDesignTh">Role</th>
                        <th className="UsersTableDesignTh">Edit user</th>
                        <th className="UsersTableDesignTh">Delete user</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user.map((u) => (
                        <tr key={u.id}>
                            <td className="UsersTableDesignTh">{u.username}</td>
                            <td className="UsersTableDesignTh">User</td>
                            <td className="UsersTableDesignTh">
                                <button
                                    className="EditUserButton"
                                    onClick={() => {
                                        setEditedUsername(u.username ?? "");
                                        setEditUserForm(true);
                                        setIdOfUserToEdit(u.id);
                                    }}
                                >
                                    Edit
                                </button>
                            </td>
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

            {/* MANAGE SUPERUSERS */}
            <div className="UsersTableDesign">
                <h2 className="TableHeader">Manage superusers</h2>

                <button
                    className="AddUser"
                    onClick={() => setCreateNewSuperUserForm(true)}
                >
                    Create a new superuser
                </button>

                <table className="Table">
                    <thead>
                    <tr>
                        <th className="UsersTableDesignTh">Username</th>
                        <th className="UsersTableDesignTh">Role</th>
                        <th className="UsersTableDesignTh">Edit user</th>
                        <th className="UsersTableDesignTh">Delete user</th>
                    </tr>
                    </thead>
                    <tbody>
                    {superuser.map((su) => (
                        <tr key={su.id}>
                            <td className="UsersTableDesignTh">{su.username}</td>
                            <td className="UsersTableDesignTh">Superuser</td>
                            <td className="UsersTableDesignTh">
                                <button
                                    className="EditUserButton"
                                    onClick={() => {
                                        setEditedUsername(su.username ?? "");
                                        setEditSuperUserForm(true);
                                        setIdOfUserToEdit(su.id);
                                    }}
                                >
                                    Edit
                                </button>
                            </td>
                            <td className="UsersTableDesignTh">
                                <button
                                    className="DeleteUserButton"
                                    onClick={() => handleDeleteSuperUser(su.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* MANAGE ADMINS */}
            <div className="UsersTableDesign">
                <h2 className="TableHeader">Manage Admins</h2>

                <button
                    className="AddUser"
                    onClick={() => setCreateNewAdminForm(true)}
                >
                    Create a new admin
                </button>

                <table className="Table">
                    <thead>
                    <tr>
                        <th className="UsersTableDesignTh">Username</th>
                        <th className="UsersTableDesignTh">Role</th>
                        <th className="UsersTableDesignTh">Edit user</th>
                        <th className="UsersTableDesignTh">Delete user</th>
                    </tr>
                    </thead>
                    <tbody>
                    {admin.map((a) => (
                        <tr key={a.id}>
                            <td className="UsersTableDesignTh">{a.username}</td>
                            <td className="UsersTableDesignTh">Admin</td>
                            <td className="UsersTableDesignTh">
                                <button
                                    className="EditUserButton"
                                    onClick={() => {
                                        setEditedUsername(a.username ?? "");
                                        setEditAdminForm(true);
                                        setIdOfUserToEdit(a.id);
                                    }}
                                >
                                    Edit
                                </button>
                            </td>
                            <td className="UsersTableDesignTh">
                                <button
                                    className="DeleteUserButton"
                                    onClick={() => handleDeleteAdmin(a.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
