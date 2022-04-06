/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import _ from "lodash";
import ContextProvider from "./context";
import { Routes as Router } from "./Routes";
import "./App.css";
import LoginDialog from "./Components/LoginDialog";
import { ContextState, ContextSetState } from "./context";
import ConnectModal from "./Components/ConnectModal";
import useAuth from "./hooks/useAuth";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import Menu from "./Components/Menu";
import Footer from "./Components/Footer";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isShowBar, setShowBar] = useState(false);
  const { login } = useAuth();
  const contextState = useContext(ContextState);
  const contextSetState = useContext(ContextSetState);

  const renderMenu = () => {
    return (
      <>
        <Topbar setOpen={setShowBar} isOpen={isShowBar} />
        <Menu
          open={isShowBar}
          onClose={() => {
            setShowBar(false);
          }}
        />
      </>
    );
  };

  const renderRouter = () => {
    return (
      <>
        <Sidebar />
        <Topbar setOpen={setShowBar} isOpen={isShowBar} />
        <div style={{ minHeight: "calc(100vh - 220px - 170px)" }}>
          <Routes>
            {_.map(Router.container, (each, index) => {
              const Component: any = each.Component;
              const SEO: any = each.SEO;

              return (
                <Route
                  key={index + "pages-routes"}
                  path={each.path}
                  element={
                    Component ? (
                      <>
                        <SEO />
                        <Component
                          open={open}
                          setOpen={setOpen}
                          login={login}
                        />
                      </>
                    ) : null
                  }
                />
              );
            })}
          </Routes>
        </div>
        {/* {!(pathname==='/map'&& isMobile) && <Footer />} */}
        <Footer />
        <ConnectModal open={open} setOpen={setOpen} login={login} />
        {!contextState?.isLogin && (
          <LoginDialog
            open={contextState!.isWalletModalOpen}
            onClose={() => {
              contextSetState!((data) => ({
                ...data,
                isWalletModalOpen: false,
              }));
            }}
            mobile={false}
          />
        )}
      </>
    );
  };

  return isShowBar ? renderMenu() : renderRouter();
};

const AppPage: React.FC = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProvider>
  );
};
export default AppPage;
