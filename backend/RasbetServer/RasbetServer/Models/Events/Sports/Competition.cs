namespace RasbetServer.Models.Events.Sports;

public enum Competition : ushort
{
    PortugueseFirstLeague,
    EnglishFirstLeague,
    ChampionsLeague,
    EuropaLeague,
    NationalBasketballLeague,
    FunchalMarathon
}

public static class FootballCompetitionMethods
{
    public static string FormattedName(this Competition comp)
    {
        return comp switch
        {
            Competition.PortugueseFirstLeague => "Primeira Liga Portuguesa",
            Competition.EnglishFirstLeague => "Premier League",
            Competition.ChampionsLeague => "Liga dos Campeões",
            Competition.EuropaLeague => "Liga Europa",
            _ => throw new ArgumentOutOfRangeException(nameof(comp), comp, null)
        };
    }
}