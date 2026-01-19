import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-pink-700">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
