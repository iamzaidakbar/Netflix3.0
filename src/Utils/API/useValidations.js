// useFormValidation.js
import { useState } from "react";

const useFormValidation = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  const validateInput = (name, value) => {
    let newErrors = { ...errors };
    let newFormData = { ...formData };

    // Update form data
    newFormData[name] = value;
    setFormData(newFormData);

    // Your validation rules here
    switch (name) {
      case "name":
        // Example: Validate name (letters, numbers, and spaces allowed)
        const nameRegex = /^[a-zA-Z0-9\s._-]+$/;
        newErrors[name] = nameRegex.test(value)
          ? ""
          : "Invalid name (only letters, numbers, and spaces allowed)";
        break;
      case "email":
        // Example: Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        newErrors[name] = emailRegex.test(value) ? "" : "Invalid email address";
        break;
      case "password":
        // Example: Validate password (at least 6 characters)
        newErrors[name] = value.length >= 6
          ? ""
          : "Password should be at least 6 characters";
        break;
      case "confirmPassword":
        // Example: Confirm password match
        newErrors[name] = value === newFormData["password"] ? "" : "Passwords do not match";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  return { errors, validateInput };
};

export default useFormValidation;
