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
    updated_at: datetime.datetime
    created_at: datetime.datetime

    class Config:
        orm_mode = True


# class PatientSymptoms(BaseModel):
	
