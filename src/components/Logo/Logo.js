import React from "react";
import burgerLogo from "../../assets/Images/burger-logo.png";
import classes from "./Logo.css";

const logo = (props) => {
  return (
    <div
      className={classes.Logo}
      style={{ height: props.height, margin: props.margin }}
    >
      <img src={burgerLogo} alt="My burger" />
    </div>
  );
};

export default logo;