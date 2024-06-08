import Link from "next/link";
import Navbar from "../navbar/Navbar";
import { Container } from "../container/Container";
import UserDropDown from "../userDropdown/UserDropdown";
import ImageComponent from "../imageComponent/ImageComponent";
import React from "react";
import { useRouter } from "next/router";
import useLoggedInStatus from "../../../hooks/useLoggedInStatus";
import { images } from "../../../assets/images";
import { EAUTH_ROUTES, EUN_AUTH_ROUTES } from "../../../enums/routes.enum";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, isLoading, fullName] = useLoggedInStatus();
  return (
    <header className="relative bg-blackRussian2 py-6 shadow">
      <Container size="xxl">
        <div className="flex items-center justify-between gap-10">
          <Link href={EUN_AUTH_ROUTES.LOGIN} className="shrink-0">
            {router.pathname === EAUTH_ROUTES.HOME && (
              <ImageComponent
                priority
                fill="fill"
                className="object-cover"
                src="/assets/images/logo.svg"
                figClassName="w-[140px] h-7"
              />
            )}
          </Link>
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <div className="flex items-center space-x-2">
                <ImageComponent
                  priority
                  fill="fill"
                  className="h-8 w-8 rounded-full object-cover"
                  src={images.profileImg}
                  alt="Profile Image"
                />
                <span className="text-white">{fullName}</span>
              </div>
            )}
            <>{isLoggedIn && <UserDropDown imgUrl={images.profileImg} />}</>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
