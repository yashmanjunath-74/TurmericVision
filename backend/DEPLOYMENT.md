# Deployment Guide

This guide covers different ways to deploy the Turmeric Classification Flask Backend.

## Method 1: Local Development (Recommended for Testing)

### Step 1: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Place Model File
Copy `turmeric_model.h5` to the project root directory

### Step 3: Run Flask Server
```bash
python app.py
```

The server will run at `http://localhost:5000`

**Advantages:**
- Easy to debug
- Fast startup
- Direct access to logs

**Disadvantages:**
- Not production-ready
- Requires Python and dependencies on your machine

---

## Method 2: Docker (Recommended for Production)

### Prerequisites
- Install Docker and Docker Compose
- Download Docker Desktop from https://www.docker.com/products/docker-desktop

### Step 1: Prepare Files
Place `turmeric_model.h5` in the project root directory

### Step 2: Build and Run with Docker Compose
```bash
docker-compose up --build
```

The server will run at `http://localhost:5000`

**Using Docker Compose Options:**
```bash
# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the service
docker-compose down

# Rebuild after code changes
docker-compose up -d --build
```

**Advantages:**
- Consistent environment across machines
- Production-ready
- Easy scaling
- Isolated from system dependencies

**Disadvantages:**
- Requires Docker installation
- Slightly slower startup

---

## Method 3: Manual Docker Build and Run

### Step 1: Build Docker Image
```bash
docker build -t turmeric-api:latest .
```

### Step 2: Run Container
```bash
docker run -p 5000:5000 \
  -v $(pwd)/turmeric_model.h5:/app/turmeric_model.h5 \
  -v $(pwd)/uploads:/app/uploads \
  turmeric-api:latest
```

On Windows (PowerShell):
```powershell
docker run -p 5000:5000 `
  -v ${PWD}/turmeric_model.h5:/app/turmeric_model.h5 `
  -v ${PWD}/uploads:/app/uploads `
  turmeric-api:latest
```

---

## Method 4: Virtual Environment (Alternative Local Setup)

### Step 1: Create Virtual Environment
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Run Flask Server
```bash
python app.py
```

**Note:** Remember to activate the virtual environment each time before running the app

---

## Method 5: Cloud Deployment (AWS, Google Cloud, Azure)

### AWS Elastic Beanstalk

```bash
# Initialize EB application
eb init -p python-3.9 turmeric-api

# Create and deploy
eb create turmeric-api-env

# Deploy code changes
eb deploy
```

### Google Cloud Run

```bash
# Build and push to Container Registry
gcloud builds submit --tag gcr.io/PROJECT-ID/turmeric-api

# Deploy
gcloud run deploy turmeric-api --image gcr.io/PROJECT-ID/turmeric-api
```

### Azure App Service

```bash
# Create resource group
az group create --name turmeric-rg --location eastus

# Create App Service
az appservice plan create --name turmeric-plan --resource-group turmeric-rg

# Deploy
az webapp create --name turmeric-api --plan turmeric-plan --resource-group turmeric-rg
```

---

## Environment Variables

You can customize the application using environment variables:

```bash
# Model path
export MODEL_PATH=/path/to/turmeric_model.h5

# Upload folder
export UPLOAD_FOLDER=/path/to/uploads

# Flask environment
export FLASK_ENV=production  # or development
```

---

## Testing the Deployment

### Health Check
```bash
curl http://localhost:5000/health
```

### Make a Prediction
```bash
curl -X POST -F "image=@test_image.jpg" http://localhost:5000/predict
```

### Using Python
```python
import requests

files = {'image': open('test_image.jpg', 'rb')}
response = requests.post('http://localhost:5000/predict', files=files)
print(response.json())
```

### Using the Test Script
```bash
python test_backend.py path/to/image.jpg
```

---

## Performance Optimization

### 1. Use Production WSGI Server (Gunicorn)

```bash
# Install gunicorn
pip install gunicorn

# Run with gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

Update requirements.txt:
```
gunicorn==21.2.0
```

### 2. Docker Multi-stage Build (Optional)

For reduced image size:
```dockerfile
FROM python:3.9-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

FROM python:3.9-slim
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["python", "app.py"]
```

### 3. Enable GPU Support (Optional)

Update Dockerfile:
```dockerfile
FROM tensorflow/tensorflow:latest-gpu
# Rest of the Dockerfile remains the same
```

Run Docker with GPU:
```bash
docker run --gpus all -p 5000:5000 turmeric-api:latest
```

---

## Troubleshooting

### Model Not Found
**Error:** `Error loading model: Model not found`
- **Solution:** Ensure `turmeric_model.h5` is in the project root directory

### Port Already in Use
**Error:** `Address already in use`
- **Solution:** Change port in app.py or kill the process using port 5000:
  ```bash
  # On Linux/macOS
  lsof -i :5000
  kill -9 <PID>
  
  # On Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### Permission Denied (Uploads Folder)
**Error:** `Permission denied creating uploads folder`
- **Solution:** Ensure write permissions or create the folder manually:
  ```bash
  mkdir uploads
  chmod 755 uploads
  ```

### Out of Memory
**Error:** `Killed process` or `Segmentation fault`
- **Solution:** Use production server with limited workers:
  ```bash
  gunicorn -w 2 --max-requests 1000 app:app
  ```

---

## Recommended Deployment for Production

1. **Use Docker** for consistency and isolation
2. **Use Gunicorn** for better performance
3. **Use Cloud Platform** (AWS, Google Cloud, or Azure) for scalability
4. **Enable HTTPS** with reverse proxy (Nginx)
5. **Setup monitoring** and logging
6. **Use environment variables** for configuration

Example production setup with Nginx reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        client_max_body_size 16M;
    }
}
```
