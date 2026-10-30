using LinqToDB.Mapping;
using DataType = LinqToDB.DataType;

namespace Infrastructure;

[Table("Admins")]

public class Admin
{
    
    [PrimaryKey] public string Id { get; set; }
    [Column] public string username { get; set; }
    [Column] public string passwordhash { get; set; }
    [Column] public string role { get; set; }
        
     
    
}