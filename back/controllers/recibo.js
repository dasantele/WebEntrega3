const { ObjectID } = require("mongodb");
const { mongoUtils, dataBase } = require("../lib/utils/mongo.js");
const COLLECTION_NAME = "receipts";

const getReceipt = async (id) => {
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

const insertReceipt = async (receipt) => {
  const client = await mongoUtils.conn();
  return client.db(dataBase).collection(COLLECTION_NAME).insertOne(receipt);
};

const deleteReceipt = async (id) => {
  const client = await mongoUtils.conn();
  return client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: new ObjectID(id) });
};

const updateReceipt = async (updatedReceipt) => {
  const client = await mongoUtils.conn();
  client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .updateOne(
      { _id: new ObjectID(updatedReceipt._id) },
      {
        $set: {
          fecha: updatedReceipt.fecha,
          valor: updatedReceipt.valor,
          idPublicacion: updatedReceipt.idPublicacion,
          idVendedor: updatedReceipt.idVendedor,
          idCliente: updatedReceipt.idCliente,
          calificacionVendedor: updatedReceipt.calificacionVendedor,
          calificacionCliente: updatedReceipt.calificacionCliente,
        },
      }
    );
};

const getReceipts = async (ids) => {
  try {
    ids = ids.map((id) => {
      return new ObjectID(id);
    });
    const client = await mongoUtils.conn();
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .find({ _id: { $all: ids } })
      .toArray();
  } catch (error) {
    return error;
  }
};

exports.getReceipt = getReceipt;
exports.getReceipts = getReceipts;
exports.insertReceipt = insertReceipt;
exports.deleteReceipt = deleteReceipt;
exports.updateReceipt = updateReceipt;
