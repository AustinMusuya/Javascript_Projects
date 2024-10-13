import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();

const port = 3000;

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

// HTTP Request Handlers

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Post Route

app.post("/submit", (req, res) => {
  console.log(req.body);
  const name = req.body["name"];
  res.render("message.ejs", { nameData: name });
});

app.listen(port, (req, res) => {
  console.log(`Server Running on port ${port}.`);
});
