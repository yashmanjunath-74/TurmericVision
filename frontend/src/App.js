import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import ResultCard from './components/ResultCard';
import ImagePreview from './components/ImagePreview';
import TurmericRain from './components/TurmericRain';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // API endpoint - Change this to your backend IP address
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleImageCapture = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPG, PNG, GIF, or BMP)');
      return;
    }

    // Validate file size (max 16MB)
    const maxSize = 16 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 16MB');
      return;
    }

    setSelectedImage(file);
    setError(null);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await axios.post(`${API_URL}/predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setResult(response.data);
      } else {
        setError(response.data.error || 'Prediction failed');
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message === 'Network Error') {
        setError(
          `Cannot connect to backend. Make sure:\n1. Flask backend is running\n2. Backend IP/URL is correct: ${API_URL}\n3. Backend is accessible from your network`
        );
      } else {
        setError(err.message || 'An error occurred. Please try again.');
      }
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="app-container">
      <TurmericRain />
      <div className="header">
        <h1>🌿 Turmeric Vision</h1>
        <p className="subtitle">AI-Powered Turmeric Classification</p>
      </div>

      <div className="main-content">
        {/* Camera/File Input Section */}
        <div className="input-section">
          <div className="capture-box">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageCapture}
              id="camera-input"
              className="hidden-input"
            />
            <label htmlFor="camera-input" className="capture-button">
              📸 Capture or Choose Image
            </label>
          </div>
        </div>

        {/* Image Preview */}
        {previewUrl && (
          <ImagePreview 
            imageUrl={previewUrl} 
            fileName={selectedImage?.name}
          />
        )}

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && <LoadingSpinner />}

        {/* Predict Button */}
        {previewUrl && !loading && (
          <div className="button-group">
            <button
              onClick={handlePredict}
              className="predict-button"
              disabled={loading}
            >
              🤖 Analyze Image
            </button>
            <button
              onClick={handleClear}
              className="clear-button"
            >
              ↻ Clear
            </button>
          </div>
        )}

        {/* Result Card */}
        {result && !loading && (
          <ResultCard result={result} />
        )}

        {/* Backend Info */}
        {!result && !loading && previewUrl === null && (
          <div className="info-section">
            <h3>ℹ️ How to Use</h3>
            <ol>
              <li>Tap the camera button to capture or choose an image</li>
              <li>Preview your image</li>
              <li>Click "Analyze Image" to get the prediction</li>
              <li>See the turmeric type and confidence score</li>
            </ol>
            <p className="backend-url">
              Backend: <code>{API_URL}</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
