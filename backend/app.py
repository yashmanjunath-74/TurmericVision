import os
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp'}
MODEL_PATH = 'turmeric_model.h5'
IMAGE_SIZE = 224

# Create uploads folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Class labels
CLASS_LABELS = {
    0: 'boiled_bulb',
    1: 'boiled_finger',
    2: 'raw_bulb',
    3: 'raw_finger'
}

# Load model globally
try:
    model = load_model(MODEL_PATH)
    print(f"Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None


def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def process_image(img_path):
    """
    Load and preprocess image:
    - Resize to 224x224
    - Normalize by dividing by 255
    """
    try:
        # Load image
        img = image.load_img(img_path, target_size=(IMAGE_SIZE, IMAGE_SIZE))
        
        # Convert to numpy array
        img_array = image.img_to_array(img)
        
        # Normalize (divide by 255)
        img_array = img_array / 255.0
        
        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)
        
        return img_array
    except Exception as e:
        raise Exception(f"Error processing image: {str(e)}")


@app.route('/predict', methods=['POST'])
def predict():
    """
    POST endpoint for turmeric classification
    Expects: multipart/form-data with 'image' field
    Returns: JSON with prediction and confidence
    """
    
    # Check if model is loaded
    if model is None:
        return jsonify({
            'success': False,
            'error': 'Model not loaded'
        }), 500
    
    # Check if image file is in request
    if 'image' not in request.files:
        return jsonify({
            'success': False,
            'error': 'No image file provided'
        }), 400
    
    file = request.files['image']
    
    # Check if file is empty
    if file.filename == '':
        return jsonify({
            'success': False,
            'error': 'No file selected'
        }), 400
    
    # Check if file extension is allowed
    if not allowed_file(file.filename):
        return jsonify({
            'success': False,
            'error': f'Invalid file type. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}'
        }), 400
    
    try:
        # Save file temporarily
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Process image
        processed_image = process_image(filepath)
        
        # Make prediction
        prediction = model.predict(processed_image)
        
        # Get class index and confidence
        class_index = int(np.argmax(prediction[0]))
        confidence = float(np.max(prediction[0])) * 100
        class_name = CLASS_LABELS[class_index]
        
        # Clean up temp file
        if os.path.exists(filepath):
            os.remove(filepath)
        
        return jsonify({
            'success': True,
            'prediction': class_name,
            'class_index': class_index,
            'confidence': round(confidence, 2),
            'all_predictions': {
                CLASS_LABELS[i]: round(float(prediction[0][i]) * 100, 2)
                for i in range(len(CLASS_LABELS))
            }
        }), 200
    
    except Exception as e:
        # Clean up temp file if it exists
        if 'filepath' in locals() and os.path.exists(filepath):
            os.remove(filepath)
        
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    }), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
