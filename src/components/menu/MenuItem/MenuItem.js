// src/components/menu/MenuItem/MenuItem.js
import React from 'react';
import './MenuItem.css';

function MenuItem({ item, onAddToCart, isAuthenticated }) {
  // Function to get the correct image source
  const getImageSource = () => {
    // First check if image_url exists (from backend)
    if (item.image_url) {
      // If it's already a full URL like http://...
      if (item.image_url.startsWith('http')) {
        return item.image_url;
      }
      // If it starts with /images/, use it directly
      if (item.image_url.startsWith('/images/')) {
        return item.image_url;
      }
      // If it's just a filename, add /images/ prefix
      return `/images/${item.image_url}`;
    }
    
    // Fallback to image property (old format)
    if (item.image) {
      if (typeof item.image === 'string') {
        return item.image;
      }
      // If it's an import object
      if (typeof item.image === 'object') {
        return item.image.default || item.image.src || '';
      }
    }
    
    return '';
  };

  const imageSrc = getImageSource();

  return (
    <div className={`menu-item ${item.category}`}>
      {imageSrc ? (
        <img 
          src={imageSrc} 
          alt={item.name} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
            // Show placeholder on error
            e.target.parentElement.innerHTML = `
              <div style="
                width: 100%;
                height: 250px;
                background: #f5f5f5;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 48px;
                color: #ccc;
              ">
                🍗
              </div>
            `;
          }}
        />
      ) : (
        <div className="image-placeholder">
          🍗
          <span>No Image</span>
        </div>
      )}
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <div className="price-actions">
        <span>{item.price}</span>
      </div>
      <div className="purchasing">
        <button 
          className="add-cart" 
          onClick={() => onAddToCart(item)}
          disabled={!isAuthenticated}
        >
          {isAuthenticated ? 'Add to Cart' : 'Login to Order'}
        </button>
      </div>
    </div>
  );
}

export default MenuItem;