
import "./About.css";

const About = () => {
  return (
    <section className="about-page">
      <div className="container-1440">

        {/* HERO */}
        <div className="about-hero">
          <h1>About Vizag Vegetables</h1>
          <p>
            Bringing fresh vegetables, fruits, and daily price updates directly
            from Vizag Rythu Bazars to your screen.
          </p>
        </div>

        {/* CONTENT */}
        <div className="about-content">

          <div className="about-card">
            <h2>🌿 Who We Are</h2>
            <p>
              Vizag Vegetables is a local information platform designed to help
              people of Visakhapatnam stay updated with daily vegetable and fruit
              prices from nearby Rythu Bazars.
            </p>
            <p>
              Our goal is to make price information transparent and easily
              accessible for households, vendors, and small businesses.
            </p>
          </div>

          <div className="about-card">
            <h2>🚜 Why Rythu Bazar</h2>
            <p>
              Rythu Bazars play a vital role in connecting farmers directly with
              consumers. They help farmers get fair prices while providing fresh
              produce to customers at affordable rates.
            </p>
            <p>
              We collect and present this information in a simple and clear way
              so everyone can benefit.
            </p>
          </div>

          <div className="about-card">
            <h2>📍 What We Provide</h2>
            <ul>
              <li>Daily vegetable & fruit price updates</li>
              <li>Rythu Bazar location details</li>
              <li>Market timings and weekly holidays</li>
              <li>Images and map directions</li>
            </ul>
          </div>

          <div className="about-card">
            <h2>💚 Our Vision</h2>
            <p>
              We aim to support local farmers, reduce price confusion, and help
              Vizag residents make informed buying decisions every day.
            </p>
            <p>
              In the future, we plan to expand this platform with more locations,
              smarter updates, and mobile-friendly access.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
