namespace RasbetServer.Resources.Users.Specialist;

public class SpecialistResource : UserResource
{
    public IList<string> Specialties { get; set; }
}