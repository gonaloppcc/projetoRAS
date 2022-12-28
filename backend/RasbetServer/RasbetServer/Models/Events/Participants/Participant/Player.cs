using System.ComponentModel.DataAnnotations.Schema;

namespace RasbetServer.Models.Events.Participants.Participant;

public class Player : Participant
{
    [ForeignKey("TeamId")]
    public string TeamId { get; set; }
    
    public Player() : base() {}
    
    public Player(string name, string sportId, string teamId) : base(name, sportId)
    {
        TeamId = teamId;
    }
}