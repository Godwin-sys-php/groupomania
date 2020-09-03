// Les modules:
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const usersRoute = require('./Routes/Users');
const articlesRoute = require("./Routes/Articles");

app.use(cors()); // On accepte toute les requêtes de n'importe quelle serveur

app.use(fileUpload({ createParentPath: true })); // File Upload


// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Lorsque l'on voudra avoir accès au photo de profiles
app.use(
  "/photo_de_profiles",
  express.static(path.join(__dirname, "photo_de_profiles"))
);


app.use('/api', usersRoute);
app.use("/api/articles", articlesRoute);


module.exports = app;
