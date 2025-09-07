import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to dashboard - this is now handled by AppLayout
    navigate("/dashboard");
  }, [navigate]);

  return null;
};

export default Index;
