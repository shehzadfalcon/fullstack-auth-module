import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import BasicModal from "../../global/basicmodal/BasicModal";
import { Button } from "../../global/button/Button";
import Image from "next/image";
import { UN_AUTHENTICATED_ROUTES } from "../../../constants/routes";
import { useRouter } from "next/router";

import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import { images } from "../../../assets/images";

/**
 * Component for displaying the OTP verification modal.
 * @param {Object} props - The props for the OtpVerified component.
 * @param {string} props.otp - The OTP code to be verified.
 * @returns {JSX.Element} - The OTP verification modal JSX element.
 */
const OtpVerified = NiceModal.create(({ otp }: { otp: string }) => {
  const router = useRouter();
  const [handleClick, loadingStates] = useDebouncedClick();

  const modal = useModal();

  /**
   * Handles the authentication process after OTP verification.
   */
  const handleAuth = () => {
    handleClick(async () => {
      modal.remove();
      let route = UN_AUTHENTICATED_ROUTES.RESET_PASSWORD as Function;
      router.push(route(otp));
    }, "verifyOTPLoading");
  };

  return (
    <BasicModal show={modal.visible} hide={modal.hide} close notOnsideclick>
      <div className="flex w-full flex-col items-center rounded-[20px] bg-blackRussian2 p-5 sm:w-[538px] md:p-10">
        <figure className="mx-auto h-[234px] w-[234px]">
          <Image
            src={images.successGif}
            width={234}
            height={234}
            alt="email send image"
          />
        </figure>
        <h2 className="fs-24 mb-2.5 font-medium leading-[30px]">
          OTP Verified
        </h2>
        <p className="mb-8 text-base text-dark-50">
          Your otp has been verified successfully.
        </p>
        <Button
          className="!w-full"
          size="lg"
          onClick={handleAuth}
          isLoading={loadingStates["verifyOTPLoading"]}
          disabled={loadingStates["verifyOTPLoading"]}
        >
          Continue
        </Button>
      </div>
    </BasicModal>
  );
});

export default OtpVerified;
