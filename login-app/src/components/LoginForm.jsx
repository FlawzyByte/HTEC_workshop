import { useState } from "react";
import Input from "../../../base-components/src/components/Input/Input";
import Button from "../../../base-components/src/components/Button/Button";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

 const navigate = useNavigate();

  console.log(data)
  function onEmailChange (enteredEmail) {
    setData((previous) => ({...previous, email: enteredEmail }));
  }
 
  const onPasswordChange = (enteredPassword) => {
    setData((previous) => ({...previous, password: enteredPassword }));
  }

  const handleSubmit= (e) => {
  e.preventDefault();
  navigate("/dashboard");
  }
  
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="form">
      <h1 className="header">
        Hey You! 👋 <br></br> Ready to dive back in? Log in below!
      </h1>
      <Input placeholder="Enter your email" value={data.email} onChange={(e) => onEmailChange(e.target.value)}/>
      <Input placeholder="Enter your password" type="password"value={data.password} onChange={(e) => onPasswordChange(e.target.value)}/>
      <button type="submit" variant="secondary">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
