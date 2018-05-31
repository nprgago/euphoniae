import React from "react";
import { Route } from "react-router-dom";

/* This component apply on render the props passed on route file (childProps).

Takes a prop called component that represents the component that will be 
rendered when matching route is found. Also takes all the props that 
we want to apply (in this case, the childProps). */

export default ({ component: C, props: cProps, ...rest }) =>
  	<Route {...rest} render={props => <C {...props} {...cProps} />} />;

  