import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import morgan from "morgan";

const app = express();
const port = 3000;

let totalCorrect = 0;

// set up Db connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Chrislil1!",
  port: 5432,
});

db.connect();

let quiz = [];

db.query("SELECT * FROM flags", (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    quiz = res.rows;
  }
  db.end();
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));

let currentQuestion = {};

// GET home page
app.get("/", (req, res) => {
  totalCorrect = 0;
  nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  console.log(req.body);
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.name.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

const nextQuestion = async () => {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
};

// function nextQuestion() {
//   const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
//   currentQuestion = randomCountry;
// }

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
