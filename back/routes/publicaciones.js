let express = require("express");
let router = express.Router();
let Joi = require("joi");
let productosdb = require("../controllers/producto");
let usuariosdb = require("../controllers/usuario");
let preguntasdb = require("../controllers/pregunta");
let publicacionesdb = require("../controllers/publicacion");

/* GET todas las publicaciones encontradas en la base de datos */
router.get("/", async function (req, res, next) {
  const publicaciones = await publicacionesdb
    .getPublicaciones()
    .then((result) => {
      if (result == null || result[0] == null) {
        res.status(404).send({ resultado: "No se encontraron publicaciones" });
      } else {
        res.status(200).send(result);
      }
    });
});

/* GET publicacion de la base de datos con el identificaro dado por parametro */
router.get("/:id", async function (req, res) {
  const publicacion = await publicacionesdb
    .getPublicacion(req.params.id)
    .then((result) => {
      if (result === null)
        return res.status(404).send({
          resultado: "La publicación con id dado no se encontró en la BD",
        });
      res.status(200).send(result);
    });
});

/* POST publicacion en la base de datos*/
router.post("/", async function (req, res, next) {
  const { error } = estructura_publicacion.validate({
    _id: req.body._id,
    id_vendedor: req.body.id_vendedor,
    fechaPublicacion: req.body.fechaPublicacion,
    ciudad: req.body.ciudad,
    tipoVenta: req.body.tipoVenta,
    descuento: req.body.descuento,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    opiniones: req.body.opiniones,
    estado: req.body.estado,
    precio: req.body.precio,
    id_producto: req.body.id_producto,
  });

  if (error) {
    return res.status(400).send({ publicacion: error });
  } else {
    // Verifica que el producto ya se encuentre creado
    const producto = await productosdb.getProduct(req.body.id_producto);

    if (producto === null)
      return res.status(400).send({
        resultado:
          "La publicación no cuenta con un producto previamente creado",
      });

    const usuario_actual = await usuariosdb
      .getUser(req.body.id_vendedor)
      .catch((error) => {
        return res.status(400).send(error);
      });
    console.log(usuario_actual)
    if (usuario_actual === null) {
      return res.status(404).send({
        resultado: "El usuario no se encuentra en la BD",
      });
    }

    var publicacion_nueva = {
      _id: req.body._id,
      id_vendedor: req.body.id_vendedor,
      fechaPublicacion: req.body.fechaPublicacion,
      ciudad: req.body.ciudad,
      tipoVenta: req.body.tipoVenta,
      descuento: req.body.descuento,
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      opiniones: req.body.opiniones,
      estado: req.body.estado,
      precio: req.body.precio,
      id_producto: req.body.id_producto,
    };

    const publicacion = await publicacionesdb.insertPublicacion(
      publicacion_nueva
    );
    usuario_actual.publicaciones.push(publicacion.ops._id);
    usuariosdb.updateUser(usuario_actual);
    res.status(200).send(publicacion.ops);
  }
});

/* PUT publicacion: actualiza la publicacion con la información dada por parametro */
router.put("/", async function (req, res, next) {
  var bool = true;
  var fallo_en_preguntas = false;

  var verificacion = await publicacionesdb
    .getPublicacion(req.body._id)
    .then((result) => {
      if (result === null || result[0] === null) {
        bool = false;
        return res
          .status(404)
          .send("La publicación con el id dado no ha sido encontrada.");
      }
    });

  req.body.opiniones.forEach((opinion) => {
    const opiniones = preguntasdb
      .getQuestion(opinion)
      .then((result) => {
        if (result === null) {
          fallo_en_preguntas = true;
          return res.status(404).send({
            resultado:
              "La pregunta con id: " + opinion + " no se encuentra en la DB.",
          });
        } else if (result.id_publicacion !== eq.body._id) {
          fallo_en_preguntas = true;
          return res.status(400).send({
            resultado:
              "La pregunta con id: " +
              opinion +
              " no corresponde a la publicación actual.",
          });
        }
      })
      .catch((error) => {
        return res.status(400).send(error);
      });
  });

  if (bool === true && fallo_en_preguntas === false) {
    const { error } = estructura_cambio.validate({
      _id: req.body._id,
      ciudad: req.body.ciudad,
      tipoVenta: req.body.tipoVenta,
      descuento: req.body.descuento,
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      opiniones: req.body.opiniones,
      estado: req.body.estado,
      precio: req.body.precio,
      id_producto: req.body.id_producto,
    });

    if (error) {
      return res.status(400).send({ mensaje: error });
    } else {
      var resultado = await publicacionesdb
        .changePublicacion(req.body._id, req.body)
        .then((result) => {
          if (result[0] !== 0) {
            res
              .status(200)
              .send({ message: "La publicación se ha actualizado con exito" });
          }
        });
    }
  }
});

/* DELETE publicacion: elimina la publicacion con el id dado por parametro */
router.delete("/:id", async function (req, res, next) {
  let eliminado = await publicacionesdb
    .deletePublicacion(req.params.id)
    .then((result) => {
      console.log(result.deletedCount);
      if (result.deletedCount === 1) {
        res.status(200).send({
          message: "La publicación con el id se ha eliminado con exito",
        });
      } else {
        res.status(404).send({
          message: "No se ha podido elminar la publicacion con el id indicado",
        });
      }
    });
});

//te doy un id de usuario y me pasas los registros agrupados por fecha
router.get("/usuarios/:id", (req, res) =>{
  publicacionesdb.getPublicacionUserInDates(req.params.id, req.body).then((response) => {
    res.status(200).send(response);
  });
});

const estructura_publicacion = Joi.object({
  _id: Joi.string(),
  id_vendedor: Joi.string().required(),
  fechaPublicacion: Joi.date().required(),
  ciudad: Joi.string().required(),
  tipoVenta: Joi.string().required(),
  descuento: Joi.number().required(),
  titulo: Joi.string().required(),
  descripcion: Joi.string().required(),
  opiniones: Joi.array().required(),
  estado: Joi.string().required(),
  precio: Joi.number().required(),
  id_producto: Joi.string().required(),
});

const estructura_cambio = Joi.object({
  _id: Joi.string().required(),
  ciudad: Joi.string().required(),
  tipoVenta: Joi.string().required(),
  descuento: Joi.number().required(),
  titulo: Joi.string().required(),
  descripcion: Joi.string().required(),
  opiniones: Joi.array().required(),
  estado: Joi.string().required(),
  precio: Joi.number().required(),
  id_producto: Joi.string().required(),
});

module.exports = router;
