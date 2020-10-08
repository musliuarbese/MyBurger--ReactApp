import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    addres: {
      street: "",
      postalCode: "",
    },
  };

  orderHandler = (event) => {
    event.preventDefault();
    //per me send request edhe me reload page ta mundson qe me ti shfaq qato ingredients qka i ka tu e perdor event.preventD
    //console.log(this.props.ingredients);
    alert("You Continue!");
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      //price: this.props.totalPrice,
      costumer: {
        name: "Arbesë Musliu",
        address: {
          country: "Albania",
          street: "Teststreet 1",
          zipCode: "2343",
        },
        email: "arbesa@gmail.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
        //ta kthen faqen kryesor moment kur bon loading
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Enter your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Enter your Mail"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Enter Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Enter Postal Code"
        />
        <Button buttonType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <br></br>
        <h2>Enter your Contact Data</h2>
        <br></br>
        {form}
      </div>
    );
  }
}
export default ContactData;
