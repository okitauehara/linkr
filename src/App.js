import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PublishPost from './components/pages/posts/PublishPost';

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route>
					<PublishPost />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

