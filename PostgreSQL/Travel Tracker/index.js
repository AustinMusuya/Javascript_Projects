import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));

// Set up db connection

const db = new pg.Client({
  user: "postgres",
  database: "world",
  host: "localhost",
  password: "Chrislil1!",
  port: 5432,
});

db.connect();

const checkVisited = async () => {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log(result.rows);
  return countries;
};

app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await checkVisited();
  const totalCount = countries.length;

  console.log(countries);
  res.render("index.ejs", { countries: countries, total: totalCount });
});

// add a country that has been visited through post request
app.post("/add", async (req, res) => {
  const country = req.body.country;
  console.log(country);
  // query to check if request is already in the table
  try {
    const checker = await db.query(
      "SELECT country_code FROM countries WHERE  LOWER (country_name) LIKE '%' || $1 ||'%';",
      [country.toLowerCase()]
    );
    console.log(checker.rows);
    const data = checker.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (error) {
      console.log(error);
      const countries = await checkVisited();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country already added!",
      });
    }
  } catch (error) {
    console.log(error);
    const countries = await checkVisited();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country doesn't exist!",
    });
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
