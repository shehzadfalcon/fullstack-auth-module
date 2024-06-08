import NiceModal from "@ebay/nice-modal-react";
import LogoutModal from "./LogoutModal";
import UpdatePassword from "./updatepassword/UpdatePassword";
import SignUpModal from "./signup/SignUp";
import AccountVerified from "./accountVerified";
import OtpVerified from "./otpVerified";

/**
 * Interface for modal items.
 * @interface ModalItem
 * @property {string} name - The name of the modal.
 * @property {React.ComponentType<any>} source - The source component for the modal.
 */
interface ModalItem {
  name: string;
  source: React.ComponentType<any>;
}

/**
 * List of modals to register.
 * @type {ModalItem[]}
 */
const modalList: ModalItem[] = [
  // Sign Up Modal
  { name: "signUp", source: SignUpModal },

  // Update Password Modal
  { name: "updatePassword", source: UpdatePassword },

  // Account Verified Modal
  { name: "accountVerified", source: AccountVerified },

  // OTP Verified Modal
  { name: "otpVerified", source: OtpVerified },

  // Logout Modal
  { name: "logoutModal", source: LogoutModal },
];

// Register modals using NiceModal
modalList.forEach((modal: any) => NiceModal.register(modal.name, modal.source));
