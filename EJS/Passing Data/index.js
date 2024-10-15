import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  const sum = req.body["fName"].length + req.body["lName"].length;
  const message = `There are ${sum} letters in your name`;
  res.render("index.ejs", { message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
