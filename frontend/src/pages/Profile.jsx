import { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
  });
  const [preview, setPreview] = useState(""); // for image preview

  // Get logged-in user ID from localStorage
  const userId = localStorage.getItem("userId");

  // Fetch user data on page load
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${userId}`);
        setUser(res.data);
        setPreview(res.data.profile_pic);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [userId]);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile picture upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setUser((prev) => ({ ...prev, profile_pic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit updated user to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/users/${userId}`, user);
      setUser(res.data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="profile-page">

      {/* Profile form section */}
      <div className="profile-section">
        <h1 className="profile-title">Your Profile</h1>

        <form onSubmit={handleSubmit} className="profile-form">
          {/* Profile Picture Upload */}
          <div className="profile-picture-container">
            <img
              src={preview || "/images/default-profile.png"}
              alt="Profile"
              className="profile-picture"
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          {/* Name */}
          <label>Name</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} />

          {/* Email */}
          <label>Email</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />

          <button type="submit">Update Profile</button>
        </form>
      </div>

      {/* Secure Login Section */}
      <div className="secure-login-section">
        <div className="secure-login-box">
          <div className="secure-login-text">
            <h2>Secure Login</h2>
            <p>
              Your account is protected with industry-standard encryption. Only authorized users can access this account.
              Advanced security protocols keep your data safe.
              Experience a secure and luxurious interface while managing your profile.
            </p>
          </div>
          {/* Direct image (no visible box wrapper) */}
          <div className="secure-login-image">
            <img src="/images/security.png" alt="Secure Login" />
          </div>
        </div>
      </div>  

    </div>
  );
}
