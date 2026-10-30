using LinqToDB.Mapping;
using DataType = LinqToDB.DataType;

namespace Infrastructure;

[Table("SuperUsers")]

public class SuperUser
{
    
    [PrimaryKey] public string Id { get; set; }
    [Column] public string username { get; set; }
    [Column] public string passwordhash { get; set; }
    [Column] public string role { get; set; }
        
     
    
}