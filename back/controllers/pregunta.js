const { ObjectID } = require("mongodb");
const { mongoUtils, dataBase } = require("../lib/utils/mongo.js");
const COLLECTION_NAME = "questions";

async function getQuestions() {
  const client = await mongoUtils.conn();
  return client.db(dataBase).collection(COLLECTION_NAME).find({}).toArray();
}

async function getQuestion(id) {
  try {
    const client = await mongoUtils.conn();
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .findOne({ _id: new ObjectID(id) });
  } catch (error) {
    return error;
  }
}

async function insertQuestion(pregunta_nueva) {
  const client = await mongoUtils.conn();
  return client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .insertOne(pregunta_nueva)
    .finally();
}

async function updateQuestion(id_objetivo, pregunta_modificada) {
  const client = await mongoUtils.conn();
  return client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .updateOne(
      { _id: new ObjectID(id_objetivo) },
      {
        $set: {
          pregunta: pregunta_modificada.pregunta,
          respuesta: pregunta_modificada.respuesta,
          id_quien_pregunta: pregunta_modificada.id_quien_pregunta,
          id_publicacion: pregunta_modificada.id_publicacion,
          estado: pregunta_modificada.estado,
        },
      } // El cambio que se quiere realizar
    );
}

async function deleteQuestion(id_objetivo) {
  const client = await mongoUtils.conn();
  return client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: new ObjectID(id_objetivo) });
}

exports.getQuestion = getQuestion;
exports.getQuestions = getQuestions;
exports.insertQuestion = insertQuestion;
exports.deleteQuestion = deleteQuestion;
exports.updateQuestion = updateQuestion;
