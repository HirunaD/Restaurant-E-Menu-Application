import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-orange-300">
      <Header />
      <main className="max-w-480 mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
