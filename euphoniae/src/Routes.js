import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from './containers/Login';
import Signup from './containers/Signup';

/* This component handle our app routing.
It uses 'Switch' component from react-router to render the first matching 
route defined within it. It also uses 'appliedRoute' component to apply 
on render the props passed in ('childProps'). */

export default ({childProps}) =>
	<Switch>
		<AppliedRoute path='/' exact component={Home} props={childProps}/>
		<AppliedRoute path='/login' exact component={Login} props={childProps}/>
		<AppliedRoute path='/signup' exact component={Signup} />
		<Route component= {NotFound} />
	</Switch>