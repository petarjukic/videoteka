import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    window.location.href = "/";
  }, []);

  return (
    <>
      <div>Logout</div>
      <button onClick={() => navigate("/")}>Go home</button>
    </>
  );
};

export default Logout;
