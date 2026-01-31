const sqlite3 = require("sqlite3").verbose();

// Cria ou abre o banco
const path = require("path");

const db = new sqlite3.Database(
  path.join(__dirname, "database.db"),
  (err) => {
    if (err) {
      console.error("Erro ao abrir banco", err.message);
    } else {
      console.log("Banco SQLite conectado ✅");
    }
  }
);

// Criar tabela
db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    idade INTEGER
  )
`);

module.exports = db;
