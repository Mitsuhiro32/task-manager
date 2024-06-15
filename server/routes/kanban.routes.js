const kanbanController = require('../controllers/kanban.controller');

module.exports = app => {
    app.post('/api/kanban/new', kanbanController.createTask);
    app.get('/api/kanban', kanbanController.getAllTask);
    app.put('/api/kanban/update/:id', kanbanController.updateTask);
    app.delete('/api/kanban/delete/:id', kanbanController.deleteTask);
}