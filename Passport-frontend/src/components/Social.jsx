import React from "react";
import googlelogo from "../assets/google.svg";
import facebooklogo from "../assets/facebook.svg";
import instagramlogo from "../assets/instagram.svg";
import linkedinlogo from "../assets/linkedin.svg";
import xlogo from "../assets/x.svg";
import discord from "../assets/discord.svg";

const Socail = () => {
  return (
    <>
      <div className="flex-row">
        <div className="social">
          <img
            src={googlelogo}
            alt=""
            onClick={() =>
              (window.location.href = "http://localhost:9900/auth/google")
            }
          />
          <img
            src={facebooklogo}
            alt=""
            onClick={() =>
              (window.location.href = "http://localhost:9900/auth/facebook")
            }
          />
          <img
            src={linkedinlogo}
            alt=""
            onClick={() =>
              (window.location.href = "http://localhost:9900/auth/linkedin")
            }
          />
          <img
            src={discord}
            alt=""
            onClick={() =>
              (window.location.href = "http://localhost:9900/auth/discord")
            }
          />
          <img
            src={xlogo}
            alt=""
            onClick={() =>
              (window.location.href = "http://localhost:9900/auth/twitter")
            }
          />
          <img
            src={instagramlogo}
            alt=""
            onClick={() =>
              (window.location.href = "http://localhost:9900/auth/instagram")
            }
          />
        </div>
      </div>
    </>
  );
};

export default Socail;
