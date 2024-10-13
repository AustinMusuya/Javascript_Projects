import express from "express";

const app = express();
const port = 3000;

const logger = (req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  next();
};
// Middlewares

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
