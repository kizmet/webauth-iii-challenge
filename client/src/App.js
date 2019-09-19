import React from "react";
import { Layout, Form, Menu, Dropdown, Icon } from "antd";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";
import NormalLoginForm from "./NormalLoginForm";
import RegistrationForm from "./RegistrationForm";
import AllUsers from "./AllUsers";
import axios from "axios";
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
	NormalLoginForm
);

const WrappedRegistrationForm = Form.create({ name: "register" })(
	RegistrationForm
);
const req = axios.create({
	baseURL: "http://localhost:8641/"
});

const axiosGet = async () => {
	const getLogout = await req.get("api/logout");
	console.log(getLogout);
};

const onClick = ({ key }) => {
	axiosGet();
};

const menu = (
	<Menu>
		<Menu.Item>
			<Link to="/">Login</Link>
		</Menu.Item>
		<Menu.Item>
			<Link to="/register">Register</Link>
		</Menu.Item>
		<Menu.Item>
			<Link to="/allUsers">All Users</Link>
		</Menu.Item>
		<Menu.Item>
			<Link to="/" onClick={onClick}>
				Logout
			</Link>
		</Menu.Item>
	</Menu>
);

const App = () => {
	const { Footer, Content, Header } = Layout;
	return (
		<Layout style={{ padding: 24 }}>
			<Header>
				<Dropdown overlay={menu}>
					<a className="ant-dropdown-link" href="#">
						Menu Options <Icon type="down" />
					</a>
				</Dropdown>
			</Header>
			<Switch>
				<Route exact path="/" component={WrappedNormalLoginForm} />
				<Route
					exact
					path="/register"
					component={WrappedRegistrationForm}
				/>
				<Route exact path="/allUsers" component={AllUsers} />
			</Switch>
		</Layout>
	);
};

export default App;
