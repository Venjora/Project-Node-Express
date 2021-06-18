const port = 3000;
const express = require("express");
const path = require("path");
const data = require("../Project Nodejs Express/src/data/data").projects;
const app = express();

app.use("/static", express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");

app.set("views", path.join(__dirname, "src/views"));

app.get("/", (req, res) => {
  res.render("index", { data });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const projectLength = data.length;

  if (id > projectLength) {
    const err = new Error(`Project ${id} - Not Found`);
    err.status = 404;
    next(err);
  } else {
    res.render("project", { project: data[id] });
  }
});

app.listen(port, () => console.log(`Port is running on ${port}!`));