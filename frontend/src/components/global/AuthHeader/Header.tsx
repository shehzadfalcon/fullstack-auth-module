import Link from "next/link";
import Navbar from "../navbar/Navbar";
import { Container } from "../container/Container";
import UserDropDown from "../userDropdown/UserDropdown";
import ImageComponent from "../imageComponent/ImageComponent";
import React from "react";
import { useRouter } from "next/router";
import useLoggedInStatus from "../../../hooks/useLoggedInStatus";
import { images } from "../../../assets/images";
import { EAUTH_ROUTES } from "../../../enums/routes.enum";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn] = useLoggedInStatus();
  return (
    <header className="relative bg-blackRussian2 py-6 shadow">
      <Container size={"xxl"}>
        <div className="flex items-center justify-between gap-10">
          <Link href="/" className="shrink-0">
            {router.pathname == EAUTH_ROUTES.HOME ? (
              <ImageComponent
                priority
                fill={"fill"}
                className="object-cover"
                src="/assets/images/logo.svg"
                figClassName="w-[140px] h-7"
              />
            ) : (
              ""
            )}
          </Link>
          <>
            {isLoggedIn && <UserDropDown imgUrl={images.profileImg} />}
            <Navbar token={isLoggedIn} />
          </>
        </div>
      </Container>
    </header>
  );
};

export default Header;
