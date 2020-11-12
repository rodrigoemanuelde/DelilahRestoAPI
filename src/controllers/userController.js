const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');
const { firmaSeguraAdm, firmaSeguraUser } = require('../middleware/middleware');

const nuevoUsuario = (req, res) => {
    const { usuario, nombreYApellido, email, telefono, direccion, password } = req.body;
    const pass = bcrypt.hashSync(password, 10);
    sequelize
        .query(
            `INSERT INTO usuarios VALUES (NULL, '${usuario}', '${nombreYApellido}', '${email}', '${telefono}', '${direccion}', '${pass}', 2)`
        )
        .then((Info) => {
            Info.push();
            res.status(201).send('Usuario creado!');
        })
        .catch((error) => {
            res.status(400).send('El usuario no pudo ser creado correctamente');
        });
};

const login = (req, res) => {
    const { username, userpassword } = req.body;
    sequelize
        .query('SELECT usuario, user_password, tipo_acceso FROM usuarios', {
            type: sequelize.QueryTypes.SELECT,
        })
        .then((verificarAcceso) => {
            const accesoAdm = verificarAcceso.find(
                (userA) =>
                userA.usuario == username &&
                bcrypt.compareSync(userpassword, userA.user_password) == true &&
                userA.tipo_acceso == 1
            );
            const accesoUser = verificarAcceso.find(
                (userB) =>
                userB.usuario == username &&
                bcrypt.compareSync(userpassword, userB.user_password) == true &&
                userB.tipo_acceso == 2
            );

            if (accesoAdm != undefined) {
                const token1 = jwt.sign(username, firmaSeguraAdm);

                res.status(200).json({ token: token1 });
            } else if (accesoUser != undefined) {
                const token2 = jwt.sign(username, firmaSeguraUser);

                res.status(200).json({ token: token2 });
            } else {
                res.status(400).send('El usuario o password es incorrecto');
            }
        })
        .catch((error) => {
            res.send(error);
        });
};

const vistaUsuario = (req, res) => {
    const vistaUsuario = req.params.usuario;
    const token2 = req.headers.authorization.split(' ')[1];
    const verificarToken2 = jwt.verify(token2, firmaSeguraUser);

    sequelize
        .query(
            `SELECT usuario, nombreyapellido, correo_electronico, telefono, direccion_envio FROM usuarios WHERE usuario = '${vistaUsuario}'`, {
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((Info) => {
            if (vistaUsuario == verificarToken2) {
                res.status(200).send(Info);
            } else {
                res.status(401).send('No tiene acceso a la informacion de otros usuarios');
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

const modificaUsuario = (req, res) => {
    const { nombreYApellido, email, telefono, direccion, password } = req.body;
    const token2 = req.headers.authorization.split(' ')[1];
    const verificarToken2 = jwt.verify(token2, firmaSeguraUser);
    const usuarioAModificar = verificarToken2;
    const pass = bcrypt.hashSync(password, 10);
    sequelize
        .query(
            `UPDATE usuarios SET nombreyapellido = '${nombreYApellido}', correo_electronico = '${email}', telefono = '${telefono}', direccion_envio = '${direccion}', user_password = '${pass}' WHERE usuario = '${usuarioAModificar}'`
        )
        .then((Info) => {
            res.status(200).send('Su usuario a sido modificado!');
        })
        .catch((error) => {
            res.status(400).send('La modificacion no pudo realizarse');
        });
};

module.exports = {
    login,
    nuevoUsuario,
    vistaUsuario,
    modificaUsuario,
};