import { Switch } from "react-router-dom";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ForgotPassword } from "../pages/ForgotPassword";
import { ValidateToken } from "../pages/ValidateToken";
import { ResetPassword } from "../pages/ResetPassword";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";

import { Header } from "../components/Header";

import { NotificationProvider } from "../contexts/NotificationContext";

import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

import * as S from '../styles/home'

export function Routes() {

	return (
		<Switch>
			<PublicRoute path="/login" component={Login} />
			<PublicRoute path="/register" component={Register} />
			<PublicRoute path="/forgot-password" component={ForgotPassword} />
			<PublicRoute path="/validate-token" component={ValidateToken} />
			<PublicRoute path="/reset-password" component={ResetPassword} />

			<NotificationProvider>
				<S.Container>
					<Header />

					<PrivateRoute path="/" exact component={Home} />
					<PrivateRoute path="/profile" component={Profile} />
				</S.Container>
			</NotificationProvider>
		</Switch>
	)
}