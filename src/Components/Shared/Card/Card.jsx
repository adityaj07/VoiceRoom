import React from "react";
import styles from "./Card.module.css";
//children is that prop which we put inside the component

const Card = ({ title, icon, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.headingWrapper}>
        <img src={`/images/${icon}.png`} alt="main-logo" />
        <h1 className={styles.heading}>{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default Card;
