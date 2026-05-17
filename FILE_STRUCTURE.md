# File Structure & Documentation

## Root Level Files

### 📄 README.md
**Main project overview and quick start guide**
- Project features and tech stack
- Quick start instructions
- API endpoints documentation
- Troubleshooting guide

### 📄 SETUP_GUIDE.md
**Complete step-by-step setup for all platforms**
- Windows, macOS, Linux setup
- Backend and frontend installation
- Network configuration for mobile access
- Comprehensive troubleshooting section

### 📄 MOBILE_SETUP.md
**Detailed guide for accessing app from mobile devices**
- Finding computer IP address
- Configuring backend URL
- Connecting from phone over WiFi
- Network troubleshooting
- Performance tips

### 📄 start.bat
**Windows quick start script**
- Automatically sets up both backend and frontend
- Finds computer IP
- Starts services in new windows
- One-click startup

### 📄 start.sh
**macOS/Linux quick start script**
- Similar to start.bat but for Unix systems
- Automatic IP detection
- Service management

---

## Backend Folder (`backend/`)

### 🐍 app.py
**Main Flask application (CRITICAL FILE)**
- Core API implementation
- Endpoints:
  - `POST /predict` - Image classification
  - `GET /health` - Health check
- Image preprocessing (224x224 resize, normalization)
- Model loading and inference
- CORS configuration
- Error handling
- **Must run on `0.0.0.0:5000` for network access**

### 📋 requirements.txt
**Python package dependencies**
```
Flask==2.3.3
Flask-CORS==4.0.0
tensorflow==2.13.0
numpy==1.24.3
Werkzeug==2.3.7
```

### ⚙️ config.py
**Configuration management**
- Different configs (development, production, testing)
- Model path settings
- Image size specifications
- Class labels mapping
- File upload settings

### 🐳 Dockerfile
**Docker container configuration**
- Python 3.9 slim base image
- System dependencies installation
- Application setup
- Port exposure

### 🐳 docker-compose.yml
**Docker Compose orchestration**
- Service definition
- Volume mounting for model and uploads
- Health checks
- Port mapping

### 📚 README.md
**Backend-specific documentation**
- API endpoint details
- Setup instructions
- Configuration options
- Error handling guide

### 📚 DEPLOYMENT.md
**Production deployment guide**
- 5 deployment methods (Local, Docker, Cloud, etc.)
- AWS, Google Cloud, Azure guides
- Performance optimization
- Security recommendations

### 📄 .gitignore
**Git ignore patterns**
- Python cache files
- Virtual environment
- Build artifacts
- OS files

### 📁 uploads/
**Temporary image storage**
- Created automatically
- Images processed and deleted
- Not tracked in git

### 🧠 turmeric_model.h5
**Keras model file (YOU PROVIDE THIS)**
- Trained on turmeric images
- 4 classification classes
- 224x224 input size
- Place in backend root folder

---

## Frontend Folder (`frontend/`)

### 📁 public/
**Static files**

#### index.html
- HTML entry point
- Meta tags for mobile optimization
- Root div for React mounting
- Global styles

### 📁 src/
**Source code**

#### App.js
**Main React component (CRITICAL FILE)**
```javascript
- Image capture handler
- API call with axios
- State management (image, result, loading, error)
- Conditional rendering
- Error handling
- Backend URL configuration
```

#### App.css
**Application styling**
- Gradient backgrounds
- Button styles
- Input field styling
- Result card design
- Responsive design
- Animations
- Mobile optimizations

#### index.js
**React entry point**
```javascript
- ReactDOM rendering
- App component mounting
- Strict mode wrapping
```

#### index.css
**Global styles**
- Body styles
- Font configuration
- Root element sizing

### 📁 src/components/
**Reusable React components**

#### LoadingSpinner.js
**Loading animation component**
```javascript
- Spinning animation
- Loading text
- Centered layout
```

#### ResultCard.js
**Result display component**
```javascript
- Emoji mapping for classes
- Confidence visualization
- All predictions display
- Formatted output
```

#### ImagePreview.js
**Image preview component**
```javascript
- Image display
- File name showing
- Container styling
```

### 📦 package.json
**Node.js package configuration**
```json
- Dependencies: react, react-dom, axios
- Scripts: start, build, test
- ESLint configuration
- Browser compatibility settings
```

### 📄 .env
**Environment configuration (MUST EDIT)**
```
REACT_APP_API_URL=http://192.168.1.100:5000
```
- Change IP to your computer's IP
- Port should match backend (5000)

### 📄 .gitignore
**Git ignore patterns**
- node_modules
- .env files
- Build output
- IDE files

### 📚 README.md
**Frontend-specific documentation**
- Setup instructions
- Usage guide
- API integration details
- Customization guide
- Troubleshooting

---

## File Dependency Graph

```
app.py (Backend)
  ├── Loads: turmeric_model.h5
  ├── Uses: tensorflow.keras, numpy, flask, flask_cors
  └── Serves: /predict, /health endpoints

App.js (Frontend)
  ├── Imports: axios, components
  ├── Requires: .env for API_URL
  ├── Calls: /predict endpoint via axios
  └── Uses: LoadingSpinner, ResultCard, ImagePreview

index.html (Entry Point)
  └── Renders: React App component
```

## Key Configuration Points

### 1. Backend Model Loading
```python
# In app.py (line ~70)
model = load_model(MODEL_PATH)  # MODEL_PATH defined in config.py
```

### 2. Image Processing
```python
# In app.py process_image() function
img_array = img_array / 255.0  # Normalization
img_array = np.expand_dims(img_array, axis=0)  # Batch dimension
```

### 3. API URL Configuration
```javascript
// In App.js
const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.100:5000';
```

### 4. Class Mapping
```python
# In app.py
CLASS_LABELS = {
    0: 'boiled_bulb',
    1: 'boiled_finger',
    2: 'raw_bulb',
    3: 'raw_finger'
}
```

---

## Starting Points for Modifications

### To Change UI Colors
Edit: `frontend/src/App.css`
```css
.header {
    background: linear-gradient(...);  /* Modify gradient */
}
```

### To Change API Endpoint
Edit: `frontend/.env`
```
REACT_APP_API_URL=YOUR_NEW_URL
```

### To Change Model Path
Edit: `backend/config.py`
```python
MODEL_PATH = os.getenv('MODEL_PATH', 'new_path.h5')
```

### To Add New API Endpoint
Edit: `backend/app.py`
```python
@app.route('/new-endpoint', methods=['POST'])
def new_endpoint():
    # Your code here
    pass
```

### To Add New React Component
Create: `frontend/src/components/YourComponent.js`
Then import in `App.js`

---

## Testing Files

### Backend Testing
```bash
# Health check
curl http://localhost:5115/health

# Image prediction (requires actual image)
curl -X POST -F "image=@test.jpg" http://localhost:5115/predict
```

### Frontend Testing
```bash
cd frontend
npm test
```

### End-to-End Testing
1. Start backend
2. Start frontend
3. Open app in browser
4. Test image upload and prediction

---

## Production Checklist

- [ ] Model file in backend folder
- [ ] Dependencies installed (pip, npm)
- [ ] Backend runs on 0.0.0.0:5000
- [ ] Frontend .env configured with backend IP
- [ ] CORS enabled (if external access needed)
- [ ] SSL certificate (if using HTTPS)
- [ ] Firewall rules allow ports 3000, 5000
- [ ] Both services running successfully
- [ ] Mobile can access backend
- [ ] Images upload and classify successfully

---

## Common Tasks

### Update Dependencies
```bash
# Backend
pip install --upgrade -r requirements.txt

# Frontend
npm update
```

### Change Classification Model
1. Replace `turmeric_model.h5`
2. Update `CLASS_LABELS` in `app.py` if classes changed
3. Restart backend

### Deploy to Production
1. Build frontend: `npm run build`
2. Deploy frontend to hosting service
3. Deploy backend to cloud service
4. Update `.env` with production URLs

### Debug Issues
1. Check `app.py` terminal output
2. Check browser console (F12)
3. Check network requests (DevTools Network tab)
4. Check backend health: `http://localhost:5115/health`

---

## Summary

| File Type | Location | Purpose |
|---|---|---|
| Main Backend | backend/app.py | Flask API |
| Main Frontend | frontend/App.js | React UI |
| Configuration | .env files | Settings |
| Model | backend/turmeric_model.h5 | AI Model |
| Styles | frontend/App.css | UI Design |
| Components | frontend/src/components/ | React Reusables |
| Docs | *.md files | Documentation |

---

**Total Files Created:** 20+  
**Lines of Code:** 2,000+  
**Documentation:** Comprehensive  
**Ready for:** Development & Production

Good luck with your Turmeric Vision project! 🌿
