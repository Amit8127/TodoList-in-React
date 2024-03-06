import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/userServices";
import { toast } from "react-toastify";
import  ReactLoading  from 'react-loading';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();

      // Validation
      const { name, username, email, password, confirmPassword } = formData;
      const newErrors = {};

      if (!name) {
        newErrors.name = "Name is required";
      }

      if (!username) {
        newErrors.username = "Username is required";
      }

      if (!email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Invalid email address";
      }

      if (!password) {
        newErrors.password = "Password is required";
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = "Confirm Password is required";
      } else if (confirmPassword !== password) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        // Form is valid, proceed with submission or API call
        const response = await signUp(formData);

        if (response.status !== 201) {
          toast.error(response.message);
          return;
        }

        toast.success(response.message);
        navigate("/login");

        setFormData({
          name: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({
          name: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <nav className="bg-dark">
        <h2 className="logo">Todo App</h2>
      </nav>
      {loading ? (
        <div className="loading-overlay">
          <ReactLoading
            type={"spokes"}
            color={"#316cf4"}
            width={100}
          />
        </div>
      ) : (
        <div className="pt-3">
          <form
            className="mx-auto card shadow-lg w-50 p-3"
            onSubmit={handleSubmit}
          >
            <h2 className="text-center">SignUp Page</h2>
            <div className="mb-1 text-start">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-control ${
                  errors.name ? "is-invalid" : ""
                } form-control`}
              />
              <div className="invalid-feedback">{errors.name}</div>
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control ${
                  errors.email ? "is-invalid" : ""
                } form-control`}
              />
              <div className="invalid-feedback">{errors.email}</div>
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                } form-control`}
              />
              <div className="invalid-feedback">{errors.username}</div>
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password}</div>
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password:
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary"
            >
              Sign Up
            </button>

            <p className="pt-3 m-0" style={{ textAlign: "center" }}>
              Already have an Account? Click here to{" "}
              <span
                style={{
                  color: "#316cf4",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/login")}
              >
                LogIn.
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupPage;
