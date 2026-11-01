import {useEffect, useState} from "react";
import {Api, type Admin, type User, type SuperUser} from "@/api/Api.ts";

const api = new Api();


export function AdminPage(){

    const [user, setUsers] = useState<User[]>([])
    const [admin, setAdmins] = useState<Admin[]>([])
    const [superuser, setSuperUsers] = useState<SuperUser[]>([])
    
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
    const [IdOfUserToEdit, setIdOfUserToEdit] =  useState<string | undefined>(undefined)





    useEffect(() => {
        api.getAllUsers.userQueriesGetAllUsers()
            .then(r => {
                setUsers(r);
            })

    }, []);

    
    

    useEffect(() => {
        api.getAllAdmins.adminQueriesGetAllAdmins()
            .then(r => {
                setAdmins(r);
            })

    }, []);
    
    


    useEffect(() => {
        api.getAllSuperUsers.superUserQueriesGetAllSuperUsers()
            .then(r => {
                setSuperUsers(r);
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


    const handleRegisterAdmin = () => {
        api.postAdmin.adminQueriesPostAdmin({
            username: usernameToCreate,
            passwordhash: passwordToCreate,
        })
            .then(() => {
                return api.getAllAdmins.adminQueriesGetAllAdmins()


            })
            .then(r => {
                setAdmins(r);
            })
        setCreateNewAdminForm(false);
        setUsernameToCreate("");
        setPasswordToCreate("");
    }

    const handleRegisterSuperUser = () => {
        api.postSuperUser.superUserQueriesPostSuperUser({
            username: usernameToCreate,
            passwordhash: passwordToCreate,
        })
            .then(() => {
                return api.getAllSuperUsers.superUserQueriesGetAllSuperUsers()


            })
            .then(r => {
                setSuperUsers(r);
            })
        setCreateNewSuperUserForm(false);
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


    const handleEditAdmin = () => {
        api.editAdmin.userQueriesEditAdmin({
            adminId: IdOfUserToEdit,
            newUsername: editedUsername,
            newPassword: editedPassword
        })
            .then(() => {
                return api.getAllAdmins.adminQueriesGetAllAdmins()


            })
            .then(r => {
                setAdmins(r);
            })
        setEditAdminForm(false);
        setEditedUsername("");
        setEditedPassword("");
        setIdOfUserToEdit("");

    }

    const handleEditSuperUser = () => {
        api.editSuperUser.userQueriesEditSuperUser({
            superuserId: IdOfUserToEdit,
            newUsername: editedUsername,
            newPassword: editedPassword
        })
            .then(() => {
                return api.getAllSuperUsers.superUserQueriesGetAllSuperUsers()


            })
            .then(r => {
                setSuperUsers(r);
            })
        setEditSuperUserForm(false);
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




            {createNewAdminForm && (
                <div className="ModalOverlay">
                    <div className="RegisterPopUp">
                        <br/>
                        <h1 className="AlignTextToLeft">Register Admin</h1>
                        <label className="AlignTextToLeft" >Fill in the values to create a new Admin</label>

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

                        <button onClick={handleRegisterAdmin} className="ButtonLoginPage">Register Admin</button>
                    </div>
                </div>
            )
            }



            {createNewSuperUserForm && (
                <div className="ModalOverlay">
                    <div className="RegisterPopUp">
                        <br/>
                        <h1 className="AlignTextToLeft">Register SuperUser</h1>
                        <label className="AlignTextToLeft" >Fill in the values to create a new SuperUser</label>

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

                        <button onClick={handleRegisterSuperUser} className="ButtonLoginPage">Register SuperUser</button>
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


            {editAdminForm && (
                <div className="ModalOverlay">
                    <div className="RegisterPopUp">
                        <br/>
                        <h1 className="AlignTextToLeft">Edit Admin</h1>
                        <label className="AlignTextToLeft" >Fill in the values to edit the Admin</label>

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

                        <button onClick={handleEditAdmin} className="ButtonLoginPage">Edit Admin</button>
                    </div>
                </div>
            )
            }


            {editSuperUserForm && (
                <div className="ModalOverlay">
                    <div className="RegisterPopUp">
                        <br/>
                        <h1 className="AlignTextToLeft">Edit SuperUser</h1>
                        <label className="AlignTextToLeft" >Fill in the values to edit the SuperUser</label>

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

                        <button onClick={handleEditSuperUser} className="ButtonLoginPage">Edit SuperUser</button>
                    </div>
                </div>
            )
            }
            
            
        
            <h2>Admin page</h2>

            <div className="UsersTableDesign">
                <h2 className="TableHeader">Manage users</h2>
                <button className="AddUser" onClick={() => setCreateNewUserForm(true)}>Create a new user</button>
                
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

                    {user.map((u) => (

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
                                    userId: u.id,
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




            <div className="UsersTableDesign">

            <h2 className="TableHeader">Manage superusers</h2>
                <button className="AddUser" onClick={() => setCreateNewSuperUserForm(true)}>Create a new superuser</button>
                 <table className="Table">
                    <thead>
                    <th className="UsersTableDesignTh">
                        Username
                    </th>
                    <th className="UsersTableDesignTh">
                        Role
                    </th>
                    <th className="UsersTableDesignTh" >
                        Edit user

                    </th>

                    <th className="UsersTableDesignTh">
                        Delete user
                    </th>

                    </thead>

                     {superuser.map((su) => (

                         <tbody>
                    <tr>
                        <td className="UsersTableDesignTh">{su.username}</td>
                        <td className="UsersTableDesignTh">Superuser</td>
                        <td className="UsersTableDesignTh">
                            <button className="EditUserButton" onClick={() => {
                                setEditSuperUserForm(true)
                                setIdOfUserToEdit(su.id)
                            }}>Edit</button>
                        </td>
                        <td className="UsersTableDesignTh">
                            <button className="DeleteUserButton" onClick={() => {
                                api.deleteSuperUser.superUserQueriesDeleteSuperUser({
                                    superUserId: su.id
                                })
                                    .then(() => {
                                        api.getAllSuperUsers.superUserQueriesGetAllSuperUsers()
                                            .then(r => {
                                                setSuperUsers(r);
                                            })
                                    })
                            }}>Delete</button>
                        </td>
                    </tr>

                    </tbody>

                         ))}
                </table>
            </div>
                
            
                
                
                
                
                
                
                
                
                <div className="UsersTableDesign">
                    <h2 className="TableHeader">Manage Admins</h2>

                    <button className="AddUser" onClick={() => setCreateNewAdminForm(true)}>Create a new admin</button>
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


                    {admin.map((a) => (

                        <tbody>
                    <tr>
                        <td className="UsersTableDesignTh">{a.username}</td>
                        <td className="UsersTableDesignTh">Admin</td>
                        <td className="UsersTableDesignTh">
                            <button className="EditUserButton" onClick={() => {
                                setEditAdminForm(true)
                                setIdOfUserToEdit(a.id)

                            }}>Edit</button>
                        </td>
                        <td className="UsersTableDesignTh">
                            <button className="DeleteUserButton" onClick={() => {
                                api.deleteAdmin.adminQueriesDeleteAdmin({
                                    adminId: a.id
                                })
                                    .then(() => {
                                        api.getAllAdmins.adminQueriesGetAllAdmins()
                                            .then(r => {
                                                setAdmins(r);
                                            })
                                    })
                            }
                            }>Delete</button>
                        </td>
                    </tr>
                    </tbody>
                    ))}
                </table>
                </div>




        </>
    )

}