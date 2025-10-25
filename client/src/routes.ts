import {ADMIN_ROUTE, LOGIN_ROUTE, REG_ROUTE, TODO_ROUTE} from "./utils/const";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Todo from "./pages/Todo";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
    },
    {
        path: TODO_ROUTE,
        Component: Todo,
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth,
    },
    {
        path: REG_ROUTE,
        Component: Auth,
    },
]