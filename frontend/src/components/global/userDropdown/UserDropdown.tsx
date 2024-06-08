import React, { Fragment, ReactNode } from "react";
import { RightCircleArrow } from "../../../svgs/svg";
import { Menu, Transition } from "@headlessui/react";
import ShimmerImage from "../ShimmerImage/ShimmerImage";
import { useRouter } from "next/router";
import { getCookie } from "../../../utils/getCookie";
import { images } from "../../../assets/images";
import NiceModal from "@ebay/nice-modal-react";

/**
 * Props for the UserDropDown component.
 */
interface UserDropDownProps {
  /** The URL of the user's image. */
  imgUrl: string;
  /** Additional classes for styling. */
  className?: string;
}

/**
 * Dropdown menu for user actions.
 * @param {UserDropDownProps} props - The props for the UserDropDown component.
 * @returns {JSX.Element} - The UserDropDown JSX element.
 */
const UserDropDown: React.FC<UserDropDownProps> = ({
  imgUrl,
  className,
}: UserDropDownProps): JSX.Element => {
  const router = useRouter();

  const Nav = [
    {
      title: "Log Out",
      icon: <RightCircleArrow />,
      onClick: () => {
        NiceModal.show("logoutModal");
      },
    },
  ];

  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="flex items-center gap-2">
        <figure className="h-10 w-10 overflow-hidden rounded-full">
          <ShimmerImage
            priority
            width={64}
            height={64}
            alt="User Image"
            src={images.avatar}
            className="h-full w-full object-cover"
          />
        </figure>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`shadow-3xl absolute right-0 z-40 mt-2 w-44 rounded-lg bg-blackRussian2 p-4 lg:origin-top-right ${className}`}
        >
          <Menu as={"ul"} className="space-y-4">
            {Nav.map((item, i) => (
              <Menu.Item key={i} as={"ul"} onClick={item.onClick}>
                <li className="flex cursor-pointer items-center gap-3 text-sm text-white duration-300 hover:text-white/60">
                  {item.icon && <i>{item.icon}</i>}
                  <span className="flex-shrink-0">{item.title}</span>
                </li>
              </Menu.Item>
            ))}
          </Menu>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserDropDown;
