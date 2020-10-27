# Entrega 3

Los criterios para construir la documentación fueron tomados con esta [rúbrica](https://uniandes.sharepoint.com/:w:/r/sites/ISISPTW/_layouts/15/guestaccess.aspx?share=EY3A-6Jj9UVKjEAAuFF9JFsBhGADbnt7cy53rPaLWfBuow)

## Descripción del proyecto

### ¿Cuál es el problema que se quiere resolver?

El problema identificado es la inexistencia de plataformas virtuales populares para la compra y venta de video juegos usados (o nuevos) en la comunidad. Normalmente el intercambio de video juegos se realiza en grupos por redes sociales (Facebook, WhatsApp, etc.), y el mercado de productos nuevos se realiza de forma independiente por medio de grandes empresas como Ktronix, Falabella, entre otros. Al tener estos dos mercados separados se crean necesidades para el cliente interesado en contemplar la compra de ambos productos (juegos nuevos y/o usados) al buscar por separado las ofertas existentes en los dos mercados. Otro problema identificado es el poco respaldo al comprar video juegos usados por redes sociales, esto dado a la posibilidad de caer en una estafa.

### ¿Cuáles son las propuestas similares que existen en el mercado?

- Tiendas físicas que compran y revenden objetos utilizados, en particular elementos relacionados a los video juegos.
- Páginas como Mercado Libre en donde los usuarios pueden poner sus productos a la venta para que otros usuarios de esta plataforma puedan comprarlos.
- Grupos de compra y venta de video juegos presentes en redes sociales como Facebook, Instagram y WhatsApp.

### ¿Qué les falta a estas propuestas para ser ideales?

- Confiabilidad con la calidad de vendedores disponibles.
- Facilidades de pago.
- Rastreo seguro y detallado de la transacción.
- Unificación de mercados de videojuegos nuevos y usados.
- Facilidad de uso.
- Posibilidad de realizar intercambios de productos.

### ¿Cuál es la idea que ustedes proponen?

Una plataforma web en la que los usuarios puedan ofertar para la venta sus video juegos usados y estos puedan ser comprados por otros usuarios de manera segura. Esta plataforma permitirá tener un mayor control con los vendedores, y proporcionará un mayor acercamiento con los detalles del envío del producto. Le permitirá al usuario encontrar todos los productos de su interés informando su ubicación, condición, reputación del vendedor, etc.

### ¿Cuál es el valor agregado con respecto a otras propuestas?

- Se pueden hacer intercambios. El usuario puede ofertar un video juego que quiera cambiar por ciertos títulos en específico, detallando las condiciones del cambio (ej. quiero cambiar mi COD modern warfare por The Last of Us 2 y encimo 40.000\$.)
- Automatización del proceso. El cliente no tendrá que preocuparse por tener citas con extraños para realizar la compra, en el momento que se realice la venta el vendedor puede optar por enviarlo con una entidad externa, o puede contratar nuestros servicios de intermediario, donde nuestro personal se acercará a su residencia y recogerá el producto para enviárselo directamente al cliente bajo nuestras garantías.
- Se pueden realizar ofertas. Los precios son fijados por el vendedor, pero puede recibir ofertas de clientes interesados que le resulten llamativas.
- Proceso fácil y rápido.
- Información detallada de los juegos. Utilizamos scraping para obtener información detallada del título de interés del cliente.

### ¿Cuál es el público objetivo de la aplicación?

Todo el público que tengan juegos de video y quieran venderlos o cambiarlos. Adicionalmente, personas que estén interesados en comprar videojuegos usados y nuevos.

## URL Live demo

Para probar nuestros servicios puede acceder a la siguiente dirección: [live demo]() <br>
**TODO ingresar la URL del despliegue**

## URL video funcionalidades
**TODO**


## Instrucciones de despliegue

### Back

Para el despliegue del back es necesario un ambiente con Nodejs instalado previamente. <br>
Una vez se cuenta con este ambiente, se debe descargar el código fuente del back del repositorio en el servidor/computador donde se desee correr el mismo. En caso de descargar el zip, primero se debe descomprimir el proyecto, luego, dentro de la carpeta llamada back se debe crear un archivo llamado ".env" con el siguiente contenido:

```
DB_HOST = <URI-MONGODB>
DB_NAME = gamesApp
```

Donde en `<URI-MONGODB>` se debe específicar la URI para realizar una conexión con MongoDB Atlas, o una base de datos mongo local. Esta base de datos debe llamarse gamesApp y tener las colecciones products, publications, receipts y users. <br>
Finalmente, desde consola se debe acceder a la ubicación del proyecto y acto seguido entrar a la carpeta llamada "back" para realizar la instalacion de las dependencias y correr la aplicación con los siguientes comandos:

```
npm install
npm start
```

Para comprobar el correcto despliegue de la aplicación, puede acceder a `http://<IP-DESPLIEGUE>:3000` en su navegador de preferencia donde deberá ver una página en blanco con el contenido "Back running". Una vez tenga esta vista el back esta listo para su uso.<br>

#### Colecciones de Postman

Las colecciones de Postman se incluyen dentro de la carpeta collections ubicada en la seccion del back. Se incluyen pruebas para todos los servicios básicos del API REST (GET, POST, PUT, DELETE) .

### Front

**TODO**

## Instrucciones de uso

### Back

Las rutas definidas del API REST son las siguientes:

```
http://<IP-DESPLIEGUE>:3000/usuarios
http://<IP-DESPLIEGUE>:3000/productos
http://<IP-DESPLIEGUE>:3000/publicaciones
http://<IP-DESPLIEGUE>:3000/recibos
```

Cada ruta tiene cómo mínimo las funciones POST, GET por id, PUT y DELETE. Se específica el uso de cada una en la siguiente sección:

#### Usuarios

- Post:<br>
  Enviar solicitud POST con un json con la siguiente estructura:

```
{
    "nombre": <String>,
    "apellido": <String>,
    "direccion": <String>,
    "pais": <String>,
    "edad": <Number>,
    "correo": <String>,
    "contrasenia": <String>,
    "calificacion": <Number>,
    "cantidadVentas": <Number>,
    "publicaciones": <Array<ObjectId>>,
    "ventas": <Array<ObjectID>>,
    "compras": <Array<ObjectID>>
}
```

Donde la edad debe ser mayor o igual a 18, y la calificación debe mantenerse entre 1-10. En caso de no cumplirlo el servidor retorna un json con la información del error. Los array de FK pueden (y deberían) ir vacios puesto que se llenan al crear recibos.<br>
El método retorna un json de confirmación con la información suministrada y el `_id` suministrado por la base de datos.

- Get:<br>
  Enviar solicitud GET a con la estructura: `http://<IP-DESPLIEGUE>:3000/usuarios/<ID-USUARIO>`. La respuesta retorna la información del usuario sin la contraseña.
- Put:<br>
  Enviar solicitud PUT con un json con la siguiente estructura:

```
{
    "_id": <String>,
    "nombre": <String>,
    "apellido": <String>,
    "direccion": <String>,
    "pais": <String>,
    "edad": <Number>,
    "correo": <String>,
    "contrasenia": <String>,
    "calificacion": <Number>,
    "cantidadVentas": <Number>,
    "publicaciones": <Array<ObjectId>>,
    "ventas": <Array<ObjectID>>,
    "compras": <Array<ObjectID>>
}
```

El servidor envia una respuesta 204 sin contenido si la solicitud fue exitosa, en caso de lo contrario, un mensaje de error.

- Delete:<br>
  Enviar solicitud DELETE a con la estructura: `http://<IP-DESPLIEGUE>:3000/usuarios/<ID-USUARIO>` En caso de funcionar, la respuesta del servidor es un 204 sin contenido.

- Login (super inseguro):<br>
  Se envía una solicitud POST a `https://<IP-DESPLIEGUE>/usuarios/login`. con un json con la siguiente estructura:
```
{
    "correo": <String>,
    "contrasenia": <String>
}
```
En caso de realizar el login correctamente, el servidor retorna la información del usuario sin la contraseña. En caso de que no se encuentre el usuario o la contraseña, se retorna un mensaje indicando el error.

#### Productos

- Post<br>
  Enviar solicitud POST con un json con la siguiente estructura:

```
{
    "nombre": <String>,
    "descripcion": <String>,
    "imagenes": <Array<String>>,
    "plataforma": <String>,
    "categorias": <Array<String>>,
    "estado": <String>
}
```

- Get id<br>
  Enviar solicitud GET a con la estructura: `http://<IP-DESPLIEGUE>:3000/productos/<ID-PRODUCTO>`.
- Get<br>
  Enviar solicitud GET a con la estructura: `http://<IP-DESPLIEGUE>:3000/productos`. Retorna todos los productos de la db.
- Put<br>
  Enviar solicitud PUT con un json con la siguiente estructura:

```
{
    "_id": <String>,
    "nombre": <String>,
    "descripcion": <String>,
    "imagenes": <Array<String>>,
    "plataforma": <String>,
    "categorias": <Array<String>>,
    "estado": <String>
}
```

- Delete<br>
  Enviar solicitud DELETE a con la estructura: `http://<IP-DESPLIEGUE>:3000/productos/<ID-PRODUCTO>` En caso de funcionar, la respuesta del servidor es un 204 sin contenido.

#### Publicaciones

- Post<br>
  Enviar solicitud POST con un json con la siguiente estructura:

```
{
    "id_vendendor": <String>,
    "fechaPublicacion": <Date>
    "ciudad": <String>,
    "tipoVenta": <String>,
    "descuento": <String>,
    "titulo": <number>,
    "descripcion": <number>,
    "opiniones": <array>,
    "estado": <String>,
    "precio": <number>,
    "id_producto": <String>,
}
```

La fecha debe tener el siguiente formato `"yyyy-mm-dd"`, el valor de "tipoVenta" debe ser entre: Intercambio, Venta y Subasta. El descuento debe ser positivo y el estado entre: Disponible y Finalizado. Los precios están dados en pesos colombianos. las opiniones es un arreglo de indentificadores
(FK´s) de la colección "opinions".

- Get<br>
  Enviar solicitud GET a con la estructura: `http://<IP-DESPLIEGUE>:3000/publicaciones/<ID-PUBLICACION>`.
- Put<br>
  Enviar solicitud PUT con un json con la siguiente estructura:
```
{
    "_id": <String>,
    "ciudad": <String>,
    "tipoVenta": <String>,
    "descuento": <String>,
    "titulo": <number>,
    "descripcion": <number>,
    "opiniones": <array>,
    "estado": <String>,
    "precio": <number>,
    "id_producto": <String>,
}
```
La fecha debe tener el siguiente formato `"yyyy-mm-dd"`, el valor de "tipoVenta" debe ser entre: Intercambio, Venta y Subasta. El descuento debe ser positivo y el estado entre: Disponible y Finalizado. Los precios están dados en pesos colombianos. las opiniones es un arreglo de indentificadores
(FK´s) de la colección "opinions".
- Delete <br>
  Enviar solicitud DELETE a con la estructura: `http://<IP-DESPLIEGUE>:3000/publicaciones/<ID-PUBLICACION>` En caso de funcionar, la respuesta del servidor es un 404.


#### Preguntas por publicación

- Post<br>
  Enviar solicitud POST con un json con la siguiente estructura:

```
{
    "fecha": <Date>,
    "pregunta": <String>,
    "respuesta": <String>,
    "id_quien_pregunta": <String>,
    "id_publicacion": <String>,
    "estado": <String>
}
```

La fecha debe tener el siguiente formato `"YYYY-MM-DD"`, el valor de "estado" debe ser entre: Activa y Finalizada. La respuesta debe estar dada entre: None y String (texto). Cuando se envía el post de una publicación se actualizan las preguntas almacenadas en la publicación correspondiente.

- Get<br>
  Enviar solicitud GET a con la estructura: `http://<IP-DESPLIEGUE>:3000/preguntas/<ID-PREGUNTA>`.
- Put<br>
  Enviar solicitud PUT con un json con la siguiente estructura:

```
{
    "_id": <String>,
    "pregunta": <String>,
    "respuesta": <String>,
    "id_quien_pregunta": <String>,
    "id_publicacion": <String>,
    "estado": <String>
}
```

- Delete <br>
  Enviar solicitud DELETE a con la estructura: `http://<IP-DESPLIEGUE>:3000/preguntas/<ID-PREGUNTA>` En caso de funcionar, la respuesta del servidor es un 404.

#### Recibos

- Post<br>
  Enviar solicitud POST con un json con la siguiente estructura:

```
{
    "fecha": <String>,
    "valor": <number>,
    "idPublicacion": <String>,
    "idVendedor": <String>,
    "idCliente": <String>,
    "calificacionVendedor": <number>,
    "calificacionCliente": <number>
}
```

La fecha debe tener el siguiente formato `"yyyy-mm-dd HH:mm"`, el valor del recibo debe ser positivo y las calificaciones estar entre 0 y 1. Los ids serán comprobados para actualizar los estados de la publicación y los usuarios, por tanto deben ser usuarios existentes, en caso de lo contrario, la solicitud fallara.

- Get<br>
  Enviar solicitud GET a con la estructura: `http://<IP-DESPLIEGUE>:3000/recibos/<ID-RECIBO>`.
- Put<br>
  Enviar solicitud PUT con un json con la siguiente estructura:

```
{
    "_id": <String>,
    "fecha": <String>,
    "valor": <number>,
    "idPublicacion": <String>,
    "idVendedor": <String>,
    "idCliente": <String>,
    "calificacionVendedor": <number>,
    "calificacionCliente": <number>
}
```

- Delete <br>
  Enviar solicitud DELETE a con la estructura: `http://<IP-DESPLIEGUE>:3000/recibos/<ID-RECIBO>` En caso de funcionar, la respuesta del servidor es un 204 sin contenido.

### Front
Instrucciones de Despliegue Front

Este proyecto se desarrollo usando Nodejs, por lo que es necesario que al momento de desplegar el proyecto se tenga instalado en el equipo este ambiente. Una vez se cuente con Node en el equipo se puede descargar el contenido de este repositorio. Se descomprime el archivo en caso de descargar un archivo .zip y luego se debe abrir en el editor de codigo de preferencia. Para el desarrollo de este proyecto se uso Visual Studio Code por lo que se recomienda usar este IDE. Una vez en el editor se debe abrir una terminal en la carpeta raiz de la Entrega 3. En la terminal se debe escribir el siguiente comando:

npm install
npm start

Luego de esto se debe abrir una nueva pestaña en su navegador en la dirección http://localhost:3000, de no ocurrir esto puede copiar esta dirección en su navegador. Ahora se debe poder observar en su navegador la pagina web de gaymers. Debajo de esta barra se puede ver un carrusel que muestra información de interes a los usuarios y justo debajo una breve introducción a las funcionalidades de la aplicación.
Instrucciones de Uso

Luego de desplegar la pagina y encontrarse en la pantalla principal puede realizar varias operaciones. En la barra de navegación que se encuentra en la parte superior de la pantalla puede observar algunas de las funcionalidades de nuestra aplicación. En orden de aparición son:
Gaymers:

le permite dirigirse a la pagina principal de la aplicación.
Juegos:

Le permite dirigirse al catalogo de juegos registrados en la aplicación, en este lugar podra ver en detalle cada juego con toda la información de este, podra filtrar los juegos según lo que ud busque y podra dirigirse a las ofertas de intercambio/venta del juego.
Intercambiar:

Lo dirigira a una pantalla donde se listaran las publicaciones de intercambio o venta de los juegos, en esta pantalla podra observar información sobre cada publicación y se podra seleccionar la publicación que le interese al usuario.
Iniciar Sesión:

En esta pantalla ud tendra la opción de iniciar sesión en nuestra pagina para poder contar con todas las funcionalidades y permitir los intercambios.
