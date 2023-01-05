import React from "react";
import styles from "./StepName.module.css";

const StepName = ({onNext}) => {
  return (
    <>
      <div>name </div>
      <button onClick={onNext}>Next</button>
    </>
  );
};

export default StepName;
