import Link from "next/link";
import { useState } from "react";
import { CrossIcon, ThreeLinesMenu } from "../../../svgs/svg";
import { EUN_AUTH_ROUTES } from "../../../enums/routes.enum";

/**
 * Navbar component for navigation.
 * @param {any} props - Props for the Navbar component.
 * @returns {JSX.Element} - JSX for the Navbar component.
 */
export default function Navbar(props: any): JSX.Element {
  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="flex items-center lg:order-1">
      <button
        className="text-gray-700 h-9 w-10 rounded-md bg-primary-100 p-1.5 outline-none lg:hidden xs:w-9"
        onClick={() => setNavbar(!navbar)}
      >
        {navbar ? <CrossIcon /> : <ThreeLinesMenu />}
      </button>
      <div
        className={`absolute left-[25px] top-[4.5rem] z-30 flex w-[calc(100%-50px)] flex-grow flex-col space-x-4 space-y-3 overflow-hidden duration-300 ease-linear lg:static lg:z-10 lg:w-auto lg:flex-row lg:justify-between lg:space-x-0 lg:space-y-0 ${
          navbar
            ? "rounded-md bg-blackRussian2/90 p-4 lg:h-auto lg:rounded-none lg:bg-transparent lg:pb-0 lg:pt-0"
            : "mt-0 h-0 lg:h-auto"
        }`}
      >
        {!props?.token && (
          <div className="flex items-center justify-center gap-3 lg:gap-4 xs:flex-col">
            <Link
              href={EUN_AUTH_ROUTES.SIGNUP as string}
              className="btn-outline btn-outline-primary btn-lg !w-1/2 py-3 text-center"
            >
              Sign up
            </Link>
            <Link
              href={EUN_AUTH_ROUTES.LOGIN as string}
              className="btn btn-primary btn-lg block !w-1/2 py-3 text-center"
            >
              Log in
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
