const jwt = require('jsonwebtoken');
const { firmaSeguraUser } = require('../middleware/middleware');
const moment = require('moment');

const { sequelize } = require('../config/db');

const nuevaOrdenUsuario = (req, res) => {
    const { plato, cantidad, modopago } = req.body;
    const token2 = req.headers.authorization.split(' ')[1];
    const verificarToken2 = jwt.verify(token2, firmaSeguraUser);
    const usuarioPedido = verificarToken2;
    const estado = 1;
    let m = moment();
    let hora = m.set({ hour: 0, minute: 0, second: 0 });
    let numeroPedido =
        Math.floor(Math.random() * 101) + '-' + Math.floor(Math.random() * 101);

    sequelize
        .query(
            `INSERT INTO pedidos (id_pedidos, estado, hora, codigo_pedido, plato, cantidad, modo_pago, usuario) VALUES (NULL, ${estado}, '${hora}', '${numeroPedido}', ${plato}, ${cantidad}, ${modopago}, '${usuarioPedido}')`
        )
        .then((Info) => {
            res.status(201).send('Su pedido a sido ingresado!');
        })
        .catch((error) => {
            res.status(400).send('Su pedido no pudo ser ingresado');
        });
};

const OrdenUsuario = (req, res) => {
    const token2 = req.headers.authorization.split(' ')[1];
    const verificarToken2 = jwt.verify(token2, firmaSeguraUser);
    const usuarioPedido = verificarToken2;
    sequelize
        .query(
            `SELECT pedidos.estado, pedidos.hora, pedidos.codigo_pedido, pedidos.cantidad, pedidos.usuario, menu_delilah.nombre_plato, menu_delilah.precio, estados.estado, forma_de_pago.forma_de_pago, usuarios.nombreyapellido, usuarios.direccion_envio, pedidos.cantidad*menu_delilah.precio AS precio_total FROM pedidos JOIN menu_delilah ON pedidos.plato = menu_delilah.id_plato JOIN estados ON pedidos.estado = estados.id_estados JOIN forma_de_pago ON pedidos.modo_pago = forma_de_pago.id_forma_de_pago JOIN usuarios ON pedidos.usuario = usuarios.usuario`, { type: sequelize.QueryTypes.SELECT }
        )
        .then((Info) => {
            let accesoUsuario = Info.filter((usuarioU) => usuarioU.usuario == usuarioPedido);
            res.status(200).send(accesoUsuario);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

const todosOrdenAdmin = (req, res) => {
    sequelize
        .query(
            `SELECT pedidos.id_pedidos, pedidos.estado, pedidos.hora, pedidos.codigo_pedido, pedidos.cantidad, pedidos.usuario, menu_delilah.nombre_plato, menu_delilah.precio, estados.estado, forma_de_pago.forma_de_pago, usuarios.nombreyapellido, usuarios.direccion_envio, pedidos.cantidad*menu_delilah.precio AS precio_total FROM pedidos JOIN menu_delilah ON pedidos.plato = menu_delilah.id_plato JOIN estados ON pedidos.estado = estados.id_estados JOIN forma_de_pago ON pedidos.modo_pago = forma_de_pago.id_forma_de_pago JOIN usuarios ON pedidos.usuario = usuarios.usuario`, { type: sequelize.QueryTypes.SELECT }
        )
        .then((Info) => {
            res.status(200).send(Info);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

const unOrdenAdmin = (req, res) => {
    const pedido = req.params.pedido;

    sequelize
        .query(
            `SELECT pedidos.id_pedidos, pedidos.estado, pedidos.hora, pedidos.codigo_pedido, pedidos.cantidad, pedidos.usuario, menu_delilah.nombre_plato, menu_delilah.precio, estados.estado, forma_de_pago.forma_de_pago, usuarios.nombreyapellido, usuarios.direccion_envio, pedidos.cantidad*menu_delilah.precio AS precio_total FROM pedidos JOIN menu_delilah ON pedidos.plato = menu_delilah.id_plato JOIN estados ON pedidos.estado = estados.id_estados JOIN forma_de_pago ON pedidos.modo_pago = forma_de_pago.id_forma_de_pago JOIN usuarios ON pedidos.usuario = usuarios.usuario`, { type: sequelize.QueryTypes.SELECT }
        )
        .then((Info) => {
            let accesoUsuario = Info.filter((usuarioU) => usuarioU.codigo_pedido == pedido);
            res.status(200).send(accesoUsuario);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

const eliminarOrden = (req, res) => {
    const pedidoAEliminar = req.params.pedido;

    sequelize
        .query(`DELETE FROM pedidos WHERE codigo_pedido = '${pedidoAEliminar}'`)
        .then((Info) => {
            res.status(200).send('El pedido fue eliminado');
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

const modificarOrden = (req, res) => {
    const pedidoAModificar = req.params.pedido;
    const { estadopedido, modopago } = req.body;

    sequelize
        .query(
            `UPDATE pedidos SET estado = ${estadopedido}, modo_pago = ${modopago} WHERE codigo_pedido = '${pedidoAModificar}'`
        )
        .then((Info) => {
            res.status(200).send('El pedido fue modificado');
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

module.exports = {
    nuevaOrdenUsuario,
    OrdenUsuario,
    todosOrdenAdmin,
    unOrdenAdmin,
    eliminarOrden,
    modificarOrden,
};