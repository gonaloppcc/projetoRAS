namespace RasbetServer.Models;

public class Transaction
{
    public float Value { get; }

    public Transaction(float value)
    {
        Value = value;
    }
}