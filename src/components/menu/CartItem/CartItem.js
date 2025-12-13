// src/components/menu/CartItem/CartItem.js
import React from 'react';
import './CartItem.css';

function CartItem({ item, onUpdateQuantity, onRemove, isSelected, onToggleSelection }) {
  // Get the actual image URL from any format
  const getImageUrl = () => {
    if (!item.image) return '';
    
    // If it's already a string URL
    if (typeof item.image === 'string') {
      // If it starts with /images/, use it directly
      if (item.image.startsWith('/images/')) {
        return item.image;
      }
      // If it's a filename, add /images/ prefix
      if (item.image.includes('.jpg') || item.image.includes('.png')) {
        return `/images/${item.image}`;
      }
      return item.image;
    }
    
    // If it's an import object (like from MenuData.js)
    if (item.image && typeof item.image === 'object') {
      // React imports have a .default property
      if (item.image.default) return item.image.default;
      
      // Webpack imports sometimes have .src or .toString()
      if (item.image.src) return item.image.src;
      
      // Try to get the first property value
      const firstKey = Object.keys(item.image)[0];
      if (firstKey) return item.image[firstKey];
    }
    
    return '';
  };

  // Calculate item total safely
  const calculateItemTotal = () => {
    const price = parseFloat(item.price) || 0;
    const quantity = item.quantity || 1;
    return price * quantity;
  };

  const imageUrl = getImageUrl();
  const itemTotal = calculateItemTotal();

  return (
    <div className={`cart-item-summary ${isSelected ? 'selected' : ''}`}>
      <div className="cart-item-checkbox">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelection(item.id)}
          className="item-checkbox"
        />
      </div>
      
      <div className="cart-item-image">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={item.name} 
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div class="image-placeholder">🍗</div>';
            }}
          />
        ) : (
          <div className="image-placeholder">🍗</div>
        )}
      </div>
      
      <div className="cart-item-content">
        <div className="cart-item-header">
          <span className="item-name">{item.name}</span>
          <span className="item-price">₱{itemTotal.toFixed(2)}</span>
        </div>
        
        <p className="item-description">{item.description}</p>
        
        <div className="item-actions">
          <div className="quantity-controls">
            <button
              type="button"
              className="qty-btn"
              onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
              disabled={(item.quantity || 1) <= 1}
            >
              −
            </button>
            <span className="qty-display">{item.quantity || 1}</span>
            <button
              type="button"
              className="qty-btn"
              onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
            >
              +
            </button>
          </div>
          
          <button
            type="button"
            className="remove-btn"
            onClick={() => onRemove(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;