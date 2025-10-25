import './App.css';
import {useState, useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {check} from "./http/authAPI";
import {useAuthActions} from './store/authStore';
import CircularProgress from '@mui/material/CircularProgress';

function App() {

    const [loading, setLoading] = useState(true);
    const {setIsAuth, setUser} = useAuthActions();

    useEffect(() => {
        check()
            .then(userData => {
                if(userData){
                    setUser(userData ?? {});
                    setIsAuth(true);
                }
                else {
                    setUser({});
                    setIsAuth(false);
                }
        })
            .finally(() => setLoading(false));
    }, [setUser, setIsAuth])

    if(loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        )
    }

    return (
      <div className="wrapper">
          <NavBar/>
          <AppRouter />
      </div>
    )
}

export default App
