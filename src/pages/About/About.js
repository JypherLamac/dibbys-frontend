 
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1>About Dibby's Restaurant</h1>
        
        <section className="about-hero">
          <div className="about-content">
            <h2>Our Story</h2>
            <p>
              Founded in 2010, Dibby's Restaurant has been serving the community 
              with exceptional dining experiences. Our passion for authentic flavors 
              and commitment to quality has made us a beloved destination for food lovers.
            </p>
            <p>
              We believe in using only the freshest ingredients, sourced locally whenever 
              possible, to create dishes that delight the senses and create lasting memories.
            </p>
          </div>
          <div className="about-image">
            <div className="image-placeholder">🏢</div>
          </div>
        </section>

        <section className="mission-vision">
          <div className="mission">
            <h3>Our Mission</h3>
            <p>
              To provide exceptional culinary experiences through authentic flavors, 
              outstanding service, and a warm, welcoming atmosphere that feels like home.
            </p>
          </div>
          <div className="vision">
            <h3>Our Vision</h3>
            <p>
              To be the most loved restaurant in our community, known for our 
              commitment to quality, innovation, and customer satisfaction.
            </p>
          </div>
        </section>

        <section className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍🍳</div>
              <h4>Chef Marco</h4>
              <p>Head Chef</p>
              <p>15+ years of culinary experience</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍🍳</div>
              <h4>Chef Sarah</h4>
              <p>Sous Chef</p>
              <p>Specializes in Italian cuisine</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">🍷</div>
              <h4>Michael</h4>
              <p>Restaurant Manager</p>
              <p>Ensuring your perfect dining experience</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;