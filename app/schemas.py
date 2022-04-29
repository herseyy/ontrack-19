"""
Schema file

Ang ibig sabihin lang neto, eto ung format nung mga marereturn or makukuhang data.
"""
import datetime
from typing import Optional
from pydantic import BaseModel


# class ItemBase(BaseModel):
#     title: str
#     description: Optional[str] = None


# class ItemCreate(ItemBase):
#     pass


# class Item(ItemBase):
#     id: int
#     owner_id: int

#     class Config:
#         orm_mode = True


# class UserBase(BaseModel):
#     email: str


# class UserCreate(UserBase):
#     password: str


# class User(UserBase):
#     id: int
#     is_active: bool
#     items: list[Item] = []

#     class Config:
#         orm_mode = True

class Symptoms(BaseModel):
    id: int
    description: str
    # updated_at: datetime.datetime
    # created_at: datetime.datetime

    class Config:
        orm_mode = True


class Patient(BaseModel):
	patient_id: int
	date_positive: datetime.date
	birthday: datetime.date
	sex: str
	barangay: str
	contact_number: str
	asymptomatic: bool
	# symptoms: list[int]
	status: str

# userCreate
class PatientRequest(BaseModel): 
	# patient_id: int
	date_positive: datetime.date
	birthday: datetime.date
	# sex: str
	barangay: str
	contact_number: str
	asymptomatic: bool
	symptoms: list[int]
	status: str
	# created_at: datetime.datetime
	# updated_at: datetime.datetime


class PatientSymptoms(BaseModel):
	symptom_id: int
	patient_id: int

	

