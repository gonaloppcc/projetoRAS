using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RasbetServer.Models.Events;

public class Competition
{
    [Key]
    public ulong? Id { get; set; }
    
    [Required]
    [MaxLength(20)]
    public string Name { get; set; }
    
    [Required]
    [ForeignKey("SportId")]
    public ulong SportId { get; set; }
    public Sport Sport { get; set; }
}