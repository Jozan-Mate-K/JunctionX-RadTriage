from json import JSONEncoder
import time, mariadb, sys, pprint, datetime as dt
from flask import Flask, request, json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def query(sql, cursor):
    cursor.execute(sql)
    data = []
    for i in cursor.fetchall():
        d = {}
        index = 0
        for j in cursor.description:
            d[j[0]] = i[index]
            index = index + 1
        data.append(d)
    return data

def get_next_last_appointment(date_list):
    pos_a = []
    neg_a = []
    now = dt.datetime.now()
    
    for i in date_list:
        print(i)
        if now - i < dt.timedelta(0):
            pos_a.append(i)
        elif now - i > dt.timedelta(0):
            neg_a.append(i)

    if pos_a == []:
        pos_a.append(0)
    elif neg_a == []:
        neg_a.append(0)
        
    return min(pos_a), min(neg_a)

conn = mariadb.connect(
    user="root",
    password="dbo",
    host="25.52.10.125",
    port=3306,
    database="junction_x")

cursor = conn.cursor()

#password = "TEST"
#username = "TEST"

@app.route('/', methods=['GET'])
def home():
    return "TEST"

@app.route('/login', methods=['POST'])
def login():
    if request.headers.get('Content-Type') == 'application/json':
        data = request.json

        cursor.execute(f"select username, password from user where username = '{data['username']}'")
        
        for i in cursor.fetchall():
            print(i)
            username = i[0]
            password = i[1]
            if data['username'] == username and data['password'] == password:
                print(request.json)
                return {'result': {'data': 'success', 'token': "TEST"}, 'errorMessage': None}
            else:
                print(request.json)
                return {'result': None, 'errorMessage': "Wrong username/password"}, 409

@app.route('/patients', methods=['GET', 'POST'])
def list_patients():
    data = query("select Name, PatientID, TreatmentStatus from patient", cursor)
  
    for d in data:
        q = query(f"select StartTime from examination where PatientID = {d['PatientID']} order by StartTime", cursor)
        times = []
        print(q)
        for t in q:
            times.append(t['StartTime'])
        d['LastAppointment'], d['NextAppointment'] = get_next_last_appointment(times)
        
    return {f'result': data, 'errorMessage': None}

app.run(host="25.39.37.191")