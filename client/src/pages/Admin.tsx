import type {FC} from 'react';
import Container from '@mui/material/Container';
import {useAuth} from "../store/authStore";
// import TaskForm from "../components/TaskForm.tsx";

const Admin: FC = () => {
    const authUser = useAuth();

    if (!authUser) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="sm" sx={{
            marginTop: '20px',
            height: '100%'
        }}>
            <h1 style={{ textAlign: "center"}}>Создать задачу</h1>

            {/*<TaskForm />*/}

        </Container>
    );
};

export default Admin;