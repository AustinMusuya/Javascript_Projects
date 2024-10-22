// HINTS:
// 1. Import express and axios
import express from "express";
import morgan from "morgan";
import axios from "axios";
import bodyParser from "body-parser";
// 2. Create an express app and set the port number.
const app = express();
const port = 3000;
const baseURL = "https://secrets-api.appbrewery.com/";
// Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
// 3. Use the public folder for static files.
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.
// Https route handlers
app.get("/", async (req, res) => {
  // 5. Use axios to get a random secret and pass it to index.ejs to display the
  // secret and the username of the secret.
  const response = await axios.get(`${baseURL}random`);
  const result = response.data;
  console.log(result);
  res.render("index.ejs", { secret: result.secret, user: result.username });
});

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
