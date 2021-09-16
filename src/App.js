import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header'

export default function App() {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route>
					<h1>Hello World!</h1>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

