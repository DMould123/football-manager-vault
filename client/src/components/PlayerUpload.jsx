import React, { useState } from 'react';

function PlayerUpload({ position, imageUrl, onUpload }) {
  const [hovering, setHovering] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => onUpload(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="player-upload"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <label htmlFor={`upload-${position}`}>
        {imageUrl ? (
          <img src={imageUrl} alt={position} className="player-image" />
        ) : (
          <div className="upload-placeholder">{position}</div>
        )}
      </label>
      <input
        id={`upload-${position}`}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {hovering && imageUrl && (
        <div className="player-preview">
          <img src={imageUrl} alt={position} />
        </div>
      )}
    </div>
  );
}

export default PlayerUpload;
