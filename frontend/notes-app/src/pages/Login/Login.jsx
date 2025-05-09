import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState } from "react";
import emailvalidation from "../../utilities/helper";
import PasswordInput from "../../components/Password/PasswordInput";
import axiosInstance from "../../utilities/axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailvalidation(email)) {
      setError("Please enter a valid email.");
      return;
    }


    if (!password) {
      setError("Please enter a valid password.");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem( "token", response.data.accessToken)
        navigate('/dashboard')
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError (error.response.data.message);
      }
      else {
        setError ("An unezxpected error Occured")
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex align-items-center justify-content-center mt-8">
        <form onSubmit={handleLogin} className="flex flex-column gap-2 p-4 border-round shadow-2 w-25">
          <h2 className="text-center">Login</h2>
          
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
            Not registered yet? <Link to="/signup">Create Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
