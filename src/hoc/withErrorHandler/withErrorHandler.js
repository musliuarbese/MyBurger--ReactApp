import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxx from "../Auxx";
//import axios from "../../axios-orders";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      //interveptors per mi handle errorrs
      this.resInterceptor = axios.interceptors.response.use(
        (res) => {
          //return response to component if no error
          return res;
          //if error, set 'error' to the error object retured
        },
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Auxx>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />;
        </Auxx>
      );
    }
  };
};

export default withErrorHandler;
