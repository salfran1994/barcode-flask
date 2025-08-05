from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/scan', methods=['POST'])
def scan():
    data = request.json
    barcode = data.get('barcode')
    print(f"Scanned Barcode: {barcode}")
    return jsonify({'status': 'success', 'message': 'Barcode received', 'data': barcode})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
