-- Active: 1730676546542@@127.0.0.1@5432@forkdl
drop database forkdl;

CREATE DATABASE forkdl;

CREATE TABLE rol (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
)

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  hashtoken VARCHAR(512) NOT NULL,
  rol_id INT NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  telefono INT,
  activo BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (rol_id) REFERENCES rol(id) ON DELETE CASCADE
  )

CREATE TABLE compras (
  id SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL,
  medio_pago VARCHAR(100),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
)

CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100)
)

CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  sku VARCHAR(100),
  titulo VARCHAR(100),
  subtitulo VARCHAR(100),
  descripcion TEXT,
  categoria_id INT,
  precio INT,
  activo BOOLEAN,
  destacado BOOLEAN,
  stock INT,
  url_img VARCHAR(255),
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
)

CREATE TABLE detalle_compra (
  id SERIAL PRIMARY KEY,
  compra_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT,
  precio INT,
  FOREIGN KEY (compra_id) REFERENCES compras(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
)


INSERT INTO categorias
VALUES
  (DEFAULT,'Familiares'),
  (DEFAULT,'Individuales'),
  (DEFAULT,'Postres')


INSERT INTO productos
VALUES
  (
    DEFAULT,
    'FAM001',
    'Beef bourguignon',
    'Con champiñones y tocino, 4 porciones',
    'Clásica preparación francesa de carne al vino tinto cocinada lentamente, preparada con tocino, champiñones y vegetales.',
    1,
    18990,
    true,
    true,
    15,
    'https://corpora-fork.s3.amazonaws.com/back_img/PTPP01279-beef-bourguignon-fam-frontal-830-1732567123448.jpg'
  ),
  (
    DEFAULT,
    'FAM002',
    'Arroz Árabe',
    'Con almendras tostadas, 4 porciones',
    'Aromático arroz con especias, pasta orzo, toque cítrico y almendras tostadas para aportar crocancia.',
    1,
    6490,
    true,
    false,
    8,
    'https://corpora-fork.s3.amazonaws.com/back_img/PTPP01252-arroz-arabe-familiar-frontal-1702299574034.jpg'
  ),
  (
    DEFAULT,
    'FAM003',
    'Lasaña Pollo Champiñón',
    'Con queso mantecoso, cebolla morada y parmesano gratinado, 4 porciones',
    'Elaborada en base a los mejores ingredientes, pasta artesanal al huevo, rellena de una salsa de champiñones cocinada lentamente, además de pollo grillado desmechado.',
    1,
    19490,
    true,
    false,
    12,
    'https://corpora-fork.s3.amazonaws.com/back_img/PTPP02096-lasana-pollo-champinon-congelada-fam-packaging-frontal-pc-830-1727733273169.jpg'
  ),
  (
    DEFAULT,
    'IND001',
    'Ravioles de zapallo',
    'con salsa cuatro quesos.',
    'Pasta artesanal rellena de zapallo y ricotta acompañada de una salsa cuatro quesos y queso parmesano.',
    2,
    7690,
    true,
    false,
    31,
    'https://corpora-fork.s3.amazonaws.com/back_img/PTPP01259-ravioles-zapallo-salsa-cuatro-quesos-packaging-frontal-830-1709929575243.jpg'
  ),
  (
    DEFAULT,
    'IND002',
    'Poke tataki atún',
    'con mix de quinoa y mango',
    'Poke en base a quinoa tricolor, Tataki de atún envuelto en mix de sésamo, hojas verdes, mango, guacamole, mix de repollo morado - zanahoria, cebolla crispy y salsa teriyaki.',
    2,
    7590,
    true,
    true,
    18,
    'https://corpora-fork.s3.amazonaws.com/back_img/PTPP03072-Poke-tataki-atu%CC%81n%2C-qui%CC%81noa-y-mango-Frontal-Packaging-tag-ch-830-1728087275597.jpg'
  ),
  (
    DEFAULT,
    'IND003',
    'Fetuccini con Camarones',
    'Al curry verde',
    'Pasta artesanal teñida de cúrcuma, acompañado de camarones en salsa curry verde.',
    2,
    7990,
    true,
    false,
    22,
    'https://corpora-fork.s3.amazonaws.com/back_img/PTPP01037-fetuccini-con-camarones-sin-brocoli-map-830-1623855171613.jpg'
  ),
  (
    DEFAULT,
    'POS001',
    'Mousse de Chocolate Bitter',
    'Con nibs de cacao',
    'Suave y aireada espuma a base de crema y chocolate peruano semi amargo. Con un toque final de nibs de cacao. Para los fanáticos del chocolate.',
    3,
    2990,
    true,
    false,
    10,
    'https://corpora-fork.s3.amazonaws.com/back_img/PTPP05049-mini-mousse-chocolate-75g-1595442611090-1677078114430.jpg'
  ),
  (
    DEFAULT,
    'POS002',
    'Cuatro Leches',
    'Con merengue levemente tostado',
    'Postre cuatro leches preparado con base de manjar y bizcocho bañado con tres tipos de leche: evaporada, condensada y crema.',
    3,
    2990,
    true,
    true,
    12,
    'https://corpora-fork.s3.amazonaws.com/back_img/PTPP05057-mini-cuatro-leches-manjar-1-1595984403804-1677078396173.jpg'
  ),
  (
    DEFAULT,
    'POS003',
    'Mousse de Chocolate Blanco, Sin Azúcar',
    'Con maracuyá',
    'Suave y aireado mousse de chocolate blanco hecho con crema y leche. Endulzado con alulosa, cubierto de gel de maracuyá.',
    3,
    2990,
    true,
    false,
    15,
    'https://corpora-fork.s3.amazonaws.com/back_img/PTPP05058-mini-mousse-choco-blanco-sin-azucar-75g-1595443025207-1677078506372.jpg'
  )

  INSERT INTO rol
  VALUES
    (DEFAULT,'Administrador'),
    (DEFAULT,'Cliente')