# Turmeric Vision - React Frontend

A modern, mobile-friendly React.js application for classifying turmeric types using AI. Captures images from your device camera and sends them to the Flask backend for real-time classification.

## Features

✨ **Modern UI** - Clean, gradient-based design with smooth animations
📱 **Mobile Optimized** - Fully responsive design for phones and tablets
📸 **Camera Capture** - Use device camera or select from gallery
🎯 **Real-time Prediction** - AI-powered turmeric classification
📊 **Confidence Scores** - See prediction probabilities for all classes
⚡ **Fast Processing** - Optimized for quick predictions
🔄 **Error Handling** - User-friendly error messages and validation
🎨 **Beautiful Results** - Animated result cards with confidence visualization

## Setup

### Prerequisites
- Node.js (v14 or higher) - [Download](https://nodejs.org/)
- npm or yarn
- Running Flask backend

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Backend URL:**
   Edit `.env` file and update the backend address:
   ```
   REACT_APP_API_URL=http://192.168.1.100:5000
   ```
   Replace `192.168.1.100` with your computer's IP address on the network.

3. **Start development server:**
   ```bash
   npm start
   ```
   
   The app will open at `http://localhost:3000`

## Usage

### Local Development
```bash
npm start
```
Opens at `http://localhost:3000`

### Production Build
```bash
npm run build
```
Creates optimized production build in `/build` folder

### Testing
```bash
npm test
```
Runs test suite

## Accessing from Your Phone

### Step 1: Find Your Computer's IP Address

**Windows:**
```cmd
ipconfig
```
Look for "IPv4 Address" (usually starts with 192.168.x.x)

**macOS/Linux:**
```bash
ifconfig
```
Look for "inet" address on your network interface

### Step 2: Update .env File
```
REACT_APP_API_URL=http://YOUR_IP_ADDRESS:5000
```

### Step 3: Restart React Development Server
```bash
npm start
```

### Step 4: Access from Phone
Open browser on your phone and visit:
```
http://YOUR_IP_ADDRESS:3000
```

**Example:** If your computer IP is `192.168.1.100`:
- React frontend: `http://192.168.1.100:3000`
- Flask backend: `http://192.168.1.100:5000`

## API Integration

### Backend Communication

The app uses **axios** to send images to the Flask backend:

```javascript
POST /predict
Content-Type: multipart/form-data

Request Body:
- image: [image file]

Response:
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

## Project Structure

```
frontend/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── components/
│   │   ├── LoadingSpinner.js      # Loading animation
│   │   ├── ResultCard.js          # Result display
│   │   └── ImagePreview.js        # Image preview
│   ├── App.js              # Main application
│   ├── App.css             # Main styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables
├── package.json            # Dependencies
└── README.md              # This file
```

## Environment Variables

Create a `.env` file in the frontend root:

```env
# Backend API endpoint
REACT_APP_API_URL=http://192.168.1.100:5000

# Other optional settings
REACT_APP_MAX_FILE_SIZE=16777216  # 16MB in bytes
```

## Customization

### Change Backend URL
Edit `.env`:
```
REACT_APP_API_URL=http://your-backend-url:5000
```

### Modify Colors
Edit `src/App.css` and change the gradient colors:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adjust Image Size Limit
In `src/App.js`, modify the `maxSize` constant:
```javascript
const maxSize = 16 * 1024 * 1024;  // 16MB
```

### Add Custom Classes
Edit turmeric type emojis in `src/components/ResultCard.js`

## Troubleshooting

### "Cannot connect to backend"
1. Verify Flask backend is running
2. Check backend IP address in `.env` is correct
3. Ensure both devices are on the same network
4. Check firewall settings

### Image not uploading
1. Ensure image format is supported (JPG, PNG, GIF, BMP)
2. Check image file size (max 16MB)
3. Check browser console for errors

### Slow predictions
1. Verify network connection speed
2. Check backend server performance
3. Monitor network latency

### CORS errors
1. Verify Flask backend has CORS enabled
2. Check backend is running on correct IP
3. Restart both frontend and backend

### White blank screen
1. Clear browser cache
2. Hard refresh (Ctrl+F5 or Cmd+Shift+R)
3. Check browser console for errors
4. Verify Node.js is installed correctly

## Browser Support

- Chrome (recommended) - Latest 2 versions
- Firefox - Latest 2 versions
- Safari - Latest 2 versions
- Edge - Latest 2 versions

## Performance Tips

1. **Use WiFi** - Faster image uploads than mobile data
2. **Good lighting** - Clearer images = better predictions
3. **Stable network** - Minimize interference
4. **Close background apps** - Improves device performance

## Security Considerations

- Images are processed only by your backend
- No data is stored on frontend
- HTTPS recommended for production deployment
- Keep backend behind firewall when not needed

## Dependencies

- **react** (v18.2.0) - UI library
- **react-dom** (v18.2.0) - React DOM rendering
- **axios** (v1.4.0) - HTTP client
- **react-scripts** (v5.0.1) - Build scripts

## Production Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Then drag and drop the /build folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

## Troubleshooting Network Issues

### Can't access from phone on same WiFi?

1. **Check firewall:**
   ```bash
   # Windows - Allow port through firewall
   # macOS - System Preferences > Security & Privacy > Firewall Options
   ```

2. **Verify network connectivity:**
   ```bash
   # Ping from phone to computer IP
   ping 192.168.1.100
   ```

3. **Check if ports are available:**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   netstat -ano | findstr :5000
   
   # macOS/Linux
   lsof -i :3000
   lsof -i :5000
   ```

4. **Restart services:**
   ```bash
   # Kill existing processes and restart
   npm start  # Frontend
   python app.py  # Backend
   ```

## Development

### Hot Reload
Changes automatically reload the browser during development:
```bash
npm start
```

### Debug Mode
Open browser DevTools (F12) to access:
- Console logs
- Network requests
- React DevTools

## Support

For issues or questions:
1. Check browser console (F12)
2. Verify backend is running
3. Check network connectivity
4. Review error messages in app

## License

MIT License - Feel free to use this project for personal or commercial use.

## Notes

- Ensure Flask backend is running before using the app
- Backend must be accessible from your phone on the same network
- For production, consider using HTTPS and proper authentication
- Test camera capture on actual device before deploying to production
