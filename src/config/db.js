const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'mysql://root:13043753@localhost:3306/delilah_resto'
);

module.exports = {
    sequelize,
};