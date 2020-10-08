import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 1,
      meat: 1,
    },
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    //let price = 0;
    for (let param of query.entries()) {
      // if (param[0] === "price") {
      //   price = param[1];
      // } else {
      ingredients[param[0]] = +param[1];
      // }
    }
    this.setState({ ingredients: ingredients });
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelHandler}
          checkoutContinued={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              //price={this.state.totalPrice}
              {...props}
              //...props - ckado qe ki tek props qe e deklaron ose diqka will get in props soo for that i use that
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
