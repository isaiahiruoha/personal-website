import { useState } from 'react';

function ImageWithSpinner({ src, alt, className }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return <div className="error">Failed to load image</div>;
  }

  return (
    <div className="image-wrapper">
      {!imageLoaded && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ display: imageLoaded ? 'block' : 'none' }}
        onLoad={() => setImageLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}

export default ImageWithSpinner; 