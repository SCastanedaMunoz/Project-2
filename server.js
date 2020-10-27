const express = require("express");
const exphbs = require("express-handlebars");

const db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const htmlRoutes = require("./routes/html-routes");
const apiRoutes = require("./routes/api-routes");

app.use(htmlRoutes);
app.use(apiRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is live @ http://localhost:${PORT}`);
  });
});
