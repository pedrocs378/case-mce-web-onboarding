import { Route, Switch } from "react-router-dom";

import { Register } from "../pages/Register";

export function Routes() {

	return (
		<Switch>
			<Route path="/register" component={Register} />
		</Switch>
	)
}