import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  // state = {
  //   ingredients: {
  //     salad: 1,
  //     bacon: 1,
  //     cheese: 1,
  //     meat: 1,
  //   },
  // };

  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   //let price = 0;
  //   for (let param of query.entries()) {
  //     // if (param[0] === "price") {
  //     //   price = param[1];
  //     // } else {
  //     ingredients[param[0]] = +param[1];
  //     // }
  //   }
  //   this.setState({ ingredients: ingredients });
  // }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
     let summary = <Redirect to="/" />
        if(this.props.ings){
          summary=(
            <div>
            <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelHandler}
          checkoutContinued={this.checkoutContinueHandler}/>
          <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}/>
        </div>
          );
        }
    return summary;
  }
}

  const mapStateToProps = state =>{
    return{
      ings: state.burgerBuilder.ingredients,
    }
  }

export default connect(mapStateToProps)(Checkout);