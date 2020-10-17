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
          validation :{
            required: true,
          },
          valid: false,
        },
        street: {
          elementType: "input",
          elementConfig: {
            type: 'text',
            placeholder: 'Street',
        },
        value: '',
        validation :{
          required: true,
        },
        valid: false,
      },
      zipCode:{
        elementType: "input",
          elementConfig: {
            type: 'text',
            placeholder: 'ZIP Code',
        },
        value: '',
        validation :{
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
      },
          country: {
            elementType: "input",
          elementConfig: {
            type: 'text',
            placeholder: 'Your Country',
        },
        value: '',
        validation :{
          required: true,
        },
        valid: false,
          },
          email: {
            elementType: "input",
          elementConfig: {
            type: 'text',
            placeholder: 'Your E-Mail',
        },
        value: '',
        validation :{
          required: true,
        },
        valid: false,
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
        validation :{
          required: true,
        },
        valid: false,
          },
        },
    loading: false,
}

    orderHandler = (event) => {
    event.preventDefault();
    //per me send request edhe me reload page ta mundson qe me ti shfaq qato ingredients qka i ka tu e perdor event.preventD
    //console.log(this.props.ingredients);
    //alert("You Continue!");
    this.setState({ loading: true });
    const formData={};
    for(let inputIndetifier in this.state.orderForm){
      formData[inputIndetifier]=this.state.orderForm[inputIndetifier].value;
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


  checkValidity(value, rules){
     let isValid = true;
     if(rules.required){
       isValid = value.trim() !== '' && isValid;
     }
     if(rules.minLength){
       isValid = value.length >= rules.minLength && isValid;
       //min length would be one or two or three charcters
     }
     if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
     }
     return isValid;
  }

    inputChangeHandler = (event, inputIndetifier) =>{
      //console.log(event.target.value);
      const updatedOrderForm = {
        ...this.state.orderForm
      };
      const updatedFormElement = {
        ...updatedOrderForm[inputIndetifier]
      };
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
      updatedOrderForm[inputIndetifier]=updatedFormElement;
      console.log(updatedFormElement);
      this.setState({orderForm: updatedOrderForm})
    }

  render() {
    let formElementsArray =[];
    for(let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => {
          return(
          <Input 
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
          )
          }
          )
          }
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