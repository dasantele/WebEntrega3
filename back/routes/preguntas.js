var express = require("express");
var router = express.Router();
const Joi = require("joi");
var usuariosdb = require("../controllers/usuario");
var publicacionesdb = require("../controllers/publicacion");
var preguntasdb = require("../controllers/pregunta");

/* GET todas las preguntas encontradas en la base de datos */
router.get("/", async function (req, res, next) {
  const preguntas = await preguntasdb.getQuestions().then((result) => {
    if (result == null || result[0] == null) {
      res.status(404).send({ resultado: "No se encontraron preguntas" });
    } else {
      res.status(200).send(result);
    }
  });
});

/* GET pregunta de la base de datos con el identificador dado por parametro */
router.get("/:id", async function (req, res) {
  const pregunta = await preguntasdb
    .getQuestion(req.params.id)
    .then((result) => {
      if (result === null)
        return res.status(404).send({
          resultado: "La pregunta con el id dado no se encontró en la BD",
        });
      res.status(200).send(result);
    });
});

/* POST pregunta en la base de datos*/
router.post("/", async function (req, res, next) {
  const { error } = estructura_pregunta.validate({
    _id: req.body._id,
    fecha: req.body.fecha,
    pregunta: req.body.pregunta,
    respuesta: req.body.respuesta,
    id_quien_pregunta: req.body.id_quien_pregunta,
    id_publicacion: req.body.id_publicacion,
    estado: req.body.estado,
  });

  if (error) {
    return res.status(400).send({ pregunta: error });
  } else {
    // Verifica que la pregunta tenga una publicación valida
    // Verifica que el usuario que esté haciendo la pregunta sea valido

    const publicacion_actual = await publicacionesdb
      .getPublicacion(req.body.id_publicacion)
      .then((result) => {
        if (result === null) {
          return res.status(404).send({
            resultado: "La publicación no se encuentra en la BD",
          });
        } else {
          return result;
        }
      })
      .catch((error) => {
        return res.status(400).send(error);
      });

    const usuario_actual = await usuariosdb
      .getUser(req.body.id_quien_pregunta)
      .then((result) => {
        if (result === null) {
          return res.status(404).send({
            resultado: "El usuario no se encuentra en la BD",
          });
        } else {
          return result;
        }
      })
      .catch((error) => {
        return res.status(400).send(error);
      });
    if (publicacion_actual !== null && usuario_actual !== null) {
      var pregunta_nueva = {
        _id: req.body._id,
        fecha: req.body.fecha,
        pregunta: req.body.pregunta,
        respuesta: "None",
        id_quien_pregunta: req.body.id_quien_pregunta,
        id_publicacion: req.body.id_publicacion,
        estado: "Activa",
      };
      const pregunta = await preguntasdb.insertQuestion(pregunta_nueva);
      publicacion_actual.opiniones.push(pregunta.ops[0]._id);
      publicacionesdb.changePublicacion(
        publicacion_actual._id,
        publicacion_actual
      );
      res.status(200).send(pregunta);
    }
  }
});

/* PUT pregunta: actualiza la pregunta con la información dada por parametro */
router.put("/", async function (req, res, next) {
  var bool = true;
  var verificacion = await preguntasdb
    .getQuestion(req.body._id)
    .then((result) => {
      if (result === null) {
        bool = false;
        return res
          .status(404)
          .send("La pregunta con el id dado no ha sido encontrada.");
      }
    });
  if (bool === true) {
    const { error } = estructura_cambio.validate({
      _id: req.body._id,
      pregunta: req.body.pregunta,
      respuesta: req.body.respuesta,
      id_quien_pregunta: req.body.id_quien_pregunta,
      id_publicacion: req.body.id_publicacion,
      estado: req.body.estado,
    });
    if (error) {
      return res.status(400).send({ mensaje: error });
    } else {
      var resultado = await preguntasdb
        .updateQuestion(req.body._id, req.body)
        .then((result) => {
          if (result[0] !== 0) {
            res
              .status(200)
              .send({ message: "La pregunta se ha actualizado con exito" });
          }
        });
    }
  }
});

/* DELETE pregunta: elimina la pregunta con el id dado por parametro */
router.delete("/:id", async function (req, res, next) {
  var eliminado = await preguntasdb
    .deleteQuestion(req.params.id)
    .then((result) => {
      if (result.deletedCount === 1) {
        res.status(200).send({
          message: "La pregunta con el id se ha eliminado con exito",
        });
      } else {
        res.status(404).send({
          message: "No se ha podido elminar la pregunta con el id indicado",
        });
      }
    });
});

const estructura_pregunta = Joi.object({
  _id: Joi.string(),

  fecha: Joi.date().required(),

  pregunta: Joi.string().required(),

  respuesta: Joi.string(),

  id_quien_pregunta: Joi.string().required(),

  id_publicacion: Joi.string().required(),

  estado: Joi.string().required(),
});

const estructura_cambio = Joi.object({
  _id: Joi.string().required(),

  pregunta: Joi.string().required(),

  respuesta: Joi.string(),

  id_quien_pregunta: Joi.string().required(),

  id_publicacion: Joi.string().required(),

  estado: Joi.string().required(),
});

module.exports = router;
