import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import crypto from "crypto-js";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const decryptData = (encryptedData) => {
    const bytes = crypto.AES.decrypt(
      encryptedData,
      import.meta.env.VITE_ENCRYPTION_KEY
    );
    return JSON.parse(bytes.toString(crypto.enc.Utf8));
  };

  useEffect(() => {
    let query = localStorage.getItem("userDetails") || null;
    if (query) {
      let data = JSON.parse(query);
      console.log(data);
      setUser(data);
    } else {
      query = new URLSearchParams(location.search);
      const encryptedUser = query.get("data");

      if (encryptedUser) {
        try {
          // Define your encryption key
          const decryptedUser = decryptData(decodeURIComponent(encryptedUser));
          setUser(decryptedUser);
          console.log(decryptedUser, "decryptedUser");
          localStorage.setItem("userDetails", JSON.stringify(decryptedUser));
        } catch (error) {
          console.error("Error decrypting user data:", error);
        }
      }
    }
  }, [location]);

  const submitLogout = async () => {
    localStorage.removeItem("userDetails");
    setUser(null);
    navigate(`/`);
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Access token copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      <div className="Main">
        <div className="card">
          {user ? (
            <>
              <div className="card-border-top"></div>
              <div className="img">
                <img src={user.profilePic} alt="User profile" />
              </div>
              <span>Welcome,</span>
              <span>{user.userName}</span>
              <p className="job">Email: {user.email}</p>
              <p className="job">
                Access Token: {user.accessToken.substring(0, 10)}...{" "}
                <button onClick={() => copyToClipboard(user.accessToken)}>
                  Copy
                </button>
              </p>
              <button onClick={submitLogout}>logout</button>
            </>
          ) : (
            <p>No user data available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPage;
