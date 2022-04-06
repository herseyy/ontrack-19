"""
CHECK THIS TUTORIAL!!!!!
Taken from: https://fastapi.tiangolo.com/tutorial/sql-databases/
"""
import enum
import datetime
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum, DateTime, Date
from sqlalchemy.orm import relationship

from .database import Base


class Status(enum.Enum):
    """Patient status."""
    recovered = "recovered"
    died = "died"
    infected = "infected"
    close_contact = "close_contact"


class Patient(Base):
    __tablename__ = "patient"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    birthday = Column(Date, nullable=False)
    date_positive = Column(Date, nullable=False)
    barangay = Column(String, unique=False, index=True, nullable=False)
    contact_number = Column(String, unique=True, index=True, nullable=False)
    status = Column(Enum(Status), index=True, default=Status.infected)
    asymptomatic = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)


class Symptoms(Base):
    __tablename__ = "symptoms"

    id = Column(Integer, primary_key=True, autoincrement=False)
    description = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)


class PatientSymptoms(Base):
    __tablename__ = "patient_symptoms"

    id = Column(Integer, primary_key=True, index=True)
    symptom_id = Column(Integer, ForeignKey("symptoms.id"))
    patient_id = Column(Integer, ForeignKey("patient.id"))
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)
