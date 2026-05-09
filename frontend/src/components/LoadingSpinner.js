import React from 'react';

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div>
        <div className="spinner"></div>
        <div className="loading-text">Analyzing image...</div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
