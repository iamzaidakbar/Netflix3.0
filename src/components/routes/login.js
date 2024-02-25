import logo from "../../assets/logo/netflix-logo.png";
import { useState } from "react";
import useFormValidation from "../../Utils/API/useValidations";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Utils/firebase";
import "../../styles/login.scss";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { errors, validateInput } = useFormValidation();
  const navigate = useNavigate();

  const validate = () => {
    return !email || !password || errors.email || errors.password;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateInput(name, value);
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate) {
      setError("Invalid credentials");
    } else {
      setError("");
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("token", user.accessToken);
          navigate("/update-avatar");
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
        });
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
          value={email}
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
          value={password}
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
