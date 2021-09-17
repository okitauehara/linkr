import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Login from './components/pages/login/Login';
import Register from './components/pages/register/Registro';
import Timeline from './components/pages/timeline/Timeline';
import MyPosts from './components/pages/myposts/MyPosts';
import MyLikes from './components/pages/mylikes/MyLikes';
import UserPosts from './components/pages/userposts/UserPosts';
import Hashtag from './components/pages/hashtag/Hashtag';
import Trending from './components/shared/Trending';

import UserContext from './contexts/UserContext';
import { useState } from 'react';

export default function App() {
	const [user, setUser] = useState({});
	const [hashList, setHashList] = useState([]); 

	return (
		<BrowserRouter>
			<UserContext.Provider value={{ user, setUser, hashList, setHashList }}>
				<AppContainer>
				<Switch>
						<Route path="/" exact>
							<Login/>
						</Route>
						<Route path="/sign-up" exact>
							<Register/>
						</Route>
						<Route path="/timeline" exact>
							<Timeline />
						</Route>
						<Route path="/my-posts" exact>
							<MyPosts />
						</Route>
						<Route path="/my-likes" exact>
							<MyLikes />
						</Route>
						<Route path="/user/:id" exact>
							<UserPosts />
						</Route>
						<Route path="/hashtag/:hashtag" exact>
							<Hashtag />
						</Route>
				</Switch>
				<Trending/>
				</AppContainer>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

const AppContainer = styled.div `
	display: flex;
	justify-content: center;
	
`

