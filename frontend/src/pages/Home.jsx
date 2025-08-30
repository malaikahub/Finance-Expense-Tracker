import React from "react";
import { motion } from "framer-motion";
import "./Home.css";
import {
  BarChart2,
  CreditCard,
  DollarSign,
  Home as HomeIcon,
  Car,
  Shield,
  Banknote,
  Lock,
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: "💰",
      title: "Track Transactions",
      desc: "Add and categorize income and expenses easily.",
    },
    {
      icon: "🏦",
      title: "Set Goals & Save",
      desc: "Set savings goals and track your progress.",
    },
    {
      icon: "💡",
      title: "AI Insights",
      desc: "Get personalized insights and recommendations.",
    },
    {
      icon: "🔔",
      title: "Bill Reminders",
      desc: "Never miss a payment with AI reminders.",
    },
  ];

  const categories = [
    { icon: <BarChart2 size={28} />, label: "Credit" },
    { icon: <CreditCard size={28} />, label: "Cards" },
    { icon: <DollarSign size={28} />, label: "Loans" },
    { icon: <HomeIcon size={28} />, label: "Home" },
    { icon: <Car size={28} />, label: "Auto" },
    { icon: <Shield size={28} />, label: "Insurance" },
    { icon: <Banknote size={28} />, label: "Money" },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg"></div>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>We’re here to get you there.</h1>
          <p>
            No matter your life’s path or goals, we’re here to help you along
            each step—empowering you with the insights to make confident choices.
          </p>
          <div className="hero-buttons">
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get started for free
            </motion.button>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              I’m already a member
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Features</h2>
        <div className="features-cards">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ rotateY: 10, scale: 1.05 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon" aria-hidden="true">
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Everything you need to power your progress.</h2>
        <div className="categories-icons">
          {categories.map((item, index) => (
            <div className="category-item" key={index}>
              <div className="category-icon">{item.icon}</div>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Insights Section */}
      <section className="insights-section">
        <div className="insight-panel insight-left">
          <h2>Make better sense of your dollars and cents.</h2>
          <p>
            We give you accurate insights into your finances, helping you
            understand where you stand—so you can take clear steps towards your
            goals.
          </p>
          <button className="insight-button">Let’s go</button>
          <img
            src="/images/spending-chart.png"
            alt="Spending Chart"
            className="insight-image"
          />
        </div>

        <div className="insight-panel insight-right">
          <h2>Less guessing. More successing.</h2>
          <p>
            Find personalized recommendations based on your financial picture
            and see your Approval Odds* so you can apply with more confidence.
          </p>
          <button className="insight-button">Start now</button>
          <img
            src="/images/approval-card.png"
            alt="Approval Card"
            className="insight-image"
          />
        </div>
      </section>

      {/* Security Section */}
      <section className="security-section">
        <div className="security-left">
          <h2>Protect your progress.</h2>
        </div>
        <div className="security-right">
          <div className="security-item">
            <div className="security-icon">
              <Lock className="icon" />
            </div>
            <div className="security-text">
              <h3>We treat your data like it’s our own.</h3>
              <p>
                We don’t share your personal information with unaffiliated third
                parties for their own advertising or marketing purposes.
              </p>
            </div>
          </div>

          <div className="security-item">
            <div className="security-icon">
              <Shield className="icon" />
            </div>
            <div className="security-text">
              <h3>We take your security seriously.</h3>
              <p>
                We use 128-bit or higher encryption to protect during the
                transmission of your data to our site.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
