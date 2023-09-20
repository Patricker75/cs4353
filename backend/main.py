from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Existing client_data dictionary
client_data = {
    "clientName": "",
    "amount": 0,
    "price": 0.0,
    "inState": True,
    "previousClient": False,
    "generatedProfitMargin": None,
    "clientHistory": [],
}

# Route for the root URL
@app.route('/', methods=['GET'])
def root():
    return jsonify({"message": "Welcome to the root of the API!"}), 200

@app.route('/api/updateClientData', methods=['POST'])
def update_client_data():
    try:
        # Get data from the request
        data = request.get_json()

        # Update the client_data dictionary with new values
        client_data.update(data)

        # Return a response indicating success
        return jsonify({"message": "Data updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/printClientData', methods=['GET'])
def print_client_data():
    try:
        # Return the client_data dictionary as JSON
        return jsonify(client_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ... Other routes ...

if __name__ == '__main__':
    app.run(debug=True, port=4001)

# ... Hello From Hiep ...