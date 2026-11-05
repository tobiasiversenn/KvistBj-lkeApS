using LinqToDB;
using LinqToDB.Data;
using LinqToDB.Mapping;

namespace Infrastructure;

[Table("SuperUsers")]

public class SuperUser
{
    
    [PrimaryKey] public string Id { get; set; }
    [Column] public string username { get; set; }
    [Column] public string passwordhash { get; set; }
    [Column] public string role { get; set; }
        
     
    
}