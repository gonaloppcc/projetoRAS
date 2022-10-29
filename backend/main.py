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


# ----------------- Métodos de Post

@app.post("/game")
def read_root(game : Game):
    games[len(games)] = game
    return {"data": f"New game is created: {game.home_team} vs. {game.away_team}"}

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
    


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

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