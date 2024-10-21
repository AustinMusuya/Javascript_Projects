import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import morgan from "morgan";
const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "MonkeySee";
const yourPassword = "MonkeyDo";
const yourAPIKey = "730fc722-9384-45eb-a466-4528b2276cf8";
const yourBearerToken = "9d55bbe6-141d-47aa-9c38-f8bb0362b905";

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  const response = await axios.get(`${API_URL}random`);
  const result = response.data;
  console.log(result);
  const stringContent = JSON.stringify(result);
  //The data you get back should be sent to the ejs file as "content"
  res.render("index.ejs", { content: stringContent });
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  const response = await axios.get(`${API_URL}all?page=2`, {
    auth: {
      username: yourUsername,
      password: yourPassword,
    },
  });
  const result = response.data;
  console.log(result);
  const stringContent = JSON.stringify(result);
  res.render("index.ejs", { content: stringContent });
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  const response = await axios.get(
    `${API_URL}filter?score=5&apiKey=${yourAPIKey}`
  );
  const result = response.data;
  console.log(result);
  const stringContent = JSON.stringify(result);
  //Filter for all secrets with an embarassment score of 5 or greater
  res.render("index.ejs", { content: stringContent });
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  const response = await axios.get(`${API_URL}secrets/42`, {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`,
    },
  });
  const result = response.data;
  console.log(result);
  const stringContent = JSON.stringify(result);
  res.render("index.ejs", { content: stringContent });
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
