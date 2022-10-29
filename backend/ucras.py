import requests
import json
url = 'http://ucras.di.uminho.pt/v1/games'
#x = requests.get('http://ucras.di.uminho.pt/swagger/')
all =requests.get(url)

r = all.json()

games_only = {}
for thing in r:
    print("Bloco completo: ")
    print(thing)
    for thing2 in thing:
        print(thing2 , "  ", thing[thing2])
        print()
        game_id = thing["id"]
        games_only[game_id] = {
            "awayTeam" : thing["awayTeam"],
            "homeTeam" : thing["homeTeam"]
        }
print("Resultado: ")
print(games_only)
#print(r.json())
 