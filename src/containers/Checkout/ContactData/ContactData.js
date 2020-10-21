import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

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
          touched: false,
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
        touched: false,
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
        touched: false,
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
        touched: false,
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
        touched: false,
          },
          deliveryMethod: {
            elementType: "select",
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'}
          ],
        },
        value: 'fastest',
        validation :{},
        valid: true,
          },
        },
    formIsValid: false,
}

    orderHandler = (event) => {
    event.preventDefault();
    //per me send request edhe me reload page ta mundson qe me ti shfaq qato ingredients qka i ka tu e perdor event.preventD
    //console.log(this.props.ingredients);
    //alert("You Continue!");
    this.setState({ loading: true });
    const formData={};
    for(let inputIdentifier  in this.state.orderForm){
      formData[inputIdentifier]=this.state.orderForm[inputIdentifier].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }

       this.props.onOrderBurger(order, this.props.token);
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //     //ta kthen faqen kryesor moment kur bon loading
    //   })
    //   .catch((error) => {
    //     this.setState({ loading: false });
    //   });
  };


  checkValidity(value, rules){
     let isValid = true;
     if(!rules){
       return true;
     }
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

    inputChangeHandler = (event, inputIdentifier ) =>{
      //console.log(event.target.value);
      const updatedOrderForm = {
        ...this.state.orderForm
      };
      const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
      };
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
      updatedFormElement.touched =true;
      updatedOrderForm[inputIdentifier]=updatedFormElement;
      
       let formIsValid = false;
       for(let inputIdentifier in updatedOrderForm){
           formIsValid = updatedOrderForm[inputIdentifier].valid & formIsValid;
       }
        console.log(formIsValid);
      this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
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
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation}
              changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
          )
          }
          )
          }
        <Button buttonType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
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

 const mapStateToProps = state =>{
   return{
     ings: state.burgerBuilder.ingredients,
     price: state.burgerBuilder.totalPrice,
     loading: state.order.loading,
     token: state.auth.token,
     userId: state.auth.userId
   }
 }

 const mapDispatchToProps = dispatch =>{
   return{
   onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
 }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));