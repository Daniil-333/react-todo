import type {FC} from 'react';
import {useMemo} from 'react';
import {Routes, Route} from 'react-router-dom';

import {authRoutes, publicRoutes} from "../routes";
import Auth from "../pages/Auth";
import { useIsAuth } from "../store/authStore";

const AppRouter: FC = () => {
    const isAuth = useIsAuth();

    const availableRoutes = useMemo(() => {
        if (isAuth) {
            return [...authRoutes, ...publicRoutes];
        } else {
            return publicRoutes;
        }
    }, [isAuth]);

    return (
        <Routes>
            {availableRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {
                !isAuth && <Route key={new Date().toString()} path="*" element={<Auth/>} />
            }
        </Routes>
    );
};

export default AppRouter;