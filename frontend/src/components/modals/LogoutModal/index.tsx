import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import BasicModal from "../../global/basicmodal/BasicModal";
import { Button } from "../../global/button/Button";
import { errorHandler } from "../../../utils/errorHandler";
import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import { useRouter } from "next/router";
import { HttpService } from "../../../services/base.service";
import { EUN_AUTH_ROUTES } from "../../../enums/routes.enum";

/**
 * Logout modal component.
 * @returns {JSX.Element} - The JSX element representing the Logout modal.
 */
const DeleteModal = NiceModal.create(() => {
  const modal = useModal();
  const router = useRouter();

  // Custom hook for handling debounced click events
  const [handleClick, loadingStates] = useDebouncedClick();

  /**
   * Handles the logout process.
   */
  const handleLogout = async () => {
    handleClick(async () => {
      try {
        // Clear cookie and redirect to login page
        HttpService.clearCookie();
        const route = EUN_AUTH_ROUTES.LOGIN as string;
        router.push(route);
        modal.remove();
      } catch (error: unknown) {
        // Handle error
        errorHandler(error);
      }
    }, "logout");
  };

  return (
    <BasicModal show={modal.visible} hide={modal.hide}>
      <div className="flex w-full flex-col items-center rounded-lg bg-blackRussian2 p-8 pt-10 sm:w-[400px]">
        <h2 className="fs-24 mb-4 font-medium">Logout</h2>
        <p className="mb-8 text-sm text-aluminium">
          Are you sure you want to logout?
        </p>
        <div className="flex w-full gap-4">
          <Button
            size="md"
            variant="outline"
            onClick={() => {
              modal.remove();
            }}
          >
            Cancel
          </Button>
          <Button
            size="md"
            variant="outline"
            isLoading={loadingStates["logout"]}
            disabled={loadingStates["logout"]}
            className="border-0 bg-danger"
            onClick={handleLogout}
          >
            Yes, Logout
          </Button>
        </div>
      </div>
    </BasicModal>
  );
});

export default DeleteModal;
