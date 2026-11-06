import {useEffect, useState} from "react";
import { api } from "@/api/apiClient.ts";
import type { User } from "@/api/Api.ts";

export function SuperUserPage(){
    
    
    const [users, setUsers] = useState<User[]>([])


    const [editUserForm, setEditUserForm] = useState(false);


    const [editedUsername, setEditedUsername] = useState("");
    const [editedPassword, setEditedPassword] = useState("");
    const [IdOfUserToEdit, setIdOfUserToEdit] =  useState<string | undefined>(undefined)

    const [createNewUserForm, setCreateNewUserForm] = useState(false);
    

    const [usernameToCreate, setUsernameToCreate] = useState("");
    const [passwordToCreate, setPasswordToCreate] = useState("");
    
    
    useEffect(() => {
        api.getAllUsers.userQueriesGetAllUsers()
            .then(r => {
                setUsers(r);
            })

    }, []);


    const handleRegisterUser = () => {
        api.postUser.userQueriesPostUser({
            username: usernameToCreate,
            passwordhash: passwordToCreate,
        })
            .then(() => {
                return api.getAllUsers.userQueriesGetAllUsers()


            })
            .then(r => {
                setUsers(r);
            })
        setCreateNewUserForm(false);
        setUsernameToCreate("");
        setPasswordToCreate("");

    }


    const handleEditUser = () => {
        api.editUser.userQueriesEditUser({
            userId: IdOfUserToEdit,
            newUsername: editedUsername,
            newPassword: editedPassword
        })
            .then(() => {
                return api.getAllUsers.userQueriesGetAllUsers()


            })
            .then(r => {
                setUsers(r);
            })
        setEditUserForm(false);
        setEditedUsername("");
        setEditedPassword("");
        setIdOfUserToEdit("");
    }

    
    return (
        <>
            {createNewUserForm && (
                <div className="ModalOverlay">
                    <div className="RegisterPopUp">
                        <br/>
                        <h1 className="AlignTextToLeft">Register user</h1>
                        <label className="AlignTextToLeft" >Fill in the values to create a new user</label>

                        <br/>
                        <label className="AlignTextToLeft">Username</label>
                        <input className="InputFieldLoginPage" value={usernameToCreate} onChange={(e) => setUsernameToCreate(e.target.value)}/>
                        <br/>
                        <br/>
                        <label className="AlignTextToLeft">Password</label>
                        <input className="InputFieldLoginPage" type="password" value={passwordToCreate} onChange={(e) => setPasswordToCreate(e.target.value)}/>
                        <br/>
                        <br/>
                        <br/>

                        <button onClick={handleRegisterUser} className="ButtonLoginPage">Register user</button>
                    </div>
                </div>
            )
            }

            {editUserForm && (
                <div className="ModalOverlay">
                    <div className="RegisterPopUp">
                        <br/>
                        <h1 className="AlignTextToLeft">Edit user</h1>
                        <label className="AlignTextToLeft">Fill in the values to edit the user</label>

                        <br/>
                        <label className="AlignTextToLeft">Username</label>
                        <input className="InputFieldLoginPage" value={editedUsername} onChange={(e) => setEditedUsername(e.target.value)}/>
                        <br/>
                        <br/>
                        <label className="AlignTextToLeft">Password</label>
                        <input className="InputFieldLoginPage" type="password" value={editedPassword} onChange={(e) => setEditedPassword(e.target.value)}/>
                        <br/>
                        <br/>
                        <br/>

                        <button onClick={handleEditUser} className="ButtonLoginPage">Edit user</button>
                    </div>
                </div>
            )
            }

            
            <h2>Super User page</h2>

            <div className="UsersTableDesign">
                <h2 className="TableHeader">Manage Users in the system</h2>
                <button className="AddUser" onClick={() => setCreateNewUserForm(true)}>Create a new User</button>
                <table className="Table">
                    <thead>
                    <th className="UsersTableDesignTh">
                        Username
                    </th>
                    <th className="UsersTableDesignTh">
                        Role
                    </th>
                    <th className="UsersTableDesignTh">
                        Edit user

                    </th>

                    <th className="UsersTableDesignTh">
                        Delete user
                    </th>

                    </thead>

                    {users.map((u) => (

                        <tbody>
                        <tr>
                            <td className="UsersTableDesignTh">{u.username}</td>
                            <td className="UsersTableDesignTh">User</td>
                            <td className="UsersTableDesignTh">
                                <button className="EditUserButton" onClick={() => { 
                                    setEditUserForm(true)
                                    setIdOfUserToEdit(u.id)

                                }}>Edit</button>
                            </td>
                            <td className="UsersTableDesignTh">
                                <button className="DeleteUserButton" onClick={() => {
                                    api.deleteUser.userQueriesDeleteUser({
                                        userId: u.id
                                    })
                                        .then(() => {
                                            api.getAllUsers.userQueriesGetAllUsers()
                                                .then(r => {
                                                    setUsers(r);
                                                })
                                        })
                                }}>Delete</button>
                            </td>
                        </tr>

                        </tbody>
                    ))}
                </table>
            </div>
        </>
    )

}