import type {FC} from 'react';
import {useState} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {LOGIN_ROUTE, REG_ROUTE, TODO_ROUTE} from "../utils/const";
import {login as signIn, registration} from "../http/authAPI";
import {useAuthActions} from '../store/authStore';
import type {UserType} from "../types/userType";

const Auth: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isRegistration = location.pathname === REG_ROUTE;
    const {setIsAuth, setUser} = useAuthActions();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const formHandle = async (): Promise<void> => {
        try {
            const data: UserType = isRegistration
                ? await registration(login, password)
                : await signIn(login, password);

            setIsAuth(true);
            setUser(data);

            navigate(TODO_ROUTE);
        }catch (error) {
            setError((error as Error).message);
        }
    }

    return (
        <Container maxWidth="sm" sx={{
            marginTop: '100px',
            height: '100%'
        }}>
            <Box sx={{
                boxShadow: '0 1px 2px rgba(21,21,21, .5)',
                padding: '2rem 4rem',
                borderRadius: '8px'
            }}>
                <h1 style={{ fontSize: '24px', color: '#с8с8с8', margin: '0 0 1.5rem 0' }}>{ isRegistration ? 'Регистрация' : 'Авторизация' }</h1>
                <FormControl sx={{
                    display: 'grid',
                    gap: 1,
                }}>
                    <TextField
                        required
                        label="Введите ваш логин"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <TextField
                        required
                        type="password"
                        label="Введите ваш пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="error" style={{ color: '#ff1136' }}>{error ? error : ''}</div>
                    {isRegistration ?
                            <div>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink></div>
                            :
                            <div>Нет аккаунта? <NavLink to={REG_ROUTE}>Зарегистрируйтесь!</NavLink></div>
                    }
                    <Button variant="outlined" sx={{
                        marginTop: 2,
                        marginLeft: 'auto',
                    }}
                    onClick={formHandle}>
                        { isRegistration ? 'Регистрация' : 'Войти' }
                    </Button>
                </FormControl>
            </Box>
        </Container>
    );
};

export default Auth;