const sqlite3 = require("sqlite3").verbose();

const DB_FILE = "tasks.db";
const db = new sqlite3.Database(DB_FILE);

class Task {
  static getAll(callback) {
    db.all("SELECT * FROM tasks", callback);
  }

  static create(title, description, completed, callback) {
    db.run(
      "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)",
      [title, description, completed],
      function (err) {
        callback(err, this.lastID);
      }
    );
  }

  static update(id, title, description, completed, callback) {
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
      callback(err);
    });
  }

  static delete(id, callback) {
    db.run("DELETE FROM tasks WHERE id = ?", id, function (err) {
      callback(err);
    });
  }
}

module.exports = Task;
