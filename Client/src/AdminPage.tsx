import {useEffect, useState} from "react";
import {Api, type Admin, type User, type SuperUser} from "@/api/Api.ts";

const api = new Api();


export function AdminPage(){

    const [user, setUsers] = useState<User[]>([])
    const [admin, setAdmins] = useState<Admin[]>([])
    const [superuser, setSuperUsers] = useState<SuperUser[]>([])


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
    return (
        <>
            <h2>Admin page</h2>

            <div className="UsersTableDesign">
                <h2>Manage users</h2>
                <button className="AddUser">Create a new user</button>
                
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
                            <button className="EditUserButton">Edit</button>
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

            <h2>Manage superusers</h2>
                <button className="AddUser">Create a new superuser</button>
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

                     {superuser.map((su) => (

                         <tbody>
                    <tr>
                        <td className="UsersTableDesignTh">{su.username}</td>
                        <td className="UsersTableDesignTh">Superuser</td>
                        <td className="UsersTableDesignTh">
                            <button className="EditUserButton">Edit</button>
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
                <button className="AddUser">Create a new admin</button>
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
                            <button className="EditUserButton">Edit</button>
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