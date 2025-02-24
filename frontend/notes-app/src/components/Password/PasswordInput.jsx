import React, { useState } from "react";

const PasswordInput = ({ value, placeholder, onChange }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Password Input Field */}
      <input
        type={isShowPassword ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="p-inputtext w-full"
        style={{
          width: "100%",
          paddingRight: "40px", // Make space for the icon
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "16px"
        }}
      />

      <i
        className={`pi ${isShowPassword ? "pi-eye" : "pi-eye-slash"}`}
        onClick={toggleShowPassword}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          fontSize: "1.2rem",
          color: "#666"
        }}
      />
    </div>
  );
};

export default PasswordInput;
