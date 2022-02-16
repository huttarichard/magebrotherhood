import React, { useState } from "react";
import { NavSidebar } from "./Sidebar";
import Icon from "awesome-react-icons";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <style jsx>{`
        .navbar {
          position: fixed;
          height: 60px;
          width: 100%;
          background: white;
          z-index: 99;
        }
      `}</style>

      <div className="flex h-screen bg-gray-200">
        <NavSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="content">
            <div className="navbar lg:hidden flex" onClick={() => setIsSidebarOpen(true)} type="button">
              <Icon name="burger" className="w-6 h-6" />
            </div>

            <section className="sm:flex-row flex flex-col flex-1">
              <div className="content-box" style={{ flexGrow: 2, flexBasis: "0%" }}>
                {children}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
