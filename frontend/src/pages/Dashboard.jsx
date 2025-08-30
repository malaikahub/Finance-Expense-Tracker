import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import CountUp from "react-countup";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import "./Dashboard.css";

const COLORS = ["#16a34a", "#dc2626"];

export default function Dashboard({ darkMode }) {
  const [dashboardData, setDashboardData] = useState({
    monthlyIncome: 0,
    totalBalance: 0,
    totalExpense: 0,
  });

  const [cards, setCards] = useState([
    { id: 1, name: "Cash", balance: 100 },
    { id: 2, name: "Bank", balance: 250 },
    { id: 3, name: "Wallet", balance: 50 },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [balanceInput, setBalanceInput] = useState("");

  const textColor = darkMode ? "#f5f5f5" : "#000";
  const gridStroke = darkMode ? "#555" : "#ccc";

  /** ================= Fetch Dashboard Data ================= */
  const fetchDashboard = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/dashboard");
      const data = await res.json();
      if (data.success) {
        setDashboardData((prev) => ({
          ...prev,
          monthlyIncome: parseFloat(data.monthlyIncome) || 0,
          totalExpense: parseFloat(data.totalExpense) || 0,
        }));
      }
    } catch (err) {
      console.error("❌ Failed to fetch dashboard data:", err);
    }
  };

  /** ================= Update Total Balance from Cards ================= */
  useEffect(() => {
    const totalFromCards = cards.reduce((acc, card) => acc + card.balance, 0);
    setDashboardData((prev) => ({
      ...prev,
      totalBalance: totalFromCards,
    }));
  }, [cards]);

  /** ================= Card Functions ================= */
  const handleAddMoney = (card) => {
    setEditingId(card.id);
    setBalanceInput("");
  };

  const handleSaveMoney = (id) => {
    const amount = parseFloat(balanceInput);
    if (isNaN(amount) || amount <= 0) return alert("Enter valid amount");

    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, balance: card.balance + amount } : card
      )
    );

    setEditingId(null);
    setBalanceInput("");
  };

  const handleAddCard = () => {
    const name = prompt("Enter new card name:");
    if (!name) return;
    setCards((prev) => [...prev, { id: Date.now(), name, balance: 0 }]);
  };

  // Deduct balance when something is paid
  const handlePay = (id, amount) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id
          ? { ...card, balance: Math.max(card.balance - amount, 0) }
          : card
      )
    );
  };

  /** ================= Initial Load + WebSocket ================= */
  useEffect(() => {
    fetchDashboard();
    const socket = io("http://localhost:5000");
    socket.on("dashboardUpdate", fetchDashboard);
    return () => socket.disconnect();
  }, []);

  /** ================= Chart Data ================= */
  const pieData = [
    { name: "Income", value: dashboardData.monthlyIncome },
    { name: "Expenses", value: dashboardData.totalExpense },
  ];

  const lineData = [
    { name: "Jan", amount: 400 },
    { name: "Feb", amount: 300 },
    { name: "Mar", amount: 600 },
    { name: "Apr", amount: 500 },
  ];

  return (
    <div className={`dashboard-page ${darkMode ? "dark" : ""}`}>
      {/* ================= Hero Section ================= */}
      <section className="hero-section">
        <img
          src="/images/Finance-tracker.jpg"
          alt="Finance Overview"
          className="hero-bg"
        />
        <div className="hero-overlay">
          <h1 className="hero-title">Dashboard</h1>
          <p className="hero-subtitle">Monitor your financial activities</p>

          {/* Summary Cards */}
          <div className="row row-3 overlay-cards">
            <div className={`card glass ${darkMode ? "dark" : ""}`}>
              <p className="card-title">Total Balance</p>
              <h2 className="card-value balance">
                GHS{" "}
                <CountUp
                  end={dashboardData.totalBalance}
                  duration={1.5}
                  decimals={2}
                  separator=","
                />
              </h2>
            </div>
            <div className={`card glass ${darkMode ? "dark" : ""}`}>
              <p className="card-title">Monthly Income</p>
              <h2 className="card-value income">
                GHS{" "}
                <CountUp
                  end={dashboardData.monthlyIncome}
                  duration={1.5}
                  decimals={2}
                  separator=","
                />
              </h2>
            </div>
            <div className={`card glass ${darkMode ? "dark" : ""}`}>
              <p className="card-title">Total Expense</p>
              <h2 className="card-value expense">
                GHS{" "}
                <CountUp
                  end={dashboardData.totalExpense}
                  duration={1.5}
                  decimals={2}
                  separator=","
                />
              </h2>
            </div>
          </div>

          {/* Charts */}
          <div className="row row-2 overlay-charts">
            <div className={`chart-box glass ${darkMode ? "dark" : ""}`}>
              <h3 style={{ color: textColor }}>Income & Expense Overview</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                  <XAxis dataKey="name" stroke={textColor} />
                  <YAxis stroke={textColor} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#333" : "#fff",
                      color: textColor,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className={`chart-box glass ${darkMode ? "dark" : ""}`}>
              <h3 style={{ color: textColor }}>Spending Insights</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={90} label>
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Cards Section ================= */}
<section className="dashboard-extra">
  <motion.div
    className={`dashboard-box cards-container ${darkMode ? "dark" : ""}`}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="cards-title">💳 Your Cards</h2>
    <button className="add-card-btn" onClick={handleAddCard}>
      + Add Card
    </button>

    <div className="cards-grid small-cards">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="card-item creative-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ scale: 1.07, rotate: 1 }}
        >
          <div className="card-header">
            <h4 className="card-name">{card.name}</h4>
          </div>
          <p className="card-balance">
            {editingId === card.id ? (
              <input
                type="number"
                min="0"
                step="0.01"
                value={balanceInput}
                onChange={(e) => setBalanceInput(e.target.value)}
                placeholder="Enter amount"
              />
            ) : (
              `$${card.balance.toFixed(2)}`
            )}
          </p>

          {editingId === card.id ? (
            <div className="card-actions">
              <button className="save-btn" onClick={() => handleSaveMoney(card.id)}>Save</button>
              <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            <button className="add-money-btn" onClick={() => handleAddMoney(card)}>Add Money</button>
          )}
        </motion.div>
      ))}
    </div>
  </motion.div>
</section>




      {/* ================= Tax Section ================= */}
<div className="tax-section">
  <div className="tax-box">
    {/* Left Text */}
    <div className="tax-text">
      <h2>Missed the tax deadline? We got you.</h2>
      <p>
        Credit Karma and TurboTax are joining forces to help you file fast and get
        your max refund, so you can stop stressing and start making progress.
      </p>
      <button className="promo-btn">Let’s file</button>
    </div>

    {/* Right Image */}
    <div className="tax-image">
      <img src="/images/tax-deadline.png" alt="Tax Help" />
    </div>
  </div>
</div>

    </div>
  );
}
