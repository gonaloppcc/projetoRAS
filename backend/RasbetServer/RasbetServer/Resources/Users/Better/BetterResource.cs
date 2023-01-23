namespace RasbetServer.Resources.Users.Better;

public class BetterResource : UserResource
{
    public override string Type => "Better";

    public float Balance { get; set; }
}