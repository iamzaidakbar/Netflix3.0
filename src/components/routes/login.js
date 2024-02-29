import logo from "../../assets/logo/netflix-logo.png";
import { useEffect, useState } from "react";
import useFormValidation from "../../Utils/API/useValidations";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Utils/firebase";
import "../../styles/login.scss";
import { useNavigate } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { errors, validateInput } = useFormValidation();
  const navigate = useNavigate();

  useEffect(()=>{
    document.title = "Login - Netflix";
  },[])

  const validate = () => {
    return (
      !formData.email || !formData.password || errors.email || errors.password
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateInput(name, value);

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate) {
      setError("Invalid credentials");
      return;
    }

    setError("");

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/select-profile");
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    }
  };

  return (
    <div className="login">
      <div className="header">
        <div className="logo-wrapper">
          <img width={150} src={logo} alt="Netflix Logo" />
        </div>
        <div className="actions">
          <span className="dropdown">
            <select name="languages" id="lang">
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
            </select>
          </span>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="login-button"
          >
            Sign Up
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="signin-form">
        <label>Sign In</label>
        <input
          name="email"
          type="text"
          placeholder="Email address"
          onChange={handleInputChange}
          value={formData.email}
          style={{
            borderColor: errors.email && "red",
            outline: errors.email && "red",
          }}
        />
        {errors.email && (
          <span className="error-message">
            <span className="material-icons-outlined">clear</span>
            <span className="message">{errors.email}</span>
          </span>
        )}
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleInputChange}
          value={formData.password}
          style={{
            borderColor: errors.password && "red",
            outline: errors.password && "red",
          }}
        />
        {errors.password && (
          <span className="error-message">
            <span className="material-icons-outlined">clear</span>
            <span className="message">{errors.password}</span>
          </span>
        )}
        {error && (
          <span className="error-message">
            <span className="material-icons-outlined">clear</span>
            <span className="message">{error}</span>
          </span>
        )}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
