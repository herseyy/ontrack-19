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
    name: str
    date_positive: datetime.date
    birthday: datetime.date
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
    name: str
    date_positive: datetime.date
    birthday: datetime.date
    sex: str
    barangay: str = None
    contact_number: str = None
    asymptomatic: bool = True
    symptoms: list[int]
    status: str = "infected"
	
class PatientFilter(BaseModel):
    barangay: str = None
    date_positive: Optional[datetime.date] = None
    sex: str = None
    upperAge: Optional[int] = None 
    lowerAge: Optional[int] = None
    asymptomatic: int = None
    status: str = None


class PatientUpdate(BaseModel):
    status: str = None
    asymptomatic: Optional[bool] = None
    symptoms: Optional[list[int]] = None


class PatientResponseUpdate(BaseModel):
    id: int
    name: str
    date_positive: datetime.date
    birthday: datetime.date
    sex: str
    barangay: str = None
    contact_number: str = None
    asymptomatic: bool = None
    symptoms: list[Symptoms] = None
    status: str = None

    class Config:
        orm_mode = True

class Contact(BaseModel):
    contacted: Optional[int]