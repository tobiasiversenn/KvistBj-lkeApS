using LinqToDB;
using LinqToDB.Data;
using LinqToDB.Mapping;

namespace Infrastructure;

public class MyDatabaseConnection(DataOptions<MyDatabaseConnection> dataopts) : DataConnection(dataopts.Options)
{
    public ITable<User> Users() => this.GetTable<User>();
    public ITable<SuperUser> SuperUsers() => this.GetTable<SuperUser>();
    public ITable<Admin> Admins() => this.GetTable<Admin>();

    

}