//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express"; // First lets set up express
import morgan from "morgan";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const port = 3000;

// create middleware that checks if password is correct
const login = (req, res, next) => {
  if (req.body["password"] === "ILoveProgramming") {
    next();
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
};

// Middlewares
app.use(morgan("dev")); // set up morgan and test if the http handlers are working fine.
app.use(bodyParser.urlencoded({ extended: true }));

// Http Request Handlers
app.get("/", (req, res) => {
  // handle logic for serving up html files
  res.sendFile(__dirname + "/public/index.html");
});

app.use(login); // Middleware for authentication

app.post("/check", (req, res) => {
  console.log(req.body);
  res.sendFile(__dirname + "/public/secret.html");
});

app.listen(port, (req, res) => {
  console.log(`Server Running on port ${port}.`);
});
