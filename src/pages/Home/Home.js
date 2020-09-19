import React, { useEffect } from "react";

import "./Home.css";

const theme = JSON.parse(localStorage.getItem("theme"));

const Home = () => {
  // useEffect(() => {
  //   if (theme) {
  //     document.documentElement.style.setProperty("--clr-bg", theme.bgColor);
  //     document.documentElement.style.setProperty("--clr-fg", theme.fgColor);
  //     document.documentElement.style.setProperty(
  //       "--clr-primary",
  //       theme.primaryColor
  //     );
  //     document.documentElement.style.setProperty(
  //       "--clr-hover",
  //       theme.primaryColor
  //     );
  //     document.documentElement.style.setProperty(
  //       "--clr-txt-primary",
  //       theme.fontPrimaryColor
  //     );
  //     document.documentElement.style.setProperty(
  //       "--clr-txt-secondary",
  //       theme.fontSecondaryColor
  //     );
  //   }
  // }, []);

  return <div className="Home">HOME</div>;
};

export default Home;
