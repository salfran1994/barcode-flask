from flask import Flask, render_template, request, jsonify
import os

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
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)