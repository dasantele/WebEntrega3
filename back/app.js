let express = require("express");
const cors = require("cors");
require("dotenv").config();
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

let indexRouter = require("./routes/index");
let usersRouter = require("./routes/usuarios");
let productsRouter = require("./routes/productos");
let adsRouter = require("./routes/publicaciones");
let questionsRouter = require("./routes/preguntas");
let receiptRouter = require("./routes/recibos");

let app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routing
 */
app.use("/", indexRouter);
app.use("/usuarios", usersRouter);
app.use("/productos", productsRouter);
app.use("/publicaciones", adsRouter);
app.use("/recibos", receiptRouter);
app.use("/preguntas", questionsRouter);

module.exports = app;
