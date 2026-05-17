import React, { useRef, useState, useEffect } from 'react';

function CameraCapture({ onCapture, onCancel }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please check permissions or use the file upload option.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], "live-capture.jpg", { type: "image/jpeg" });
        stopCamera();
        onCapture(file);
      }, 'image/jpeg', 0.95);
    }
  };

  const handleCancel = () => {
    stopCamera();
    onCancel();
  };

  if (error) {
    return (
      <div className="camera-error">
        <p>{error}</p>
        <button onClick={handleCancel} className="cancel-btn">Go Back</button>
      </div>
    );
  }

  return (
    <div className="camera-container">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className="camera-video"
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div className="camera-controls">
        <button onClick={handleCapture} className="take-photo-btn">
          📸 Take Photo
        </button>
        <button onClick={handleCancel} className="cancel-camera-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CameraCapture;
