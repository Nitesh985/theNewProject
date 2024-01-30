import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "../context/UserContext";

function Protected({ children, authentication = true }) {
  const {user} = useUserContext()
  const authStatus = !!user;
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/sign-in");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [navigate, authentication, authStatus]);
  if (loader)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}

export default Protected;
