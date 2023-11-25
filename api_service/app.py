from json import JSONEncoder
import time, mariadb
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

conn = mariadb.connect(
        user="root",
        password="dbo",
        host="25.39.37.191",
        port=3306,
        database="junction_x")

password = "TEST"
username = "TEST"

@app.route('/', methods=['GET'])
def home():
    return "TEST"

@app.route('/login', methods=['POST'])
def login():
    if request.headers.get('Content-Type') == 'application/json':
        data = request.json
        if data['username'] == username and data['password'] == password:
            print(request.json)
            return {'result': {'data': 'success', 'token': "TEST"}, 'errorMessage': None}
        else:
            print(request.json)
            return {'result': None, 'errorMessage': "Wrong username/password"}, 409

app.run(host="25.39.37.191")