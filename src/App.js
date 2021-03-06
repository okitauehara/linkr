import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './components/pages/login/Login';
import Register from './components/pages/register/Registro';
import Timeline from './components/pages/timeline/Timeline';
import MyPosts from './components/pages/myposts/MyPosts';
import MyLikes from './components/pages/mylikes/MyLikes';
import UserPosts from './components/pages/userposts/UserPosts';
import Hashtag from './components/pages/hashtag/Hashtag';
import Header from './components/pages/header/Header';
import UserContext from './contexts/UserContext';
import { useState,useEffect } from 'react';

export default function App() {
	const [user, setUser] = useState({});
	const [hashList, setHashList] = useState([]);
	const [followingList, setFollowingList] = useState([]);

	useEffect(() => {
        const userData = localStorage.getItem('@user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
		// eslint-disable-next-line
    }, []);
	
	return (
		<BrowserRouter>
			<UserContext.Provider value={{ user, setUser, hashList, setHashList }}>
			<Header />
				<Switch>
						<Route path="/" exact>
							<Login/>
						</Route>
						<Route path="/sign-up" exact>
							<Register/>
						</Route>
						<Route path="/timeline" exact>
						<Timeline followingList={followingList} setFollowingList={setFollowingList} />
						</Route>
						<Route path="/my-posts" exact>
							<MyPosts />
						</Route>
						<Route path="/my-likes" exact>
							<MyLikes />
						</Route>
						<Route path="/user/:id" exact>
							<UserPosts followingList={followingList} setFollowingList={setFollowingList} />
						</Route>
						<Route path="/hashtag/:hashtag/posts" exact>
							<Hashtag />
						</Route>
				</Switch>
			</UserContext.Provider>
		</BrowserRouter>
	);
}


