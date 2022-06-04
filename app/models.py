"""
CHECK THIS TUTORIAL!!!!!
Taken from: https://fastapi.tiangolo.com/tutorial/sql-databases/
"""
import enum
import datetime
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum, DateTime, Date, Time
from sqlalchemy.orm import relationship, backref

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
    name = Column(String, unique=True, index=True, nullable=False)
    date_positive = Column(Date, nullable=False)
    # birthday = Column(Date, nullable=False)
    age = Column(Integer, index=True, nullable=False)
    sex = Column(String, unique=False, index=True, nullable=False)
    barangay = Column(String, unique=False, index=True, nullable=False)
    contact_number = Column(String, unique=True, index=True, nullable=False)
    asymptomatic = Column(Boolean, default=True)
    status = Column(Enum(Status), index=True, default=Status.infected)
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)

    symptoms = relationship("PatientSymptoms", back_populates="patient")


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

    patient = relationship("Patient", back_populates="symptoms")
    description = relationship("Symptoms", backref=backref("info", lazy="joined"))


class SMSNotif(Base):

    __tablename__ = "sms_notif"

    id = Column(Integer, primary_key=True, autoincrement=True)
    subscriber_number = Column(String, index=True)
    access_token = Column(String, index=True)
    already_contacted = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.now)


class VaccinationSched(Base):
    __tablename__ = "vaccination_schedule"

    id = Column(Integer, primary_key=True, index=True)
    dose = Column(String, index=True, nullable=False)
    vaccine_type = Column(String, index=True, nullable=False)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    location = Column(String, index=True, nullable=False)
    slots = Column(String, index=True, nullable=False)
    age = Column(String, index=True, nullable=False)

    created_at = Column(DateTime, default=datetime.datetime.now)




class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)