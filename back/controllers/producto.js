const { ObjectID } = require("mongodb");
const { mongoUtils, dataBase } = require("../lib/utils/mongo.js");
const COLLECTION_NAME = "products";

const getProducts = async () => {
  try {
    const client = await mongoUtils.conn();
    return client.db(dataBase).collection(COLLECTION_NAME).find({}).toArray();
  } catch (error) {
    return error;
  }
};

const getProduct = async (id) => {
  try {
    const client = await mongoUtils.conn();
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ _id: new ObjectID(id) });
  } catch (error) {
    return error;
  }
};

const insertProduct = async (product) => {
  const client = await mongoUtils.conn();
  return client.db(dataBase).collection(COLLECTION_NAME).insertOne(product);
};

const deleteProduct = async (id) => {
  const client = await mongoUtils.conn();
  return client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: new ObjectID(id) });
};

const updateProduct = async (updatedProduct) => {
  const client = await mongoUtils.conn();
  client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .updateOne(
      { _id: new ObjectID(updatedProduct._id) },
      {
        $set: {
          nombre: updatedProduct.nombre,
          descripcion: updatedProduct.nombre,
          imagenes: updatedProduct.imagenes,
          plataforma: updatedProduct.plataforma,
          categorias: updatedProduct.categorias,
          estado: updatedProduct.estado,
        },
      }
    );
};

exports.getProduct = getProduct;
exports.getProducts = getProducts;
exports.insertProduct = insertProduct;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;
