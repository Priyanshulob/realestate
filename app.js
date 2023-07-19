const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const path = require("path");

const connectdb = require("./db/conn");
connectdb();
const empCollection = require("./models/model");
const { json } = require("express");

// const src_path = path.join(__dirname, "../src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//register the given template engine
app.set("view engine", "ejs");
// app.set("views", src_path);
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views/"));
app.use(express.static(path.join(__dirname, "assets")));
console.log(__dirname);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/registration", (req, res) => {
  res.render("registration");
});

app.post("/empdata", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if (password === cpassword) {
      const empData = new empCollection({
        name: req.body.Username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        cpassword: req.body.cpassword,
      });

      const postData = await empData.save();
      res.send(postData);
    } else {
      res.send("password are not matching");
    }
  } catch (error) {
    res.send(error);
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/loginPage", async (req, res) => {
  const email = req.body.email;
  const password = req.body.loginpassword;

  const getEmail = await empCollection.findOne({ email: email });
  console.log(getEmail.password);
  res.send(getEmail.password);
});

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
