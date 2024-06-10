import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import BasicModal from "../../global/basicmodal/BasicModal";
import Image from "next/image";
import { useRouter } from "next/router";
import { HttpService } from "../../../services/base.service";
import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import { images } from "../../../assets/images";
import { EAUTH_ROUTES } from "../../../enums/routes.enum";
import { Button } from "../../global/button/Button";

/**
 * Props for the AccountVerified component.
 * @interface AccountVerifiedProps
 * @property {any} response - The response data from verification.
 */
interface AccountVerifiedProps {
  response: any;
}

/**
 * AccountVerified component to display modal for verified account.
 * @param {AccountVerifiedProps} props - The props for the AccountVerified component.
 * @returns {JSX.Element} - The AccountVerified JSX element.
 */
const AccountVerified = NiceModal.create(({ response }: any) => {
  const router = useRouter();
  const [handleClick, loadingStates] = useDebouncedClick();
  const modal = useModal();

  /**
   * Handle authentication process after account verification.
   */
  const handleAuth = () => {
    handleClick(async () => {
      // Extract token, full name, email from response
      const token: string = response?.payload?.token ?? "";
      const fullName = response?.payload?.user.fullName ?? "";
      const email = response?.payload?.user.email ?? "";

      // Set authentication token and cookies
      HttpService.setToken(token);
      HttpService.setCookie("token", token);
      HttpService.setCookie("fullName", fullName.split(" ").join("_"));
      HttpService.setCookie("email", email);
      modal.remove();

      // Redirect user to the home route
      let route = EAUTH_ROUTES.HOME as string;
      router.push(route);
    }, "verifyEmailLoading");
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
          Account Verified
        </h2>
        <p className="mb-8 text-base text-dark-50">
          Your account has been verified successfully.
        </p>
        <Button
          className="!w-full"
          size="lg"
          onClick={handleAuth}
          isLoading={loadingStates["verifyEmailLoading"]}
          disabled={loadingStates["verifyEmailLoading"]}
        >
          Continue
        </Button>
      </div>
    </BasicModal>
  );
});

export default AccountVerified;
