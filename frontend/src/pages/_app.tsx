import "../styles/globals.css";
import "../components/modals/Modals";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import NiceModal from "@ebay/nice-modal-react";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NiceModal.Provider>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />
    </NiceModal.Provider>
  );
}
