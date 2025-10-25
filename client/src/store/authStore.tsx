import { create } from 'zustand'
import type {UserType} from "../types/userType";

interface AuthState {
    isAuth: boolean,
    user: UserType | null,
    isAdmin: boolean,
    actions: {
        setUser: (user: UserType | null) => void,
        setIsAuth: (isAuth: boolean) => void,
        logout: () => void,
    }
}

const useAuthStore = create<AuthState>((set) => ({
    isAuth: false,
    user: null,
    isAdmin: false,
    actions: {
        setUser: (user) => set({
            user,
            isAdmin: user?.role === 'ADMIN',
        }),
        setIsAuth: (isAuth: boolean) =>  set({ isAuth }),
        logout: () =>  set({
            isAuth: false,
            isAdmin: false,
            user: null,
        })
    }
}));

export const useIsAuth = () => useAuthStore(state => state.isAuth);
export const useAuth = () => useAuthStore(state => state.user);
export const useIsAdmin = () => useAuthStore(state => state.isAdmin);
export const useAuthActions = () => useAuthStore(state => state.actions);