import React from 'react';

function ImagePreview({ imageUrl, fileName }) {
  return (
    <div className="image-preview">
      <div className="preview-content">
        <img
          src={imageUrl}
          alt="Preview"
          className="preview-image"
        />
        {fileName && (
          <div className="preview-filename">
            📄 {fileName}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImagePreview;
