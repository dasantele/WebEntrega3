const { ObjectID } = require("mongodb");
const { mongoUtils, dataBase } = require("../lib/utils/mongo.js");
const COLLECTION_NAME = "users";

const getUsers = async () => {
  try {
    const client = await mongoUtils.conn();
    return client.db(dataBase).collection(COLLECTION_NAME).find({}).toArray();
  } catch (error) {
    return error;
  }
};

const getUser = async (id) => {
  try {
    const client = await mongoUtils.conn();
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ _id: new ObjectID(id) })
      .finally(() => client.close());
  } catch (error) {
    return error;
  }
};

const insertUser = async (user) => {
  const client = await mongoUtils.conn();
  return client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .insertOne(user)
    .finally(() => client.close());
};

const deleteUser = async (id) => {
  const client = await mongoUtils.conn();
  return client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: new ObjectID(id) });
};

const updateUser = async (updatedUser) => {
  const client = await mongoUtils.conn();
  client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .updateOne(
      { _id: new ObjectID(updatedUser._id) },
      {
        $set: {
          nombre: updatedUser.nombre,
          apellido: updatedUser.apellido,
          direccion: updatedUser.direccion,
          pais: updatedUser.pais,
          edad: updatedUser.edad,
          correo: updatedUser.correo,
          contrasenia: updatedUser.contrasenia,
          calificacion: updatedUser.calificacion,
          cantidadVentas: updatedUser.cantidadVentas,
          publicaciones: updatedUser.publicaciones,
          ventas: updatedUser.ventas,
          compras: updatedUser.compras,
        },
      }
    );
};

const loginUser = async (email) => {
  const client = await mongoUtils.conn();
  try {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ correo: email })
      .finally(() => client.close());
  } catch (error) {
    return error;
  }
};

//exports.getUsers = getUsers;
exports.getUser = getUser;
exports.insertUser = insertUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.loginUser = loginUser;
