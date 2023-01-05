import React from "react";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../Components/Shared/Card/Card";
import Button from "../../Components/Shared/Button/Button";

const Home = () => {
  const signInLinkStyle = {
    color: "#fcc419",
    textDecoration: "none",
  };

  const navigate = useNavigate();
  {
    // the above called function is naviagte hook used to redirect on button click here
  }
  function startRegister() {
    navigate("/authenticate");
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to VoiceRoom!" icon="logo64">
        {
          // content passed here is known as children and is passed as prop to the card component
        }
        <p className={styles.paragraph}>
          Welcome to VoiceRoom, the ultimate chat app for those who love to
          communicate through their voice! With VoiceRoom, you can connect with
          friends and family, or even make new friends from around the world,
          all while enjoying the convenience and intimacy of voice-based
          conversations.
        </p>
        <div>
          <Button onClick={startRegister} text="Let's Chat" />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Are you late to the party?</span>
          <Link style={signInLinkStyle} to="/login">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
