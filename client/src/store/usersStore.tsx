import {create} from 'zustand'
import type {UserType} from "../types/userType";

interface UsersState {
    users: UserType[]|[],
    actions: {
        setUsers: (users: UserType[]|[]) => void,
    }
}

const useUsersStore = create<UsersState>((set) => ({
    users: [],
    actions: {
        setUsers: (users) => set({ users }),
    }
}));

export const useUsers = () => useUsersStore(state => state.users);
export const useUserActions = () => useUsersStore(state => state.actions);