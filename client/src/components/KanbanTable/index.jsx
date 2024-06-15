import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';

const KanbanTable = ({ tasksList, URL_BASE }) => {
    const navigate = useNavigate();
    const [backlogTasks, setBacklogTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);

    useEffect(() => {
        setBacklogTasks(tasksList.filter((task) => task.status === 'backlog').sort((a, b) => new Date(a.date) - new Date(b.date)));
        setInProgressTasks(tasksList.filter((task) => task.status === 'in-progress').sort((a, b) => new Date(a.date) - new Date(b.date)));
        setDoneTasks(tasksList.filter((task) => task.status === 'done').sort((a, b) => new Date(a.date) - new Date(b.date)));
    }, [tasksList]);

    const compareDate = (taskDate) => {
        const today = new Date().toLocaleDateString(undefined, { timeZone: 'UTC' });
        const dueDate = new Date(taskDate).toLocaleDateString(undefined, { timeZone: 'UTC' });
        return dueDate < today;
    };

    const renderTasks = (tasks) => {
        return tasks.map((task) => (
            <div className="card">
                <h2>{task.title}</h2>
                <p className={compareDate(task.date) ? 'text-danger' : ''}>Due: {new Date(task.date).toLocaleDateString(undefined, { timeZone: 'UTC' })}</p>
                {task.status === 'backlog' && (
                    <Button color='warning' onClick={() => changeStatus(task._id, 'in-progress')}>Start Task</Button>
                )}
                {task.status === 'in-progress' && (
                    <Button color='success' onClick={() => changeStatus(task._id, 'done')}>Move to Completed</Button>
                )}
                {task.status === 'done' && (
                    <Button color='danger' onClick={() => deleteTask(task._id)}>Remove Task</Button>
                )}
            </div>
        ));
    }

    const changeStatus = (id, status) => {
        axios.put(`${URL_BASE}/update/${id}`, { status })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const deleteTask = (id) => {
        const confirmar = window.confirm('¿Estás seguro de eliminar esta Tarea?');

        if (confirmar) {
            axios.delete(`${URL_BASE}/delete/${id}`)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    return (
        <>
            <Button color='primary' onClick={() => navigate('/add')}>Add Task</Button>
            <Table bordered responsive className='kanbanTable'>
                <colgroup>
                    <col style={{ width: `${100 / 3}%` }} />
                    <col style={{ width: `${100 / 3}%` }} />
                    <col style={{ width: `${100 / 3}%` }} />
                </colgroup>
                <thead>
                    <tr>
                        <th className='table-info'>Backlog</th>
                        <th className='table-warning'>In Progress</th>
                        <th className='table-success'>Done</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{renderTasks(backlogTasks)}</td>
                        <td>{renderTasks(inProgressTasks)}</td>
                        <td>{renderTasks(doneTasks)}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default KanbanTable;