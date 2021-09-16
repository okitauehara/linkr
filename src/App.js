import './App.css';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import UserPosts from './components/UserPosts/UserPosts';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import UserContext from './Contexts/UserContext';
import { useState } from 'react';


export default function App() {
	const [user,setUser] = useState({});
	return (
		<BrowserRouter>
			<UserContext.Provider value={{user,setUser}}>
			<Switch>
				<Route path='/' exact>
					<h1>Hello World!</h1>
					<Link to='/user/1'>ir para posts do usuário 1</Link>
				</Route>
				<Route path="/user/:id" exact>
					<UserPosts />
        </Route>
				<Route path="/" exact>
					<Login/>         
        </Route>

				</Route>
			</Switch>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

