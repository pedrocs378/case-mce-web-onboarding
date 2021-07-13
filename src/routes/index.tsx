import { Route, Switch } from "react-router-dom";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export function Routes() {

	return (
		<Switch>
			<Route path="/" exact component={Login} />
			<Route path="/register" component={Register} />
		</Switch>
	)
}