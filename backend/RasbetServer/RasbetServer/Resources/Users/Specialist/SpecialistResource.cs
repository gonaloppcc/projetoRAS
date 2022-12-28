namespace RasbetServer.Resources.Users.Specialist;

public class SpecialistResource : UserResource
{
    public IEnumerable<string> Specialties { get; set; }
}