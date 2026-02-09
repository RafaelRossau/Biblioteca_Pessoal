const express = require("express"); 
const mysql = require("mysql2"); 
const path = require("path");

const app = express();

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Middleware para servir arquivos estáticos (HTML, CSS, JS da pasta public/)
app.use(express.static(path.join(__dirname, "public")));

// Conexão com o banco MySQL (via XAMPP)
const db = mysql.createConnection({
  host: "localhost", // Servidor do MySQL
  user: "root", // Usuário padrão do XAMPP
  password: "", // Senha (geralmente vazia no XAMPP)
  database: "biblioteca", // Nome do banco que você criou
});
//----------------------------->POST<------------------------------------------------
app.post("/livros", (req, res) => {
  const {titulo, autor, status_leitura, nota} = req.body; // Extrai os dados enviados pelo front
  db.query(
    "INSERT INTO livros (titulo, autor, status_leitura, nota) VALUES (?, ?, ?, ?)", // Query SQL com placeholders
    [titulo, autor, status_leitura, nota], // Valores que substituem os "?"
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Livro adicionado com sucesso!" }); // Retorno de sucesso
    }
  );
});


//--------------------------------->GET<---------------------------------
app.get("/livros", (req, res) => {
  db.query("SELECT * FROM livros", (err, results) => {
    if (err) throw err; // Se der erro na query, interrompe
    res.json(results); // Envia o resultado como JSON para o front
  });
});

// Inicia o servidor na porta 3000
app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000/biblioteca.html")
)