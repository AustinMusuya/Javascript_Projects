import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "9d55bbe6-141d-47aa-9c38-f8bb0362b905";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  console.log(req.body);
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  const body = req.body;
  console.log(body);
  const searchId = req.body.id;
  try {
    const result = await axios.post(
      API_URL + "/secrets/" + searchId,
      body,
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
  console.log(req.body);
  const body = req.body;
  const searchId = req.body.id;
  try {
    const result = await axios.put(
      API_URL + "/secrets/" + searchId,
      body,
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  console.log(req.body);
  const body = req.body;
  const searchId = req.body.id;
  try {
    const result = await axios.patch(
      API_URL + "/secrets/" + searchId,
      body,
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/delete-secret", async (req, res) => {
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  console.log(req.body);
  const searchId = req.body.id;
  try {
    const result = await axios.delete(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
