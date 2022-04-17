"""
Main file
"""
from fastapi import FastAPI, Request, Response, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
# from fastapi.templating import Jinja2Templates

from . import crud, models, schemas
from .database import SessionLocal, engine

from pydantic import BaseModel

# Matic nagccreate na ng table
models.Base.metadata.create_all(bind=engine)
# Main app object
app = FastAPI()


origins = [
    "http://localhost.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:8000",
    "*"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Wag mo muna tong pansinin, malilito ka lang
@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response


# Db dependency, get db
def get_db(request: Request):
    return request.state.db


def populate_table():
    db = SessionLocal()
    crud.populate_symptoms(db)
    db.close()


populate_table()


# =======================================================================================
# EDIT CODE BELOW HERE
# 1 - Use /symptoms api call para makuha ung list ng symptoms
# 2 - Load list of symptoms sa html page
# 3 - Edit get_covid_form function
# =======================================================================================
@app.get("/")
def index():
    return {"Hello": "World"}


# Ang ginagawa lang neto, sinasabe na yung response format ay galing sa schema na Symptoms
# Tapos yung function ay tatangap ng db object galing dun sa get_db function sa taas
@app.get("/symptoms", response_model=list[schemas.Symptoms])
def get_symptoms(db: Session = Depends(get_db)):
    # Pass db dun sa get_symptoms na function
    symptoms = crud.get_symptoms(db)
    return symptoms

@app.post("/submit_form")
def get_covid_form(patient: schemas.Patient):
    """
    Step 1:
    Send the data from HTML using async call
    https://www.youtube.com/watch?v=IISLcjk9HPc&ab_channel=CodingDiksha
    """

    """
    Step 2:
    Validate the form from the website. Use json instead of form.
    https://fastapi.tiangolo.com/tutorial/body/
    """
    # print(patient)
    return patient 
