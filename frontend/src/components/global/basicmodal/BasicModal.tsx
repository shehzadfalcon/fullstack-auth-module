import { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";

/**
 * Props for the BasicModal component.
 * @interface BasicModalProps
 * @property {string} [className] - Additional class names for styling.
 * @property {React.ReactNode} children - The content of the modal.
 * @property {boolean} show - Flag to show or hide the modal.
 * @property {Function} hide - Function to hide the modal.
 * @property {boolean} [state] - Current state of the modal.
 * @property {Function} [setstate] - Function to set the state of the modal.
 * @property {Function} [minimize] - Function to minimize the modal.
 * @property {Function} [afterClose] - Function to execute after modal is closed.
 * @property {Function} [close] - Function to close the modal.
 * @property {string} [crosstyle] - Additional styles for the close button.
 * @property {boolean} [notOnsideclick] - Flag to disable closing modal on outside click.
 */
interface BasicModalProps {
  className?: string;
  children: React.ReactNode;
  show: boolean;
  hide: () => void;
  state?: boolean;
  setstate?: () => void;
  minimize?: () => void;
  afterClose?: () => void;
  close?: boolean;
  crosstyle?: string;
  notOnsideclick?: boolean;
}

/**
 * Basic modal component.
 * @param {BasicModalProps} props - The props for the BasicModal component.
 * @returns {JSX.Element} - Rendered component.
 */
export default function BasicModal({
  show,
  hide,
  close,
  state,
  children,
  minimize,
  crosstyle,
  className,
  afterClose,
  notOnsideclick,
}: BasicModalProps): JSX.Element {
  return (
    <Transition.Root show={show} as={Fragment} afterLeave={afterClose}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={hide}
      >
        <div className="flex min-h-full items-center justify-center px-4 py-4 pt-4 text-center md:p-0 md:px-8 md:py-10 xs:px-0">
          <Transition.Child>
            <Dialog.Overlay
              className={`fixed inset-0 bg-black bg-opacity-80 transition-opacity ${
                notOnsideclick ? "pointer-events-none" : ""
              }`}
            />
          </Transition.Child>
          <span
            className="hidden h-screen sm:inline-block sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 transform-[scale(95%)]"
            enterTo="opacity-100 transform-[scale(100%)]"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 transform-[scale(100%)]"
            leaveTo="opacity-0 transform-[scale(95%)]"
          >
            <div
              className={`inline-block w-full transform text-center align-middle transition-all sm:w-auto xs:mx-4 ${className}`}
            >
              <div
                className={`${
                  close ? "hidden" : "flex"
                } ${crosstyle} absolute right-5 top-5 z-50 flex items-center justify-center`}
              >
                <button
                  type="button"
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-[#9FA0A2] text-sm text-white opacity-40 focus:outline-none"
                  onClick={() => {
                    hide();
                  }}
                >
                  <span className="sr-only">Close</span>
                  <AiOutlineClose className="stroke-2 text-xs" />
                  {/* <i className="icon-cross" aria-hidden="true" /> */}
                </button>
              </div>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
