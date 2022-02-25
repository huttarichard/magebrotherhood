import { Navigation } from "react-minimal-side-navigation";
import React from "react";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import {
  faHouse,
  faRectangleVerticalHistory,
  faCoinBlank,
  faCartArrowDown,
  faCommentsQuestion,
} from "@fortawesome/pro-light-svg-icons";

export const NavSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const router = useRouter();

  return (
    <React.Fragment>
      <style jsx>{`
        .sidebar {
          background: white;
          color: black;
          border-right: 1px solid #d1d1d1;
        }
      `}</style>

      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      />

      <div
        className={`fixed sidebar inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white-100 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <Logo
            style={{
              padding: "30px 80px",
            }}
          />
          <h2 className="mx-2 text-2xl font-semibold">Mage Brotherhood</h2>
          <br />
          <hr />
        </div>

        <br />

        <Navigation
          activeItemId={"2"}
          onSelect={({ itemId }) => {
            router.push(itemId);
            // console.log("go", itemId);
          }}
          items={[
            {
              title: "Home",
              itemId: "/",
              // Optional
              elemBefore: () => <FontAwesomeIcon icon={faHouse} />,
            },
            {
              title: "Collections",
              itemId: "/collections",
              elemBefore: () => <FontAwesomeIcon icon={faRectangleVerticalHistory} />,
            },
            {
              title: "Staking",
              itemId: "/staking",
              elemBefore: () => <FontAwesomeIcon icon={faCoinBlank} />,
            },
            {
              title: "Marketplace",
              itemId: "/marketplace",
              elemBefore: () => <FontAwesomeIcon icon={faCartArrowDown} />,
            },
            {
              title: "FAQ",
              itemId: "/faq",
              elemBefore: () => <FontAwesomeIcon icon={faCommentsQuestion} />,
            },
          ]}
        />

        <div className="absolute bottom-0 w-full my-8 ">
          <button>Connect Wallet</button>
        </div>
      </div>
    </React.Fragment>
  );
};
