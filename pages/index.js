import React, { useState } from "react";
import Head from "next/head";
import Script from "next/script";
import ReactFullpage from "@fullpage/react-fullpage";
import Style from "styled-jsx/style";
import { NavSidebar } from "../components/Sidebar";
import Icon from "awesome-react-icons";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />

      {/* <OffCanvas width={300} transitionDuration={300} isMenuOpened={true} position={"left"} effect={"overlay"}>
        <OffCanvasBody className={"my-body-class"} style={{ fontSize: "18px" }}>
          This is the canvas body.
        </OffCanvasBody>
        <OffCanvasMenu className={"my-menu-class"} style={{ fontWeight: "bold" }}>
          This is the canvas menu.
        </OffCanvasMenu>
      </OffCanvas> */}

      {/* <Menu /> */}
      {/* <NavSidebar /> */}

      <div className="flex h-screen bg-gray-200">
        <NavSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="content">
            <button className="btn-menu" onClick={() => setIsSidebarOpen(true)} type="button">
              <Icon name="burger" className="w-6 h-6" />
            </button>

            <section className="sm:flex-row flex flex-col flex-1">
              <div className="content-box" style={{ flexGrow: 2, flexBasis: "0%" }}>
                <ReactFullpage
                  licenseKey={`5949m7cV-Yeq5s7Sp-pKh9aLSJ-T8pshEbi`}
                  scrollingSpeed={1000} /* Options here */
                  render={({ state, fullpageApi }) => {
                    return (
                      <ReactFullpage.Wrapper>
                        <Style>{`
                          .section {
                            padding: 10px;
                          }

                          .section.home {
                            background: rgb(0, 0, 0);
                            background: radial-gradient(circle, rgba(0, 0, 0, 0.8281687675070029) 0%, rgba(0, 0, 0, 1) 100%);
                            color: white;
                          }

                          .model {
                          }
                        `}</Style>

                        <div className="section home">
                          <div className="flex h-[90%]">
                            <div className="flex justify-center content-center align-items-center">
                              <div>
                                <h1 className="text-7xl">
                                  Mage <br /> Brotherhood
                                </h1>
                                <p>Play to earn NFT game, magic battle royle</p>
                              </div>
                            </div>
                            <div className="grow">
                              <model-viewer
                                class="model h-full w-full"
                                src="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.glb?1542147958948"
                                ios-src="/model.usdz"
                                poster="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b%2Fposter-astronaut.png?v=1599079951717"
                                alt="A 3D model of an astronaut"
                                shadow-intensity="1"
                                camera-controls
                                auto-rotate
                                ar
                              />
                            </div>
                          </div>

                          <button onClick={() => fullpageApi.moveSectionDown()}>Click me to move down</button>
                        </div>
                        <div className="section">
                          <p>Section 1 (welcome to fullpage.js)</p>
                        </div>
                      </ReactFullpage.Wrapper>
                    );
                  }}
                />
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
