import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../global/button/Button";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import { authService } from "../../../services/auth.service";
import { errorHandler } from "../../../utils/errorHandler";

import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import { useRouter } from "next/router";

import NiceModal from "@ebay/nice-modal-react";

/**
 * VerifyEmailModules component handles the verification of OTP (One-Time Password).
 * It allows users to submit an OTP for email verification and handles the submission of the OTP form.
 * Additionally, it provides functionality to resend OTP and handles OTP input change.
 * @returns {JSX.Element} The JSX element representing the VerifyEmailModules component.
 */
const VerifyEmailModules = (): JSX.Element => {
  // Next.js router hook for navigation
  const router = useRouter();

  // Next.js router query object
  const { query } = useRouter();

  // State for storing OTP value
  const [otp, setOtp] = useState<string>("");

  // Reference to OTP input element
  const inputRef = useRef<HTMLInputElement>(null);

  // Custom hook for handling debounced click events
  const [handleClick, loadingStates] = useDebouncedClick(setOtp);

  /**
   * Function for handling form submission.
   * Sends request to authentication service to verify email using provided OTP.
   * Redirects user to appropriate routes based on the response.
   * @returns {Promise<void>} A promise representing the form submission operation.
   */
  const handleSubmit = async (): Promise<void> => {
    // Handle click event using debounced click handler
    handleClick(
      async () => {
        try {
          // Extract email from query parameters
          let formatEmail = query.otp_token as string;
          if (!formatEmail) {
            toast.error("Email is required");
            return;
          }

          // Send request to verify email using OTP
          let response = await authService.verifyEmail2FA({
            otp,
            isVerifyEmail: true,
            email: formatEmail,
          });
          NiceModal.show("accountVerified", { response, formatEmail });
        } catch (error: unknown) {
          // Handle error
          errorHandler(error);
        }
      },
      "loading",
      ""
    );
  };

  /**
   * Function for resending OTP.
   * Sends request to authentication service to resend OTP to the user's email address.
   * @returns {Promise<void>} A promise representing the OTP resend operation.
   */
  const ResendOTP = async (): Promise<void> => {
    try {
      // Extract email from query parameters
      let formatEmail = query.otp_token as string;
      if (!formatEmail) {
        toast.error("Email is required");
        return;
      }

      // Send request to resend OTP
      let response = await authService.resendOTPHandler({ email: formatEmail });
      setTimeLeft(60);

      // Display success message
      toast.success(response?.message);
    } catch (error: unknown) {
      // Handle error
      errorHandler(error);
    }
  };

  /**
   * Function for handling OTP input change.
   * Validates and updates the OTP state based on the entered value.
   * @param {string} value - The new value of the OTP input.
   */
  const handleChange = (value: string) => {
    // Validate if the entered value is a number
    if (!isNaN(Number(value)) && !value.includes(".")) {
      setOtp(value);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/^\d$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "v" && // Allow 'v' key for paste (Ctrl+V or Cmd+V)
      !(e.metaKey || e.ctrlKey)
    ) {
      handleSubmit();
      e.preventDefault();
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("text");
    if (/^\d*$/.test(pastedData) && pastedData.length <= 4) {
      setOtp(pastedData);
    } else {
      e.preventDefault();
    }
  };
  const [timeLeft, setTimeLeft] = useState(60); // Initialize the timer with 60 seconds

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  return (
    <>
      <div className="mb-10">
        <legend className="fs-32 mb-2 text-center font-semibold text-white">
          OTP Verification
        </legend>

        <p className="text-center text-sm text-dark-50">
          We have sent a 4-character code to{" "}
          <span className="text-primary-100">
            {" "}
            {` ${(query.otp_token as string) ?? ""} `}{" "}
          </span>{" "}
          Please enter it soon, as it expires shortly.
        </p>
      </div>
      <div className="form-group otpinput-box mb-8">
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={4}
          renderInput={(props) => (
            <input {...props} onKeyDown={handleKeyDown} onPaste={handlePaste} />
          )}
          renderSeparator={<span>-</span>}
        />
      </div>
      <div className="form-group mb-8">
        <Button
          size="lg"
          disabled={loadingStates["loading"] || !otp || otp.length < 4}
          isLoading={loadingStates["loading"]}
          onClick={handleSubmit}
          color="primary"
          className="w-full uppercase"
        >
          Verify
        </Button>
      </div>
      <div className="flex items-center justify-center gap-1">
        <button
          onClick={() => handleClick(ResendOTP, "loading2")}
          disabled={loadingStates["loading2"] || timeLeft > 0}
          type="button"
          className="text-aluminium"
        >
          Resend OTP
        </button>
        <span className="text-base text-primary-100">{timeLeft}s</span>
      </div>
    </>
  );
};

export default VerifyEmailModules;
