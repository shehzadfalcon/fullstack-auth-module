import React from "react";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { images } from "../../../assets/images";
import { Button } from "../../global/button/Button";
import BasicModal from "../../global/basicmodal/BasicModal";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { UN_AUTHENTICATED_ROUTES } from "../../../constants/routes";

/**
 * Component for the SignUp modal.
 * @returns {JSX.Element} The JSX element for the SignUp modal.
 */
const SignUpModal = NiceModal.create(
  (values: { email: string }): JSX.Element => {
    const router = useRouter();
    const modal = useModal();

    return (
      <BasicModal show={modal.visible} hide={modal.hide} close notOnsideclick>
        <div className="rounded-2xl bg-blackRussian2 p-5 sm:w-[31.25rem] md:p-8">
          <figure>
            <Image
              priority
              className="mx-auto mb-8 object-cover"
              src={images.successGif}
              alt="Success"
              height={170}
              width={170}
            />
          </figure>
          <h2 className="fs-32 mb-4 font-semibold text-white">
            Signed Up Successfully!
          </h2>
          <p className="text-grey mb-8 text-sm">
            Congratulations, you have successfully signed up
          </p>
          <Button
            onClick={() => {
              let route = UN_AUTHENTICATED_ROUTES.VERIFY_EMAIL as Function;

              router.push(route(values.email));
              modal.hide();
            }}
            size="md"
            type="button"
            color="primary"
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </BasicModal>
    );
  }
);

export default SignUpModal;
