import React, { createContext, useContext, useEffect, useState } from "react";
import "./toast.css";
import CheckIcon from "./checked.png"

export const ToastContext = createContext();

export const ToastContainer = ({ children }) => {
  const [isShowed, setIsShowed] = useState(false);
  const [toastMessage, setToastMessage] = useState();

  const showToast = (message) => {
    setIsShowed(true);
    setToastMessage(message);
  };

  return (
    <ToastContext value={{ isShowed, setIsShowed, showToast, toastMessage }}>
      {children}
      <Toast />
    </ToastContext>
  );
};

function Toast() {
  const { isShowed, setIsShowed, toastMessage } = useContext(ToastContext);

  useEffect(() => {
    let closeToast;

    if (isShowed) {
      closeToast = setTimeout(() => setIsShowed(false), 4500);
    }

    return () => {
      clearTimeout(closeToast);
    };
  }, [isShowed]);

  return (
    <div className={`toast ${isShowed && "toast-showed"}`}>
      <div className="toast-header">
        <div className="toast-header-left">
          <img src={CheckIcon} alt="Icon" />
          <h2>Success</h2>
        </div>
        <button onClick={() => setIsShowed(false)}>X</button>
      </div>
      <div className="toast-content">
        <p>{toastMessage}</p>
      </div>
    </div>
  );
}

export default Toast;
