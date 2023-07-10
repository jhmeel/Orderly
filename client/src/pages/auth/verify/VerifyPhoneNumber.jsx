import React from 'react'
import 'style.css'

const VerifyPhoneNumber = () => {
  return (
    <div>VerifyPhoneNumber</div>
  )
}

export default VerifyPhoneNumber

/*
import React, { useState, useEffect, useRef } from "react";

const TwoStepVerification = () => {
  const [otp, setOTP] = useState("");
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const otpInputRef = useRef(null);

  useEffect(() => {
    let intervalId;

    if (isTimerRunning && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
      setIsTimerRunning(false);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning, timer]);

  useEffect(() => {
    const otpInput = otpInputRef.current;

    if (otpInput && otpInput.value !== "") {
      setOTP(otpInput.value);
      handleFormSubmit(new Event("submit"));
    } else {
      handleResendClick();
    }
  }, []);

  const handleInputChange = (event) => {
    setOTP(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await navigator.credentials.get({
        otp: { transport: ["sms"] },
        signal: new AbortController().signal,
      });

      const otpValue = result.code;

      if (otpValue === otp) {
        setIsSuccess(true);
        setIsTimerRunning(false);
      } else {
        setErrorMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error verifying OTP. Please try again.");
    }
  };

  const handleResendClick = async () => {
    try {
      await navigator.credentials.get({
        otp: { transport: ["sms"] },
        signal: new AbortController().signal,
      });

      setIsResendDisabled(true);
      setIsTimerRunning(true);
      setTimer(30);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error resending OTP. Please try again.");
    }
  };

  return (
    <div>
      {!isSuccess ? (
        <>
          <h1>Two-Step Verification</h1>
          <p>Please enter the OTP sent to your mobile number:</p>

          <form onSubmit={handleFormSubmit}>
            <label htmlFor="otpInput">OTP:</label>
            <input
              type="text"
              id="otpInput"
              name="otp"
              value={otp}
              onChange={handleInputChange}
              ref={otpInputRef}
            />

            <button type="submit">Verify</button>
          </form>

          {errorMessage && <p className="error">{errorMessage}</p>}

          <p>
            OTP will expire in {timer} seconds.{" "}
            {isResendDisabled ? (
              <span>Resend OTP in {timer} seconds.</span>
            ) : (
              <button onClick={handleResendClick}>Resend OTP</button>
            )}
          </p>
        </>
      ) : (
        <>
          <h1>Success</h1>
          <p>You have successfully verified your account.</p>
        </>
      )}
    </div>
  );
};

export default TwoStepVerification
*/


/*
import React, { useRef } from "react";

function AuthTokenInput() {
  const inputRefs = useRef([]);

  function handleInputChange(index, event) {
    const input = event.target;
    const nextInput = inputRefs.current[index + 1];

    if (input.value && nextInput) {
      nextInput.focus();
    }
  }

  function handleInputKeyPress(index, event) {
    const input = event.target;

    if (input.value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  return (
    <div className="auth-token-input">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <input
          key={index}
          type="number"
          maxLength={1}
          autoFocus={index === 0}
          ref={(element) => (inputRefs.current[index] = element)}
          onChange={(event) => handleInputChange(index, event)}
          onKeyPress={(event) => handleInputKeyPress(index, event)}
        />
      ))}
    </div>
  );
}

// Example usage:
function App() {
  return (
    <div className="app">
      <h1>Enter your authentication token:</h1>
      <AuthTokenInput />
    </div>
  );
}


# or



import { useState } from "react";

function AuthTokenInput() {
  const [tokenValues, setTokenValues] = useState(Array(6).fill("")); // Initialize the input values to an array of 6 empty strings

  function handleTokenChange(event, index) {
    const value = event.target.value; // Get the new value of the input
    const newValues = [...tokenValues]; // Create a copy of the current input values array
    newValues[index] = value; // Update the value at the specified index
    setTokenValues(newValues); // Update the state with the new input values
  }

  return (
    <div>
      {tokenValues.map((value, index) => (
        <input
          key={index}
          type="number"
          maxLength="1"
          value={value}
          onChange={(event) => handleTokenChange(event, index)}
        />
      ))}
    </div>
  );
}

// Example usage:
function App() {
  return (
    <div>
      <h1>Enter your authentication token:</h1>
      <AuthTokenInput />
    </div>
  );
}






*/