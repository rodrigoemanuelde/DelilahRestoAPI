# Delilah Restó App

Proyecto de Rest API para restaurante Delilah Restó, utilizando NodeJS como backend y Mysql como base de datos.

## Instalaciones requeridas:

- Postman
- NodeJs
- Visual Studio Code
- MySQL Workbench o el programa para manejar bases de datos de su preferencia

## Pasos a seguir:

1 - Clonar el proyecto de Git. https://github.com/rodrigoemanuelde/DelilahRestoAPI.git

2 - Ejecutar el comando en la carpeta principal para instalar las depencias necesarias

```bash
npm install
```

3 - Modificar en el archivo src/config/db.js la contraseña de la base de datos según corresponda.

4 - Importar en Mysql Workbench o el programa para manejar bases de datos de su preferencia el archivo src/models/delilah_resto.sql y ejecutarlo.

5 - Instalar en caso de no tener instalado de forma global nodemon

```bash
npm install nodemon -D
```

6 - Ejecutar para iniciar el servidor

```bash
npm start
```

7 - Ejecutar Postman para acceder a los diferentes métodos, rutas y parámetros para realizar las consultas a la API

## Rutas

- ### Creación de usuarios.

POST /delilah/usuario/nuevousuario

BODY:

```
{
"usuario":"DelilahAdmin1",
"nombreYApellido":"Rodrigo Díaz Estévez",
"email":"atencionalcliente@delilah.com",
"telefono":"15226546",
"direccion":"Evergreen Terrace 742",
"password": "password123"
}
```

Todos los nuevos usuario se generan con tipo de acceso 2 - usuario

- ### Login.

POST /delilah/usuario/login

BODY:

```
{
"usuario":"DelilahAdmin1",
"password": "password123"
}
```

Según el tipo de acceso se tendrá permiso para acceder a las difentes rutas

- Administrador de ejemplo

```
{
    "usuario": "DelilahAdmin1",
    "password": "13043753"
}
```

- Usuario de ejemplo

```
{
    "usuario": "rodrigoemanuel",
    "password": "13043753"
}
```

- Para acceder a las siguientes rutas se debe completar el Header

Key

```
Authorization
```

Value

```
Bearer eyJhbGciOiJIUzI1NiJ9.RGVsaWxhaEFkbWluMQ.89CHX4fJaEyP2p84SRZcLfyZ8c7RmbxUgHb8SbLQbTA
```

- ### Vista de los datos del usuario.

GET /delilah/usuario/:usuario

- ### Modificar datos del usuario.

PUT /delilah/usuario

BODY:

```
{
"usuario":"DelilahAdmin1",
"nombreYApellido":"Rodrigo Díaz Estévez",
"email":"atencionalcliente@delilah.com",
"telefono":"15226546",
"direccion":"Evergreen Terrace 742",
"password": "password123"
}
```

- ### Ver todo el menú.

GET /delilah/menu

- ### Realizar una nuevba orden.

POST /delilah/orden

BODY

```
{
"plato": 1,
"cantidad": 2,
"modopago": 3
}
```

- El plato se ingresa por id del mismo
- El modo de pago es 1 - contado, 2 - débito y 3 - tarjeta.

- ### Ver las órdenes que se tienen realizadas.

GET /delilah/orden

- ### Ver todos los usuarios registrados - Solo Admin.

GET /delilah/usariosadmin

- ### Ver usuarios por id - Solo Admin.

GET /delilah/usariosadmin/:id

- ### Ver usuarios por nombre de usuario - Solo Admin.

GET /delilah/usariosadmin/name/:name

- ### Modifica datos del Administrador - Solo Admin.

PUT /delilah/usuariosadmin/cambioadmin

- ### Borra usuarios de la base de datos - Solo Admin.

DELETE /delilah/usariosadmin/borrar/:user

- ### Cambia el tipo de acceso a un usuario o a un administrador - Solo Admin.

PUT /delilah/usariosadmin/cambiorol/:user

- ### Ver todos los productos - Solo Admin.

GET /delilah/productos

- ### Ver un producto - Solo Admin.

GET /delilah/productos/:producto

- ### Crear un nuevo producto - Solo Admin.

POST /delilah/productos/insert

BODY

```
{
"plato": "Ñoquis a la bolognesa",
"precio": 540
}
```

- El plato corresponde al nombre del mismo

- ### Actualizar un producto - Solo Admin.

PUT /delilah/productos/modificar/:id

BODY

```
{
"plato": "Ñoquis a la bolognesa",
"nuevoprecio": 600
}
```

- ### Actualizar un producto - Solo Admin.

DELETE /delilah/productos/borrar/:idproducto

- ### Ver todas las ordenes - Solo Admin.

GET /delilah/pedidosadmin

- ### Ver una orden en específico - Solo Admin.

GET /delilah/pedidosadmin/:pedido

- El pedido corresponde al codigo_pedido generado en la orden del usuario

- ### Modificar el estado del pedido - Solo Admin.

PUT /delilah/pedidosadmin/:pedido

BODY

```
{
"estadopedido": 2,
"modopago": 3
}
```

- El pedido corresponde al codigo_pedido generado en la orden del usuario
- El estado del pedido puede ser (1,'nuevo'),(2,'confirmado'),(3,'preparado'),(4,'enviando'),(5,'entregado'),(6,'cancelado');
- El modo de pago es 1 - contado, 2 - débito y 3 - tarjeta.

- ### Borrar un pedido - Solo Admin.

DELETE /delilah/pedidosadmin/:pedido

- El pedido corresponde al codigo_pedido generado en la orden del usuario
