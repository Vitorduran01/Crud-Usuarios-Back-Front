//importar express
const express = require("express");
//importar cors
const cors = require("cors");
//importar banco de dados
const db = require("./database");

//cria o servidor express
const app = express();

//configurar o servidor para usar json e cors
app.use(cors());
app.use(express.json());

// rota raiz
app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

// criar usuarios POST
app.post("/usuarios", (req, res) => {
  const { nome, email, idade } = req.body;

  const sql = `
    INSERT INTO usuarios (nome, email, idade)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [nome, email, idade], function (err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    res.status(201).json({
      id: this.lastID,
      nome,
      email,
      idade
    });
  });
});


// listar usuarios GET
app.get("/usuarios", (req, res) => {
  const sql = "SELECT * FROM usuarios";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    res.json(rows);
  });
});

// atualizar usuarios PUT
app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { nome, email, idade } = req.body;

  const sql = `
    UPDATE usuarios
    SET nome = ?, email = ?, idade = ?
    WHERE id = ?
  `;

  db.run(sql, [nome, email, idade, id], function (err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    res.json({
      mensagem: "Usuário atualizado com sucesso"
    });
  });
});


// deletar usuarios DELETE
app.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM usuarios WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    res.json({
      mensagem: "Usuário removido com sucesso"
    });
  });
});

// iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});