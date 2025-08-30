import React from "react";
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import qrCode from "../assets/qr-code.png"; // Ensure this file exists in src/assets
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Note */}
      <div className="footer-top">
        *Finance Tracker does not guarantee financial results. Data and recommendations are based on available information and may not apply to every individual. Always consult a financial advisor for personalized advice.
      </div>

      {/* Main Content */}
      <div className="footer-content">
        {/* Left Column - Brand and Social */}
        <div className="footer-column brand">
          <h2>Finance Tracker</h2>
          <div className="footer-social">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Youtube size={20} /></a>
            <a href="#"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Middle Columns - Links */}
        <div className="footer-links">
          <div className="footer-column">
            <h4>Company Info</h4>
            <a href="#">About Finance Tracker</a>
            <a href="#">Careers</a>
            <a href="#">News</a>
            <a href="#">Blog</a>
            <a href="#">Partner Programs</a>
          </div>
          <div className="footer-column">
            <h4>Help</h4>
            <a href="#">Help Center</a>
            <a href="#">How It Works</a>
            <a href="#">Security Practices</a>
            <a href="#">Guidelines</a>
            <a href="#">Login</a>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">CA Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Data Preferences</a>
          </div>
          <div className="footer-column">
            <h4>Notable Links</h4>
            <a href="#">Budget Insights</a>
            <a href="#">Investment Tips</a>
            <a href="#">Best Saving Plans</a>
            <a href="#">Credit Score Guide</a>
            <a href="#">Loan Calculator</a>
          </div>
        </div>

        {/* Right Column - QR */}
        <div className="footer-column qr">
          <img src={qrCode} alt="QR Code" />
          <p>Scan the QR code to download the app</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2025 Finance Tracker, Inc. All rights reserved.</p>
        <p>Finance Tracker is a registered trademark. Other names may be trademarks of their respective owners.</p>
      </div>
    </footer>
  );
};

export default Footer;
