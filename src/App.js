import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './Components/Registro';

import Login from './Components/Login';
import UserContext from './Contexts/UserContext';
import { useState } from 'react';


export default function App() {
	const [user,setUser] = useState({});
	return (
		<BrowserRouter>
			<UserContext.Provider value={{user,setUser}}>
			<Switch>

				<Route path="/sign-up" exact>
					<Register/>
        </Route

				<Route path="/" exact>
					<Login/>
				</Route>
			</Switch>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

