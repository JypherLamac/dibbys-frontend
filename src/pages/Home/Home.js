// src/pages/Home/Home.js
import React from 'react';
import './Home.css';

const Home = () => {
  const featuredWings = [
    {
      id: 2,
      name: "Don Alfredo Wings",
      description: "Creamy garlic parmesan wings with an Italian twist.",
      price: "₱309",
      image: "/images/Don-alfredo.jpg", // Direct path
      priceValue: 309,
      category: "chicken",
      popular: true
    },
    {
      id: 3,
      name: "Honey Sriracha Wings",
      description: "Sweet and spicy wings glazed with honey and sriracha.",
      price: "₱309",
      image: "/images/Honey-sriracha.jpg", // Direct path
      priceValue: 309,
      category: "chicken",
      popular: false
    },
    {
      id: 4,
      name: "Patiz Glazed Wings",
      description: "Savory Filipino-style wings glazed with patis and spices.",
      price: "₱309",
      image: "/images/Patis-glazed.jpg", // Direct path
      priceValue: 309,
      category: "chicken",
      popular: false
    },
    {
      id: 5,
      name: "Garlic Parmesan",
      description: "Creamy garlic parmesan wings with an Italian twist.",
      price: "₱309",
      image: "/images/Garlic-parmesan.jpg", // Direct path
      priceValue: 309,
      category: "chicken",
      popular: true
    }
  ];

  const handleAddToCart = (wing) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === wing.id);
    
    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity = (existingCart[existingItemIndex].quantity || 1) + 1;
    } else {
      // Add new item to cart
      const cartItem = {
        id: wing.id,
        name: wing.name,
        description: wing.description,
        price: wing.price, // Already includes "₱309"
        priceValue: wing.priceValue, // Number value for calculations
        image: wing.image,
        category: wing.category,
        quantity: 1
      };
      existingCart.push(cartItem);
    }
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Show success message only
    alert(`${wing.name} added to cart!`);
  };

  return (
    <div className="dibby-home">
      {/* Hero Section */}
      <section className="dibby-hero" id="home">
        <div className="dibby-container">
          <h1>UNLIMITED WINGS FEAST</h1>
          <p>Experience the ultimate wings experience with endless flavors, premium ingredients, and unmatched quality. Dive into crispy perfection that never ends.</p>
          <a href="#menu" className="dibby-btn">View Our Wings</a>
        </div>
      </section>

      {/* About Section */}
      <section className="dibby-about" id="about">
        <div className="dibby-container">
          <h2>About Dibby's Wings</h2>
          
          <div className="dibby-about-content">
            {/* Row: Text left, Image right */}
            <div className="dibby-about-row">
              {/* Text on LEFT */}
              <div className="dibby-about-text">
                <p>Since 2020, Dibby's Wings has been serving the best chicken wings in Taguig City. Our passion for quality and flavor has made us a favorite destination for wing lovers across Metro Manila.</p>
                <p>We use only the freshest ingredients and our secret blend of spices to create wings that are crispy on the outside, juicy on the inside, and bursting with flavor in every bite.</p>
                
                <a href="#contact" className="dibby-btn">Visit Us Today</a>
              </div>
              
              {/* Image on RIGHT */}
              <div className="dibby-about-image">
                {/* Direct path to public/images */}
                <img 
                  src="/images/aboutus.png" 
                  alt="Dibby's Wings Restaurant Interior" 
                />
              </div>
            </div>
            
            {/* Features section BELOW */}
            <div className="dibby-features-container">
              <div className="dibby-features">
                <div className="dibby-feature">
                  <i className="fas fa-calendar-day"></i>
                  <h3>Fresh Daily</h3>
                  <p>All our wings are prepared fresh every single day with premium quality chicken</p>
                </div>
                <div className="dibby-feature">
                  <i className="fas fa-utensils"></i>
                  <h3>10+ Flavors</h3>
                  <p>From classic original to creative Filipino twists, we have flavors for every taste</p>
                </div>
                <div className="dibby-feature">
                  <i className="fas fa-heart"></i>
                  <h3>Made with Love</h3>
                  <p>Every order is prepared with care and attention to detail by our expert chefs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Wings Section */}
      <section id="menu">
        <div className="dibby-container">
          <h2>Featured Wings</h2>
          <p style={{textAlign: 'center', maxWidth: '700px', margin: '0 auto 30px'}}>Discover our most popular wing flavors, crafted to perfection with premium ingredients and bold seasonings</p>
          
          <div className="dibby-wings-grid">
            {featuredWings.map((wing) => (
              <div className="dibby-wing-card" key={wing.id}>
                <div 
                  className="dibby-wing-image" 
                  style={{backgroundImage: `url(${wing.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                ></div>
                <div className="dibby-wing-info">
                  <div className="dibby-wing-header">
                    <div className="dibby-wing-name">
                      {wing.name}
                      {wing.popular && <span className="dibby-popular-badge">Popular</span>}
                    </div>
                    <div className="dibby-wing-price">{wing.price}</div>
                  </div>
                  <p className="dibby-wing-description">{wing.description}</p>
                  <p className="dibby-wing-size">(6 pieces)</p>
                  <div className="dibby-wing-actions">
                    <button 
                      onClick={() => handleAddToCart(wing)} 
                      className="dibby-btn"
                      style={{cursor: 'pointer', border: 'none', fontFamily: 'inherit'}}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="dibby-view-menu">
            <a href="/menu" className="dibby-btn">View Full Menu</a>
          </div>
        </div>
      </section>

      {/* How We Serve You Section */}
      <section className="dibby-service" id="service">
        <div className="dibby-container">
          <h2>How We Serve You</h2>
          <p style={{textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px'}}>From the moment you walk in until your last delicious bite, we're dedicated to giving you the best wing experience</p>
          
          <div className="dibby-service-process">
            <div className="dibby-service-step">
              <div className="dibby-step-visual">
                <div className="dibby-step-number">1</div>
                <div className="dibby-step-icon">
                  <i className="fas fa-door-open"></i>
                </div>
                <div className="dibby-step-connector"></div>
              </div>
              <div className="dibby-step-content">
                <h3>Warm Welcome</h3>
                <p>Our friendly staff greets you with genuine hospitality and guides you to your comfortable seating</p>
                <ul className="dibby-step-features">
                  <li><i className="fas fa-check"></i> Immediate seating assistance</li>
                  <li><i className="fas fa-check"></i> Menu explanation</li>
                  <li><i className="fas fa-check"></i> Specials of the day</li>
                </ul>
              </div>
            </div>

            <div className="dibby-service-step">
              <div className="dibby-step-visual">
                <div className="dibby-step-number">2</div>
                <div className="dibby-step-icon">
                  <i className="fas fa-clipboard-list"></i>
                </div>
                <div className="dibby-step-connector"></div>
              </div>
              <div className="dibby-step-content">
                <h3>Personalized Ordering</h3>
                <p>Our experts help you choose the perfect wings and flavors tailored to your taste preferences</p>
                <ul className="dibby-step-features">
                  <li><i className="fas fa-check"></i> Flavor recommendations</li>
                  <li><i className="fas fa-check"></i> Heat level customization</li>
                  <li><i className="fas fa-check"></i> Dietary accommodation</li>
                </ul>
              </div>
            </div>

            <div className="dibby-service-step">
              <div className="dibby-step-visual">
                <div className="dibby-step-number">3</div>
                <div className="dibby-step-icon">
                  <i className="fas fa-fire"></i>
                </div>
                <div className="dibby-step-connector"></div>
              </div>
              <div className="dibby-step-content">
                <h3>Fresh Preparation</h3>
                <p>Our chefs prepare your wings from scratch using premium ingredients and our secret recipes</p>
                <ul className="dibby-step-features">
                  <li><i className="fas fa-check"></i> Made-to-order freshness</li>
                  <li><i className="fas fa-check"></i> Quality ingredient check</li>
                  <li><i className="fas fa-check"></i> Perfect cooking timing</li>
                </ul>
              </div>
            </div>

            <div className="dibby-service-step">
              <div className="dibby-step-visual">
                <div className="dibby-step-number">4</div>
                <div className="dibby-step-icon">
                  <i className="fas fa-utensils"></i>
                </div>
                <div className="dibby-step-connector"></div>
              </div>
              <div className="dibby-step-content">
                <h3>Perfect Serving</h3>
                <p>Your wings arrive hot, crispy, and perfectly presented with all your chosen sides and sauces</p>
                <ul className="dibby-step-features">
                  <li><i className="fas fa-check"></i> Temperature perfect serving</li>
                  <li><i className="fas fa-check"></i> Beautiful presentation</li>
                  <li><i className="fas fa-check"></i> Extra sauces on request</li>
                </ul>
              </div>
            </div>

            <div className="dibby-service-step">
              <div className="dibby-step-visual">
                <div className="dibby-step-number">5</div>
                <div className="dibby-step-icon">
                  <i className="fas fa-heart"></i>
                </div>
              </div>
              <div className="dibby-step-content">
                <h3>Exceptional Experience</h3>
                <p>We ensure your complete satisfaction with attentive service and follow-up to make every visit memorable</p>
                <ul className="dibby-step-features">
                  <li><i className="fas fa-check"></i> Regular check-ins</li>
                  <li><i className="fas fa-check"></i> Feedback welcome</li>
                  <li><i className="fas fa-check"></i> Loyalty rewards</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="dibby-service-commitment">
            <div className="dibby-commitment-card">
              <div className="dibby-commitment-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h4>Quick Service</h4>
              <p>Average wait time of 15-20 minutes from order to table</p>
            </div>
            <div className="dibby-commitment-card">
              <div className="dibby-commitment-icon">
                <i className="fas fa-award"></i>
              </div>
              <h4>Quality Guarantee</h4>
              <p>100% satisfaction guarantee on all our food and service</p>
            </div>
            <div className="dibby-commitment-card">
              <div className="dibby-commitment-icon">
                <i className="fas fa-users"></i>
              </div>
              <h4>Family Friendly</h4>
              <p>Comfortable environment for families, friends, and solo diners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <div className="dibby-container">
          <h2>What Our Customers Say</h2>
          <p style={{textAlign: 'center', maxWidth: '700px', margin: '0 auto 30px'}}>Don't just take our word for it - hear from our satisfied customers who keep coming back for more</p>
          
          <div className="dibby-testimonials-grid">
            <div className="dibby-testimonial-card">
              <p className="dibby-testimonial-text">"The best wings I've ever had! The unlimited wings deal is absolutely worth it. Every flavor is perfectly seasoned and the wings are always crispy."</p>
              <div className="dibby-customer-info">
                <div className="dibby-customer-avatar">M</div>
                <div className="dibby-customer-details">
                  <h4>Maria Santos</h4>
                  <p>Food Blogger</p>
                </div>
              </div>
            </div>
            
            <div className="dibby-testimonial-card">
              <p className="dibby-testimonial-text">"Dibby's Wings has become my go-to spot for game nights. The Honey Sriracha wings are incredible, and the service is always friendly and fast!"</p>
              <div className="dibby-customer-info">
                <div className="dibby-customer-avatar">J</div>
                <div className="dibby-customer-details">
                  <h4>John Reyes</h4>
                  <p>Regular Customer</p>
                </div>
              </div>
            </div>
            
            <div className="dibby-testimonial-card">
              <p className="dibby-testimonial-text">"Amazing quality and great prices! The Garlic Parmesan wings are my favorite. I love that they're always fresh and never greasy. Highly recommend!"</p>
              <div className="dibby-customer-info">
                <div className="dibby-customer-avatar">S</div>
                <div className="dibby-customer-details">
                  <h4>Sarah Chen</h4>
                  <p>Local Resident</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="dibby-stats">
            <div className="dibby-stat-item">
              <h3>500+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="dibby-stat-item">
              <h3>4.9</h3>
              <p>Average Rating</p>
            </div>
            <div className="dibby-stat-item">
              <h3>10+</h3>
              <p>Wing Flavors</p>
            </div>
            <div className="dibby-stat-item">
              <h3>100%</h3>
              <p>Fresh Daily</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="dibby-contact" id="contact">
        <div className="dibby-container">
          <h2>Visit Us Today</h2>
          <p style={{textAlign: 'center', maxWidth: '700px', margin: '0 auto 30px'}}>Come experience the best wings in Taguig City</p>
          
          <div className="dibby-contact-content">
            <div className="dibby-contact-info">
              <div className="dibby-contact-details">
                <div className="dibby-contact-item">
                  <div className="dibby-contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <div>
                    <h4>Location</h4>
                    <p>123 Food Street, Bonifacio Global City<br />Taguig City, Metro Manila 1634</p>
                  </div>
                </div>
                
                <div className="dibby-contact-item">
                  <div className="dibby-contact-icon"><i className="fas fa-phone"></i></div>
                  <div>
                    <h4>Phone</h4>
                    <p>+63 917 123 4567<br />+63 2 8123 4567</p>
                  </div>
                </div>
                
                <div className="dibby-contact-item">
                  <div className="dibby-contact-icon"><i className="fas fa-clock"></i></div>
                  <div>
                    <h4>Hours</h4>
                    <p>Monday - Thursday: 11:00 AM - 10:00 PM<br />Friday - Saturday: 11:00 AM - 11:00 PM<br />Sunday: 12:00 PM - 9:00 PM</p>
                  </div>
                </div>
                
                <div className="dibby-contact-item">
                  <div className="dibby-contact-icon"><i className="fas fa-envelope"></i></div>
                  <div>
                    <h4>Email</h4>
                    <p>info@dibbyswings.com<br />orders@dibbyswings.com</p>
                  </div>
                </div>
              </div>
              
              <a 
                href="https://www.google.com/maps/place/Dibby's+Restaurant/@14.5051203,121.0652929,17z/data=!4m6!3m5!1s0x3397cfbf1b2e3a6f:0x52b6c601d5db414!8m2!3d14.5051532!4d121.0651705!16s%2Fg%2F11h2d12hr4?entry=ttu" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="dibby-btn dibby-map-btn"
              >
                View on Google Maps
              </a>
            </div>
            
            <div className="dibby-map-container">
              <iframe 
                id="dibby-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.785144339049!2d121.0625956!3d14.5051532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cfbf1b2e3a6f%3A0x52b6c601d5db414!2sDibby&#39;s%20Restaurant!5e0!3m2!1sen!2sph!4v1699876543210!5m2!1sen!2sph" 
                width="100%" 
                height="100%" 
                style={{border: 0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Dibby's Wings Location">
              </iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;