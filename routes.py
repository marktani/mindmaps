import json
from . import db


from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello():
    return "Hello to mindmap shizzle!"


@app.route("/add-pair", methods=['POST'])
def addPair():
    data = request.get_json()

    # create words
    aId = db.addWord(data['value1'], data['language1'])
    bId = db.addWord(data['value2'], data['language2'])

    # create pair
    pairId = db.addPair(aId, bId)

    return json.dumps({'id': pairId})


@app.route("/get-pairs", methods=['GET'])
def getPairs():
    # TODO: handle bad data
    pairs = db.getPairs()
    pairs2 = map(lambda (id, a, b): {'id': id, 'value1': a, 'value2': b}, pairs)
    print(pairs2)
    return json.dumps({'pairs': pairs2})
