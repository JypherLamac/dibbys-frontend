import React, { useState, useEffect } from 'react';
import './Feedback.css';

const API_BASE_URL = 'http://localhost:5001';

const Feedback = () => {
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
    totalReviews: 4,
    averageRating: 5.0 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // NEW STATES FOR EMAIL VERIFICATION
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [tempReview, setTempReview] = useState(null);
  const [resendTimer, setResendTimer] = useState(0);

  // Fetch reviews and stats from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch reviews
        const reviewsResponse = await fetch(`${API_BASE_URL}/api/feedback`, {
          signal: AbortSignal.timeout(5000)
        });
        
        if (!reviewsResponse.ok) {
          throw new Error(`Reviews API failed: ${reviewsResponse.status}`);
        }
        
        const reviewsData = await reviewsResponse.json();
        
        if (reviewsData.success) {
          const formattedReviews = reviewsData.data.map(item => ({
            id: item.id,
            name: item.name || `${item.firstName} ${item.lastName}`,
            date: item.formatted_date || formatDate(item.createdAt),
            text: item.feedback,
            recommends: item.recommend === 1 || item.recommend === true,
            rating: item.rating,
            orderMethod: item.orderMethod,
            email: item.email,
            verified: item.verified || false // Add verified status
          }));
          setReviews(formattedReviews);
        }

        // Fetch stats
        const statsResponse = await fetch(`${API_BASE_URL}/api/feedback/stats`, {
          signal: AbortSignal.timeout(5000)
        });
        
        if (!statsResponse.ok) {
          throw new Error(`Stats API failed: ${statsResponse.status}`);
        }
        
        const statsData = await statsResponse.json();
        
        if (statsData.success) {
          setStats({
            recommendPercentage: statsData.data.recommendPercentage,
            totalReviews: statsData.data.totalReviews,
            averageRating: statsData.data.averageRating
          });
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        
        // Fallback to sample data
        const sampleReviews = [
          {
            id: 1,
            name: "Rafael Coronado",
            date: "September 24 at 3:07 PM",
            text: "suger setup ng chicken, malsas ang mga flavor at napaka juicy",
            recommends: true,
            rating: 5,
            orderMethod: "dine-in",
            verified: true
          },
          {
            id: 2,
            name: "Mark Angelo Medina Compendio",
            date: "September 25 at 7:54 PM",
            text: "suger solid and ang bali ng owner!!",
            recommends: true,
            rating: 5,
            orderMethod: "delivery",
            verified: true
          }
        ];
        setReviews(sampleReviews);
        
        const recommendCount = sampleReviews.filter(r => r.recommends).length;
        setStats({
          recommendPercentage: Math.round((recommendCount / sampleReviews.length) * 100),
          totalReviews: sampleReviews.length,
          averageRating: 5.0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'Recently';
      
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      return dateString || 'Recently';
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

  // Step 1: Send verification code
  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
      const response = await fetch(`${API_BASE_URL}/api/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)  // Just send formData directly
    });
      
      const result = await response.json();
      
      if (result.success) {
        // Store the review data temporarily
        setTempReview(formData);
        // Switch to verification step
        setVerificationStep(true);
        // Start resend timer (60 seconds)
        setResendTimer(60);
        
        // Don't reset form yet, keep data in case they need to go back
      } else {
        throw new Error(result.message || 'Failed to send verification email');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sending the verification email. Please check your email address and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Verify and submit review
  const handleVerifyAndSubmit = async () => {
    if (!verificationCode.trim()) {
      alert('Please enter the verification code');
      return;
    }
    
    if (verificationCode.length !== 6) {
      alert('Please enter a 6-digit verification code');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/feedback/verify`, {
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
        // Use the review data returned from backend
        const newReview = {
          id: result.data.id,
          name: result.data.name,
          date: 'Just now',
          text: result.data.feedback,
          recommends: result.data.recommend,
          rating: result.data.rating,
          orderMethod: result.data.orderMethod,
          email: result.data.email,
          verified: result.data.verified
        };
        
        // Add to beginning of reviews
        setReviews([newReview, ...reviews]);
        
        // Update stats by refetching from backend (more accurate)
        try {
          const statsResponse = await fetch(`${API_BASE_URL}/api/feedback/stats`);
          const statsData = await statsResponse.json();
          if (statsData.success) {
            setStats({
              recommendPercentage: statsData.data.recommendPercentage,
              totalReviews: statsData.data.totalReviews,
              averageRating: statsData.data.averageRating
            });
          }
        } catch (error) {
          console.error('Error updating stats:', error);
          // Fallback to local calculation
          const newTotal = stats.totalReviews + 1;
          const newRecommendCount = result.data.recommend ? 
            Math.round((stats.recommendPercentage * stats.totalReviews) / 100) + 1 :
            Math.round((stats.recommendPercentage * stats.totalReviews) / 100);
          
          setStats({
            ...stats,
            recommendPercentage: Math.round((newRecommendCount / newTotal) * 100),
            totalReviews: newTotal
          });
        }
        // Reset everything
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
        
        alert('Thank you for your feedback! Your review has been verified and published.');
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
    if (resendTimer > 0) {
      alert(`Please wait ${resendTimer} seconds before requesting a new code`);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/feedback/resend-verification`, {
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
        alert('New verification code sent! Please check your email.');
      } else {
        throw new Error(result.message || 'Failed to resend verification code');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to resend verification code. Please try again.');
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
                  {isSubmitting ? 'Verifying...' : 'Verify & Publish Review'}
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
                {isSubmitting ? 'Sending Code...' : 'Send Verification Code'}
              </button>
            </form>
          )}
        </div>

        {/* Reviews on the RIGHT side */}
        <div className="reviews-section">
          <h2 className="feedback-section-title">Customer Reviews</h2>
          <p className="feedback-subtitle">Verified customer experiences at Dibby's Wings</p>
          
          {error && (
            <div className="error-alert">
              <p>⚠️ Could not load latest reviews: {error}. Showing sample data.</p>
            </div>
          )}
          
          <div className="recommendation-section">
            <h3>Do you recommend Dibby's Restaurant?</h3>
            <div className="recommend-options">
              <span>Yes</span>
              <span>No</span>
            </div>
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
              {reviews.map(review => (
                <div key={review.id} className="review-card">
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;