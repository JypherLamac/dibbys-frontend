// src/pages/Cart/Cart.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import CartItem from '../../components/menu/CartItem/CartItem';
import { useAuth } from '../../context/AuthContext';
import { ordersAPI, cartAPI } from '../../services/api';

function Cart() {
  const [orderType, setOrderType] = useState('pickup');
  const [selectedItems, setSelectedItems] = useState([]); // Array of selected item IDs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    instructions: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated, cart, updateCartState, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Pre-fill form with user data
      setFormData(prev => ({
        ...prev,
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        phone: user.phone || '',
        email: user.email || ''
      }));
    }
    
    // Auto-select all items when cart loads
    if (cart.items.length > 0) {
      setSelectedItems(cart.items.map(item => item.id));
    }
  }, [isAuthenticated, user, cart.items]);

  // Calculate totals for selected items only
  const calculateSelectedTotals = () => {
    const selectedCartItems = cart.items.filter(item => selectedItems.includes(item.id));
    
    const subtotal = selectedCartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0);
    
    const deliveryFee = orderType === 'delivery' ? 50 : 0;
    const total = subtotal + deliveryFee;
    
    return { subtotal, deliveryFee, total, selectedCartItems };
  };

  const { subtotal, deliveryFee, total, selectedCartItems } = calculateSelectedTotals();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Please login to place an order');
      navigate('/login');
      return;
    }
    
    if (selectedItems.length === 0) {
      alert('Please select at least one item to order');
      return;
    }

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
      alert('Please fill in all required fields (First Name, Last Name, Phone, Email)');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        customer_name: `${formData.firstName} ${formData.lastName}`.trim(),
        customer_email: formData.email,
        customer_phone: formData.phone,
        delivery_address: orderType === 'delivery' ? 'User address from profile' : null,
        order_type: orderType,
        special_instructions: formData.instructions,
        payment_method: 'cash_on_delivery',
        selected_items: selectedItems // Send only selected items
      };

      const response = await ordersAPI.createOrder(orderData);
      
      if (response.success) {
        alert(`✅ Order placed successfully!\nOrder #${response.data.order_number}\nTotal: ₱${response.data.total_amount.toFixed(2)}\nYou will receive a confirmation email shortly.`);
        
        // Remove selected items from cart after successful order
        const remainingItems = cart.items.filter(item => !selectedItems.includes(item.id));
        updateCartState({
          items: remainingItems,
          total: remainingItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0),
          itemCount: remainingItems.length
        });
        
        // Clear selection
        setSelectedItems([]);
        
        // Navigate to home page
        navigate('/');
      }
    } catch (error) {
      alert(`❌ Failed to place order: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (!isAuthenticated) {
      alert('Please login to update cart');
      return;
    }

    try {
      const response = await cartAPI.updateCartItem(itemId, newQuantity);
      updateCartState(response.data);
    } catch (error) {
      alert('Failed to update quantity: ' + error.message);
    }
  };

  const removeItem = async (itemId) => {
    if (!isAuthenticated) {
      alert('Please login to remove items');
      return;
    }

    if (window.confirm('Are you sure you want to remove this item?')) {
      try {
        const response = await cartAPI.removeFromCart(itemId);
        updateCartState(response.data);
        // Remove from selected items if it was selected
        setSelectedItems(prev => prev.filter(id => id !== itemId));
      } catch (error) {
        alert('Failed to remove item: ' + error.message);
      }
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      alert('Please login to clear cart');
      return;
    }

    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        const response = await cartAPI.clearCart();
        updateCartState(response.data);
        setSelectedItems([]);
      } catch (error) {
        alert('Failed to clear cart: ' + error.message);
      }
    }
  };

  const handleLogout = () => {
    logout();
    alert('Logged out successfully.');
  };

  // Toggle item selection
  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Select all items
  const selectAllItems = () => {
    if (cart.items.length === 0) return;
    
    if (selectedItems.length === cart.items.length) {
      // If all are selected, deselect all
      setSelectedItems([]);
    } else {
      // Select all items
      setSelectedItems(cart.items.map(item => item.id));
    }
  };

  return (
    <div className="cart-page">
      <section className="hero">
        <div className="container">
          <h1>Your Shopping Cart</h1>
          <p>Review your items and proceed to checkout</p>
        </div>
      </section>

      <div className="cart-container">
        {cart.items.length === 0 ? (
          <div className="empty-cart-message">
            <p>Your cart is empty</p>
            <Link to="/menu" className="continue-shopping-btn">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Left Column - Order Details */}
            <div className="order-details-section">
              <h2 className="section-title">Order Details</h2>
              
              {!isAuthenticated ? (
                <div className="login-required">
                  <h3>Login Required</h3>
                  <p>You need to log in to complete your order</p>
                  <div className="login-options">
                    <Link to="/login" className="login-link">
                      Login to Your Account
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="login-status">
                  <span className="logged-in-indicator">
                    ✅ Logged in as {user?.name}
                  </span>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              )}
              
              <form onSubmit={handleSubmitOrder} className="checkout-form">
                {/* Order Type */}
                <div className="form-section">
                  <h3>Order Type</h3>
                  <div className="order-type-buttons">
                    <button
                      type="button"
                      className={`order-type-btn ${orderType === 'pickup' ? 'active' : ''}`}
                      onClick={() => setOrderType('pickup')}
                      disabled={!isAuthenticated}
                    >
                      Pickup
                    </button>
                    <button
                      type="button"
                      className={`order-type-btn ${orderType === 'delivery' ? 'active' : ''}`}
                      onClick={() => setOrderType('delivery')}
                      disabled={!isAuthenticated}
                    >
                      Delivery
                    </button>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="form-section">
                  <h3>Customer Information</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your first name"
                        disabled={!isAuthenticated}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your last name"
                        disabled={!isAuthenticated}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your phone number"
                      disabled={!isAuthenticated}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email address"
                      disabled={!isAuthenticated}
                    />
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="form-section">
                  <div className="form-group">
                    <label htmlFor="instructions">Special Instructions</label>
                    <textarea
                      id="instructions"
                      name="instructions"
                      value={formData.instructions}
                      onChange={handleInputChange}
                      placeholder="Any special requests or instructions..."
                      rows="4"
                      disabled={!isAuthenticated}
                    />
                  </div>
                </div>

                {/* Place Order Button */}
                <button 
                  type="submit" 
                  className="place-order-btn"
                  disabled={!isAuthenticated || isSubmitting || selectedItems.length === 0}
                >
                  {isSubmitting ? 'Processing...' : `Place Order - ₱${total.toFixed(2)}`}
                </button>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="order-summary-section">
              <div className="cart-header">
                <h2 className="section-title">Order Summary</h2>
                <div className="select-all-container">
                  <label className="select-all-label">
                    <input
                      type="checkbox"
                      checked={cart.items.length > 0 && selectedItems.length === cart.items.length}
                      onChange={selectAllItems}
                      className="select-all-checkbox"
                    />
                    <span>Select All ({selectedItems.length}/{cart.items.length} selected)</span>
                  </label>
                </div>
              </div>
              
              <div className="cart-items-container">
                {cart.items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                    isSelected={selectedItems.includes(item.id)}
                    onToggleSelection={toggleItemSelection}
                  />
                ))}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal ({selectedItems.length} items):</span>
                  <span>₱{subtotal.toFixed(2)}</span>
                </div>
                
                {orderType === 'delivery' && (
                  <div className="total-row">
                    <span>Delivery Fee:</span>
                    <span>₱{deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="total-row grand-total">
                  <span>Total:</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                className="clear-cart-btn"
                onClick={clearCart}
                disabled={!isAuthenticated || cart.items.length === 0}
              >
                Clear Cart
              </button>
              
              <Link to="/menu" className="continue-shopping-link">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;