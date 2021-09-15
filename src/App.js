import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import UserPosts from './components/UserPosts/UserPosts';

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact>
					<h1>Hello World!</h1>
					<Link to='/user/1'>ir para posts do usuário 1</Link>
				</Route>
				<Route path="/user/:id" exact>
					<UserPosts />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

