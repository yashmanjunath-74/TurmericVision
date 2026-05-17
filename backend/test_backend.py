"""
Example script to test the Flask backend
Run this after starting the Flask server with: python app.py
"""

import requests
import json
import sys
from pathlib import Path


def test_health():
    """Test the health check endpoint"""
    print("Testing /health endpoint...")
    try:
        response = requests.get('http://localhost:5115/health')
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}\n")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}\n")
        return False


def test_predict(image_path):
    """Test the predict endpoint with an image"""
    print(f"Testing /predict endpoint with image: {image_path}")
    
    # Check if file exists
    if not Path(image_path).exists():
        print(f"Error: Image file not found at {image_path}\n")
        return False
    
    try:
        with open(image_path, 'rb') as f:
            files = {'image': f}
            response = requests.post('http://localhost:5115/predict', files=files)
        
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}\n")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}\n")
        return False


def test_invalid_file():
    """Test with invalid file type"""
    print("Testing /predict endpoint with invalid file type...")
    try:
        # Create a temporary text file
        with open('test.txt', 'rb') as f:
            files = {'image': f}
            response = requests.post('http://localhost:5115/predict', files=files)
        
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}\n")
        return response.status_code == 400
    except Exception as e:
        print(f"Error: {e}\n")
        return False


def test_no_image():
    """Test with no image file"""
    print("Testing /predict endpoint without image file...")
    try:
        response = requests.post('http://localhost:5115/predict')
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}\n")
        return response.status_code == 400
    except Exception as e:
        print(f"Error: {e}\n")
        return False


if __name__ == '__main__':
    print("=" * 60)
    print("Flask Backend Test Suite")
    print("=" * 60 + "\n")
    
    # Test health endpoint
    test_health()
    
    # Test with no image
    test_no_image()
    
    # Test with invalid file
    test_invalid_file()
    
    # Test with actual image if provided
    if len(sys.argv) > 1:
        image_path = sys.argv[1]
        test_predict(image_path)
    else:
        print("To test prediction, run:")
        print("python test_backend.py path/to/image.jpg")
    
    print("=" * 60)
    print("Tests completed!")
    print("=" * 60)
