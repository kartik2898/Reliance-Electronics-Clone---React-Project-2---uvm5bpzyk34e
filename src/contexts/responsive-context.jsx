import React, { createContext, useState, useContext, useEffect } from 'react';
const ResponsiveContext = createContext();
export const ResponsiveProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);
    const handleResize = () => {
      const mobileBreakpoint = 768; // Define your mobile breakpoint
      setIsMobile(window.innerWidth <= mobileBreakpoint);
    };
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      handleResize(); // Check on initial render
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
      <ResponsiveContext.Provider value={{ isMobile }}>
        {children}
      </ResponsiveContext.Provider>
    );
  };