"""
Main file
"""
from fastapi import FastAPI, Request, Response, Depends, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi.templating import Jinja2Templates

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


templates = Jinja2Templates(directory="pages")


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



# @app.post("/submit_form")
# def get_covid_form(patient: schemas.PatientRequest):
#     patient_dict = patient.dict()
#     # print(patient_dict['barangay'])
#     print(patient_dict)
#     return ""
#     # return {"results": {infos}}

@app.get("/patients")
def read(db:Session = Depends(get_db)):
    return db.query(models.Patient).all()



@app.delete("/{id}}")
def read(id: int, db:Session = Depends(get_db)):

    db.query(models.Patient).filter(models.Patient.id == id).delete()
    db.commit()


@app.post("/submit_form")
def get_covid_form(patient: schemas.PatientRequest, db: Session = Depends(get_db)):
    
    created_patient = crud.create_patients(db=db, patient=patient)
    # print(patient)
    return create_patients



# @app.get("/records")
# def get_records(request: Request):
#     return templates.TemplateResponse("index.html", {"request":request})

# @app.post("/recordss")
# def get_records(patient_id: int = Form(...), patient_sex: str = Form(...)):

#     return {"message": patient_id, "asdasd": patient_sex}