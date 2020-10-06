import React from "react";
import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxx from "../../../hoc/Auxx";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Auxx>
      {/* when 'Backdrop' is clicked 'close' is passed to handler to hide backdrop and close 'sideDrawer' */}
      <Backdrop show={props.open} clicked={props.closed} />
      {/* the 'attachedClasses' array is joined and is added as styling to the dive that shows the components in 'sideDrawer'*/}
      <div className={attachedClasses.join(" ")}>
        {/* styling for logo is set differently in the 'sideDrawer'*/}
        <Logo height="11%" margin="30px" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Auxx>
  );
};
export default sideDrawer;
