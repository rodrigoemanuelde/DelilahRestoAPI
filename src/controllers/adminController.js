const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');
const { firmaSeguraAdm } = require('../middleware/middleware');

const todosUsuarios = (req, res) => {
    sequelize
        .query(
            'SELECT usuario, nombreyapellido, correo_electronico, telefono, direccion_envio, tipo_acceso FROM usuarios', { type: sequelize.QueryTypes.SELECT }
        )
        .then((Info) => {
            res.status(200).send(Info);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

const usuarioId = (req, res) => {
    const id = req.params.id;
    sequelize
        .query(
            'SELECT id_usuarios, usuario, nombreyapellido, correo_electronico, telefono, direccion_envio, tipo_acceso FROM usuarios', { type: sequelize.QueryTypes.SELECT }
        )
        .then((Info) => {
            let user_id = Info.find((users) => users.id_usuarios == id);
            if (user_id != undefined) {
                res.status(200).send(user_id);
            } else {
                res.status(404).send('El usuario no existe');
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

const usuarioName = (req, res) => {
    const name = req.params.name;
    sequelize
        .query(
            'SELECT usuario, nombreyapellido, correo_electronico, telefono, direccion_envio, tipo_acceso FROM usuarios', { type: sequelize.QueryTypes.SELECT }
        )
        .then((Info) => {
            let username = Info.find((users) => users.usuario.toLowerCase() == name);
            if (username != undefined) {
                res.status(200).send(username);
            } else {
                res.status(404).send('El usuario no existe');
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

const modificarAdministrador = (req, res) => {
    const { nombreYApellido, email, telefono, direccion, password } = req.body;
    const pass = bcrypt.hashSync(password, 10);
    const token2 = req.headers.authorization.split(' ')[1];
    const verificarToken2 = jwt.verify(token2, firmaSeguraAdm);
    const usuarioAModificar = verificarToken2;

    sequelize
        .query(
            `UPDATE usuarios SET nombreyapellido = '${nombreYApellido}', correo_electronico = '${email}', telefono = '${telefono}', direccion_envio = '${direccion}', user_password = '${pass}' WHERE usuario = '${usuarioAModificar}'`
        )
        .then((Info) => {
            res.status(200).send('Su usuario a sido modificado!');
        })
        .catch(function(error) {
            res.status(400).send('Su usuario no pudo ser modificado');
        });
};

const borrarUsuario = (req, res) => {
    const borrarUser = req.params.user;
    sequelize
        .query(`DELETE FROM usuarios WHERE usuario = '${borrarUser}'`)
        .then((Info) => {
            res.status(200).send(`El usuario ${borrarUser} fue borrado`);
        })
        .catch((error) => {
            res.status(400).send('Hubo un error, intente de vuelta');
        });
};

const cambioRol = (req, res) => {
    const roluser = req.params.user;
    const { nuevorol } = req.body;
    sequelize
        .query(`UPDATE usuarios SET tipo_acceso = ${nuevorol} WHERE usuario = '${roluser}'`)
        .then((Info) => {
            res.status(200).send(`El rol del usuario ${roluser} fue modificado`);
        })
        .catch((error) => {
            res.status(400).send('El rol del usuario no pudo ser modificado');
        });
};
module.exports = {
    modificarAdministrador,
    todosUsuarios,
    usuarioId,
    usuarioName,
    cambioRol,
    borrarUsuario,
};