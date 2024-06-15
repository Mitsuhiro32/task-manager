const Kanban = require("../models/kanban.model");

module.exports = {
    // Crear una nueva tarea
    createTask(req, res) {
        const { title, date, status } = req.body;
    
        if (!title) {
            res.statusMessage = "El título es requerido";
            return res.status(400).send(res.statusMessage);
        } else if (title.length < 3) {
            res.statusMessage = "El título debe tener al menos 3 caracteres";
            return res.status(400).send(res.statusMessage);
        } 
    
        if (!date) {
            res.statusMessage = "La fecha es requerida";
            return res.status(400).send(res.statusMessage);
        } else if (isNaN(Date.parse(date))) {
            res.statusMessage = "La fecha debe ser válida";
            return res.status(400).send(res.statusMessage);
        }
    
        Kanban.findOne({ title })
            .then(existingTask => {
                if (existingTask) {
                    res.statusMessage = "La tarea ya existe";
                    return res.status(400).send(res.statusMessage);
                }
    
                const NewTask = {
                    title,
                    date,
                    status: status || "backlog"
                };
                
                Kanban.create(NewTask)
                    .then(kanban => res.json(kanban))
                    .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
    },

    // Obtener todas las tareas
    getAllTask(req, res) {
        Kanban.find()
            .then(tasks => res.json(tasks))
            .catch(err => res.status(400).json(err));
    },

    // Actualizar una tarea por id
    updateTask(req, res) {
        Kanban.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(task => res.json(task))
            .catch(err => res.status(400).json(err));
    },

    // Eliminar una tarea por id
    deleteTask(req, res) {
        Kanban.findByIdAndDelete(req.params.id)
            .then(() => res.json({ message: "Kanban eliminado correctamente" }))
            .catch(err => res.status(400).json(err));
    }
};