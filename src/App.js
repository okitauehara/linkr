import './App.css';
import { BrowserRouter} from 'react-router-dom';
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
			<Routes />
			</UserContext.Provider>
		</BrowserRouter>
	);
}


