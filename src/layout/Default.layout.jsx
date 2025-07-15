import React, { useState } from "react";
import Footer from "../components/Footer/Footer.Component";
import Navbar from "../components/Navbar/Navbar.Component";
import FloatingActionButton from "../components/FloatingActionButton/FloatingActionButton.Component";
import EnhancedSearch from "../components/Search/EnhancedSearch.Component";

const DefaultlayoutHoc = (Component) => {
  const WrappedComponent = (props) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
      <div className="min-h-screen">
        <Navbar />
        <Component {...props} />
        <Footer />
        <FloatingActionButton onSearchClick={() => setIsSearchOpen(true)} />
        <EnhancedSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    );
  };

  return WrappedComponent;
};

export default DefaultlayoutHoc;
