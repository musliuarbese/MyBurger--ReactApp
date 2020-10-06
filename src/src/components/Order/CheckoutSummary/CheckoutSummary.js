import React from "react";
import Burger from "../../Burger/Burger";
import classes from "./CheckoutSummary.css";
import Button from "../../UI/Button/Button";
const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>I hope that burger it taste delicious</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>{" "}
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
