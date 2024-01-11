import React from "react";
import "./style.css"

const AboutUs = () => {
  return (
    <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="about-heading">About Us</h2>
              <p className="about-content">
                Welcome to MyAwesomeBlog, your go-to destination for engaging and informative blog content. We are
                passionate about sharing valuable insights, stories, and knowledge with our readers. Our mission is to
                inspire, educate, and entertain through the power of words.
              </p>
            </div>
          </div>
        </div>

        <div>
            <div className="row d-flex justify-content-center my-5">
                <div className="text-center col-6">
                <h2 className="team-heading">Our Team</h2>
                </div>
            </div>
            <div className="row d-flex justify-content-center my-5">
                <div className="team-member col-2">
                    <img src="https://via.placeholder.com/200" alt="Team Member" />
                    <h3>John Doe</h3>
                    <p>Founder & Editor-in-Chief</p>
                </div>
                <div className="team-member col-2">
                    <img src="https://via.placeholder.com/200" alt="Team Member" />
                    <h3>Jane Smith</h3>
                    <p>Senior Writer</p>
                </div>
                <div className="team-member col-2">
                    <img src="https://via.placeholder.com/200" alt="Team Member" />
                    <h3>Bob Johnson</h3>
                    <p>Content Creator</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AboutUs;
