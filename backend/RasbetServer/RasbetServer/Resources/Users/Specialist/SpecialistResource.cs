namespace RasbetServer.Resources.Users.Specialist;

public class SpecialistResource : UserResource
{
    public override string Type => "Specialist";
    
    public IEnumerable<string> Specialties { get; set; }
}