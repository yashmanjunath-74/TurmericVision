# 🔧 Connection Troubleshooting Guide

## Error: Cannot connect to backend

This error means the frontend can't reach the Flask backend. Let's fix it step by step.

## ✅ Checklist

### Step 1: Verify Backend is Running

Open **PowerShell** and check if port 5000 is in use:

```powershell
netstat -ano | findstr :5000
```

**If you see output:** Backend is running ✅
**If no output:** Backend is NOT running ❌

**Solution if not running:**
```bash
cd backend
python app.py
```

Wait for:
```
 * Running on http://0.0.0.0:5000
```

---

### Step 2: Find Your Computer's Correct IP

Your IP might NOT be `192.168.1.100`. Let's find the actual one:

```powershell
ipconfig
```

Look for your **WiFi adapter** section and find:
```
IPv4 Address . . . . . . . . . . . : 192.168.x.x
```

**Common IPs:**
- `192.168.1.x` (most common)
- `192.168.0.x` (some routers)
- `10.0.0.x` (office/enterprise)

**Write down your ACTUAL IP** - we'll need it next.

---

### Step 3: Update Frontend Configuration

Edit this file with your ACTUAL IP:

```
frontend/.env
```

**Before:**
```
REACT_APP_API_URL=http://192.168.1.100:5000
```

**After (use YOUR IP):**
```
REACT_APP_API_URL=http://192.168.1.50:5000
```

⚠️ **Important:** Replace `192.168.1.50` with YOUR actual IP from Step 2

---

### Step 4: Restart Frontend

```bash
# In the frontend folder, stop and restart
npm start
```

You should see:
```
On Your Network: http://YOUR_IP:3000
```

---

### Step 5: Test Backend Accessibility

#### From Computer Browser
Open: `http://localhost:5115/health`

Should show:
```json
{"status": "healthy", "model_loaded": true}
```

#### From Phone on Same WiFi
Open: `http://YOUR_IP:5000/health`

Should show same response.

**If error on phone:** Firewall is blocking (see Step 6)

---

### Step 6: Fix Firewall (If Needed)

If Step 5 fails on phone, Windows Firewall is blocking the connection.

#### Allow Python Through Firewall:

1. Go to **Settings**
2. Search for "firewall"
3. Click **"Allow an app through firewall"**
4. Click **"Change settings"**
5. Click **"Allow another app"**
6. Browse and select: `python.exe`
   - Location: `C:\Users\YOUR_USERNAME\AppData\Local\Programs\Python\Python39\python.exe`
   - (Or wherever you installed Python)
7. Check both "Private" and "Public"
8. Click **OK**

#### Alternative - Command Line (Run as Administrator):
```powershell
# Allow Python
netsh advfirewall firewall add rule name="Allow Python" dir=in action=allow program="C:\Python39\python.exe" enable=yes

# Allow Node
netsh advfirewall firewall add rule name="Allow Node" dir=in action=allow program="C:\Program Files\nodejs\node.exe" enable=yes
```

---

### Step 7: Verify Network Connection

Make sure both devices are on the **same WiFi**:

**Computer:** WiFi icon → Connected to "NetworkName"
**Phone:** Settings → WiFi → Connected to "NetworkName"

**If different networks:** Connect phone to same WiFi as computer

---

## 🧪 Test Each Component

### Test 1: Backend Health
```bash
# From PowerShell
curl http://localhost:5115/health
```

Expected:
```
{"status": "healthy", "model_loaded": true}
```

### Test 2: Frontend Loading
Open in browser: `http://localhost:3000`

Should show: Purple gradient UI with camera button

### Test 3: Backend from Phone
On phone browser: `http://YOUR_IP:5000/health`

Should show same JSON response

### Test 4: Complete Flow
1. Open phone browser: `http://YOUR_IP:3000`
2. Take/upload image
3. Click "Analyze Image"
4. See prediction result

---

## ❌ Still Not Working?

### Problem: "Connection refused"
- Backend not running
- **Solution:** Start backend: `python app.py`

### Problem: "ERR_NAME_NOT_RESOLVED"
- Wrong IP address
- **Solution:** Use correct IP from `ipconfig`

### Problem: "Connection timeout"
- Firewall blocking
- Different WiFi networks
- **Solution:** Check Steps 6 & 7

### Problem: "Address already in use"
- Port 5000 already taken
- **Solution:** Kill process:
  ```powershell
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### Problem: "Model not loaded"
- Model file missing
- **Solution:** Copy `turmeric_model.h5` to backend folder

---

## 🔍 Advanced Debugging

### View Backend Logs
Look at PowerShell where backend is running:
- Should show incoming requests
- Should show predictions
- Check for errors

### View Frontend Network Requests
1. Open phone browser DevTools (if supported)
2. Or on computer: Open DevTools (F12)
3. Network tab
4. Look for request to `/predict`
5. Check response status and body

### Test with Curl
```bash
# Test from phone (SSH into computer or use separate device)
curl http://YOUR_IP:5000/health

# If this fails, backend not accessible on network
# If this works, network is OK
```

---

## ✅ Complete Configuration Checklist

```
☑ Backend running on :5000
☑ Backend shows "Running on http://0.0.0.0:5000"
☑ Model file in backend folder
☑ frontend/.env has correct IP
☑ Phone on same WiFi as computer
☑ Firewall allows Python (port 5000)
☑ Firewall allows Node (port 3000)
☑ Can reach http://YOUR_IP:5000/health from phone
☑ Can reach http://YOUR_IP:3000 from phone
☑ Frontend loads with purple UI
☑ Image upload works
☑ Prediction returns successfully
```

---

## 🚀 Quick Restart (After Fixing)

```bash
# Terminal 1 - Backend
cd backend
python app.py

# Terminal 2 - Frontend (wait for backend to start)
cd frontend
npm start

# Phone Browser
http://YOUR_IP:3000
```

---

## 📝 Common IP Scenarios

| Scenario | IP Pattern | Example |
|---|---|---|
| Home WiFi | 192.168.x.x | 192.168.1.100 |
| Alternate Router | 192.168.0.x | 192.168.0.50 |
| Enterprise | 10.x.x.x | 10.0.0.25 |
| Mobile Hotspot | 192.168.x.x | 192.168.43.1 |

Run `ipconfig` to see YOUR specific IP.

---

## 💡 Pro Tips

1. **Always use computer IP, not localhost** for mobile access
2. **Write down your IP** when first finding it
3. **Check IP each session** - it might change
4. **Keep both services running** in separate terminals
5. **Hard refresh** (Ctrl+Shift+R) on browser after changes

---

## Need More Help?

Check these files for detailed info:
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Full setup
- [MOBILE_SETUP.md](MOBILE_SETUP.md) - Mobile access
- [README.md](README.md) - Project overview

Or run diagnostic script:
```bash
diagnose.bat
```

---

**Last Resort:** Use cloud deployment instead:
- Deploy backend to Heroku, AWS, or Google Cloud
- Access from anywhere without network setup hassle
- See [backend/DEPLOYMENT.md](backend/DEPLOYMENT.md)
