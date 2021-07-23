import { Switch } from "react-router-dom";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ForgotPassword } from "../pages/ForgotPassword";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";

import { Header } from "../components/Header";

import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

import * as S from '../styles/home'

export function Routes() {

	return (
		<Switch>
			<PublicRoute path="/login" component={Login} />
			<PublicRoute path="/register" component={Register} />
			<PublicRoute path="/forgot-password" component={ForgotPassword} />

			<S.Container>
				<Header />

				<PrivateRoute path="/" exact component={Home} />
				<PrivateRoute path="/profile" component={Profile} />
			</S.Container>
		</Switch>
	)
}