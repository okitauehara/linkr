import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserPosts from './components/UserPosts/UserPosts';
import PublishPost from './components/pages/posts/PublishPost';
import Login from './Components/Login';
import UserContext from './Contexts/UserContext';
import { useState } from 'react';


export default function App() {
	const [user,setUser] = useState({});
	return (
		<BrowserRouter>
			<UserContext.Provider value={{user,setUser}}>
			<Switch>
        <Route path='/publish' exact>
					<PublishPost />
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

