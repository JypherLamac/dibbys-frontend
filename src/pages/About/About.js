import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* HERO SECTION - Matches Feedback Hero */}
      <section className="about-hero-section">
        <div className="about-hero-container">
          <h1>About Dibby's Restaurant</h1>
          <p>
            Serving Taguig City with passion, quality, and exceptional flavors since day one
          </p>
        </div>
      </section>

      <div className="about-container">
        {/* OUR STORY SECTION */}
        <section className="our-story-section">
          <div className="our-story-container">
            <div className="our-story-text">
              <h2>Our Story</h2>
              <p>
                We started March 20, 2024, and we only had a food stall for our starting business,
                driven by a passion for serving flavorful and unforgettable wings. What began as
                a small and simple setup quickly grew as more people discovered and enjoyed our food.
                When our business is good and many people like it, we tried to open Dibby's Wings
                Restaurant and were eager to run business, turning our dream into a bigger and more
                welcoming place where customers could enjoy not just wings, but a complete dining
                experience.
                <br /><br />
                Today, we are proud to have a successful restaurant located in Taguig, known as
                Dibby's Wings Taguig's Famous, where our customers can enjoy great food, great service,
                and a welcoming dining experience.
              </p>
            </div>

            <div
              className="our-story-img"
              style={{ backgroundImage: "url('images/picturesabout/db bg.jpg')" }}
            />
          </div>
        </section>

        {/* MISSION & VISION SECTION */}
        <section className="mission-vision-section">
          <div className="mission-card">
            <h3>Our Mission</h3>
            <p>
              To provide exceptional culinary experiences through authentic flavors,
              outstanding service, and a warm, welcoming atmosphere that feels like home.
            </p>
          </div>

          <div className="vision-card">
            <h3>Our Vision</h3>
            <p>
              To be the most loved restaurant in our community, known for our commitment
              to quality, innovation, and customer satisfaction.
            </p>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="team-section">
          <div className="team-container">
            <div className="team-title">
              <h2>Meet Our Team</h2>
            </div>

            <div className="team-grid">
              <div className="team-card">
                <img src="/images/picturesabout/jonas.jpg" alt="Jonas Cahusay" />
                <h3>Jonas Cahusay</h3>
                <span>Head Chef</span>
                <p>Delivers passion and creativity in every meal.</p>
              </div>

              <div className="team-card">
                <img src="/images/picturesabout/jer.jpg" alt="Jeramie Bagsik" />
                <h3>Jeramie Bagsik</h3>
                <span>Operations Manager</span>
                <p>
                  Committed to giving every guest an exceptional dining experience at Dibby's Wings.
                </p>
              </div>

              <div className="team-card">
                <img src="/images/picturesabout/dave.jpg" alt="Dave Patrick Bagsik" />
                <h3>Dave Patrick Bagsik</h3>
                <span>Restaurant Owner / Founder</span>
                <p>Leading with passion for food and customer care.</p>
              </div>
            </div>
          </div>
        </section>

        {/* MECHANICS SECTION */}
        <section className="mechanics-section">
          <h2>UNLI OFFERS MECHANICS</h2>

          <div className="rules-icons">
            <p>☒ TAKEOUT</p>
            <p>☒ LEFTOVER</p>
            <p>☒ SHARING</p>
          </div>

          <ul className="rules-list">
            <li>LEFTOVER FEE: 30 PESOS PER PIECE (WINGS), 20 PESOS (RICE), 10 PESOS (DRINKS)</li>
            <li>1 FLAVOR PER SERVING</li>
            <li>SHARING SHALL RESULT IN FORFEITURE OF THE UNLI OFFER</li>
            <li>NO TAKING OUT OF BONES</li>
            <li>2 HOURS TIME LIMIT</li>
          </ul>
        </section>

        {/* CELEBRATION SECTION */}
        <section className="celebration-section">
          <h2 className="section-title">Celebrate With Dibby's Wings!</h2>

          <div className="celebration-container">
            <div className="celebration-card">
              <h3 className="celebration-heading">Treat Dad to his favorite wings!</h3>
              <img src="/images/picturesabout/fathers.png" alt="Father's Day Promo" />
            </div>

            <div className="celebration-card">
              <h3 className="celebration-heading">Treat Mom to her favorite wings!</h3>
              <img src="/images/picturesabout/mothers.png" alt="Mother's Day Promo" />
            </div>

            <div className="celebration-card">
              <h3 className="celebration-heading">Share a meal with your loved one!</h3>
              <img src="/images/picturesabout/valentines.png" alt="Valentine's Promo" />
            </div>

            <div className="celebration-card">
              <h3 className="celebration-heading">Celebrate your Birthday with Dibby's Wings!</h3>
              <img src="/images/picturesabout/bday.png" alt="Birthday Promo" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;