import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { useState } from "react";
import emailvalidation from "../../utilities/helper";
import PasswordInput from "../../components/Password/PasswordInput";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const handleLogin = (e) => {
    e.preventDefault();


    if (!name) {
      setError("Please enter a valid Name.");
      return;
    }

    if (!emailvalidation(email)) {
      setError("Please enter a valid email.");
      return;
    }


    if (!password) {
      setError("Please enter a valid password.");
      return;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex align-items-center justify-content-center mt-8 w-100">
        <form onSubmit={handleLogin} className="flex flex-column gap-2 p-4 border-round shadow-2 w-28rem">
          <h2 className="text-center">Signup</h2>

          <label htmlFor="email">Name:</label>
          <InputText 
            id="email" 
            placeholder="Enter your Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="p-inputtext w-full"
          />
          
          <label htmlFor="email">Email:</label>
          <InputText 
            id="email" 
            aria-describedby="email-help" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="p-inputtext w-full"
          />

          <label htmlFor="password">Password:</label>
          <PasswordInput 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />

          {error && <p className="text-danger">{error}</p>}

          <Button severity="info" label="Login" type="submit" className="w-full mt-3" />
          
          <p className="text-center mt-2">
            Already Have an Account? <Link to="/login">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
