import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Goals.css";

const Goals = () => {
  // ---------- State ----------
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({
    title: "",
    target_amount: "",
    current_amount: "",
    due_date: "",
    status: "ongoing",
  });

  // Replace with logged-in user ID (later from auth)
  const currentUserId = 1;

  // ---------- Fetch goals ----------
  const fetchGoals = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/goals/${currentUserId}`);
      setGoals(res.data);
    } catch (err) {
      console.error("Error fetching goals:", err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // ---------- Handlers ----------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.title || !form.target_amount) return;

    try {
      await axios.post("http://localhost:5000/api/goals", {
        user_id: currentUserId,
        title: form.title,
        target_amount: Number(form.target_amount),
        current_amount: Number(form.current_amount || 0),
        due_date: form.due_date,
        status: form.status,
      });

      // Refresh goals after saving
      await fetchGoals();

      // Reset form
      setForm({
        title: "",
        target_amount: "",
        current_amount: "",
        due_date: "",
        status: "ongoing",
      });
    } catch (err) {
      console.error("Error saving goal:", err);
    }
  };

  const handleEdit = async (id, field, value) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/goals/${id}`, {
        field,
        value,
      });
      setGoals(goals.map((g) => (g.id === id ? res.data : g)));
    } catch (err) {
      console.error("Error updating goal:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/goals/${id}`);
      setGoals(goals.filter((g) => g.id !== id));
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  // ---------- Chart Colors ----------
  const COLORS = ["#16a34a", "#d1d5db"];

  return (
    <div>
      {/* ---------- GOALS HERO ---------- */}
      <section className="goals-hero">
        <div className="goals-hero-overlay">
          <h1 className="goals-hero-title">Your Goals, Your Journey</h1>
          <p className="goals-hero-subtitle">
            Stay motivated and track your progress toward the future you want.
          </p>
        </div>
      </section>

      {/* ---------- GOALS SECTION ---------- */}
      <section className="goals-section">
        <motion.div
          className="goals-content"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="goals-title">Set Your Goals</h2>
          <p className="goals-description">
            Track your financial and personal goals with clear targets and timelines.
          </p>

          {/* ---------- Goal Form ---------- */}
          <div className="goal-form">
            <input
              type="text"
              name="title"
              placeholder="Goal Title"
              value={form.title}
              onChange={handleChange}
            />
            <input
              type="number"
              name="target_amount"
              placeholder="Target Amount"
              value={form.target_amount}
              onChange={handleChange}
            />
            <input
              type="number"
              name="current_amount"
              placeholder="Current Amount"
              value={form.current_amount}
              onChange={handleChange}
            />
            <input
              type="date"
              name="due_date"
              value={form.due_date}
              onChange={handleChange}
            />
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
            >
              Add Goal
            </motion.button>
          </div>

          {/* ---------- Goals Table ---------- */}
          <div className="goals-table-container">
            <table className="goals-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Target</th>
                  <th>Current</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {goals.map((goal) => {
                    const progress = Math.min(
                      Math.round(
                        (goal.current_amount / goal.target_amount) * 100
                      ),
                      100
                    );

                    const pieData = [
                      { name: "Completed", value: progress },
                      { name: "Remaining", value: 100 - progress },
                    ];

                    return (
                      <motion.tr
                        key={goal.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleEdit(goal.id, "title", e.target.textContent)
                          }
                        >
                          {goal.title}
                        </td>
                        <td
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleEdit(goal.id, "target_amount", e.target.textContent)
                          }
                        >
                          {goal.target_amount}
                        </td>
                        <td
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleEdit(goal.id, "current_amount", e.target.textContent)
                          }
                        >
                          {goal.current_amount}
                        </td>
                        <td
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleEdit(goal.id, "due_date", e.target.textContent)
                          }
                        >
                          {goal.due_date}
                        </td>
                        <td
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleEdit(goal.id, "status", e.target.textContent)
                          }
                        >
                          {goal.status}
                        </td>
                        <td>
                          <div className="progress-chart">
                            <ResponsiveContainer width={80} height={80}>
                              <PieChart>
                                <Pie
                                  data={pieData}
                                  innerRadius={25}
                                  outerRadius={35}
                                  paddingAngle={3}
                                  dataKey="value"
                                >
                                  {pieData.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={COLORS[index % COLORS.length]}
                                    />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                            <span className="progress-label">{progress}%</span>
                          </div>
                        </td>
                        <td>
                          <motion.button
                            className="btn-delete"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(goal.id)}
                          >
                            Delete
                          </motion.button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Goals;
