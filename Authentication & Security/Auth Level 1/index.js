import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import morgan from "morgan";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));

// set up Db connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Chrislil1!",
  port: 5432,
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  console.log(req.body);
});

app.post("/login", async (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
