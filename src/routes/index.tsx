import { Route, Switch } from "react-router-dom";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";

import { Header } from "../components/Header";

import * as S from '../styles/home'

export function Routes() {

	return (
		<Switch>
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />

			<S.Container>
				<Header />

				<Route path="/" exact component={Home} />
				<Route path="/profile" component={Profile} />
			</S.Container>
		</Switch>
	)
}