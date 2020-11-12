CREATE DATABASE IF NOT EXISTS delilah_resto;

USE  delilah_resto;

CREATE TABLE `usuarios` (
  `id_usuarios` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(45) NOT NULL,
  `nombreyapellido` varchar(45) NOT NULL,
  `correo_electronico` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `direccion_envio` varchar(45) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `tipo_acceso` int NOT NULL,
  PRIMARY KEY (`id_usuarios`)
);

INSERT INTO `usuarios` VALUES 
(1,'DelilahAdmin1','Rodrigo Díaz Estévez','delilah@deliah.com','154295678','Evergreen Terrace 742','$2a$10$6y9ac2epaytwtzV93DqmtO.1mKmb74dAsBcH/ULccGofOa2dtmzkC',1),
(2,'DelilahAdmin2','Emanuel Díaz Estévez','atencionalusuario@delilah.com','154294678','Baker Street 221B ','$2a$10$6y9ac2epaytwtzV93DqmtO.1mKmb74dAsBcH/ULccGofOa2dtmzkC',1),
(3,'rodrigoemanuel','Rodrigo Emanuel Díaz Estévez','rodrigoemanuel@correo.com','154294678','Donceles 815 ','$2a$10$6y9ac2epaytwtzV93DqmtO.1mKmb74dAsBcH/ULccGofOa2dtmzkC',2);

CREATE TABLE `estados` (
  `id_estados` int NOT NULL AUTO_INCREMENT,
  `estado` varchar(45) NOT NULL,
  PRIMARY KEY (`id_estados`)
);

INSERT INTO `estados` VALUES (1,'nuevo'),(2,'confirmado'),(3,'preparado'),(4,'enviando'),(5,'entregado'),(6,'cancelado');

CREATE TABLE `forma_de_pago` (
  `id_forma_de_pago` int NOT NULL AUTO_INCREMENT,
  `forma_de_pago` varchar(45) NOT NULL,
  PRIMARY KEY (`id_forma_de_pago`)
);

INSERT INTO `forma_de_pago` VALUES (1,'efectivo'),(2,'debito'),(3,'tarjeta');

CREATE TABLE `menu_delilah` (
  `id_plato` int NOT NULL AUTO_INCREMENT,
  `nombre_plato` varchar(45) NOT NULL,
  `precio` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id_plato`)
);

INSERT INTO `menu_delilah` VALUES 
    (1,'Hamburguesa Completa',425.00),
    (2,'Pizza de muzarella',650.00),
    (3,'Super pancho',300.00),
    (4,'Pizza de rucula y jamón crudo',800.00);

CREATE TABLE `pedidos` (
  `id_pedidos` int NOT NULL AUTO_INCREMENT,
  `estado` int NOT NULL,
  `hora` varchar(60) NOT NULL,
  `codigo_pedido` varchar(45) NOT NULL,
  `plato` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `modo_pago` int NOT NULL,
  `usuario` varchar(45) NOT NULL,
  PRIMARY KEY (`id_pedidos`),
  KEY `estados_idx` (`estado`),
  KEY `platos_disponibles_idx` (`plato`),
  KEY `modo_pago_idx` (`modo_pago`),
  CONSTRAINT `estados` FOREIGN KEY (`estado`) REFERENCES `estados` (`id_estados`),
  CONSTRAINT `modo_pago` FOREIGN KEY (`modo_pago`) REFERENCES `forma_de_pago` (`id_forma_de_pago`),
  CONSTRAINT `platos_disponibles` FOREIGN KEY (`plato`) REFERENCES `menu_delilah` (`id_plato`)
);

INSERT INTO `pedidos` VALUES 
    (1,3,'Sun Jul 26 2021 12:00:00 GMT-0300','46-72',4,2,3,'rodrigoemanuel'),
    (2,3,'Sun Jul 26 2021 12:00:00 GMT-0300','52-20',1,1,3,'rodrigoemanuel');
