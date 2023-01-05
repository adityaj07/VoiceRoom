import React, { useState } from "react";
// import styles from "./Authenticate.module.css";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../Steps/StepOtp/StepOtp";

const steps = {
  1: StepPhoneEmail, //It is like if its state=1 then show this component and likewise others too
  2: StepOtp, //will be having only two steps for Authenticate
};

const Authenticate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  function onNext() {
    setStep(step + 1);
  }

  return (
    <Step
      onNext={onNext} //Instead on 'onNext' prop drilling, we can use context Api
    />
  );
};

export default Authenticate;
