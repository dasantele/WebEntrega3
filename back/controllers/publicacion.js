const { object, compile } = require("joi");
const { ObjectID } = require("mongodb");
const { mongoUtils, database } = require("../lib/utils/mongo.js");
const { getReceipt } = require("./recibo.js");
const collection = "publications";

async function getPublicaciones() {
  const client = await mongoUtils.conn();
  return client.db(database).collection(collection).find({}).toArray();
}

async function getPublicacion(id_buscado) {
  const client = await mongoUtils.conn();
  const publicacion = await client
    .db(database)
    .collection(collection)
    .findOne({ _id: new ObjectID(id_buscado) });
  return publicacion;
}

async function insertPublicacion(publicacion_nueva) {
  const client = await mongoUtils.conn();
  return client
    .db(database)
    .collection(collection)
    .insertOne(publicacion_nueva)
    .finally();
}

async function changePublicacion(id_objetivo, publicacion_modificada) {
  const client = await mongoUtils.conn();
  return client
    .db(database)
    .collection(collection)
    .updateOne(
      { _id: new ObjectID(id_objetivo) },
      {
        $set: {
          ciudad: publicacion_modificada.ciudad,
          tipoVenta: publicacion_modificada.tipoVenta,
          descuento: publicacion_modificada.descuento,
          titulo: publicacion_modificada.titulo,
          descripcion: publicacion_modificada.descripcion,
          opiniones: publicacion_modificada.opiniones,
          estado: publicacion_modificada.estado,
          precio: publicacion_modificada.precio,
        },
      } // El cambio que se quiere realizar
    );
}

async function deletePublicacion(id_objetivo) {
  const client = await mongoUtils.conn();
  return client
    .db(database)
    .collection(collection)
    .deleteOne({ _id: new ObjectID(id_objetivo) });
}

const getPublicacionUserInDates = async (userId, dates) => {
  const client = await mongoUtils.conn();
  let initDate = new Date(dates.init_date);
  console.log(initDate);
  let endDate = new Date(dates.end_date);
  console.log(endDate);
  let publications = await client.db(database).collection(collection).find({id_vendedor: userId}).toArray();
  const res = [];
  publications.forEach((publication) =>{
    let date = new Date(publication.fechaPublicacion);
    if(date >= initDate && date <= endDate)
      res.push(publication);
  });
  return res;
};

exports.getPublicaciones = getPublicaciones;
exports.getPublicacion = getPublicacion;
exports.insertPublicacion = insertPublicacion;
exports.deletePublicacion = deletePublicacion;
exports.changePublicacion = changePublicacion;
exports.getPublicacionUserInDates = getPublicacionUserInDates;
