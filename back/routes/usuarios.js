let express = require("express");
let router = express.Router();

const Joi = require("joi");
let db = require("../controllers/usuario");

router.get("/:id", (req, res) => {
  db.getUser(req.params.id)
    .then((response) => {
      if (response === null)
        return res
          .status(404)
          .send("The user with the given id was not found.");
      delete response.contrasenia;
      res.send(response);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.post("/", function (req, res, next) {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error);

  db.insertUser(req.body).then((newUser) => res.send(newUser.ops));
});

router.put("/", (req, res) => {
  const { error } = validateUser(req.body);
  if (error) res.status(400).send(error);
  else
    db.updateUser(req.body)
      .then((response) => {
        res.send({ message: "User updated." });
      })
      .catch((error) => {
        res.status(404).send({ message: error });
      });
});

router.delete("/:id", (req, res) => {
  db.deleteUser(req.params.id).then((response) => {
    if (response.deletedCount === 1) res.status(204).send();
    else res.status(404).send({ message: "User was not found." });
  });
});

const validateUser = (userR) => {
  const schema = Joi.object({
    _id: Joi.string(),
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    direccion: Joi.string().required(),
    pais: Joi.string().required(),
    edad: Joi.number().greater(17),
    contrasenia: Joi.string().required(),
    correo: Joi.string()
      .required()
      .pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/),
    calificacion: Joi.number().required().min(0).max(10),
    cantidadVentas: Joi.number().required().min(0),
    publicaciones: Joi.array().required(),
    ventas: Joi.array().required(),
    compras: Joi.array().required(),
  });

  return schema.validate(userR);
};

router.post("/login/", (req, res) => {
  const userLog = req.body;
  db.loginUser(userLog.correo).then((response) => {
    if (response === null)
      return res.status(404).send("Usuario no encontrado.");
    let userInfo = response;
    if(userLog.contrasenia !== userInfo.contrasenia)
      return res.status(401).send("Contrasenia incorrecta.");
    else
      delete userInfo.contrasenia;
      return res.send(userInfo);
  });
});

module.exports = router;
