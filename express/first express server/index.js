import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(morgan("common"));

app.get("/", (req, res) => {
  console.log(req.rawHeaders);
  res.send("<h1>Hello World</h1>");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
