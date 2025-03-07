require("dotenv").config(); //metodo para invocar variables de desarrollo
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;

app.use(cors());
app.use(express.json());

//Routes for app.use 
const {connect} = require("./src/Database/ConectionDB")
const toursRouter = require("./src/Routes/ToursRoutes");
const hospedajeRouter = require("./src/Routes/HospedajeRoutes");
const adminRouter = require("./src/Routes/AdminRoutes");

//conexion a la base de datos
connect();




app.get("/test", (req, res) => {
    res.send({ msg: "This is Home of EndPoints Sunrice Proyect" });
  });


//declaracion de las rutas
app.use("/tours/", toursRouter);
app.use("/hospedaje/", hospedajeRouter);
app.use("/admin/", adminRouter);

app.listen(PORT, () => {
    console.log("server is ready in port " + PORT);
  });