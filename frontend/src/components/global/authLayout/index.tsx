import Image from "next/image";
import Link from "next/link";
import React from "react";
import { images } from "../../../assets/images";
import { EUN_AUTH_ROUTES } from "../../../enums/routes.enum";
import ImageComponent from "../imageComponent/ImageComponent";

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}
/**
 * AuthLayout component for displaying the layout of authentication pages.
 * @component
 * @param {AuthLayoutProps} props - The props of the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the layout.
 * @param {string} [props.className] - Additional class name for styling purposes.
 * @returns {React.ReactElement} AuthLayout component.
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({ children, className }) => {
  return (
    <>
      <main id="main" className="main authlayout">
        <div className="grow">
          <div className="mx-auto flex h-full w-full max-w-[950px] flex-col px-5 py-8 pb-16 lg:p-8">
            <strong className="mb-[100px]">
              <Link
                href={EUN_AUTH_ROUTES.LOGIN}
                passHref
                className="inline-block"
              >
                <ImageComponent
                  priority
                  fill={"fill"}
                  className="object-cover"
                  src="/assets/images/logo.svg"
                  figClassName="w-[140px] h-7"
                />
              </Link>
            </strong>
            <div className={`mx-auto w-full  max-w-[378px] ${className}`}>
              {children}
              <p className="mt-4 text-center text-sm text-white">
                By signing in or creating an account, you agree with our{" "}
                <Link href="#" passHref className="text-primary-100">
                  Terms & conditions
                </Link>{" "}
                and{" "}
                <Link href="#" passHref className="text-primary-100">
                  Privacy statement
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
