const { sequelize } = require('../config/db');

const menuUsuario = (req, res) => {
    sequelize
        .query('SELECT * FROM menu_delilah', { type: sequelize.QueryTypes.SELECT })
        .then((Info) => {
            res.status(200).send(Info);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

const todosProductos = (req, res) => {
    sequelize
        .query('SELECT * FROM menu_delilah', { type: sequelize.QueryTypes.SELECT })
        .then((Info) => {
            res.status(200).send(Info);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

const unProducto = (req, res) => {
    const producto = req.params.producto;
    sequelize
        .query('SELECT * FROM menu_delilah', { type: sequelize.QueryTypes.SELECT })
        .then((Info) => {
            let plato1 = Info.find((platos) => platos.id_plato == producto);
            if (plato1 != undefined) {
                res.status(200).send(plato1);
            } else {
                res.status(404).send('El plato no existe');
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

const nuevoProducto = (req, res) => {
    const { plato, precio } = req.body;
    sequelize
        .query('INSERT INTO menu_delilah (nombre_plato, precio) VALUES (?, ?)', {
            replacements: [plato, precio],
        })
        .then((Info) => {
            Info.push();
            res.status(201).send('Plato creado!');
        })
        .catch((error) => {
            res.status(400).send('El plato no fue creado. Intente nuevamente');
        });
};

const actualizarProducto = (req, res) => {
    const idMenu = req.params.id;
    const { plato, nuevoprecio } = req.body;
    sequelize
        .query(
            `UPDATE menu_delilah SET nombre_plato = '${plato}', precio = ${nuevoprecio} WHERE id_plato = ?`, { replacements: [idMenu] }
        )
        .then((Info) => {
            res.status(200).send('Plato modificado!');
        })
        .catch((error) => {
            res.status(400).send('El plato elegido no pudo ser modificado');
        });
};

const borrarProducto = (req, res) => {
    const platoABorrar = req.params.idproducto;
    sequelize
        .query(`DELETE FROM menu_delilah WHERE id_plato = ${platoABorrar}`)
        .then((Info) => {
            res.status(200).send('Plato borrado!');
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

module.exports = {
    menuUsuario,
    todosProductos,
    unProducto,
    nuevoProducto,
    actualizarProducto,
    borrarProducto,
};