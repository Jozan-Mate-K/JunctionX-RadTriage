import datetime as dt
import json, mariadb, hashlib, sys

DATE_FORMAT = r"%Y-%m-%d"

class Patient:
    def __init__(self, id, name, email):
        self.id = id
        self.name = name
        self.email = email
    def to_json(self):
        return {'id' : self.id,
                'name' : self.name,
                'email' : self.email }

class Appointment:
    def __init__(self, id, patient, doctor, date, duration):
        self.id = id
        self.patient = patient
        self.doctor = doctor
        self.date = date
        self.duration = duration
    def to_json(self):
        return {'id' : self.id,
                'patient' : self.patient.to_json(),
                'doctor' : self.doctor.to_json(),
                'date' : self.date.strftime(DATE_FORMAT)}

class Plan:
    def __init__(self, id, patient, appointment, start, end):
        self.id = id
        self.patient = patient,
        self.appointment = appointment
        self.start = start
        self.end = end
    def to_json(self):
        return {'id' : self.id,
                'patient' : self.patient.to_json(),
                'appointment' : self.appointment.to_json(),
                'start' : self.start.strftime(DATE_FORMAT),
                'end' : self.end.strftime(DATE_FORMAT) }
class Machine:
    def __init__(self, id, model, capacities, limit):
        self.model = model
        self.capacities = capacities
        self.id = id
        self.limit = limit

    def to_json(self):
        return {'id' : self.id,
                'model' : self.model,
                'capacities' : self.capacities,
                'limit' : self.limit }

class Bed:
    def __init__(self, id, room, floor, available = True):
        self.id = id
        self.room = room
        self.floor = floor
        self.available = available
    def to_json(self):
        return {'id' : self.id,
                'room' : self.room,
                'floor' : self.floor }

class Doctor:
    def __init__(self):
        pass
if __name__ == "__main__":
    #Gen beds
    
    beds = []
    for i in range(0, 8):
        beds.append(Bed(i, i%3, i%2))
    
    #Gen patients

    patients = []
    for i in range(0, 10):
        patients.append(Patient(i, f"p{i}", "test@test.com"))

    #Gen machines
    machines = [
        Machine(1, "TrueBeam", ['kV imaging', 'large organ treatment', 'middle organ treatment', 'small organ treatment'], {'weight' : 120}),
        Machine(2, "TrueBeam", ['kV imaging', 'large organ treatment', 'middle organ treatment', 'small organ treatment'], {'weight' : 120}),
        Machine(3, "TrueBeam", ['kV imaging', 'large organ treatment', 'middle organ treatment', 'small organ treatment'], {'weight' : 90}),
        Machine(4, "TrueBeam", ['kV imaging', 'large organ treatment', 'middle organ treatment', 'small organ treatment'], {'weight' : 90}),
        Machine(5, "TrueBeam", ['large organ treatment', 'middle organ treatment', 'small organ treatment'], {'weight' : 120})
    ]

bd_list = ["1980-05-15", "1992-08-22", "1975-12-10", "1988-04-01", "1995-06-28", "1990-09-14", "1983-02-18", "1998-11-05", "1986-07-03", "1972-03-25"]

age_list = []

for i in bd_list:
    s = i.strip('-')
    d = dt.datetime(int(s[0]), int(s[1]), int(s[2]))
    age_list.append(str((dt.datetime.now ()- d).days/365))
print(age_list)