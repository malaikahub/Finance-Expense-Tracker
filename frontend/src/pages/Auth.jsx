import { useState } from "react";
import axios from "axios";
import "./Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(""); // <-- new state for error messages

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset previous error
    try {
      if (isLogin) {
        const res = await axios.post("/api/users/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("userId", res.data.userId);
        alert(res.data.message);
        window.location.href = "/profile";
      } else {
        const res = await axios.post("http://localhost:5000/api/users/signup", form);;
        alert(res.data.message);
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        {error && <p className="error-message">{error}</p>} {/* show error */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password (digits)"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p className="switch-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)} className="switch-link">
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
