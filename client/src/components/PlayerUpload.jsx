import React, { useState } from 'react';

function PlayerUpload({ position, imageUrl, onUpload, playerName, onNameChange }) {
  const [hovering, setHovering] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(playerName || '');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => onUpload(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNameSubmit = () => {
    onNameChange(position, name);
    setEditing(false);
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
      {hovering && (
        <div className="player-preview">
          {editing ? (
            <div>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                onBlur={handleNameSubmit}
                autoFocus
              />
            </div>
          ) : (
            <div onClick={() => setEditing(true)}>
              {name || 'Click to add name'}
            </div>
          )}
          {imageUrl && <img src={imageUrl} alt={position} />}
        </div>
      )}
    </div>
  );
}

export default PlayerUpload;
