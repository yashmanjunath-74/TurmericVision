#!/bin/bash
# Quick Start Script for Turmeric Vision (macOS/Linux)
# This script starts both backend and frontend

echo "🌿 Turmeric Vision - Quick Start"
echo "=================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get computer IP
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    COMPUTER_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
else
    # Linux
    COMPUTER_IP=$(hostname -I | awk '{print $1}')
fi

echo -e "${GREEN}Your Computer IP: ${COMPUTER_IP}${NC}"
echo ""

# Start Backend
echo -e "${BLUE}Starting Backend...${NC}"
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Check if model exists
if [ ! -f "turmeric_model.h5" ]; then
    echo "⚠️  Warning: turmeric_model.h5 not found in backend folder"
    echo "Please copy your model file to: $(pwd)/turmeric_model.h5"
    read -p "Press Enter when done..."
fi

# Start backend in background
python app.py &
BACKEND_PID=$!
echo -e "${GREEN}Backend started (PID: $BACKEND_PID)${NC}"
echo "Backend running at: http://0.0.0.0:5115"
echo ""

# Start Frontend
echo -e "${BLUE}Starting Frontend...${NC}"
cd ../frontend

# Update .env file with correct IP
echo "REACT_APP_API_URL=http://${COMPUTER_IP}:5115" > .env

npm install
npm start

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
