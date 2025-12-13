import React from 'react';
import './Contact.css';

const ContactPage = () => {
// Updated handleSubmit function in ContactPage.js
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Get form values
  const formData = {
    firstName: document.getElementById('contact-firstName').value,
    lastName: document.getElementById('contact-lastName').value,
    email: document.getElementById('contact-email').value,
    phone: document.getElementById('contact-phone').value,
    subject: document.getElementById('contact-subject').value,
    message: document.getElementById('contact-message').value
  };
  
  // Basic validation
  if (!formData.firstName || !formData.lastName || !formData.email || 
      !formData.subject || !formData.message) {
    alert('Please fill all required fields');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert('Please enter a valid email address');
    return;
  }
  
  try {
    // Show loading state if you have one
    const submitBtn = e.target.querySelector('.contact-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Send to your backend
    const response = await fetch('http://localhost:5001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    if (data.success) {
      alert(`Thank you ${formData.firstName} ${formData.lastName}! Your message has been sent. We'll respond to you at ${formData.email} regarding "${formData.subject}" as soon as possible.`);
      e.target.reset();
    } else {
      alert(`Failed to send message: ${data.message}`);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    
    // Reset button
    const submitBtn = e.target.querySelector('.contact-submit-btn');
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
    
    alert('An error occurred while sending your message. Please try again.');
  }
};

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-container">
          <h1>Contact Us</h1>
          <p>Get in touch with us for any questions or feedback. We're here to help you with anything you need!</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="contact-container">
        <div className="contact-content-wrapper">
          {/* Contact Information */}
          <section className="contact-info-section">
            <h2 className="contact-section-title">Get in Touch</h2>
            
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-info-content">
                <h3>Address</h3>
                <p>58 M.L. Quezon St. New Lower Bicutan, Taguig, Philippines<br />
                Near BGC and Bonifacio High Street</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-info-content">
                <h3>Phone</h3>
                <p>+63 912 345 6789<br />
                <small>Available during business hours</small></p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-info-content">
                <h3>Email</h3>
                <p>dibbysresto@gmail.com<br />
                <small>We'll respond within 24 hours</small></p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="contact-info-content">
                <h3>Business Hours</h3>
                <div className="contact-hours-grid">
                  <div className="contact-hours-item">
                    <div className="contact-day">Monday</div>
                    <div>12:00 PM - 10:00 PM</div>
                  </div>
                  <div className="contact-hours-item">
                    <div className="contact-day">Tuesday</div>
                    <div>12:00 PM - 10:00 PM</div>
                  </div>
                  <div className="contact-hours-item">
                    <div className="contact-day">Wednesday</div>
                    <div>12:00 PM - 10:00 PM</div>
                  </div>
                  <div className="contact-hours-item">
                    <div className="contact-day">Thursday</div>
                    <div>12:00 PM - 10:00 PM</div>
                  </div>
                  <div className="contact-hours-item">
                    <div className="contact-day">Friday</div>
                    <div>12:00 PM - 10:00 PM</div>
                  </div>
                  <div className="contact-hours-item">
                    <div className="contact-day">Saturday</div>
                    <div>12:00 PM - 10:00 PM</div>
                  </div>
                  <div className="contact-hours-item">
                    <div className="contact-day">Sunday</div>
                    <div>12:00 PM - 10:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Contact Form */}
          <section className="contact-form-section">
            <h2 className="contact-section-title">Send us a Message</h2>
            
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="contact-form-group">
                <label htmlFor="contact-firstName">First Name <span>*</span></label>
                <input type="text" id="contact-firstName" name="firstName" required />
              </div>
              
              <div className="contact-form-group">
                <label htmlFor="contact-lastName">Last Name <span>*</span></label>
                <input type="text" id="contact-lastName" name="lastName" required />
              </div>
              
              <div className="contact-form-group">
                <label htmlFor="contact-email">Email Address <span>*</span></label>
                <input type="email" id="contact-email" name="email" required />
              </div>
              
              <div className="contact-form-group">
                <label htmlFor="contact-phone">Phone Number</label>
                <input type="tel" id="contact-phone" name="phone" />
              </div>
              
              <div className="contact-form-group">
                <label htmlFor="contact-subject">Subject <span>*</span></label>
                <select id="contact-subject" name="subject" required defaultValue="">
                  <option value="" disabled>What is this regarding?</option>
                  <option value="general">General Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="booking">Table Booking</option>
                  <option value="catering">Catering Services</option>
                  <option value="complaint">Complaint</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="contact-form-group">
                <label htmlFor="contact-message">Message <span>*</span></label>
                <textarea 
                  id="contact-message" 
                  name="message" 
                  rows="5" 
                  placeholder="Tell us how we can help you..." 
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="contact-submit-btn">Send Message</button>
            </form>
          </section>
          
          {/* Map Section */}
          <section className="contact-map-section">
            <h2 className="contact-section-title">Find Us</h2>
            <div className="contact-map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.785144339049!2d121.0625956!3d14.5051532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cfbf1b2e3a6f%3A0x52b6c601d5db414!2sDibby&#39;s%20Restaurant!5e0!3m2!1sen!2sph!4v1699876543210!5m2!1sen!2sph" 
                className="contact-map-embed" 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Dibby's Wings Location"
              >
              </iframe>
              <div className="contact-map-note">
                <p><i className="fas fa-info-circle" style={{color: '#d32f2f', marginRight: '8px'}}></i> We're conveniently located in Taguig City. Use the map above for directions, or click <a href="https://goo.gl/maps/example" target="_blank" rel="noopener noreferrer" style={{color: '#d32f2f', fontWeight: '600'}}>here</a> to open in Google Maps.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;