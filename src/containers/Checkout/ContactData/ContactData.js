import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm:{
        name: {
          elementType: "input",
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name',
          },
          value: '',
        },
        street: {
          elementType: "input",
          elementConfig: {
            type: 'text',
            placeholder: 'Street',
        },
        value: '',
      },
      zipCode:{
        elementType: "input",
          elementConfig: {
            type: 'text',
            placeholder: 'ZIP Code',
        },
        value: '',
      },
          country: {
            elementType: "input",
          elementConfig: {
            type: 'text',
            placeholder: 'Your Country',
        },
        value: '',
          },
          email: {
            elementType: "input",
          elementConfig: {
            type: 'text',
            placeholder: 'Your E-Mail',
        },
        value: '',
          },
          deliveryMethod: {
            elementType: "select",
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'}
          ],
        },
        value: '',
          },
        },
    loading: false,
}

    orderHandler = (event) => {
    event.preventDefault();
    //per me send request edhe me reload page ta mundson qe me ti shfaq qato ingredients qka i ka tu e perdor event.preventD
    //console.log(this.props.ingredients);
    alert("You Continue!");
    this.setState({ loading: true });
    const formData={};
    for(let formElementInfetifier in this.state.orderForm){
      formData[formElementInfetifier]=this.state.orderForm[formElementInfetifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      //price: this.props.totalPrice,
      orderData: formData,
    }
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

    inputChangeHandler = (event, inputIndetifier) =>{
      //console.log(event.target.value);
      const updatedOrderForm = {
        ...this.state.orderForm
      };
      const updatedFormElement = {
        ...updatedOrderForm[inputIndetifier]
      };
      updatedFormElement.value = event.target.value;
      updatedOrderForm[inputIndetifier]=updatedFormElement;
      this.setState({orderForm: updatedOrderForm})
    }

  render() {
    const formElementsArray =[];
    for(let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input 
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
        ))}
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
