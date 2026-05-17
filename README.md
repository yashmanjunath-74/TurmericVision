# 🌿 Turmeric Vision - Project Overview

Complete AI-powered turmeric classification system with modern React frontend and Flask backend.

## Project Structure

```
TurmericVision/
├── backend/                          # Flask API backend
│   ├── app.py                        # Main Flask application
│   ├── config.py                     # Configuration settings
│   ├── requirements.txt              # Python dependencies
│   ├── turmeric_model.h5             # Keras model (you provide this)
│   ├── uploads/                      # Temporary image folder
│   ├── Dockerfile                    # Docker container config
│   ├── docker-compose.yml            # Docker compose config
│   ├── README.md                     # Backend documentation
│   ├── DEPLOYMENT.md                 # Deployment guide
│   └── .gitignore                    # Git ignore rules
│
├── frontend/                         # React frontend
│   ├── public/
│   │   └── index.html                # HTML entry point
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoadingSpinner.js    # Loading animation
│   │   │   ├── ResultCard.js        # Result display
│   │   │   └── ImagePreview.js      # Image preview
│   │   ├── App.js                    # Main React component
│   │   ├── App.css                   # Application styles
│   │   ├── index.js                  # React entry point
│   │   └── index.css                 # Global styles
│   ├── .env                          # Environment configuration
│   ├── package.json                  # Node dependencies
│   ├── README.md                     # Frontend documentation
│   └── .gitignore                    # Git ignore rules
│
├── SETUP_GUIDE.md                    # Complete setup instructions
├── MOBILE_SETUP.md                   # Mobile device access guide
├── start.bat                         # Windows quick start script
├── start.sh                          # Linux/macOS quick start script
└── README.md                         # This file
```

## Features

### 🤖 Backend (Flask + TensorFlow/Keras)
- ✅ POST `/predict` endpoint for image classification
- ✅ Image preprocessing (224x224 resize, 0-1 normalization)
- ✅ TensorFlow/Keras model loading and inference
- ✅ JSON responses with predictions and confidence scores
- ✅ CORS enabled for mobile requests
- ✅ Error handling and validation
- ✅ Health check endpoint
- ✅ Runs on `0.0.0.0:5000` for network accessibility

### 📱 Frontend (React.js)
- ✅ Modern, gradient-based UI design
- ✅ Mobile-responsive layout
- ✅ Camera capture: `<input type="file" capture="environment">`
- ✅ Image preview with file name
- ✅ Axios API integration for image upload
- ✅ Beautiful result cards with:
  - Predicted class with emoji
  - Confidence percentage
  - Animated confidence bar
  - All class predictions
- ✅ Loading spinner animation
- ✅ Error messages and validation
- ✅ Configurable backend URL via `.env`

### 🌐 Network Features
- ✅ Accessible from phone on same WiFi network
- ✅ Backend runs on `0.0.0.0` (all network interfaces)
- ✅ Frontend configurable with computer IP
- ✅ CORS support for cross-origin requests

## Classification Model

**Model:** `turmeric_model.h5`

**Classes (4 types):**
- 0: `boiled_bulb` 🫒
- 1: `boiled_finger` 🫒
- 2: `raw_bulb` 🌿
- 3: `raw_finger` 🌿

**Input:** 224x224 RGB images (normalized 0-1)

**Output:** Predictions with confidence scores for all 4 classes

## Quick Start

### 1️⃣ Backend Setup
```bash
# Windows
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Backend runs at: `http://0.0.0.0:5000`

### 2️⃣ Frontend Setup
```bash
# New terminal
cd frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

### 3️⃣ Mobile Access
```bash
# Find computer IP (Windows)
ipconfig

# Update frontend/.env
REACT_APP_API_URL=http://192.168.1.100:5000

# Restart frontend
npm start

# On phone browser
http://192.168.1.100:3000
```

## API Endpoints

### POST `/predict`
Classify a turmeric image

**Request:**
```
POST /predict
Content-Type: multipart/form-data

Parameter: image (file)
```

**Response:**
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

### GET `/health`
Health check endpoint

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

## Technology Stack

### Backend
- **Framework:** Flask 2.3.3
- **ML Framework:** TensorFlow 2.13.0 / Keras
- **Image Processing:** NumPy, Pillow
- **API:** REST with JSON
- **CORS:** Flask-CORS
- **Python:** 3.8+

### Frontend
- **Framework:** React 18.2.0
- **HTTP Client:** Axios 1.4.0
- **Styling:** CSS3 with animations
- **Build Tool:** Create React App
- **Node:** 14+

### Deployment
- **Container:** Docker
- **Orchestration:** Docker Compose
- **Options:** Local, Docker, Cloud (AWS/GCP/Azure)

## Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- Keras model file: `turmeric_model.h5`

### Step 1: Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### Step 2: Frontend
```bash
cd frontend
npm install
```

## Running the Application

### Option 1: Manual (Two Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate  # Windows
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Option 2: Quick Start Script

**Windows:**
```bash
start.bat
```

**macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

### Option 3: Docker

**Build and run:**
```bash
cd backend
docker-compose up --build
```

Runs at: `http://localhost:5115`

## Configuration

### Backend Config (.env in backend/)
```
MODEL_PATH=turmeric_model.h5
UPLOAD_FOLDER=uploads
FLASK_ENV=production
```

### Frontend Config (.env in frontend/)
```
REACT_APP_API_URL=http://192.168.1.100:5000
```

## Mobile Access

### For Phone on Same WiFi:

1. **Find computer IP:**
   ```bash
   ipconfig  # Windows
   ```

2. **Update frontend/.env:**
   ```
   REACT_APP_API_URL=http://YOUR_IP:5000
   ```

3. **Restart frontend:**
   ```bash
   npm start
   ```

4. **Open on phone:**
   ```
   http://YOUR_IP:3000
   ```

See [MOBILE_SETUP.md](MOBILE_SETUP.md) for detailed instructions.

## Troubleshooting

### Backend Issues
- **Port 5000 in use:** Kill process with `lsof -i :5000`
- **Model not found:** Ensure `turmeric_model.h5` is in backend folder
- **TensorFlow error:** `pip install --upgrade tensorflow`

### Frontend Issues
- **npm not found:** Install Node.js from nodejs.org
- **npm install stuck:** `npm cache clean --force`
- **Can't connect to backend:** Check IP address, firewall settings

### Network Issues
- **Can't access from phone:** Same WiFi? Correct IP? Firewall?
- **Connection timeout:** Check computer IP, verify backend running
- **Image upload fails:** Image size < 16MB? Supported format?

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for comprehensive troubleshooting.

## Development

### Backend Development
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Hot reload enabled in app.py
python app.py
```

### Frontend Development
```bash
cd frontend
npm install
npm start  # Automatically reloads on file changes
```

### Testing
```bash
# Test backend
curl http://localhost:5115/health

# Test frontend
cd frontend
npm test
```

## Production Deployment

### Docker Deployment
```bash
docker build -t turmeric-api .
docker run -p 5000:5000 turmeric-api
```

### Cloud Deployment
- **AWS:** EC2, Elastic Beanstalk, or Lightsail
- **Google Cloud:** Cloud Run, App Engine
- **Azure:** App Service, Container Instances
- **Heroku:** Easy deployment for testing

See [backend/DEPLOYMENT.md](backend/DEPLOYMENT.md) for detailed guides.

## Performance Optimization

- Frontend built for mobile (responsive design)
- Backend caches model on startup
- Images processed efficiently with NumPy
- Async file upload with progress feedback
- Optimized CNN inference

## Security

- CORS enabled for development (restrict in production)
- File type validation (JPG, PNG, GIF, BMP only)
- File size limit (16MB)
- Temporary file cleanup
- Use HTTPS in production

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (Android Chrome, iOS Safari)

## File Size Limits

- Image upload: 16MB max
- Model file: Varies (typically 20-200MB)
- Response: <1MB

## Response Times

- Average prediction: 1-5 seconds (depending on model and hardware)
- Upload: Depends on image size and network speed
- Processing: Real-time on modern hardware

## License

MIT License - Free to use for personal or commercial projects

## Documentation

- [Backend README](backend/README.md) - Backend API documentation
- [Frontend README](frontend/README.md) - Frontend setup and usage
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Complete setup instructions
- [MOBILE_SETUP.md](MOBILE_SETUP.md) - Mobile access guide
- [Backend DEPLOYMENT.md](backend/DEPLOYMENT.md) - Deployment options

## Support & Next Steps

1. **Verify setup works** - Test all endpoints
2. **Deploy to production** - Use Docker or cloud provider
3. **Add features** - User auth, image history, batch processing
4. **Optimize performance** - Model quantization, caching strategies
5. **Scale infrastructure** - Load balancing, CDN for frontend

## Getting Started

1. Copy `turmeric_model.h5` to backend folder
2. Run backend: `python app.py`
3. Run frontend: `npm start` (in new terminal)
4. Open: `http://localhost:3000`
5. Access from phone: `http://YOUR_IP:3000`

Enjoy! 🌿🤖📱

---

**Created:** May 8, 2026  
**Version:** 1.0.0  
**Status:** Production Ready
