from typing import Optional
from typing import Union

from fastapi import FastAPI

# Para permitir posts
from pydantic import BaseModel

import ucras 

# Comandos para correr:
#                  file:instance of FastAPI
# python -m uvicorn main:app --reload

# Documentação
# http://127.0.0.1:8000/docs
app = FastAPI()


# ----------------- Estruturas de dados

games = {}

class Game(BaseModel):
    home_team : str
    away_team : str
    date_match : str
    odd_home_win : Optional[float]
    odd_away_win : Optional[float]
    odd_tie : Optional[float]

promotions = {}

class Promotion(BaseModel):
    id : str
    validity : str



# ----------------- Métodos de Post

@app.post("/game")
def read_root(game : Game):
    games[len(games)] = game
    return {"data": f"New game is created: {game.home_team} vs. {game.away_team}"}

# Valida de o jogo existe
# A key no dicionário de promoções é o id do jogo, depois alterar.
@app.post("/promotions/{game_id}")
def read_item(new_promotion : Promotion):
    for obj in ucras.games_only:
        if obj == new_promotion.id:
            promotions[new_promotion.id] = new_promotion
            return {"data": "Promoção adicionada com sucesso"}

    return {"data": "Jogo não encontrado"}
# ----------------- Métodos de GET
@app.get("/")
def read_root():
    return {"Hello": "World!"}


@app.get("/games")
def read_root():
    if len(games) == 0:
        return {"info": "No games available"}
    else: 
        return {"data": games}

@app.get("/APIgames")
def read_root():
    return {"info" : ucras.games_only}
    #return {"info": "No games available"}
    


# Este pode-se apagar, é um default com coisas que depois quero ver melhor
@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/promotions/")
def read_item():
    return {"data": promotions}


@app.get("/promotions/{game_id}")
def read_item(game_id : str):
    try:
        promotion_info = promotions[game_id]
        game_info = ucras.get_game(game_id)
        return {"game_id": game_id, "promotion" : promotion_info, "game" : game_info}
    except:
        return {"Error": "Id not found?"}

@app.get("/game/{game_id}")
def read_item(game_id : str):
    return {"data": ucras.get_game(game_id)}
'''
Should initialize variables, but it doesn't work.
def main():
    jogo = {
    home_team : "AAA",
    away_team : "BBB",
    date_match : "Amanhã"
    }
    games[len(games)] = jogo

if __name__ == "__main__":
    main()
    '''