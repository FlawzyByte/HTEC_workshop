import React from "react";
import "./button.css";

function Button({ variant, type, onClick, children }) {
  const colors = {
    primary: "button-primary",
    secondary: "button-secondary",
  };

  return (
    <button
      className={`button ${colors[variant]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
