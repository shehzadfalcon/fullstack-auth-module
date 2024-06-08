import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { images } from "../../../assets/images";
import { Button } from "../../global/button/Button";
import BasicModal from "../../global/basicmodal/BasicModal";
import NiceModal, { NiceModalHocProps, useModal } from "@ebay/nice-modal-react";

/**
 * Component for displaying a success message after password reset.
 * @param {NiceModalProps} props - Props for the UpdatePassword component.
 * @returns {JSX.Element} - JSX element for the UpdatePassword component.
 */
const UpdatePassword: React.FC<NiceModalHocProps> = NiceModal.create(() => {
  const modal = useModal();
  const router = useRouter();

  /**
   * Handler for redirecting to the login page and hiding the modal.
   */
  const handleLogin = () => {
    router.push("/login");
    modal.hide();
  };

  return (
    <BasicModal show={modal.visible} hide={modal.hide}>
      <div className="rounded-2xl bg-blackRussian2 p-5 sm:w-[31.25rem] md:p-8">
        <figure>
          <Image
            className="mx-auto my-8"
            src={images.successGif}
            alt="Update Password"
            height={140}
            width={265}
          />
        </figure>
        <h2 className="fs-32 mb-4 font-semibold leading-tight text-white">
          Password Reset Successfully
        </h2>
        <p className="text-grey mb-8">
          Your Password has been reset successfully.
        </p>
        <Button
          onClick={handleLogin}
          size="md"
          type="submit"
          color="primary"
          className="w-full"
        >
          Back to Login
        </Button>
      </div>
    </BasicModal>
  );
});

export default UpdatePassword;
