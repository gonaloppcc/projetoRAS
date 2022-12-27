namespace RasbetServer.Resources.Users.Specialist;

public class SaveSpecialistResource : SaveUserResource
{
    public IEnumerable<string> Specialties { get; set; }
}