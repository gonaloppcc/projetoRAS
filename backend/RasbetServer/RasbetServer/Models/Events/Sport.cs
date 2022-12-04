using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace RasbetServer.Models.Events;

[Index(nameof(Name), IsUnique = true)]
public class Sport
{
    [Key]
    [MaxLength(40)]
    public string Name { get; set; }

    public Sport(string name)
    {
        Name = name;
    }
    
    public static Sport FromJson(JObject json)
        => new Sport(json[nameof(Name)].Value<string>());
}