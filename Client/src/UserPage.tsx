import {useEffect, useState} from "react";
import {Api, type User} from "@/api/Api.ts";

const api = new Api();



export function UserPage(){
    
    const [user, setUsers] = useState<User[]>([])

    useEffect(() => {
        api.getAllUsers.userQueriesGetAllUsers()
            .then(r => {
                setUsers(r);
            })

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

                    {user.map((u) => (
                    <tbody>
                    
                    <tr>
                        
                        
                        <td className="UsersTableDesignTh">{u.username}</td>
                        <td className="UsersTableDesignTh">User</td>
                    </tr>
                    
                    </tbody>
                    ))}


                </table>

            </div>
        </>
    )

}