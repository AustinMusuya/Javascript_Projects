import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middlewares
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// HTTP Handlers

app.get("/", (req, res) => {
  console.log(req.rawHeaders);
  res.sendStatus(200);
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.put("/replace", (req, res) => {
  res.sendStatus(201);
});

app.patch("/fix", (req, res) => {
  res.sendStatus(200);
});

app.delete("/clear", (req, res) => {
  res.sendStatus(200);
});

// server connect
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
