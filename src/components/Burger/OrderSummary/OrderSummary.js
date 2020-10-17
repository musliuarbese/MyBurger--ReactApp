import React, { Component } from "react";
import Auxx from "../../../hoc/Auxx";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentDidlUpdate() {
    console.log("[OrderSummary] DidUpdate");
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}:</span>{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );

    return (
      <Auxx>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price:{this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button buttonType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>{" "}
        <Button buttonType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Auxx>
    );
  }
}

export default OrderSummary;