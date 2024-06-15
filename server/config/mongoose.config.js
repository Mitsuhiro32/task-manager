const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kanban_db";

mongoose.connect(MONGODB_URI)
    .then(() => console.log("¡Conexión a la base de datos exitosa!"))
    .catch((error) => console.log(`Hubo un error al conectar con la base de datos: ${error}`));