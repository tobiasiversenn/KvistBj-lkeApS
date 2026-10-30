import {useEffect, useState} from "react";
import {Api, type SuperUser} from "@/api/Api.ts";

const api = new Api();
export function SuperUserPage(){
    const [superusers, setSuperUsers] = useState<SuperUser[]>([])

    useEffect(() => {
        api.getAllSuperUsers.superUserQueriesGetAllSuperUsers()
            .then(r => {
                setSuperUsers(r);
            })

    }, []);
    return (
        <>
            <h2>Super User page</h2>

            <div className="UsersTableDesign">
                <h2>Manage users in the system</h2>
                <button className="AddUser">Create a new SuperUser</button>
                <table>
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

                    {superusers.map((su) => (

                        <tbody>
                    <tr>
                        <td className="UsersTableDesignTh">{su.username}</td>
                        <td className="UsersTableDesignTh">SuperUser</td>
                        <td className="UsersTableDesignTh">
                            <button className="EditUserButton" onClick={() => {
                                
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
        </>
    )

}