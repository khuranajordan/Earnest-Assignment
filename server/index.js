const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
