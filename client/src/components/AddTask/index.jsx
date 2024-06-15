import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, FormGroup, Label, Card } from "reactstrap";

const AddTask = ({ addTask, URL_BASE }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const addNewTask = () => {
        const URL = `${URL_BASE}/new`;

        if (!title || !date) {
            setError('Por favor, ingresa una tarea y una fecha.');
            return;
        }

        if (title.length < 3) {
            setError('El título debe tener al menos 3 caracteres.');
            return;
        }

        axios.post(URL, { title, date })
            .then((response) => {
                addTask(response.data);
                setTitle('');
                setDate('');
                setError('');
                navigate('/');
            })
            .catch((error) => {
                setError(error.response.data);
            });
    }

    return (
        <>
            <Button color='primary' onClick={() => navigate('/')}>Back to Dashboard</Button>
            <Card>
                <h2>Add Task</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    addNewTask();
                }}>
                    <FormGroup>
                        <Label for='title'>Tarea: </Label>
                        <input
                            type='text'
                            id='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onFocus={() => { setError('');}}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='date'>Fecha: </Label>
                        <input
                            type='date'
                            id='date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            onFocus={() => { setError(''); }}
                        />
                    </FormGroup>
                    <Button type='submit' color='primary'>Add Task</Button>
                </Form>
            </Card>
        </>
    );
};

export default AddTask;