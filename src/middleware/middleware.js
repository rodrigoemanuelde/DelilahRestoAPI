const jwt = require('jsonwebtoken');
require('dotenv').config();
const firmaSeguraAdm = 'delilah_admin_resto';
const firmaSeguraUser = 'delilah_user_resto';

const autorizacionAdm = (req, res, next) => {
    try {
        const token1 = req.headers.authorization.split(' ')[1];
        const verificarToken1 = jwt.verify(token1, firmaSeguraAdm);
        if (verificarToken1) {
            req.username = verificarToken1;
            return next();
        }
    } catch (error) {
        res.send('El usuario no pudo ser verificado');
    }
};

const autorizacionUser = (req, res, next) => {
    try {
        const token2 = req.headers.authorization.split(' ')[1];
        const verificarToken2 = jwt.verify(token2, firmaSeguraUser);
        if (verificarToken2) {
            req.username = verificarToken2;
            return next();
        }
    } catch (error) {
        res.send('El usuario no pudo ser verificado');
    }
};

module.exports = {
    autorizacionAdm,
    autorizacionUser,
    firmaSeguraAdm,
    firmaSeguraUser,
};