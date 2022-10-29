from turtle import home
import requests
import json

# Global Vars

debug = False

# get Request API prof

url = 'http://ucras.di.uminho.pt/v1/games'
#x = requests.get('http://ucras.di.uminho.pt/swagger/')
all =requests.get(url)

r = all.json()
# Arranjar info da API
#  
def get_bets(all_odds, home_team, away_team):
    # Bets values
    home_team_win = 0
    away_team_win = 0
    draw = 0
    if debug:
        print(all_odds)
        print("----------------------")
        print(all_odds[0]["markets"][0]["outcomes"])
    odds = all_odds[0]["markets"][0]["outcomes"]
    for name_price in odds:
        if name_price['name'] == home_team:
            home_team_win = name_price["price"]
        if name_price['name'] == away_team:
            away_team_win = name_price["price"]
        if name_price['name'] == 'Draw':
            draw = name_price["price"]
    if debug: print("----------------------")
    return (home_team_win, away_team_win, draw)


games_only = {}
for game in r:
    if debug: 
        print("Bloco completo: ")
        print(game)
    for game_info in game:
        if debug: 
            print(game_info , "  ", game[game_info ])
            print()
        game_id = game["id"]
        (odd_home, odd_away, odd_draw) = get_bets(game["bookmakers"] , game["homeTeam"], game["awayTeam"])
        games_only[game_id] = {
            "awayTeam" : game["awayTeam"],
            "homeTeam" : game["homeTeam"],
            "completed": game["completed"],
            "bets": {
                "home_win" : odd_home,
                "away_win" : odd_away,
                "draw" : odd_draw,
            }
        }
if debug: 
    print("Resultado: ")
    print(games_only)
#print(r.json())
 