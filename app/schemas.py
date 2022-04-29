"""
Schema file

Ang ibig sabihin lang neto, eto ung format nung mga marereturn or makukuhang data.
"""
import datetime
from typing import Optional
from pydantic import BaseModel


class Symptoms(BaseModel):
    id: int
    description: str
    # updated_at: datetime.datetime
    # created_at: datetime.datetime

    class Config:
        orm_mode = True


class PatientResponse(BaseModel):
    id: int
    date_positive: datetime.date
    birthday: datetime.date
    name: str
    sex: str
    barangay: str = None
    contact_number: str = None
    asymptomatic: bool = True
    symptoms: list[Symptoms]
    status: str

    class Config:
        orm_mode = True


# userCreate
class PatientRequest(BaseModel): 
    date_positive: datetime.date
    birthday: datetime.date
    name: str
    sex: str
    barangay: str = None
    contact_number: str = None
    asymptomatic: bool = True
    symptoms: list[int]
    status: str = "infected"
	

	

