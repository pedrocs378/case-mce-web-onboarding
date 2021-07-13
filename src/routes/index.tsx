import { Route, Switch } from "react-router-dom";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";

export function Routes() {

	return (
		<Switch>
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
			<Route path="/" exact component={Home} />
		</Switch>
	)
}