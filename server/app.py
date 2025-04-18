from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

model = load_model('model/marine_animal_classifier.h5')

class_names = sorted([
    "Sea Turtle", "Shark", "Lobster", "Otter", "Eel", "Sea Horse", "Squid", "Whale",
    "Starfish", "Sea Urchin", "Seal", "Octopus", "Shrimp", "Fish", "Clam", "Crab",
    "Dolphin", "Puffer", "Sea Ray", "Jelly Fish"
])

def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    filepath = os.path.join('temp', file.filename)
    os.makedirs('temp', exist_ok=True)
    file.save(filepath)

    try:
        img_array = preprocess_image(filepath)
        preds = model.predict(img_array)[0]
        class_idx = int(np.argmax(preds))
        confidence = float(np.max(preds))

        result = {
            'prediction': class_names[class_idx],
            'confidence': confidence
        }
        return jsonify(result)
    finally:
        os.remove(filepath)

if __name__ == '__main__':
    app.run(debug=True)
