using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Models.Events.Participants.Participant;

public class Participant {
    [Required] [MaxLength(30)] public string Name { get; }

    public Participant(string name) {
        Name = name;
    }
}