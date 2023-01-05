import React from "react";
import { Link } from "react-router-dom"; //by using this link component over html's link tag, we ensure that by clickig on it the page doesnt get refreshed.....'/' means home page.....first '/' in img tag's src points to public folder
import styles from "./Navigation.module.css"; // This module css wont work inside the react dom's Link component as that is the child component of the main component and css only works for the main(parent) component as module is of parent component.....so the logo(link) cannot be styled by module's css, instead we need to use inline css for it, that is to create an object 'brandStyle'

const Navigation = () => {
  {
    //inline css below
  }
  const brandStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };
  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img src="/images/logo50.png" alt="logo" />
        <span style={logoText}>VoiceRoom</span>
      </Link>
    </nav>
  );
};

export default Navigation;
