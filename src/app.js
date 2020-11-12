const express = require('express');
const app = express();

app.use(express.json());

const port = 5400;

const { autorizacionAdm, autorizacionUser } = require('./middleware/middleware');
const {
    login,
    nuevoUsuario,
    vistaUsuario,
    modificaUsuario,
} = require('./controllers/userController');
const {
    menuUsuario,
    todosProductos,
    unProducto,
    nuevoProducto,
    actualizarProducto,
    borrarProducto,
} = require('./controllers/productController');
const {
    nuevaOrdenUsuario,
    OrdenUsuario,
    todosOrdenAdmin,
    unOrdenAdmin,
    eliminarOrden,
    modificarOrden,
} = require('./controllers/orderController');
const {
    modificarAdministrador,
    todosUsuarios,
    usuarioId,
    usuarioName,
    cambioRol,
    borrarUsuario,
} = require('./controllers/adminController');

//Funciona
app.post('/delilah/usuario/nuevousuario', nuevoUsuario);
app.post('/delilah/usuario/login', login);
app.get('/delilah/usuario/:usuario', autorizacionUser, vistaUsuario);
app.put('/delilah/usuario', autorizacionUser, modificaUsuario);

app.get('/delilah/menu', autorizacionUser, menuUsuario);

app.post('/delilah/orden', autorizacionUser, nuevaOrdenUsuario);
app.get('/delilah/orden', autorizacionUser, OrdenUsuario);

app.get('/delilah/usariosadmin', autorizacionAdm, todosUsuarios);
app.get('/delilah/usariosadmin/:id', autorizacionAdm, usuarioId);
app.get('/delilah/usariosadmin/name/:name', autorizacionAdm, usuarioName);
app.put('/delilah/usuariosadmin/cambioadmin', autorizacionAdm, modificarAdministrador);
app.delete('/delilah/usariosadmin/borrar/:user', autorizacionAdm, borrarUsuario);
app.put('/delilah/usariosadmin/cambiorol/:user', autorizacionAdm, cambioRol);

app.get('/delilah/productos', autorizacionAdm, todosProductos);
app.get('/delilah/productos/:producto', autorizacionAdm, unProducto);
app.post('/delilah/productos/insert', autorizacionAdm, nuevoProducto);
app.put('/delilah/productos/modificar/:id', autorizacionAdm, actualizarProducto);
app.delete('/delilah/productos/borrar/:idproducto', autorizacionAdm, borrarProducto);

app.get('/delilah/pedidosadmin', autorizacionAdm, todosOrdenAdmin);
app.get('/delilah/pedidosadmin/:pedido', autorizacionAdm, unOrdenAdmin);
app.delete('/delilah/pedidosadmin/:pedido', autorizacionAdm, eliminarOrden);
app.put('/delilah/pedidosadmin/:pedido', autorizacionAdm, modificarOrden);

app.use((err, req, res, next) => {
    if (!err) return next();
    console.log('Error, algo salio mal', err);
    res.status(500).send('Error');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});