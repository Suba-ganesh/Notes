import { Link } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Password/PasswordInput";
import axiosInstance from "../../utilities/axios";
import Navbar from "../../components/Navbar/Navbar";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // 

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log("Submitting Data:", { fullName: name, email, password });

    try {
        const response = await axiosInstance.post("/createaccount", {
            fullName: name,
            email: email,
            password: password,
        });

        console.log("Response from backend:", response.data);

        if (response.data && response.data.accessToken) {
            localStorage.setItem("token", response.data.accessToken);
            navigate("/login");
        }
    } catch (error) {
        console.error("Signup Error:", error);
        if (error.response) {
            console.error("Backend Response:", error.response.data);
            setError(error.response.data.message || "An unexpected error occurred.");
        } else {
            setError("An unexpected error occurred.");
        }
    }
};


  return (
    <div>
      <Navbar />
      <div className="flex align-items-center justify-content-center mt-8 w-100">
        <form onSubmit={handleSignup} className="flex flex-column gap-2 p-4 border-round shadow-2 w-28rem">
          <h2 className="text-center">Signup</h2>

          <label htmlFor="name">Name:</label>
          <InputText 
            id="name" 
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

          <Button severity="info" label="Signup" type="submit" className="w-full mt-3" />
          
          <p className="text-center mt-2">
            Already Have an Account? <Link to="/login">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
