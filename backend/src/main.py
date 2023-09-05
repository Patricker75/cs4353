from flask import Flask

app = Flask(__name__)


@app.route('/')
def base():
    response = {
        "message": 'Hello from server'
    }

    return response
