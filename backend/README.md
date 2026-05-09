# Turmeric Classification Flask Backend

A Flask REST API for classifying turmeric types using a Keras model.

## Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Place your model file:**
   - Copy your `turmeric_model.h5` file to the root directory of this project

3. **Run the Flask server:**
   ```bash
   python app.py
   ```
   
   The server will start at `http://localhost:5000`

## API Endpoints

### 1. POST `/predict`
Classify a turmeric image

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data with `image` file field

**Example using cURL:**
```bash
curl -X POST -F "image=@path/to/image.jpg" http://localhost:5000/predict
```

**Example using Python requests:**
```python
import requests

with open('turmeric_image.jpg', 'rb') as f:
    files = {'image': f}
    response = requests.post('http://localhost:5000/predict', files=files)
    print(response.json())
```

**Response (Success - 200):**
```json
{
  "success": true,
  "prediction": "boiled_bulb",
  "class_index": 0,
  "confidence": 95.45,
  "all_predictions": {
    "boiled_bulb": 95.45,
    "boiled_finger": 2.30,
    "raw_bulb": 1.50,
    "raw_finger": 0.75
  }
}
```

**Response (Error - 400/500):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

### 2. GET `/health`
Health check endpoint

**Request:**
- Method: `GET`

**Response (200):**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

## Turmeric Classes

The model identifies 4 types of turmeric:
- `boiled_bulb` (0)
- `boiled_finger` (1)
- `raw_bulb` (2)
- `raw_finger` (3)

## Image Processing

The backend automatically:
1. Resizes images to 224x224 pixels
2. Normalizes pixel values (divides by 255)
3. Handles various image formats (PNG, JPG, JPEG, GIF, BMP)

## Configuration

Edit these variables in `app.py` if needed:
- `IMAGE_SIZE`: Image size (default: 224x224)
- `MODEL_PATH`: Path to the Keras model (default: 'turmeric_model.h5')
- `UPLOAD_FOLDER`: Temporary upload folder (default: 'uploads')
- `MAX_CONTENT_LENGTH`: Max file size (default: 16MB)

## Mobile Integration

For mobile apps, send a multipart/form-data POST request with the image file to the `/predict` endpoint.

### Example (JavaScript/React Native):
```javascript
const formData = new FormData();
formData.append('image', {
  uri: imageUri,
  type: 'image/jpeg',
  name: 'image.jpg'
});

fetch('http://localhost:5000/predict', {
  method: 'POST',
  body: formData
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

## Error Handling

The API handles various error cases:
- Missing image file: Returns 400 error
- Invalid file type: Returns 400 error
- Model not loaded: Returns 500 error
- Image processing errors: Returns 500 error
- All errors include an error message in the response

## CORS Support

CORS is enabled by default, allowing requests from any origin. Modify `CORS(app)` in `app.py` to restrict origins if needed:

```python
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}})
```

## Notes

- The server temporarily saves uploaded images and deletes them after processing
- Maximum file size is 16MB
- The model is loaded once at startup for better performance
- Predictions include confidence percentages for all classes
