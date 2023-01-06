import React, { useState } from "react";
import Card from "../../../../Components/Shared/Card/Card";
import Button from "../../../../Components/Shared/Button/Button";
import TextInput from "../../../../Components/Shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  function submit() {
    //server request
    onNext();
  }

  return (
    <Card title="Enter your phone number" icon="phone">
      {
        // content passed here is known as children and is passed as prop to the card component
      }
      <TextInput
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" onClick={submit} />
        </div>
      </div>
      <div className={styles.paragraphWrapper}>
        <p className={styles.paragraph}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
