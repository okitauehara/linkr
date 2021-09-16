import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './components/Registro';
import Login from './components/Login';
import UserContext from './Contexts/UserContext';
import { useState } from 'react';
import UserPosts from './components/UserPosts/UserPosts';

export default function App() {
	const [user,setUser] = useState({});
	return (
		<BrowserRouter>
			<UserContext.Provider value={{user,setUser}}>
			<Switch>

				<Route path="/sign-up" exact>
					<Register/>
        		</Route>

				<Route path="/" exact>
					<Login/>
				</Route>

				<Route path="/user/:id" exact>
					<UserPosts />
        	</Route>
	
			</Switch>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

