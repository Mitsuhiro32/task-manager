const mongoose = require('mongoose');

const KanbanSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "El título es requerido"],
        unique: [true, "La tarea ya existe"]
    },
    date: {
        type: Date,
        required: [true, "La fecha es requerida"]
    },
    status: {
        type: String,
        required: [true, "El estado es requerido"]
    }
}, { timestamps: true });

module.exports = mongoose.model("Kanban", KanbanSchema);
