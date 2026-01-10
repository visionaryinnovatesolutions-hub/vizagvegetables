
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact-page">
      <div className="container-1440">

        <div className="contact-hero">
          <h1>Contact Us</h1>
          <p>
            Have a question, suggestion, or correction?  
            We’re happy to hear from you.
          </p>
        </div>

        <div className="contact-content">

          {/* LEFT */}
          <div className="contact-info">
            <h2>📍 Vizag Vegetables</h2>

            <p>
              For price updates, corrections, or general feedback,
              please reach out to us.
            </p>

            <div className="contact-details">
              <p><strong>Email:</strong> support@vizagvegetables.com</p>
              <p><strong>Location:</strong> Visakhapatnam, Andhra Pradesh</p>
            </div>
          </div>

          {/* RIGHT – NETLIFY FORM */}
          <div className="contact-box">
            <h3>Send Us a Message</h3>

         <form
  name="contact"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
>
  <input type="hidden" name="form-name" value="contact" />
  <input type="hidden" name="bot-field" />

  <input type="text" name="name" placeholder="Your Name" required />
  <input type="email" name="email" placeholder="Your Email" required />
  <textarea name="message" placeholder="Your Message" required></textarea>

  <button type="submit">Send Message</button>
</form>


            <p className="contact-form-note">
              * We usually respond within 24 hours.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
