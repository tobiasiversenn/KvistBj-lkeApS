using LinqToDB.Mapping;
using DataType = LinqToDB.DataType;

namespace Infrastructure;

[Table("Users")]

public class User
{
    
        [PrimaryKey] public string Id { get; set; }
        [Column] public string username { get; set; }
        [Column] public string passwordhash { get; set; }
        [Column] public string role { get; set; }
        
     
    
}