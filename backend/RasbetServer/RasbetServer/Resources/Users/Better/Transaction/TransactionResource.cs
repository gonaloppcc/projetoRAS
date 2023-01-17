namespace RasbetServer.Resources.Users.Better.Transaction;

public class TransactionResource
{
    public string Id { get; set; }
    public DateTime Date { get; set; }
    public float Value { get; set; }
    public float BalanceAfter { get; set; }
    public string Type { get; set; }
}