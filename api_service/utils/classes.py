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