import "../../styles/signup.scss";
import logo from "../../assets/logo/netflix-logo.png";
import { useState } from "react";
import useFormValidation from "../../Utils/API/useValidations";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Utils/firebase";
import { useNavigate } from "react-router";

const Signup = () => {
  const [active, setActive] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { errors, validateInput } = useFormValidation();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateInput(name, value);
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleGetStarted = () => {
    if (!errors.email && email.length > 0) {
      console.log(email);
      setShowSignup(true);
    }
  };

  const validate = () => {
    return (
      !email ||
      !password ||
      !confirmPassword ||
      errors.email ||
      errors.password ||
      errors.confirmPassword
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate) {
      console.log(name, email, password, confirmPassword);
      setError("Invalid credentials");
    } else {
      setError("");
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("token", user.accessToken);
          console.log(user);
          navigate("/update-avatar");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + errorMessage);
        });
    }
  };

  return (
    <div className="signup">
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
              navigate("/login");
            }}
            className="login-button"
          >
            Sign in
          </button>
        </div>
      </div>
      <div className="body-wrapper">
        <div className={`body ${showSignup ? "active" : ""}`}>
          <div className="membership">
            <span className="label-1">Unlimited movies, TV shows and more</span>
            <span className="label-2">Watch anywhere. Cancel anytime.</span>
            <span className="label-3">
              Ready to watch? Enter your email to create your membership.
            </span>
            <span className="form">
              <div className="fields">
                <div
                  className={`input-field ${
                    active || email.length > 0 ? "active" : ""
                  }`}
                >
                  <label>Email address</label>
                  <input
                    name="email"
                    type="text"
                    onFocus={() => setActive(true)}
                    onBlur={() => setActive(false)}
                    onChange={handleInputChange}
                    style={{
                      borderColor: errors.email && "red",
                      outline: errors.email && "red",
                    }}
                  />
                </div>
                <button onClick={handleGetStarted}>
                  <span>Get Started</span>
                  <span className="material-icons-outlined">
                    arrow_forward_ios
                  </span>
                </button>
              </div>
              {errors.email && (
                <span className="error-message">
                  <span className="material-icons-outlined">clear</span>
                  <span className="message">{errors.email}</span>
                </span>
              )}
            </span>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="signup-form">
            <label>Sign Up</label>

            <input
              name="email"
              type="text"
              placeholder="Email address"
              onChange={handleInputChange}
              value={email}
              disabled
              style={{
                borderColor: errors.email && "red",
                outline: errors.email && "red",
              }}
            />
            {errors.email && (
              <span classemail="error-message">
                <span className="material-icons-outlined">clear</span>
                <span className="message">{errors.name}</span>
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
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              onChange={handleInputChange}
              value={confirmPassword}
              style={{
                borderColor: errors.confirmPassword && "red",
                outline: errors.confirmPassword && "red",
              }}
            />
            {errors.confirmPassword && (
              <span className="error-message">
                <span className="material-icons-outlined">clear</span>
                <span className="message">{errors.confirmPassword}</span>
              </span>
            )}
            {error && (
              <span className="error-message">
                <span className="material-icons-outlined">clear</span>
                <span className="message">{error}</span>
              </span>
            )}
            <button type="submit">Sign Up</button>
            <span onClick={() => setShowSignup(false)} className="change-email">
              Change email address
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
