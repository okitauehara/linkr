import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserPosts from './components/UserPosts/UserPosts';

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/user" exact>
					<UserPosts />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

