import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../services/userServices";
import { doLogedIn } from "../auth/auth";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
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
      const { email, password } = formData;
      const newErrors = validateForm(email, password);

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        // Form is valid, proceed with login submission or API call
        try {
          const response = await logIn(formData);

          if (response.status !== 200) {
            toast.error(response.message);
            return;
          }
          doLogedIn(true);
          toast.success(response.message);
          navigate("/user/dashboard");

          setFormData({
            email: "",
            password: "",
          });
          setErrors({
            email: "",
            password: "",
          });
        } catch (error) {
          toast.error("An error occurred:", error);
        }
      }
    } catch (error) {
      toast.error("An error occurred:", error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (email, password) => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email or Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  return (
    <>
      <nav className="bg-dark">
        <h2 className="logo">Todo App</h2>
      </nav>
      {loading ? (
        <div className="loading-overlay">
          <ReactLoading type={"spokes"} color={"#316cf4"} width={100} />
        </div>
      ) : (
        <div className="pt-3">
          <form
            className="mx-auto card shadow-lg w-50 p-3"
            onSubmit={handleSubmit}
          >
            <h2 className="text-center">LogIn Page</h2>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label">
                Email or Username:
              </label>
              <input
                type="text"
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

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary"
            >
              Log In
            </button>
            <p className="pt-3 m-0" style={{ textAlign: "center" }}>
              Don't have an Account? Click here to{" "}
              <span
                style={{
                  color: "#316cf4",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/signup")}
              >
                SignUp.
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginPage;
