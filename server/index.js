const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const DB_FILE = "tasks.db";
const db = new sqlite3.Database(DB_FILE);

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, completed BOOLEAN)"
  );
});

app.use(express.json());
app.use(cors());

app.get("/api/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/api/tasks", (req, res) => {
  const { title, description, completed } = req.body;
  db.run(
    "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)",
    [title, description, completed],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.put("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
  
    let sql = "UPDATE tasks SET ";
    const params = [];
    if (title !== undefined) {
      sql += "title = ?, ";
      params.push(title);
    }
    if (description !== undefined) {
      sql += "description = ?, ";
      params.push(description);
    }
    if (completed !== undefined) {
      sql += "completed = ?, ";
      params.push(completed);
    }
    sql = sql.slice(0, -2);
  
    sql += " WHERE id = ?";
    params.push(id);
  
    db.run(sql, params, function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: `Task ${id} updated successfully` });
    });
  });
  

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM tasks WHERE id = ?", id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: `Task ${id} deleted successfully` });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
