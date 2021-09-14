import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route>
					<h1>Hello World!</h1>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

