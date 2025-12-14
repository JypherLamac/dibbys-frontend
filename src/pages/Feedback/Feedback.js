import React, { useState, useEffect } from 'react';
import './Feedback.css';

const API_BASE_URL = 'http://localhost:5001/api';

const Feedback2 = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    rating: '',
    orderMethod: '',
    feedback: '',
    recommend: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState({ 
    recommendPercentage: 100, 
    totalReviews: 0,
    averageRating: 5.0,
    totalLikes: 0
  });
  const [loading, setLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [tempReview, setTempReview] = useState(null);
  const [resendTimer, setResendTimer] = useState(0);
  const [userLikes, setUserLikes] = useState(() => {
    // Load liked reviews from localStorage
    const saved = localStorage.getItem('dibbyFeedbackLikes');
    return saved ? JSON.parse(saved) : {};
  });

  // Save userLikes to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dibbyFeedbackLikes', JSON.stringify(userLikes));
  }, [userLikes]);

  // Timer for resend code
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Load reviews from database when component mounts
  useEffect(() => {
    loadReviewsFromDatabase();
  }, []);

  // Format time ago
  const formatTimeAgo = (dateString) => {
    try {
      if (!dateString) return 'Just now';
      
      const now = new Date();
      const reviewDate = new Date(dateString);
      const diffMs = now - reviewDate;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins} minutes ago`;
      if (diffHours < 24) return `${diffHours} hours ago`;
      if (diffDays < 7) return `${diffDays} days ago`;
      
      return reviewDate.toLocaleDateString();
    } catch (error) {
      return 'Recently';
    }
  };

  const loadReviewsFromDatabase = async () => {
    setLoading(true);
    try {
      // Fetch verified reviews from your backend
      const response = await fetch(`${API_BASE_URL}/feedback`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const formattedReviews = data.data.map(item => ({
          id: item.id,
          name: item.name || `${item.firstName} ${item.lastName}`,
          date: formatTimeAgo(item.createdAt),
          text: item.feedback,
          recommends: item.recommend === 1 || item.recommend === true,
          rating: item.rating,
          orderMethod: item.orderMethod,
          email: item.email,
          verified: item.verified || false,
          createdAt: item.createdAt,
          likes: item.likes || 0,
          userLiked: userLikes[item.id] || false
        }));
        
        // Sort by likes (most liked first)
        formattedReviews.sort((a, b) => {
          if (b.likes !== a.likes) return b.likes - a.likes;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        setReviews(formattedReviews);
        
        // Update stats
        const recommendCount = formattedReviews.filter(r => r.recommends).length;
        const totalRating = formattedReviews.reduce((sum, r) => sum + (parseInt(r.rating) || 0), 0);
        const totalLikes = formattedReviews.reduce((sum, r) => sum + (r.likes || 0), 0);
        
        setStats({
          recommendPercentage: formattedReviews.length > 0 ? 
            Math.round((recommendCount / formattedReviews.length) * 100) : 100,
          totalReviews: formattedReviews.length,
          averageRating: formattedReviews.length > 0 ? 
            (totalRating / formattedReviews.length).toFixed(1) : '5.0',
          totalLikes: totalLikes
        });
      }
    } catch (error) {
      console.log('Using sample data:', error);
      // Fallback to sample data with likes
      const sampleReviews = [
        {
          id: 1,
          name: "Rafael Coronado",
          date: "2 hours ago",
          text: "suger setup ng chicken, malsas ang mga flavor at napaka juicy",
          recommends: true,
          rating: 5,
          orderMethod: "dine-in",
          verified: true,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          likes: 12,
          userLiked: userLikes[1] || false
        },
        {
          id: 2,
          name: "Mark Angelo Medina Compendio",
          date: "1 day ago",
          text: "suger solid and ang bali ng owner!!",
          recommends: true,
          rating: 5,
          orderMethod: "delivery",
          verified: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          likes: 8,
          userLiked: userLikes[2] || false
        }
      ];
      setReviews(sampleReviews);
      
      const recommendCount = sampleReviews.filter(r => r.recommends).length;
      const totalLikes = sampleReviews.reduce((sum, r) => sum + (r.likes || 0), 0);
      
      setStats({
        recommendPercentage: Math.round((recommendCount / sampleReviews.length) * 100),
        totalReviews: sampleReviews.length,
        averageRating: '5.0',
        totalLikes: totalLikes
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle heart/like button click
  const handleHeartClick = async (reviewId, currentLikes, currentlyLiked) => {
    try {
      // Update local state immediately for better UX
      const newLiked = !currentlyLiked;
      const likeChange = newLiked ? 1 : -1;
      
      // Update userLikes in localStorage
      const newUserLikes = {
        ...userLikes,
        [reviewId]: newLiked
      };
      setUserLikes(newUserLikes);
      
      // Update reviews list
      setReviews(prevReviews => 
        prevReviews.map(review => 
          review.id === reviewId 
            ? { 
                ...review, 
                likes: Math.max(0, (review.likes || 0) + likeChange),
                userLiked: newLiked 
              }
            : review
        )
      );
      
      // Update total likes in stats
      setStats(prevStats => ({
        ...prevStats,
        totalLikes: prevStats.totalLikes + likeChange
      }));
      
      // In a real app, you would also update the backend
      // await fetch(`${API_BASE_URL}/feedback/${reviewId}/like`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ liked: newLiked })
      // });
      
    } catch (error) {
      console.error('Error updating like:', error);
      // Revert on error
      setReviews(prevReviews => 
        prevReviews.map(review => 
          review.id === reviewId 
            ? { 
                ...review, 
                likes: currentLikes,
                userLiked: currentlyLiked 
              }
            : review
        )
      );
    }
  };

  const validateEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    return gmailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Step 1: Submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Validate form
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid Gmail address';
    if (!formData.rating) newErrors.rating = 'Please select a rating';
    if (!formData.orderMethod) newErrors.orderMethod = 'Please select an order method';
    if (!formData.feedback.trim()) newErrors.feedback = 'Feedback is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setTempReview(formData);
        setVerificationStep(true);
        setResendTimer(60);
      } else {
        throw new Error(result.message || 'Failed to send verification email');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Verify and submit
  const handleVerifyAndSubmit = async () => {
    if (isSubmitting) return;
    
    if (!verificationCode.trim() || verificationCode.length !== 6) {
      alert('Please enter a valid 6-digit verification code');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/feedback/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: tempReview.email,
          code: verificationCode,
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          rating: '',
          orderMethod: '',
          feedback: '',
          recommend: false
        });
        setTempReview(null);
        setVerificationStep(false);
        setVerificationCode('');
        setErrors({});
        setResendTimer(0);
        
        // Refresh the reviews to show the new one
        loadReviewsFromDatabase();
        
        alert('Thank you! Your review has been published.');
      } else {
        throw new Error(result.message || 'Invalid verification code');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Invalid verification code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend verification code
  const handleResendCode = async () => {
    if (isSubmitting) return;
    
    if (resendTimer > 0) {
      alert(`Please wait ${resendTimer} seconds before requesting a new code`);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/feedback/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: tempReview.email,
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setResendTimer(60);
        alert('New verification code sent!');
      } else {
        throw new Error(result.message || 'Failed to resend code');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to resend code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Go back to form
  const handleBackToForm = () => {
    setVerificationStep(false);
    setVerificationCode('');
    setResendTimer(0);
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star-filled' : 'star-empty'}>
          ★
        </span>
      );
    }
    return <div className="stars">{stars}</div>;
  };

  return (
    <div className="feedback-page">
      {/* Hero Section */}
      <section className="feedback-hero">
        <div className="feedback-hero-container">
          <h1>Customer Feedback</h1>
          <p>Share your experience with Dibby's Wings and see what other customers are saying!</p>
        </div>
      </section>

      <div className="feedback-container">
        {/* Form on the LEFT side */}
        <div className="feedback-form-section">
          <h2 className="feedback-section-title">Share Your Experience</h2>
          
          {verificationStep ? (
            <div className="verification-step">
              <div className="verification-header">
                <h3>📧 Verify Your Email</h3>
                <p>We've sent a 6-digit verification code to:</p>
                <div className="email-display">
                  <strong>{tempReview.email}</strong>
                </div>
                <p className="verification-instruction">
                  Please check your inbox (and spam folder) for the code.
                  Enter it below to publish your review.
                </p>
              </div>
              
              <div className="form-group">
                <label htmlFor="verificationCode">Verification Code</label>
                <div className="code-input-container">
                  <input
                    type="text"
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength="6"
                    disabled={isSubmitting}
                    className="code-input"
                    autoFocus
                  />
                  <div className="code-hint">Enter 6-digit code</div>
                </div>
              </div>
              
              <div className="timer-section">
                {resendTimer > 0 ? (
                  <p className="timer-text">
                    Request new code in: <span>{resendTimer}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="resend-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Resend Code'}
                  </button>
                )}
              </div>
              
              <div className="verification-buttons">
                <button 
                  type="button" 
                  onClick={handleVerifyAndSubmit}
                  disabled={isSubmitting || verificationCode.length !== 6}
                  className="submit-btn verify-btn"
                >
                  {isSubmitting ? 'Verifying...' : '✓ Verify & Publish Review'}
                </button>
                
                <button 
                  type="button" 
                  onClick={handleBackToForm}
                  className="back-btn"
                  disabled={isSubmitting}
                >
                  ← Back to Form
                </button>
              </div>
              
              <div className="verification-note">
                <p>🔒 Your email will not be displayed publicly. Verification ensures genuine reviews only.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name <span>*</span></label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? 'input-error' : ''}
                    required
                    disabled={isSubmitting}
                    placeholder="John"
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name <span>*</span></label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'input-error' : ''}
                    required
                    disabled={isSubmitting}
                    placeholder="Doe"
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Gmail Address <span>*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'input-error' : ''}
                  placeholder="example@gmail.com"
                  required
                  disabled={isSubmitting}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
                <div className="email-note">
                  We'll send a verification code to this address
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="rating">Overall Rating <span>*</span></label>
                <select
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className={errors.rating ? 'input-error' : ''}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select rating</option>
                  <option value="5">★★★★★ Excellent</option>
                  <option value="4">★★★★ Very Good</option>
                  <option value="3">★★★ Good</option>
                  <option value="2">★★ Fair</option>
                  <option value="1">★ Poor</option>
                </select>
                {errors.rating && <span className="error-message">{errors.rating}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="orderMethod">How did you order? <span>*</span></label>
                <select
                  id="orderMethod"
                  name="orderMethod"
                  value={formData.orderMethod}
                  onChange={handleInputChange}
                  className={errors.orderMethod ? 'input-error' : ''}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select an option</option>
                  <option value="dine-in">Dine-in</option>
                  <option value="takeout">Takeout</option>
                  <option value="delivery">Delivery</option>
                </select>
                {errors.orderMethod && <span className="error-message">{errors.orderMethod}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="feedback">Your Feedback <span>*</span></label>
                <textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleInputChange}
                  className={errors.feedback ? 'input-error' : ''}
                  placeholder="Tell us about your experience..."
                  required
                  disabled={isSubmitting}
                  rows="5"
                ></textarea>
                {errors.feedback && <span className="error-message">{errors.feedback}</span>}
              </div>
              
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="recommend"
                  name="recommend"
                  checked={formData.recommend}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                <label htmlFor="recommend">I would recommend Dibby's Wings</label>
              </div>
              
              <div className="verification-notice">
                <p>🔐 <strong>Email Verification Required</strong></p>
                <p>To prevent spam, we'll send a verification code to your Gmail before publishing your review.</p>
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Code...' : '📧 Send Verification Code'}
              </button>
            </form>
          )}
        </div>

        {/* Reviews on the RIGHT side */}
        <div className="reviews-section">
          <h2 className="feedback-section-title">Customer Reviews</h2>
          
          <p className="feedback-subtitle">Verified customer experiences at Dibby's Wings</p>
          
          {/* Stats Overview */}
          <div className="reviews-stats">
            <div className="stat-item">
              <span className="stat-value">{stats.recommendPercentage}%</span>
              <span className="stat-label">Recommend</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.totalReviews}</span>
              <span className="stat-label">Total Reviews</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.averageRating}</span>
              <span className="stat-label">Avg Rating</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.totalLikes}</span>
              <span className="stat-label">Total Likes</span>
            </div>
          </div>
          
          <div className="recommendation-section">
            <h3>Customer Recommendations</h3>
            <div className="recommendation-percentage">
              <strong>{stats.recommendPercentage}% recommend</strong>
              <span>({stats.totalReviews} Verified Reviews)</span>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading reviews...</p>
            </div>
          ) : (
            <div className="reviews-list">
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <div key={review.id} className={`review-card ${review.verified ? 'verified' : ''}`}>
                    <div className="review-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="reviewer-name">
                            {review.name}
                            {review.recommends && <span> recommends Dibby's Restaurant</span>}
                            {review.verified && <span className="verified-badge">✓ Verified</span>}
                          </div>
                          <div className="review-date">{review.date}</div>
                        </div>
                      </div>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                        <span className="rating-value">{review.rating}.0</span>
                      </div>
                    </div>
                    <p className="review-text">{review.text}</p>
                    <div className="review-actions">
                      <div className="restaurant-tag">
                        Dibby's Restaurant • {review.orderMethod || "Dine-in"}
                      </div>
                      <button 
                        className={`heart-btn ${review.userLiked ? 'liked' : ''}`}
                        onClick={() => handleHeartClick(review.id, review.likes, review.userLiked)}
                      >
                        <span className="heart-icon">❤</span>
                        <span className="heart-count">{review.likes || 0}</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-reviews">
                  <p>No reviews yet. Be the first to share your experience!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback2;