
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(express.json());

const comentarioSchema = new mongoose.Schema({
  autor: String,
  mensaje: String,
  fecha: { type: Date, default: Date.now }
});

const Comentario = mongoose.model("Comentario", comentarioSchema)

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/comentarios", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Conectado a MongoDB"));

app.get("/comentarios", async (req, res) => {
  const comentarios = await Comentario.find().sort({ fecha: -1 });
  res.json(comentarios);
});

app.post("/comentarios", async (req, res) => {
  const { autor, mensaje } = req.body;
  if (!autor || !mensaje) {
    return res.status(400).json({ error: "Faltan campos" });
  }
  const nuevo = new Comentario({ autor, mensaje });
  await nuevo.save();
  res.status(201).json(nuevo);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
