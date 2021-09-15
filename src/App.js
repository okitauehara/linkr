import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './Components/Registro';


export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/registro" exact>
					<Register/>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

