// import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useIsAuth, useAuthActions} from "../store/authStore";
import {ADMIN_ROUTE, LOGIN_ROUTE, TODO_ROUTE} from "../utils/const";

const NavBar = () => {
    const isAuth = useIsAuth();
    const {setIsAuth, setUser} = useAuthActions();
    const navigate = useNavigate();

    const logout = () => {
        setUser(null);
        setIsAuth(false);
        localStorage.removeItem('token')
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0' }}>
            <Button variant="outlined" onClick={() => navigate(TODO_ROUTE)}>Главная</Button>

            {isAuth ?
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={() => navigate(TODO_ROUTE)}>Задачи</Button>
                    <Button variant="contained" onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>
                    <Button variant="contained" onClick={() => logout()}>Выйти</Button>
                </Stack  >
                :
                <Stack >
                    <Button variant="contained" onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                </Stack >
            }
        </div>
    );
};

export default NavBar;