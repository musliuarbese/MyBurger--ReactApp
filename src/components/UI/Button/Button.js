import React from "react";

import styles from "./Button.module.css";

const button = props => (
  <button
    onClick={props.clicked}
    className={[styles.Button, styles[props.btnType]].join(" ")}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

export default button;
