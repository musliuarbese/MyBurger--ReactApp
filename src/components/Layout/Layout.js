import React, { Component } from "react";
import { connect } from 'react-redux';
import Auxx from "../../hoc/Auxx";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Auxx>
        <Toolbar 
        isAuth={this.props.isAuthenticated}
        drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxx>
    );
  }
}

 const mapStateToProps = state =>{
   return{
     isAuthenticated: state.auth.token !== null
   }
 }

export default connect(mapStateToProps)(Layout);
