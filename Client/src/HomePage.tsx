export function HomePage(){
    return (
        <>               
            <h2>User page</h2>

            <div className="UsersTableDesign">
                <h2>Manage users in the system</h2>
                <button className="AddUser">Create a new user</button>
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
                
                <tbody>
                <tr>
                    <td className="UsersTableDesignTh">James</td>
                    <td className="UsersTableDesignTh">User</td>
                    <td className="UsersTableDesignTh">
                        <button className="EditUserButton">Edit</button>
                    </td>
                    <td className="UsersTableDesignTh">
                        <button className="DeleteUserButton">Delete</button>
                    </td>
                </tr>
                
                
                <tr>
                    <td className="UsersTableDesignTh">Anders</td>
                    <td className="UsersTableDesignTh">Superuser</td>
                    <td className="UsersTableDesignTh">
                    <button className="EditUserButton">Edit</button>
                </td>
                    <td className="UsersTableDesignTh">
                        <button className="DeleteUserButton">Delete</button>
                    </td>
                    
                </tr>
                
                <tr>
                    <td className="UsersTableDesignTh">James</td>
                    <td className="UsersTableDesignTh">Admin</td>
                    <td className="UsersTableDesignTh">
                        <button className="EditUserButton">Edit</button>
                    </td>
                    <td className="UsersTableDesignTh">
                        <button className="DeleteUserButton">Delete</button>
                    </td>
                    
                </tr>
                
                
                </tbody>
                </table>
                
            </div>
        </>
    )
    
}