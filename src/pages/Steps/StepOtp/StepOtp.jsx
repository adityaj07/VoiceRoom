import React, { useState } from "react";
import Card from "../../../Components/Shared/Card/Card";
import Button from "../../../Components/Shared/Button/Button";
import TextInput from "../../../Components/Shared/TextInput/TextInput";
import styles from "./StepOtp.module.css";

const StepOtp = ({ onNext }) => {
  const [{ otp, setOtp }] = useState("");
  function next() {}
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just texted you" icon="lock">
          {
            // content passed here is known as children and is passed as prop to the card component
          }
          <TextInput
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
          <div className={styles.paragraphWrapper}>
            <p className={styles.paragraph}>Didn’t receive? Tap to resend</p>
          </div>
          <div>
            <div className={styles.actionButtonWrap}>
              <Button onClick={next} text="Next" />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
