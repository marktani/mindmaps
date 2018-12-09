import json
from . import db


from flask import Flask, request
app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello to mindmap shizzle!"


@app.route("/add-pair", methods=['POST'])
def addPair():
    data = request.get_json()

    print(data)

    # create words
    aId = db.addWord(data['value1'], data['language1'])
    bId = db.addWord(data['value2'], data['language2'])

    # create pair
    pairId = db.addPair(aId, bId)

    return json.dumps({'id': pairId})
