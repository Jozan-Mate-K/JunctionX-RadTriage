from json import JSONEncoder
import time
from flask import Flask, request
from flask_cors import CORS
from sqlalchemy import text, create_engine

# connected= False
# #print(engine)
# while(not connected):
#     global engine
#     try:
#         engine = create_engine("mariadb+pymysql://root:dbo@25.52.10.125:3306/junction_x")
#     except:
#         print("SQL Connection failed")
#         time.sleep(1)
#     else:
#         print("SQL Connected")
#         connected = True

app = Flask(__name__)
CORS(app)

@app.route('/login', methods=['POST'])
def Login():
    #return JSONEncoder().encode( {'result': {'data': 'success', 'token': "asdalé"}, 'errorMessage': None})
    with engine.connect() as conn:
        q = text("SELECT password,token FROM users WHERE username = '" +
            request.json["username"] + "'")
        rs = conn.execute(q).fetchone()
        if rs != None and request.json["password"] == rs.password:
            return {'result': {'data': 'success', 'token': rs.token}, 'errorMessage': None}
        else:
            return  {'result': None, 'errorMessage': "Wrong username or password"}, 409
