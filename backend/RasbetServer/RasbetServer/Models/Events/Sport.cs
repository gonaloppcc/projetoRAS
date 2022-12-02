using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Models.Events;

public class Sport
{
    [Key]
    public ulong? Id { get; set; }
    [Required]
    [MaxLength(15)]
    public string Name { get; set; }
}