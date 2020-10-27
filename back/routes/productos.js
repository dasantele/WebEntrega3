const { response } = require("express");
let express = require("express");
let router = express.Router();

const Joi = require("joi");
let db = require("../controllers/producto");

router.get("/", function (req, res, next) {
  db.getProducts().then((products) => res.send(products));
});

router.get("/:id", (req, res) => {
  db.getProduct(req.params.id)
    .then((response) => {
      if (response === null)
        return res
          .status(404)
          .send("The product with the given id was not found.");
      res.send(response);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

router.post("/", (req, res, next) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error);

  db.insertProduct(req.body).then((newProduct) => res.send(newProduct.ops));
});

router.put("/", (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) res.status(404).send(error);
  else
    db.updateProduct(req.body)
      .then((response) => {
        res.send({ message: "Product updated" });
      })
      .catch((error) => {
        res.status(404).send({ message: "Product not found" });
      });
});

router.delete("/:id", (req, res) => {
  db.deleteProduct(req.params.id).then((response) => {
    if (response.deletedCount === 1) res.status(204).send();
    else res.status(404).send({ message: "Product was not found" });
  });
});

const validateProduct = (productR) => {
  const schema = Joi.object({
    _id: Joi.string(),
    nombre: Joi.string().required(),
    descripcion: Joi.string().required(),
    imagenes: Joi.array().required(),
    plataforma: Joi.string().max(20).required(),
    categorias: Joi.array().required(),
    estado: Joi.string().required(),
  });
  return schema.validate(productR);
};

module.exports = router;
