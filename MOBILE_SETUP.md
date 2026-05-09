# 📱 Mobile Setup Guide - Turmeric Vision

Complete guide to access Turmeric Vision from your mobile device (iPhone, Android, etc.)

## Prerequisites

- ✅ Flask backend running on your computer
- ✅ React frontend running on your computer
- ✅ Mobile device connected to same WiFi network
- ✅ Turmeric model file placed in backend folder

## Step 1: Find Your Computer's IP Address

Your computer and phone need to communicate. You need your computer's **IP address**.

### On Windows

**Method 1: Command Prompt**
```cmd
ipconfig
```

Look for your network adapter section. Find the line that says:
```
IPv4 Address . . . . . . . . . . . : 192.168.1.100
```

**Method 2: Settings**
1. Go to Settings
2. Network & Internet
3. WiFi
4. Advanced
5. Look for IPv4 Address

**Example IP:** `192.168.1.100`, `192.168.0.50`, `10.0.0.25`

### On macOS

```bash
ifconfig | grep "inet "
```

Look for an address like `192.168.x.x` (NOT `127.0.0.1`)

### On Linux

```bash
hostname -I
```

Will show something like: `192.168.1.100 172.17.0.1`

---

## Step 2: Update Frontend Configuration

### Edit the .env File

Open this file in a text editor:
```
frontend/.env
```

Change the IP address to match your computer:

**Before:**
```
REACT_APP_API_URL=http://192.168.1.100:5000
```

**After (with YOUR IP):**
```
REACT_APP_API_URL=http://192.168.1.50:5000
```

Replace `192.168.1.50` with YOUR actual IP address.

### Restart Frontend

```bash
# In frontend folder
npm start
```

You should see output like:
```
On Your Network: http://192.168.1.50:3000
```

---

## Step 3: Ensure Backend is Running

Verify backend is accessible:

```bash
# From your computer terminal
curl http://localhost:5000/health

# Should return:
# {"status": "healthy", "model_loaded": true}
```

Or open in browser: `http://localhost:5000/health`

---

## Step 4: Access from Phone

### 1. Connect Phone to WiFi

Make sure your phone is connected to the **same WiFi network** as your computer.

**Check:**
- Computer WiFi: Shows network name (e.g., "HomeNetwork")
- Phone WiFi: Also shows same network name (e.g., "HomeNetwork")

If WiFi names don't match, you're on different networks!

### 2. Open Mobile Browser

On your phone, open any browser:
- Chrome
- Safari
- Firefox
- Edge

### 3. Visit Your App

Type in address bar:
```
http://192.168.1.50:3000
```

(Use YOUR IP address, not this example)

**If it works:**
- ✅ You see the Turmeric Vision app
- ✅ Beautiful gradient background loads
- ✅ Camera button is visible

---

## Step 5: Test the App

### Test Camera Capture

1. Tap **"📸 Capture or Choose Image"** button
2. Choose:
   - **"Take Photo"** - Use device camera
   - **"Choose from Library"** - Select existing image

### Test Image Upload

1. Ensure image is selected (preview shown)
2. Tap **"🤖 Analyze Image"** button
3. Watch loading spinner
4. See prediction result with confidence score

---

## Troubleshooting

### Problem 1: "Can't access http://192.168.1.50:3000"

**Check:**
1. ✅ Correct IP address? (Run `ipconfig` on computer)
2. ✅ Both on same WiFi?
3. ✅ Port 3000 is running? (Should see in terminal)
4. ✅ Firewall not blocking?

**Solution:**
```bash
# On Windows, allow ports through firewall
# Go to Settings > Windows Firewall > Allow an app through firewall
# Check: node.exe and python.exe are allowed
```

### Problem 2: "Connection timeout"

**Solutions:**
1. **Check computer IP again:**
   ```cmd
   ipconfig
   ```
   Make sure you're using the right one (not 127.0.0.1 or 169.x.x.x)

2. **Verify WiFi connection:**
   - Phone: Settings > WiFi > Connected network?
   - Computer: System tray WiFi icon connected?

3. **Restart services:**
   - Kill backend: Ctrl+C
   - Kill frontend: Ctrl+C
   - Restart both

### Problem 3: "Image upload fails" or "Analyzing image... (stuck)"

**Check:**
1. Backend is running? (Should see "Running on http://0.0.0.0:5000")
2. Image file not too large? (Max 16MB)
3. Image format supported? (JPG, PNG, GIF, BMP)
4. Network latency? (Try smaller image)

**Test backend directly:**

From phone browser, visit:
```
http://192.168.1.50:5000/health
```

Should see:
```json
{"status": "healthy", "model_loaded": true}
```

If not, backend isn't responding.

### Problem 4: "Blank white screen"

**Solutions:**
1. **Hard refresh:**
   - Chrome/Edge: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
   - Safari: Cmd+Option+R
   - Firefox: Ctrl+Shift+R

2. **Clear cache:**
   - Settings > Privacy > Clear Browsing Data

3. **Check console errors:**
   - Mobile Chrome: chrome://inspect
   - Mobile Safari: Settings > Developer

4. **Check network:**
   - Open DevTools (F12)
   - Network tab
   - Look for failed requests
   - Check response from backend

### Problem 5: "CORS errors" or "Failed to fetch"

**Cause:** Backend and frontend not communicating

**Check:**
1. Backend `.env` has correct IP?
2. Backend is running with `host='0.0.0.0'`?
3. Both services running in separate terminals?

**Verify in browser console (F12):**
```javascript
// Type in console:
fetch('http://192.168.1.50:5000/health')
  .then(r => r.json())
  .then(console.log)
```

If error, backend isn't accessible.

---

## Network Connectivity Checklist

- [ ] Computer connected to WiFi
- [ ] Phone connected to same WiFi
- [ ] Computer IP noted (e.g., 192.168.1.100)
- [ ] .env file updated with correct IP
- [ ] Backend running (see "Running on http://0.0.0.0:5000")
- [ ] Frontend running (see "On Your Network: http://192.168.x.x:3000")
- [ ] Firewall allows ports 3000 and 5000
- [ ] Phone can ping computer: `ping 192.168.1.100`
- [ ] Browser shows app at http://192.168.1.100:3000

---

## Testing Network Connection

### From Phone, Test Backend

Open phone browser and visit:
```
http://YOUR_IP:5000/health
```

**Expected response:**
```json
{"status": "healthy", "model_loaded": true}
```

If you see error, backend isn't accessible from phone.

### Fix Backend Accessibility

Ensure backend is running with:
```bash
python app.py
# Should show: Running on http://0.0.0.0:5000
```

The `0.0.0.0` means "accept connections from any network interface" - this is correct!

---

## Performance Tips

### For Best Results:

1. **Use 5GHz WiFi** if available
   - Faster than 2.4GHz
   - Less interference

2. **Get closer to router**
   - Stronger WiFi signal
   - Lower latency

3. **Minimize background apps**
   - Frees up bandwidth
   - Faster predictions

4. **Use clear images**
   - Good lighting
   - Turmeric in center
   - No shadows

5. **Single tab**
   - Close other browser tabs
   - Reduces network traffic

---

## Advanced: Using Mobile Hotspot

If you can't use WiFi:

1. **Enable Hotspot on Computer**
   - Settings > Network > Mobile Hotspot
   - Share internet from phone or another device

2. **Connect Phone to WiFi**
   - But wait, this makes a loop...

Better solution: Use same computer for both:
- Browser on same computer to test
- Then move to phone once working

---

## Remote Access (Advanced)

To access from outside your home network:

### Option 1: Port Forwarding
1. Log into router settings
2. Forward port 5000 to computer
3. Find public IP: `whatismyipaddress.com`
4. Access from anywhere: `http://YOUR_PUBLIC_IP:5000`

### Option 2: Cloud Deployment
Deploy to Heroku, AWS, or Google Cloud:
```bash
# Deploy backend
heroku create my-turmeric-api
git push heroku main

# Update frontend .env
REACT_APP_API_URL=https://my-turmeric-api.herokuapp.com
```

### Option 3: VPN
Set up VPN on computer, connect phone to same VPN.

---

## Summary

| Item | Details |
|---|---|
| Backend | `http://YOUR_IP:5000` |
| Frontend | `http://YOUR_IP:3000` |
| Model | `backend/turmeric_model.h5` |
| Network | Same WiFi for both devices |
| Config | `.env` with correct IP |

## Quick Checklist for Mobile Access

```
☐ Computer IP: ___________________
☐ Phone on same WiFi: Yes / No
☐ .env updated: Yes / No
☐ Backend running: Yes / No
☐ Frontend running: Yes / No
☐ App loads on phone: Yes / No
☐ Camera works: Yes / No
☐ Prediction works: Yes / No
```

---

## Need Help?

### Most Common Issues:

**"Can't connect"**
- Run `ipconfig` on computer
- Update `.env` with correct IP
- Restart both services

**"Blank page"**
- Hard refresh: Ctrl+Shift+R
- Clear cache
- Check console (F12)

**"Upload fails"**
- Check image size < 16MB
- Check image format: JPG, PNG, GIF, BMP
- Test backend: http://YOUR_IP:5000/health

**"Image gets stuck"**
- Check WiFi signal
- Check backend is running
- Try smaller image

---

Enjoy using Turmeric Vision on your mobile device! 🌿📱
