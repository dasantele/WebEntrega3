let express = require("express");
let router = express.Router();

const Joi = require("joi");
let receiptDb = require("../controllers/recibo");
let usuarioDb = require("../controllers/usuario");
let publicacionDb = require("../controllers/publicacion");

router.get("/:id", (req, res) => {
  receiptDb
    .getReceipt(req.params.id)
    .then((response) => {
      if (response === null)
        return res
          .status(404)
          .send("The receipt with the given id was not found.");
      res.send(response);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

router.post("/", async (req, res, next) => {
  const { error } = validateReceipt(req.body);
  if (error) return res.status(400).send(error);

  let publicacion = await publicacionDb.getPublicacion(req.body.idPublicacion);
  let vendedor = await usuarioDb.getUser(req.body.idVendedor);
  let cliente = await usuarioDb.getUser(req.body.idCliente);
  if (publicacion === null)
    return res.status(404).send({ message: "The publication was not found." });
  if (publicacion.estado === "Vendido")
    return res
      .status(400)
      .send({ message: "The publication is already sold." });
  // Update estado publicacion
  publicacion.estado = "Vendido";

  if (vendedor === null)
    return res.status(404).send({ message: "The seller was not found." });

  // Calificación del vendedor actualizar
  vendedor.cantidadVentas = vendedor.cantidadVentas + 1;
  let ventas = await receiptDb.getReceipts(vendedor.ventas);
  let acc = req.body.calificacionVendedor;
  ventas.forEach((venta) => {
    acc += venta.calificacionVendedor;
  });
  vendedor.calificacion = acc / vendedor.cantidadVentas;

  if (cliente === null)
    return res.status(404).send({ message: "The client was not found." });

  receiptDb.insertReceipt(req.body).then((newReceipt) => {
    publicacionDb.changePublicacion(publicacion._id, publicacion);

    vendedor.ventas.push(newReceipt.ops[0]._id);
    cliente.compras.push(newReceipt.ops[0]._id);
    usuarioDb
      .updateUser(vendedor)
      .then((response) => console.log("updatedVendedor"))
      .catch((error) => console.log(error));
    usuarioDb
      .updateUser(cliente)
      .then((response) => console.log("updatedCliente"))
      .catch((error) => console.log(error));

    res.send(newReceipt.ops);
  });
});

router.put("/", (req, res) => {
  const { error } = validateReceipt(req.body);
  if (error) res.status(400).send(error);
  else {
    receiptDb
      .updateReceipt(req.body)
      .then((response) => {
        res.send({ message: "Receipt updated" });
      })
      .catch((error) => {
        res.status(404).send({ message: error });
      });
  }
});

router.delete("/:id", (req, res) => {
  receiptDb.deleteReceipt(req.params.id).then((response) => {
    if (response.deletedCount === 1) res.status(204).send();
    else res.status(404).send({ message: "Receipt was not found." });
  });
});

const validateReceipt = (receiptR) => {
  const schema = Joi.object({
    _id: Joi.string(),
    fecha: Joi.string()
      .required()
      .pattern(
        /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[1-2][0-9]|3[0-1])[ ](0[1-9]|1[0-9]|2[0-3])[:]([0-5][0-9])$/
      ),
    valor: Joi.number().min(0).required(),
    idPublicacion: Joi.string().required(),
    idVendedor: Joi.string().required(),
    idCliente: Joi.string().required(),
    calificacionVendedor: Joi.number().min(0).max(10),
    calificacionCliente: Joi.number().min(0).max(10),
  });
  return schema.validate(receiptR);
};

module.exports = router;
