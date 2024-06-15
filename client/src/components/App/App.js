import './App.css';
import { Routes, Route } from 'react-router-dom';
import KanbanTable from '../KanbanTable';
import { useEffect, useState } from 'react';
import AddTask from '../AddTask';
import axios from 'axios';

function App() {
  const [tasksList, setTasksList] = useState([]);
  const URL_BASE = 'http://localhost:8000/api/kanban';

  const addTask = (task) => {
    setTasksList([...tasksList, task]);
  }

  useEffect(() => {
    axios.get(URL_BASE)
      .then((response) => {
        setTasksList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [tasksList]);

  return (
    <div className="App">
      <h1>Project Manager</h1>
      <Routes>
        <Route path="/" element={
          <KanbanTable tasksList={tasksList} URL_BASE={URL_BASE} />
        } />
        <Route path="/add" element={<AddTask addTask={addTask} URL_BASE={URL_BASE} />} />
      </Routes>
    </div>
  );
}

export default App;
