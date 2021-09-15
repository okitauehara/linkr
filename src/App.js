import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserPosts from './components/UserPosts';

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route>
					<h1>Hello World!</h1>
				</Route>
				<Route path="/user" exact>
					<UserPosts />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

