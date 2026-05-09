# Turmeric Vision - Complete Setup & Deployment Guide

This guide covers setting up and running the complete Turmeric Vision application (Frontend + Backend) and accessing it from your mobile device.

## System Requirements

- **Computer:** Windows, macOS, or Linux
- **Python:** 3.8 or higher
- **Node.js:** 14 or higher
- **Network:** Both devices (computer + phone) on same WiFi network

## Step 1: Setup Backend

### 1.1 Navigate to Backend Folder
```bash
cd "c:\Users\yashy\Yash React Project\TurmericVision\backend"
```

### 1.2 Create Virtual Environment (Recommended)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 1.3 Install Dependencies
```bash
pip install -r requirements.txt
```

### 1.4 Place Model File
Copy your `turmeric_model.h5` to the backend folder:
```
c:\Users\yashy\Yash React Project\TurmericVision\backend\turmeric_model.h5
```

### 1.5 Run Backend Server
```bash
python app.py
```

Expected output:
```
WARNING:tensorflow:...
 * Running on http://0.0.0.0:5000
 * Press CTRL+C to quit
```

## Step 2: Setup Frontend

### 2.1 Open New Terminal
Open a new terminal window (keep backend running)

### 2.2 Navigate to Frontend Folder
```bash
cd "c:\Users\yashy\Yash React Project\TurmericVision\frontend"
```

### 2.3 Install Dependencies
```bash
npm install
```

### 2.4 Configure Backend URL
Open `.env` file and update with your computer's IP:
```
REACT_APP_API_URL=http://YOUR_COMPUTER_IP:5000
```

### 2.5 Run Frontend Server
```bash
npm start
```

Expected output:
```
Compiled successfully!

You can now view turmeric-vision-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.100:3000
```

## Step 3: Find Your Computer's IP Address

### Windows
```bash
ipconfig
```
Look for "IPv4 Address" under your network adapter (e.g., `192.168.1.100`)

### macOS
```bash
ifconfig | grep "inet "
```
Look for address like `192.168.x.x` (not 127.0.0.1)

### Linux
```bash
hostname -I
```

**Save this IP address - you'll need it for your phone!**

## Step 4: Update Frontend Configuration

### 4.1 Edit Frontend .env File
```bash
# In the frontend folder
# Edit: c:\Users\yashy\Yash React Project\TurmericVision\frontend\.env
```

Change:
```
REACT_APP_API_URL=http://192.168.1.100:5000
```

Replace `192.168.1.100` with your actual IP address.

### 4.2 Restart Frontend
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm start
```

## Step 5: Access from Your Phone

### 5.1 Connect to Same Network
Ensure your phone is connected to the same WiFi network as your computer.

### 5.2 Open Browser on Phone
```
http://YOUR_COMPUTER_IP:3000
```

Example: `http://192.168.1.100:3000`

### 5.3 Use the App
1. Tap "📸 Capture or Choose Image"
2. Choose to take a photo or select from gallery
3. Tap "🤖 Analyze Image"
4. See prediction results

## Common IP Address Examples

| Network Type | IP Address |
|---|---|
| Home WiFi | `192.168.1.x` or `192.168.0.x` |
| Office WiFi | `10.0.0.x` |
| Mobile Hotspot | Varies |

## Troubleshooting

### Backend Issues

#### "Port 5000 already in use"
```bash
# Find and kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

#### "Model not found"
```bash
# Ensure turmeric_model.h5 is in the backend folder
dir turmeric_model.h5
```

#### "TensorFlow import error"
```bash
pip install --upgrade tensorflow
```

### Frontend Issues

#### "npm: command not found"
- Install Node.js from https://nodejs.org/
- Restart terminal after installation

#### "npm install stuck"
```bash
npm cache clean --force
npm install
```

#### "EACCES: permission denied"
```bash
sudo npm install -g npm
```

### Network Issues

#### "Can't access from phone"

1. **Verify both on same WiFi:**
   - Check phone WiFi name
   - Check computer WiFi name
   - Should be identical

2. **Check firewall:**
   - Windows: Allow ports 3000 and 5000 through firewall
   - macOS: System Preferences > Security & Privacy
   - Linux: `sudo ufw allow 3000:5000/tcp`

3. **Test network connectivity:**
   ```bash
   # From phone, ping computer IP
   ping 192.168.1.100
   ```

4. **Check if services are running:**
   ```bash
   # Backend should show: Running on http://0.0.0.0:5000
   # Frontend should show: On Your Network: http://192.168.x.x:3000
   ```

#### "Connection timeout from phone"
- Double-check IP address
- Verify port numbers (3000 for frontend, 5000 for backend)
- Restart both frontend and backend
- Check firewall settings

#### "Image upload fails"
- Verify image size < 16MB
- Check supported formats: JPG, PNG, GIF, BMP
- Test with backend health endpoint: `http://YOUR_IP:5000/health`

### API Connection Issues

#### Test Backend Directly
From your phone browser:
```
http://192.168.1.100:5000/health
```

Should return:
```json
{"status": "healthy", "model_loaded": true}
```

#### Test Frontend API
Open browser DevTools (F12) and check:
1. Network tab for API requests
2. Console for error messages
3. Response status codes

## Full Workflow Example

### Terminal 1 - Backend
```bash
cd "c:\Users\yashy\Yash React Project\TurmericVision\backend"
venv\Scripts\activate
python app.py
# Output: Running on http://0.0.0.0:5000
```

### Terminal 2 - Frontend
```bash
cd "c:\Users\yashy\Yash React Project\TurmericVision\frontend"
npm start
# Output: On Your Network: http://192.168.1.100:3000
```

### Phone Browser
```
http://192.168.1.100:3000
```

Then use the app!

## Performance Optimization

### For Faster Predictions
1. Use 5GHz WiFi if available (faster than 2.4GHz)
2. Get closer to WiFi router
3. Minimize other network traffic
4. Close unnecessary apps on phone

### For Better Accuracy
1. Use good lighting
2. Keep turmeric in center of frame
3. Avoid shadows and reflections
4. Use high-resolution images when possible

## Production Deployment

For hosting your app online:

### Option 1: AWS (Recommended)
```bash
# Backend: AWS EC2 or Elastic Beanstalk
# Frontend: AWS S3 + CloudFront
```

### Option 2: Google Cloud
```bash
# Backend: Cloud Run
# Frontend: Firebase Hosting
```

### Option 3: Azure
```bash
# Backend: App Service
# Frontend: Static Web Apps
```

### Option 4: Heroku (Easy for Beginners)
```bash
# Deploy backend to Heroku
heroku create turmeric-api
git push heroku main
```

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Changes auto-refresh browser
- Backend: Use `flask-cors` for testing

### Debug Mode
Frontend:
```bash
npm start  # Runs in development mode with debugging
```

Backend:
```python
# app.py line 74
app.run(debug=True, host='0.0.0.0', port=5000)
```

### Logging
Check terminal output for:
- **Backend:** Prediction results, errors
- **Frontend:** Console (F12) for API calls and errors

## Testing

### Test Backend
```bash
# From terminal
curl -X GET http://localhost:5000/health

# Should return: {"status": "healthy", "model_loaded": true}
```

### Test Frontend
```bash
cd frontend
npm test
```

### End-to-End Testing
1. Start both servers
2. Open app in phone browser
3. Take/upload image
4. Verify prediction appears
5. Check confidence scores

## API Documentation

See the following files for complete API documentation:
- Backend: `backend/README.md`
- Frontend: `frontend/README.md`
- Deployment: `backend/DEPLOYMENT.md`

## Security Recommendations

### For Home Network
1. Use strong WiFi password
2. Enable WPA2/WPA3 encryption
3. Keep firewall enabled

### For Production
1. Use HTTPS instead of HTTP
2. Add authentication to API
3. Use environment variables for sensitive data
4. Regularly update dependencies

## Quick Reference

| Component | Port | Address |
|---|---|---|
| Backend API | 5000 | http://0.0.0.0:5000 |
| Frontend Dev | 3000 | http://localhost:3000 |
| Frontend Mobile | 3000 | http://192.168.x.x:3000 |

## Getting Help

1. **Check console errors (F12)**
2. **Review logs in terminal**
3. **Check firewall settings**
4. **Verify network connectivity**
5. **Test with `curl` or Postman**
6. **Restart services**

## Next Steps

After successful setup:
1. Build a production version: `npm run build`
2. Deploy to cloud provider
3. Add user authentication
4. Add image history/gallery
5. Implement batch processing
6. Add notification system

Enjoy using Turmeric Vision! 🌿
