require("dotenv").config(); //metodo para invocar variables de desarrollo
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;

app.get("/test", (req, res) => {
    res.send({ msg: "This is Home of EndPoints Sunrice Proyect" });
  });

app.listen(PORT, () => {
    console.log("server is ready in port " + PORT);
  });