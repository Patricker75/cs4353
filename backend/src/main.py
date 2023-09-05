from flask import Flask

app = Flask(__name__)


@app.route('/')
def base():
    response = {
        "message": 'Hello from server'
    }

    return response


if __name__ == '__main__':
    app.run(debug=True, port=4001)
