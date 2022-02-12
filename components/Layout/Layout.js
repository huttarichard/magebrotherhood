import React, { useState } from "react";
import { NavSidebar } from "./Sidebar";
import Icon from "awesome-react-icons";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <style jsx>{`
        .content {
          background: rgb(14, 15, 15);
        }
      `}</style>

      <div className="flex h-screen bg-gray-200">
        <NavSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="content">
            <button className="btn-menu" onClick={() => setIsSidebarOpen(true)} type="button">
              <Icon name="burger" className="w-6 h-6" />
            </button>

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
